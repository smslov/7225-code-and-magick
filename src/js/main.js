'use strict';

(function() {
  var game;
  require(['game', 'form', 'reviews'], function(G, f) {
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
  });
})();
