'use strict';

(function() {
  var game;
  require(['game', 'form', 'reviews'], function(g, f, r) {
    game = new g(document.querySelector('.demo'));
    game.initializeLevelAndStart();
    game.setGameStatus(g.Verdict.INTRO);
    var formOpenButton = document.querySelector('.reviews-controls-new');

    /** @param {MouseEvent} evt */
    formOpenButton.onclick = function(evt) {
      evt.preventDefault();

      f.open(function() {
        game.setGameStatus(g.Verdict.PAUSE);
        game.setDeactivated(true);
      });
    };

    f.onClose = function() {
      game.setDeactivated(false);
    };
  });
})();
