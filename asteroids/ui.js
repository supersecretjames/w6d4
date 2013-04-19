function UI(width, height) {
  this.canvas = $('canvas');
  this.ctx = canvas.getContext("2d");
};

UI.prototype.clearCanvas = function() {
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);
}


