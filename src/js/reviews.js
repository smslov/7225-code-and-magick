'use strict';

var container = document.querySelector('.reviews-list');
var template = document.querySelector('#review-template');
var templateContainer = 'content' in template ? template.content : template;

var IMAGE_LOAD_TIMEOUT = 10000;

var getReviewElement = function(review) {
  var reviewElement = templateContainer.querySelector('.review').cloneNode(true);

  //Добавляем картинку автора
  var authorImage = new Image();
  var authorImageTimeout = null;
  authorImage.onload = function(evt) {
    clearTimeout(authorImageTimeout);
    reviewElement.querySelector('.review-author').src = evt.target.src;
  };
  authorImage.onerror = function() {
    reviewElement.classList.add('review-load-failure');
  };
  authorImage.src = review.author.picture;
  authorImageTimeout = setTimeout(function() {
    reviewElement.classList.add('review-load-failure');
  }, IMAGE_LOAD_TIMEOUT);
  reviewElement.querySelector('.review-author').alt = review.author.name;

  //Добавляем звезды в соответствии с оценкой
  for (var i = 1; i < review.rating; i++) {
    reviewElement.insertBefore(reviewElement.querySelector('.review-rating').cloneNode(true), reviewElement.querySelector('.review-rating'));
  }

  //Вставляем текст отзыва
  reviewElement.querySelector('.review-text').textContent = review.description;
  return reviewElement;
};
var renderReviews = function(reviews) {
  reviews.forEach(function(review) {
    container.appendChild(getReviewElement(review));
  });
};
if(typeof reviews !== 'object' || reviews.length === 0) {
  document.querySelector('.reviews-filter').classList.add('invisible');
} 
var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews?callback=__getReviewsData';
var load = function(url, callback) {
  window.__getReviewsData = function(data) {
    callback = data;
  }
  var scriptEl = document.createElement('script');
  scriptEl.src = url;
  document.body.appendChild(scriptEl);
};
load(REVIEWS_LOAD_URL, function(data) {console.log(data);});
//renderReviews(reviews);
