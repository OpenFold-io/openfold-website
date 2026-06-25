/* OpenFold, contact popup.
 * Opens a modal that prominently shows info@openfold.io with copy + email actions.
 * Any element with [data-contact] opens it; [data-contact-close] closes it.
 */
(function () {
  'use strict';

  var EMAIL = 'info@openfold.io';

  function init() {
    var modal = document.getElementById('contactModal');
    if (!modal) return;

    var copyBtn = document.getElementById('contactCopyBtn');
    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      var close = modal.querySelector('.contact-modal__close');
      if (close) close.focus();
    }

    function close() {
      modal.hidden = true;
      document.body.style.overflow = '';
      if (copyBtn) copyBtn.textContent = 'Copy';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    // Open triggers
    document.querySelectorAll('[data-contact]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        open();
      });
    });

    // Close triggers (overlay + close button)
    modal.querySelectorAll('[data-contact-close]').forEach(function (el) {
      el.addEventListener('click', close);
    });

    // Escape closes
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) close();
    });

    // Copy to clipboard
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        function feedback() {
          copyBtn.textContent = 'Copied!';
          setTimeout(function () { copyBtn.textContent = 'Copy'; }, 2000);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(EMAIL).then(feedback, feedback);
        } else {
          var ta = document.createElement('textarea');
          ta.value = EMAIL;
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); } catch (err) {}
          document.body.removeChild(ta);
          feedback();
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
