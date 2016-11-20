'use strict';

(function() {
  var game;
  require(['game', 'form', 'gallery', 'reviews'], function(G, f, Gallery) {
    game = new G(document.querySelector('.demo'));
    game.initializeLevelAndStart();
    game.setGameStatus(G.Verdict.INTRO);
    var formOpenButton = document.querySelector('.reviews-controls-new');

    /** @param {MouseEvent} evt */
    formOpenButton.onclick = function(evt) {
      evt.preventDefault();

      f.open(function() {
        game.setGameStatus(G.Verdict.PAUSE);
        game.setDeactivated(true);
      });
    };

    f.onClose = function() {
      game.setDeactivated(false);
    };

    var screenshots = document.querySelector('.photogallery').getElementsByTagName('img');
    var screenshotArray = [];
    for(var i = 1; i < screenshots.length; i++) {
      screenshotArray.push(screenshots[i].src);
    }
    var gallery = new Gallery(screenshotArray);

    var links = document.getElementsByClassName('photogallery-image');
    for(i = 0; i < links.length; i++) {
      links[i].onclick = function() {
        var a = screenshotArray.indexOf(this.querySelector('img').src);
        gallery.show(a);
      };
    }
  });
})();
