function Rect(x, y) {
    this.x = x;
    this.y = y;
    this.velocity_x = Math.random() > 0.5 ? -1 : 1;
    this.velocity_y = Math.random() > 0.5 ? -1 : 1;
    this.mass = 30 * Math.random();
};

Rect.prototype.draw = function(context) {
    context.fillRect(this.x, this.y, this.mass, this.mass);
};

Rect.prototype.update = function() {
	this.x += this.velocity_x;
    this.y += this.velocity_y;
};