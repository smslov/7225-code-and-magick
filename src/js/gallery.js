'use srict';

define(function() {
  return function() {
    var Gallery = function(pictures) {
      var self = this;
      this.pictures = pictures;
      this.activePicture = 0;
      
      this.galleryContainer = document.querySelector('.overlay-gallery');
      this.nextButton = document.querySelector('.overlay-gallery-control-right');
      this.prevButton = document.querySelector('.overlay-gallery-control-left');
      this.activePictureNumber = document.querySelector('.preview-number-current');
      this.picturesTotalNumber = document.querySelector('.preview-number-total');
      this.closeButton = document.querySelector('.overlay-gallery-close');
    };

    Gallery.prototype.show = function(n) {
      var self = this;
      this.closeButton.onclick = function() {
        self.hide();
      };
      this.nextButton.onclick = function() {
        if(n < 4) {
          n++;
          self.setActivePicture(n);
        }
      };
      this.prevButton.onclick = function() {
        if(n > 0) {
          n--;
          self.setActivePicture(n);
        }
      };
      this.galleryContainer.classList.remove('invisible');
      this.setActivePicture(n);
    };
    Gallery.prototype.setActivePicture = function(n) {
      this.activePicture = n;
      var previewImage = new Image();
      previewImage.src = this.pictures[n];
      if (document.querySelector('.overlay-gallery-preview img') === null) {
        document.querySelector('.overlay-gallery-preview').appendChild(previewImage);
      } else {
        document.querySelector('.overlay-gallery-preview').replaceChild(previewImage, document.querySelector('.overlay-gallery-preview img'));
      }
      document.querySelector('.preview-number-current').textContent = n+1;
    };
    Gallery.prototype.hide = function() {
      this.galleryContainer.classList.add('invisible');
      this.closeButton.onclick = null;
      this.nextButton.onclick = null;
      this.prevButton.onclick = null;
    };
    return Gallery;
  }();
});
