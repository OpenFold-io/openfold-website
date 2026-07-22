/* OpenFold, newsletter viewer.
 * Opens a shared modal that displays a newsletter PDF inline instead of
 * navigating away. Each trigger carries [data-newsletter-src] (the PDF) and
 * [data-newsletter-title]; the same modal is reused for every issue, so adding
 * a new quarterly newsletter is just another card, no markup changes here.
 * [data-newsletter-close] closes it.
 */
(function () {
  'use strict';

  function init() {
    var modal = document.getElementById('newsletterModal');
    if (!modal) return;

    var frame = modal.querySelector('.newsletter-modal__frame');
    var titleEl = modal.querySelector('#newsletterModalTitle');
    var openLink = modal.querySelector('.newsletter-modal__open');
    var lastFocus = null;

    function open(src, title) {
      lastFocus = document.activeElement;
      if (src) {
        frame.src = src;
        if (openLink) openLink.href = src;
      }
      if (title && titleEl) titleEl.textContent = title;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      var closeBtn = modal.querySelector('.newsletter-modal__close');
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      modal.hidden = true;
      document.body.style.overflow = '';
      // Unload the PDF so it stops rendering while the modal is hidden.
      frame.src = 'about:blank';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    // Open triggers
    document.querySelectorAll('[data-newsletter]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        open(
          el.getAttribute('data-newsletter-src') || el.getAttribute('href'),
          el.getAttribute('data-newsletter-title')
        );
      });
    });

    // Close triggers (overlay + close button)
    modal.querySelectorAll('[data-newsletter-close]').forEach(function (el) {
      el.addEventListener('click', close);
    });

    // Escape closes
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
