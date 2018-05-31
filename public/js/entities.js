var entities = {

    Snake: function(){
        this.scale = 10;
        this.x = 0;
        this.y = 0;
        this.oldX;
        this.oldY;
        this.w = this.scale;
        this.h = this.scale;
        this.velX = 1;
        this.velY = 0;
        this.tail = [];
    
        this.changeDirection = function(newVelX, newVelY){
            this.velX = newVelX;
            this.velY = newVelY;
        }
    
        this.update = function(){
            // Update the location of the snake's head
            this.oldX = this.x;
            this.oldY = this.y;
            this.x += this.velX * this.scale;
            this.y += this.velY * this.scale;

            // Then update thetail
            for (let i = 0; i < this.tail.length-1; i++){
                this.tail[i] = this.tail[i+1];
            }
            this.tail[this.tail.length-1] = [this.oldX, this.oldY];

        }
    },

    Food: function(x, y){
        this.x = x;
        this.y = y;
        this.w = 10;
        this.h = 10;
    }, 

    Tail: function(x, y){
        this.x = x;
        this.y = x;
        this.w = 10;
        this.h = 10;
    },

    Wall: function(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    },
    
}