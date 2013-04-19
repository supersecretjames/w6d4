function Asteroid(position, velocity) {
  this.position = position;
  this.velocity = velocity;
  this.radius = 10;
};

Asteroid.randomAsteroid = function(width, height) {
  var yPosition = _.random(0, height -1);
  var xPosition = _.random(0, width -1);
  var yVelocity = _.random(-4, 4);
  var xVelocity = _.random(-4, 4);
  return new Asteroid([xRandom, yRandom], [xVelocity, yVelocity]);
};

Asteroid.prototype.draw = function(ctx) {
  var x = this.position[0]
  var y = this.position[1]
  var r = this.radius
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.beginPath();
  ctx.arc(x,y,r,0,Math.PI*2, true)
  ctx.closePath();
  ctx.fill();
}

Asteroid.prototype.update = function() {
  this.position[0] += this.velocity[0];
  this.position[1] += this.velocity[1];
};

function Game(asteroidCount) {
  this.asteroidCount = 10
  this.asteroids = [];
  var ui = new UI();
  this.ui = ui;
};

Game.prototype.generateAsteroids = function() {
  var that = this;
  _.times(that.asteroidCount, function() {
    that.asteroids.push(Asteroid.randomAsteroid(that.ui.canvas.width(),
                                                that.ui.canvas.height()))
  });
}

Game.prototype.update = function() {
  var that = this;
  _.each(that.asteroids, function(asteroid) {
    asteroid.update();
  })
};

Game.prototype.start = function() {
  var interval = window.setInverval(
    function() {

    }, 100);
}

$(function () {
  g = new Game();
  g.generateAsteroids();

  g.ui.clearCanvas();
  _.each(g.asteroids, function(asteroid) {
    asteroid.draw(g.ui.ctx);
  });
});