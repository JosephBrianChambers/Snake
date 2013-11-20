(function (root) {
  var SnakeApp = root.SnakeApp = (root.SnakeApp || {});
  
  Coord = SnakeApp.Coord = function(row, col) {
    this.pos = [row,col]
  }
  
  Coord.prototype.plus = function (direction) {
    switch (direction) {
    case "N":
      return [-1,0];
    case "E":
      return [0,1];
    case "S":
      return [1,0];
    case "W": 
      return [0,-1];
    };
  };
  
})(this);