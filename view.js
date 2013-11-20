(function (root) {
  var SnakeApp = root.SnakeApp = (root.SnakeApp || {});
  
  View = SnakeApp.View = function (element) {
    this.el = $(element);
    this.board = new SnakeApp.Board();
  }
  
  View.prototype.renderApple = function () {
    var that = this;
    
    $apple = $('div.square').filter(function (idx, elem) {
      return $(elem).data('row') === that.board.apple.pos[0] &&
             $(elem).data('col') === that.board.apple.pos[1];
    });
    $apple.addClass('apple');
    
  }
  
  View.prototype.renderSnake = function () {
    var that = this;
    this.board.snake.segments.forEach(function (seg) {
      var div = $('div.square').filter(function (idx, elem) {
        return $(elem).data('row') === seg.pos[0] &&
               $(elem).data('col') === seg.pos[1]
      });
      $(div).addClass('snake');
    });
  };
  
  View.prototype.boardRender = function () {
    var that = this;
    var $container = $('<div></div>')
    _(SnakeApp.Board.ROWS).times(function (row) {
      _(SnakeApp.Board.COLS).times(function (col) {
        $container.append($('<div class="square"></div>')
                       .attr("data-row", row)
                       .attr("data-col", col));
      });
    });
    this.el.html($container)
    this.renderSnake();
    this.renderApple();
  };
  
  View.prototype.handleKeyEvent = function(keyCode) {
    
    switch (keyCode) {
    case 37:
      dir = "W";
      break;
    case 38:
      dir = "N";
      break;
    case 39:
      dir = "E";
      break;
    case 40:
      dir = "S"
      break;
    default:
      return null
    };
    this.board.snake.turn(dir)
  }
  
  View.prototype.start = function () {
    
    this.timerId = setInterval(this.step.bind(this) ,100);
  }
  
  View.prototype.step = function () {
    
    
    if (this.board.snake.isValidMove()) {
      this.board.moveSnake();
      this.boardRender();
      $('span.score-value').html(this.board.score)
    } else {
      alert("Game Over!  Your Score: " + this.board.score);
      clearInterval(this.timerId);
    }

  }
})(this);



