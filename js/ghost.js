/* OpenFold — Ghost Content API loader for the blog page.
 *
 * Attempts to fetch recent posts from the Ghost Content API and render them
 * into #ghost-posts. If the fetch fails, returns no posts, or the API key is
 * still the placeholder, the static fallback cards already present in the
 * markup are left untouched.
 *
 * TODO: replace YOUR_CONTENT_API_KEY with the Ghost Content API key from
 *       Ghost Admin > Integrations.
 */
(function () {
  'use strict';

  var GHOST_URL = 'https://openfold.ghost.io';
  var CONTENT_API_KEY = 'YOUR_CONTENT_API_KEY';
  var POST_LIMIT = 6;

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderPosts(posts) {
    var container = document.getElementById('ghost-posts');
    var fallback = document.getElementById('blog-fallback');
    if (!container || !posts || !posts.length) return;

    var html = posts.map(function (post) {
      var title = escapeHtml(post.title);
      var excerpt = escapeHtml(post.custom_excerpt || post.excerpt || '');
      var url = post.url || (GHOST_URL + '/' + post.slug);
      var img = post.feature_image
        ? '<div class="card__media"><img src="' + escapeHtml(post.feature_image) +
          '" alt="" loading="lazy"></div>'
        : '';
      return (
        '<article class="card card--hover">' +
        img +
        '<h3>' + title + '</h3>' +
        '<p>' + excerpt + '</p>' +
        '<div class="card__footer">' +
        '<a class="link-arrow" href="' + escapeHtml(url) +
        '" target="_blank" rel="noopener noreferrer">Read post</a>' +
        '</div>' +
        '</article>'
      );
    }).join('');

    container.innerHTML = html;
    container.hidden = false;
    if (fallback) fallback.hidden = true;
  }

  function loadPosts() {
    if (CONTENT_API_KEY === 'YOUR_CONTENT_API_KEY') {
      // No key configured yet — keep the static fallback cards visible.
      return;
    }

    var endpoint = GHOST_URL +
      '/ghost/api/content/posts/?key=' + encodeURIComponent(CONTENT_API_KEY) +
      '&limit=' + POST_LIMIT +
      '&fields=title,url,slug,excerpt,custom_excerpt,feature_image';

    fetch(endpoint)
      .then(function (res) {
        if (!res.ok) throw new Error('Ghost API responded ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (data && data.posts && data.posts.length) {
          renderPosts(data.posts);
        }
      })
      .catch(function (err) {
        // Silent fall back to the curated static cards already in the DOM.
        if (window.console) console.warn('Ghost posts unavailable:', err.message);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPosts);
  } else {
    loadPosts();
  }
})();
