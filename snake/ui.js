function UI(game) {
  this.board = $('#board')
  this.game = game
};

UI.prototype.drawField = function() {
  _.each(this.game.board.grid, function (row, yIndex) { //for each row
    var board = $('#board');

    var newRow = $('<div>') //add row
      .attr('id', 'row'+padNum(yIndex))
      .addClass('row');

    board.append(newRow);

    _.each(row, function (square, xIndex) { //populate row

      var newSquare = $('<div>')
        .attr('id', 'square'+padNum(yIndex)+padNum(xIndex))
        .addClass('square')
        .addClass('empty');
      newRow.append(newSquare);
    });

    var clear = $('<div>') //add clear
      .addClass('clear');
      board.append(clear);
  });
};

UI.prototype.clearSnake = function() {
  $('.square, .snake-bod1').removeClass('snake-bod1').addClass('empty');
  $('.square, .snake-bod2').removeClass('snake-bod2').addClass('empty');
};

UI.prototype.renderSnake = function() {
  var that = this;
  _.each(that.game.board.snake.bodyLocations, function(location,index) {
    var snakeClass = ["snake-bod1", "snake-bod2"][index%2]
    var locationDiv = $('#square' + padNum(location[0]) + padNum(location[1]));
    locationDiv.addClass(snakeClass).removeClass('empty');
  })
};

UI.prototype.renderBoard = function() {
  var that = this;
  this.clearSnake();
  this.renderSnake();
  this.clearApple();
  this.renderApple();
};

var padNum = function(num) {
  return (num < 10 ? '0' : '') + num;
}

UI.prototype.renderApple = function() {
  var location = this.game.board.apple;

  var locationDiv = $('#square' + padNum(location[0]) + padNum(location[1]));
  locationDiv.removeClass('empty').addClass("apple");
};

UI.prototype.clearApple= function() {
  $('.square, .apple').removeClass('apple').addClass('empty');
}

