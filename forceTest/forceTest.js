var Game = {};
var frictionCoefficient = 2;

Game.initialize = function() {
    this.entities = [];
    this.canvas = document.getElementById("myCanvas");
    this.graphics = this.canvas.getContext("2d");
    this.graphics.font = "20px Arial";
    Game.graphics.fillStyle = "black";
    this.running = false;
    this.time = 0;
    this.drawTime();
};

Game.clearScreen = function() {
    this.graphics.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.drawTime = function() {
    Game.graphics.fillText("Time:" + this.time, 1, 20);
}

Game.draw = function() {
    this.clearScreen();
    this.drawTime();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.graphics);
    }
};

Game.update = function() {
    Game.time+=1; // TODO: Note that if using this.time it never gets passed 1!
    for (var i = 0; i < Game.entities.length; i++) {
        var entity = Game.entities[i];

        // Basic update
        entity.update();

        // Apply friction (TODO: Why won't this.useFriction work below?)
        //  a = F/m, where here F = frictionCoefficient
        if(Game.useFriction) {
            if(entity.velocity_x > 0) {
                entity.velocity_x = Math.max(0,entity.velocity_x - frictionCoefficient/entity.mass);
            } 
            if(entity.velocity_y > 0) {
                entity.velocity_y = Math.max(0,entity.velocity_y - frictionCoefficient/entity.mass);
            } 
            if(entity.velocity_x < 0) {
                entity.velocity_x = Math.min(0,entity.velocity_x + frictionCoefficient/entity.mass);
            } 
            if(entity.velocity_y < 0) {
                entity.velocity_y = Math.min(0,entity.velocity_y + frictionCoefficient/entity.mass);
            } 
        }

        // Wrap around
        if (entity.x > Game.canvas.width) {
            entity.x = 0;
        }
        if (entity.x < 0) {
            entity.x = Game.canvas.width;
        }
        if (entity.y > Game.canvas.height) {
            entity.y = 0;
        }
        if (entity.y < 0) {
            entity.y = Game.canvas.width;
        }
    }
    Game.draw();
};

Game.addRect = function() {
    var newRect = new Rect(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
    newRect.draw(this.graphics);
    Game.entities.push(newRect);
    console.log(this.entities);
};


Game.start = function() {
    if(this.running) {
        this.stop();
    }
    this.running = true;
    Game.timerId = setInterval(Game.update, 30);
};

Game.stop = function() {
    clearInterval(Game.timerId);
    this.running = false;
};

Game.clear = function() {
    Game.time = 0;
    this.stop();
    this.entities = [];
    this.clearScreen();
    this.drawTime();
}

// F = ma; a = F/m
Game.forceUp = function() {
    var force = document.getElementById("force").value;
    for (var i = 0; i < Game.entities.length; i++) {
        Game.entities[i].velocity_y -= force/Game.entities[i].mass ;
    }
};

Game.toggleFriction = function() {
    this.useFriction = document.getElementById("friction").checked;
};
