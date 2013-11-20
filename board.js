(function (root) {
  var SnakeApp = root.SnakeApp = (root.SnakeApp || {})
  
  Board = SnakeApp.Board = function () {
    this.grid  = this.createGrid();
    this.snake = new SnakeApp.Snake(this);
    this.apple = this.startingAppleCoord();
    this.score = 1
    
  }
  
  Board.ROWS = 10;
  Board.COLS = 10;
  
  Board.prototype.startingAppleCoord = function () {
   return new SnakeApp.Coord(Math.floor(Math.random() * SnakeApp.Board.ROWS),
                             Math.floor(Math.random() * SnakeApp.Board.COLS));
  };
  
  
  Board.prototype.createGrid = function () {
    var grid = []
    for(var row = 0; row < Board.ROWS; row++) {
      grid.push([]);
      for(var col = 0; col < Board.COLS; col++) {
        grid[row].push(null);
      };
    };
    return grid
  };
  
  Board.prototype.replaceApple = function () {
    var that = this;
    var validAppleDivs = $('div.square').filter(function (idx, elem) {
      return $(elem).hasClass('snake') === false;
    });

    var validApplePositions = [];
    validAppleDivs.each(function (idx,div) {
      var row = $(div).data('row');
      var col = $(div).data('col');
      validApplePositions.push([row,col]);
    });

    var randomPick = Math.floor(Math.random() * validApplePositions.length);
    var pos = validApplePositions[randomPick];
    
    return new SnakeApp.Coord(pos[0], pos[1]);
  }
  
 
  
  Board.prototype.moveSnake = function () {
    console.log("in board.move snake")
    var segs = this.snake.segments
    var newHeadCoord = this.snake.nextHeadCoord();
    
    
    //move logic for if snake eats an apple
    if (this.snake.eatsApple(newHeadCoord)) {
      $('div.apple').removeClass('apple');
      this.apple = this.replaceApple();
      segs.unshift(newHeadCoord);
      this.score++      
    } else {
      var oldSnakeTail = segs.pop(); 
      segs.unshift(newHeadCoord);
    }
                                
  }
})(this);















