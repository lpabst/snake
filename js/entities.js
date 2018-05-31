var entities = {

    Snake: function(){
        this.x = 0;
        this.y = 0;
        this.w = 10;
        this.h = 10;
        this.velX = 1;
        this.velY = 0;
        this.speedMultiplier = 2;
        this.tail = [];
    
        this.changeDirection = function(newVelX, newVelY){
            this.velX = newVelX;
            this.velY = newVelY;
        }
    
        this.update = function(){
            // update tail
            for (let i = 1; i < this.tail.length; i++){
                this.tail[i-1] = this.tail[i];
            }
            this.tail[this.tail.length-1] = [this.x, this.y];

            // then update the location of the snake's head
            this.x += this.velX * this.speedMultiplier;
            this.y += this.velY * this.speedMultiplier;
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
    }
    
}