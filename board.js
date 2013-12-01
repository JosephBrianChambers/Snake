(function (root) {
  var SnakeApp = root.SnakeApp = (root.SnakeApp || {})
  
  Board = SnakeApp.Board = function () {
    this.numPlayers = SnakeApp.numPlayers
    this.grid  = this.createGrid();
    for(var i=0; i < SnakeApp.numPlayers; i++) {
      startingCoord = new SnakeApp.Coord(Board.ROWS/2, Board.COLS/2 - 1 + i)
      this["snake" + i] = new SnakeApp.Snake(this, startingCoord)
    }
  }
  
  Board.ROWS = 50;
  Board.COLS = 50;
  
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
  
  Board.prototype.removeApple = function (i) {
    var headPos = this["snake" + i].segments[0].pos
    var headDiv = $("div[data-row = "+headPos[0]+
                   "]div[data-col = "+headPos[1]+"]")
    $(headDiv).removeClass('apple')
    
  }
  
  Board.prototype.moveSnake = function (i) {
    var segs = this["snake" + i].segments
    var newHeadCoord = this["snake" + i].nextHeadCoord();
  
    //move logic for if snake eats an apple
    if (this["snake" + i].eatsApple(newHeadCoord)) {
      
      this.removeApple(i)
      segs.unshift(newHeadCoord);
      //increment score
      $("span.player"+(i+1)+"-score").html(function (idx, oldhtml) {
        return parseInt(oldhtml)+1 + ""
      });
    } else {
      var oldSnakeTail = segs.pop(); 
      
      if (SnakeApp.tronFlag === false) {
        var oldSnakeTailDiv = $("div[data-row = "+oldSnakeTail.pos[0]+
                               "]div[data-col = "+oldSnakeTail.pos[1]+"]")
        $(oldSnakeTailDiv).removeClass('snake'+i)
      }
      segs.unshift(newHeadCoord);
    }
                                
  }
})(this);















