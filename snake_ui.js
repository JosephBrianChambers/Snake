
  
  
  
  $(document).ready(function () {    
    $('#new-game-btn').on('click', function () {
      $('.grid-div').html("")
      window.SnakeAppGame = new SnakeApp.View($('.grid-div'));
      window.SnakeAppGame.start();
    });
    
    $(document).on('keydown', function (event) {
      if (event.keyCode === 32) {$('#new-game-btn').trigger('click')}
      window.SnakeAppGame.handleKeyEvent(event.keyCode)
    });
  });
  
  











