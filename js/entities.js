var entities = {

    Snake: function(){
        this.x = 0;
        this.y = 0;
        this.w = 10;
        this.h = 10;
        this.velX = 1;
        this.velY = 0;
        this.speedMultiplier = 2;
    
        this.changeDirection = function(newVelX, newVelY){
            this.velX = newVelX;
            this.velY = newVelY;
        }
    
        this.update = function(){
            this.x += this.velX * this.speedMultiplier;
            this.y += this.velY * this.speedMultiplier;
        }
    },

    Food: function(x, y){
        this.x = x;
        this.y = y;
        this.w = 10;
        this.h = 10;
    }
    
}