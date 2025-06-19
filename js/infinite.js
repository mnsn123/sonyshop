---
---

$(function () {
  var postURLs = [],
      isFetchingPosts = false,
      shouldFetchPosts = true,
      postsToLoad = $(".post-list").children().length,
      loadNewPostsThreshold = 3000;

  // Disable fetching if no spinner is found
  if ($(".infinite-spinner").length < 1) shouldFetchPosts = false;

  // Load post URLs from JSON
  $.getJSON("{{ site.url }}/all-posts.json", function (data) {
    postURLs = data["posts"];

    // No more posts to fetch?
    if (postURLs.length <= postsToLoad) {
      disableFetching();
    }
  });

  // Scroll listener
  $(window).on("scroll", function () {
    if (!shouldFetchPosts || isFetchingPosts) return;

    var scrollBottom = $(window).scrollTop() + $(window).height();
    var docHeight = $(document).height();

    if (scrollBottom > (docHeight - loadNewPostsThreshold)) {
      fetchPosts();
    }
  });

  function fetchPosts() {
    if (!postURLs.length) return;

    isFetchingPosts = true;

    var loadedPosts = 0;
    var currentCount = $(".post-list").children().length;

    const callback = function () {
      loadedPosts++;
      var nextIndex = currentCount + loadedPosts;

      if (nextIndex >= postURLs.length) {
        disableFetching();
        return;
      }

      if (loadedPosts < postsToLoad) {
        fetchPostWithIndex(nextIndex, callback);
      } else {
        isFetchingPosts = false;
      }
    };

    fetchPostWithIndex(currentCount, callback);
  }

  function fetchPostWithIndex(index, callback) {
    var postURL = postURLs[index];

    if (!postURL) {
      disableFetching();
      return;
    }

    $.get(postURL, function (data) {
      var $post = $(data).find(".post").first();

      if ($post.length) {
        $(".post-list").append($post);
      }
      callback();
    }).fail(function () {
      console.warn("Failed to load:", postURL);
      callback();
    });
  }

  function disableFetching() {
    shouldFetchPosts = false;
    isFetchingPosts = false;
    $(".infinite-spinner").fadeOut();
  }
});
