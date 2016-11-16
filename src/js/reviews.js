'use strict';

define(['load', 'review'], function(load, getReviewElement) {
  var container = document.querySelector('.reviews-list');
  var LOAD_REVIEWS_URL = 'http://localhost:1507/api/reviews';
  document.querySelector('.reviews-filter').classList.add('invisible');
  load(LOAD_REVIEWS_URL, function(reviews) {
    document.querySelector('.reviews-filter').classList.remove('invisible');
    reviews.forEach(function(review) {
      container.appendChild(getReviewElement(review));
    });
  });
});
