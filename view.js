(function (root) {
  var SnakeApp = root.SnakeApp = (root.SnakeApp || {});
  
  View = SnakeApp.View = function (element, numPlayers) {
    this.el = $(element);
    this.board = new SnakeApp.Board();
    this.counter = 0
    
  }
  
  View.prototype.renderNewApple = function () {
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
    
    var $appleDiv = $("div[data-row = "+pos[0]+
                     "]div[data-col = "+pos[1]+"]")
    
    $appleDiv.addClass('apple')
  }
  
  View.prototype.renderApple = function () {
    var that = this;
    
    var $apple = $("div[data-row = "+this.board.apple.pos[0]+
                  "]div[data-col = "+this.board.apple.pos[1]+"]")
    // $apple = $('div.square').filter(function (idx, elem) {
    //   return $(elem).data('row') === that.board.apple.pos[0] &&
    //          $(elem).data('col') === that.board.apple.pos[1];
    // });
    $apple.addClass('apple');
    
  }
  
  View.prototype.renderSnake = function (i) {
    var that = this;
    this.board["snake" + i].segments.forEach(function (seg) {
      var div = $("div[data-row = "+seg.pos[0]+
                 "]div[data-col = "+seg.pos[1]+"]")
      $(div).addClass('snake'+ i);
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
  };
  
  View.keys = {
    //player 1
    37: "W",
    38: "N",
    39: "E",
    40: "S",
    
    //player 2
    65: "W",
    87: "N",
    68: "E",
    83: "S"
    //player 3
    
  }
  
  View.prototype.handleKeyEvent = function(keyCode) {
    
    switch (true) {
    case (keyCode >= 37 && keyCode <=40):
      this.board.snake0.turn(View.keys[keyCode])
      break;
    case (keyCode === 65 || 
          keyCode === 87 || 
          keyCode === 68 ||
          keyCode === 83):
      this.board.snake1.turn(View.keys[keyCode])
      break;
    };
  }
  
  View.prototype.start = function () {
    this.boardRender();
    this.timerId = setInterval(this.callStep.bind(this) ,75);
  }
  
  View.prototype.callStep = function () {
    this.counter++
    if (this.counter === 100) {this.counter = 0}
    
    this.checkMovesValid()
    this.moveSnakes();
    this.renderSnakes();
    if (SnakeApp.tronFlag === false) {
      if (this.counter%40 === 0) {this.renderNewApple()}
    }
    this.renderNewApple
  }
   
  View.prototype.renderSnakes = function () {
    for(var i = 0; i < SnakeApp.numPlayers; i++) {
      this.renderSnake(i);
    }
  }
  
  View.prototype.moveSnakes = function () {
    for(var i = 0; i < SnakeApp.numPlayers; i++) {
      this.board.moveSnake(i)
    }
  }
  
  View.prototype.checkMovesValid = function (i) {
    
    for(var i = 0; i < SnakeApp.numPlayers; i++) {
      if (this.board["snake" + i].isValidMove(i) === false) {
        clearInterval(this.timerId);
        alert ("Game Over! Player "+(i+1)+" lost");
      }
    }
  }
})(this);



