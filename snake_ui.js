
  
  
  
  $(document).ready(function () {    
    $('#new-game').submit(function (event) {
      event.preventDefault();
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
      
      $('.grid-div').html("")
      window.SnakeAppGame = new SnakeApp.View($('.grid-div'));
      window.SnakeAppGame.start();
      
      $(document).on('keydown', function (event) {
        // if (event.keyCode === 32) {$('#new-game-btn').trigger('click')}
        window.SnakeAppGame.handleKeyEvent(event.keyCode)
      });
    });
  });
  
  











