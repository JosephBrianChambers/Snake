
  
  
  
  $(document).ready(function () {    
    $('#new-game').submit(function (event) {
      event.preventDefault();
      
      // determine game mode and num players
      var gameMode = $(event.target).find('#game-mode').val()
      switch (gameMode) {
        case "snake":
          SnakeApp.numPlayers = 1;
          SnakeApp.tronFlag = false;
          break;
        case "snaketron":
          SnakeApp.numPlayers = 2;
          SnakeApp.tronFlag = false;
          break;
        case "tron":
          SnakeApp.numPlayers = 2;
          SnakeApp.tronFlag = true;
          break;
      }
      
      // add player scores to dom
      $('div.score').html("")
      if (SnakeApp.tronFlag === false) {
        for(var i = 0; i < SnakeApp.numPlayers; i++) {
          $('div.score').append (
            "<div class='player"+(i+1)+"-text'>"+
              "Player "+ (i+1) + " Score: "+
              "<span class='player"+(i+1)+"-score'>0</span>"+
            "</div>"
          );
        }
      }      
      
      //generate game board and listen for keyboard input
      $('.grid-div').html("")
      window.SnakeAppGame = new SnakeApp.View($('.grid-div'));
      window.SnakeAppGame.start();
      
      $(document).on('keydown', function (event) {
        // if (event.keyCode === 32) {$('#new-game-btn').trigger('click')}
        window.SnakeAppGame.handleKeyEvent(event.keyCode)
      });
    });
  });
  
  











