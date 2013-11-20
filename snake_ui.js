
  
  
  
  $(document).ready(function () {
    
    
    
    $('#new-game-btn').on('click', function () {
      window.SnakeAppGame = new SnakeApp.View($('.grid-div'));
      window.SnakeAppGame.start();
    });
    
    $(document).on('keydown', function (event) {
      console.log(event.keyCode)
      window.SnakeAppGame.handleKeyEvent(event.keyCode)
    });
  });
  
  











