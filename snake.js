(function (root) {
  var SnakeApp = root.SnakeApp = (root.SnakeApp || {});
  
  Snake = SnakeApp.Snake = function (board) {
    this.board = board;
    this.direction = "N";
    this.segments = [new SnakeApp.Coord(5,5)];
  };
  
  Snake.prototype.move = function (coord) {
    return this.segments[0].plus(this.direction);
  }
  
  Snake.prototype.turn = function (newDirection) {
    this.direction = newDirection;
  }
  
  Snake.prototype.eatsApple = function (headCoord) {
    var appleCoord = this.board.apple
    return headCoord.pos[0] === appleCoord.pos[0] &&
           headCoord.pos[1] === appleCoord.pos[1];
  }
  
  Snake.prototype.isValidMove = function () {
    return this.eatSnake() === false && this.offBoard() === false
  }
  
  Snake.prototype.nextHeadCoord = function () {
    var headCoord = this.segments[0]
    var moveDelta = headCoord.plus(this.direction)
    return new SnakeApp.Coord(headCoord.pos[0] + moveDelta[0],
                              headCoord.pos[1] + moveDelta[1])
  }
  
  Snake.prototype.eatSnake = function () {
    var newHeadCoord = this.nextHeadCoord();
    
    var div = $('div.snake').filter(function (idx, elem) {
      return $(elem).data('row') === newHeadCoord.pos[0] &&
             $(elem).data('col') === newHeadCoord.pos[1];
    });
    return $(div).hasClass('snake');
  }
  
  Snake.prototype.offBoard = function () {
    var newHeadCoord = this.nextHeadCoord();
    var headRow = newHeadCoord.pos[0];
    var headCol = newHeadCoord.pos[1];
    return (headRow < 0 || headRow > SnakeApp.Board.ROWS - 1) ||
           (headCol < 0 || headCol > SnakeApp.Board.COLS - 1);
  }
  
})(this);