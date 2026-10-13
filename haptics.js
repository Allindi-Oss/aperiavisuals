/* Aperia Visuals: haptic feedback for phones.
 *
 * Android (and other browsers with the Vibration API): a short vibration on chosen taps.
 * iPhone: Safari has no vibration API. Since iOS 18 it plays a system haptic when a person taps a
 * native switch (<input type="checkbox" switch>), and since 2025 only on a real tap. So on iPhone each
 * chosen control gets an invisible switch laid over it: the finger lands on the switch (haptic plays),
 * and the tap is passed on to the real control.
 *
 * Off on desktops, and for anyone whose phone is set to reduce motion.
 * window.avHaptic(kind) also fires a haptic from page code (Android only; iPhone blocks non-tap haptics).
 */
(function () {
  'use strict';
  var mm = function (q) { return window.matchMedia && window.matchMedia(q).matches; };
  var coarse = mm('(pointer: coarse)');
  var calm = mm('(prefers-reduced-motion: reduce)');
  var canVibrate = typeof navigator.vibrate === 'function';
  var PATTERN = { tap: 8, select: 10, confirm: [14, 55, 26], error: [28, 60, 28, 60, 28] };

  window.avHaptic = function (kind) {
    if (!coarse || calm || !canVibrate) return;
    try { navigator.vibrate(PATTERN[kind] || PATTERN.tap); } catch (e) {}
  };
  if (!coarse || calm) return;

  // What buzzes. Confirmation moments get a fuller pattern; everything else a light tick.
  var RULES = [
    ['confirm', '#plSend, #siDownload, #siShoot'],
    ['select', '.pl-type, .si-seg button, #plUse button, #plFace button, .si-photo, .si-tabs button, .si-swatches button'],
    ['tap', '#navToggle, #menuBtn, #drawerClose, #waFab, #plWa, #plCopy, .enq__send, #enquiryDoneWa'],
    [null, '[data-haptic]']
  ];
  function kindOf(el) {
    if (el.dataset.haptic) return el.dataset.haptic;
    for (var i = 0; i < RULES.length; i++) if (RULES[i][0] && el.matches(RULES[i][1])) return RULES[i][0];
    return 'tap';
  }
  var ALL = RULES.map(function (r) { return r[1]; }).join(', ');

  if (canVibrate) {
    // Android: vibrate as the tap happens.
    document.addEventListener('click', function (e) {
      var el = e.target.closest && e.target.closest(ALL);
      if (el && !el.disabled) window.avHaptic(kindOf(el));
    }, true);
    return;
  }

  // iPhone: invisible native switch over each control.
  var css = document.createElement('style');
  css.textContent = '.avh{position:absolute;inset:0;z-index:5;margin:0;opacity:0;cursor:pointer;-webkit-tap-highlight-color:transparent;border-radius:inherit}' +
    '.avh input{position:absolute;width:1px;height:1px;margin:0;opacity:0;pointer-events:none}';
  document.head.appendChild(css);

  function arm(el) {
    if (el.__avh || el.querySelector('input[switch]')) return;
    el.__avh = true;
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    var lb = document.createElement('label'), sw = document.createElement('input');
    lb.className = 'avh'; lb.setAttribute('aria-hidden', 'true');
    sw.type = 'checkbox'; sw.setAttribute('switch', ''); sw.tabIndex = -1;
    lb.appendChild(sw);
    // The switch's own click must not reach the control.
    sw.addEventListener('click', function (e) { e.stopPropagation(); });
    lb.addEventListener('click', function (e) {
      if (e.target !== lb) return;
      e.stopPropagation();      // the label's default action flips the switch → haptic
      if (!el.disabled) el.click(); // then hand the tap to the real control (link, button, submit)
    });
    el.appendChild(lb);
  }
  function scan(root) { (root || document).querySelectorAll(ALL).forEach(arm); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { scan(); }); else scan();
})();
