(function (root) {
  var SnakeApp = root.SnakeApp = (root.SnakeApp || {});
  
  Snake = SnakeApp.Snake = function (board, startingCoord) {
    this.board = board;
    this.direction = "N";
    this.segments = [startingCoord];
    this.score = 0
  };
  
  Snake.prototype.move = function (coord) {
    return this.segments[0].plus(this.direction);
  }
  
  Snake.prototype.turn = function (newDirection) {
    this.direction = newDirection;
  }
  
  Snake.prototype.eatsApple = function (headCoord) {
    var headDiv = $("div[data-row = "+this.segments[0].pos[0]+
                   "]div[data-col = "+this.segments[0].pos[1]+"]")
    return  $(headDiv).hasClass('apple');
  }
  
  Snake.prototype.isValidMove = function (i) {
    return this.eatSnake(i) === false && this.offBoard(i) === false
  }
  
  Snake.prototype.nextHeadCoord = function () {
    var headCoord = this.segments[0]
    var moveDelta = headCoord.plus(this.direction)
    return new SnakeApp.Coord(headCoord.pos[0] + moveDelta[0],
                              headCoord.pos[1] + moveDelta[1])
  }
  
  Snake.prototype.eatSnake = function (i) {
    var newHeadCoord = this.nextHeadCoord();
    
    var div = $("div[data-row = "+newHeadCoord.pos[0]+
               "]div[data-col = "+newHeadCoord.pos[1]+"]")    
    var isOccupied = $(div).hasClass('snake0') || $(div).hasClass('snake1') || $(div).hasClass('snake2');
    return isOccupied
  }
  
  Snake.prototype.offBoard = function (i) {
    var newHeadCoord = this.nextHeadCoord();
    var headRow = newHeadCoord.pos[0];
    var headCol = newHeadCoord.pos[1];
    return (headRow < 0 || headRow > SnakeApp.Board.ROWS - 1) ||
           (headCol < 0 || headCol > SnakeApp.Board.COLS - 1);
  }
  
})(this);