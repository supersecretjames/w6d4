function Board(length, width) {
  this.grid = makeGrid(length, width);
  this.snake = new Snake([Math.floor(length/2), Math.floor(width/2)]);
  this.apple = []
};

var makeGrid = function(length, width) {
  var rows = Array.apply(null, new Array(length)).map(Number.prototype.valueOf,0);
    return _.map(rows, function(row) {
      return Array.apply(null, new Array(width)).map(Number.prototype.valueOf,0);
    });
};

Board.prototype.addApple = function() {
  var apple = [];
  var that = this;
  while (!apple[0] || // while apple is undefined OR apple loc in snake body.
    _.filter(that.snake.bodyLocations, function(location){
            return apple[0] == location[0] && apple[1] == location[1];}).length
        ) {
        var yApple = _.random(0, that.grid.length -1);
        var xApple = _.random(0, that.grid[0].length -1);


        apple = [yApple, xApple];
      }

  that.apple = apple;
};

function Snake(startPosition) {
  this.bodyLocations = [startPosition];
  this.directions = {
    north: [-1, 0],
    south: [1, 0],
    east: [0, 1],
    west: [0, -1]
  };
  this.currentDirection = "east";
};

Snake.prototype.changeDirection = function(newDirection) {
  this.currentDirection = newDirection;
}

Snake.prototype.step = function(ateApple) {
  // Create and add new location to snake body
  var currentVector = this.directions[this.currentDirection]

  var yPrime = this.bodyLocations[0][0]+ currentVector[0];
  var xPrime = this.bodyLocations[0][1]+ currentVector[1];
  var newHead = [yPrime, xPrime];

  this.bodyLocations.unshift(newHead);

  if (!ateApple) {
    this.bodyLocations.pop();
  };
};

Board.prototype.detectSelfCollision = function() {
  var head = this.snake.bodyLocations[0];
  var that = this;
  return _.filter(that.snake.bodyLocations, function(location){
          return head[0] == location[0] && head[1] == location[1]}).length > 1;
};

Board.prototype.detectWallCollision = function() {
  var head = this.snake.bodyLocations[0];
  return (head[0] < 0 || head[0] > this.grid.length ||
         head[1] < 0 || head[1] > this.grid[0].length);
};

Board.prototype.detectEatApple = function() {
  var head = this.snake.bodyLocations[0];
  return (head[0] == this.apple[0] && head[1] == this.apple[1]);
};

