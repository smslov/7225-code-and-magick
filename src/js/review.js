'use strict';

define(function() {
  return function() {
    var Review = function(review) {
      var self = this;
      this.data = review;
      this.element = function() {
        var IMAGE_LOAD_TIMEOUT = 10000;
        var template = document.querySelector('#review-template');
        var templateContainer = 'content' in template ? template.content : template;
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
        authorImage.src = self.data.author.picture;
        authorImageTimeout = setTimeout(function() {
          reviewElement.classList.add('review-load-failure');
        }, IMAGE_LOAD_TIMEOUT);
        reviewElement.querySelector('.review-author').alt = self.data.author.name;

        //Добавляем звезды в соответствии с оценкой
        for (var i = 1; i < self.data.rating; i++) {
          reviewElement.insertBefore(reviewElement.querySelector('.review-rating').cloneNode(true), reviewElement.querySelector('.review-rating'));
        }

        //Вставляем текст отзыва
        reviewElement.querySelector('.review-text').textContent = self.data.description;
        return reviewElement; 
      }();
    };      
    return Review; 
  }();
});
