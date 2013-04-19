function Game() {
  this.board = new Board(50, 50);
  this.snake = this.board.snake;
  this.moveQueue = [];

  var ui = new UI(this);
  this.ui = ui;
};

Game.prototype.advanceState = function() {
  var ateApple = this.board.detectEatApple();
  var newDirection = this.getMove();

  this.snake.changeDirection(newDirection);
  this.snake.step(ateApple);
  if (ateApple) {
    this.board.addApple();
  }

  if (this.board.detectWallCollision() || this.board.detectSelfCollision()) {
      return false;
  } else {
      return true;
  };
};

Game.prototype.play = function() {
  var that = this;
  this.startGettingDirections();

  var interval = window.setInterval(
    function() {
      if (!that.advanceState()) {
        window.clearInterval(interval);
      };
      that.ui.renderBoard();
      that.ui.renderSnake();
  }, 75);
};

Game.prototype.addMove = function(direction) {
  this.moveQueue.push(direction);
};

Game.prototype.getMove = function() {
  var currentDirection = this.snake.currentDirection;
  var newDirection = this.moveQueue.shift();
  var directionGroup = {
    north: "vertical",
    south: "vertical",
    east: "horizontal",
    west: "horizontal"
  };
  if (!newDirection) {
    return currentDirection;
  } else if (directionGroup[currentDirection] == directionGroup[newDirection]) {
    return this.getMove();
  } else {
    return newDirection;
  };
}

Game.prototype.startGettingDirections = function() {
  var that = this
  $('html').keydown(function (event) {
    switch(event.keyCode)
    {
      case 87:
        that.addMove("north");
        break;
      case 83:
        that.addMove("south");
        break;
      case 65:
        that.addMove("west");
        break;
      case 68:
        that.addMove("east");
        break;
    }
    console.log("you have pressed" + event.keyCode);
  });
}

$(function() {
  g = new Game();
  g.board.addApple();
  g.ui.drawField();
  g.play();
});
