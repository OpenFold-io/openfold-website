/* OpenFold, blog post copy buttons and table of contents highlighting */
(function () {
  'use strict';

  function initCopyButtons() {
    if (!navigator.clipboard) return;

    document.querySelectorAll('.code-block').forEach(function (block) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-block__copy';
      button.textContent = 'Copy';
      block.querySelector('.code-block__bar').appendChild(button);

      button.addEventListener('click', function () {
        navigator.clipboard.writeText(block.querySelector('code').textContent).then(function () {
          button.textContent = 'Copied';
          setTimeout(function () { button.textContent = 'Copy'; }, 1500);
        });
      });
    });
  }

  function initToc() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.article__toc a'));
    if (!links.length) return;

    var headings = links.map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    });

    function update() {
      var line = window.innerHeight * 0.3;
      var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      var current = 0;
      headings.forEach(function (heading, i) {
        if (atBottom || heading.getBoundingClientRect().top <= line) current = i;
      });
      links.forEach(function (link, i) {
        link.classList.toggle('is-active', i === current);
      });
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  function init() {
    initCopyButtons();
    initToc();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
