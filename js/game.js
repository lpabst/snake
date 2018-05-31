var game = {
    init: function(){
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var animationFrame = 0;
        var gameOver = false;

        var snake = new entities.Snake();
        var score = 0;
        var foodEaten = 0;
        var level = 1;
        
        // Add food to the screen
        var randX = Math.floor(Math.random() * canvas.width);
        var randY = Math.floor(Math.random() * canvas.height);
        var food = new entities.Food(randX, randY);
        
        var data = {canvas, context, animationFrame, gameOver, snake, score, foodEaten, level, food};

        window.addEventListener('keydown', function(e){ game.handleInput(e, data) });

        game.run(data);
    },

    run: function(data){
        function loop(){
            if (data.gameOver){
                game.gameOver(data);
            }else{
                game.update(data);
                game.render(data);
    
                data.animationFrame++;
    
                window.requestAnimationFrame(loop);
            }
        }

        loop();
    },

    handleInput: function(e, data){
        var snake = data.snake;

        // Updates direction, but doesn't allow snake to double back on itself
        if (e.keyCode === 37 && snake.velX !== 1){
            snake.changeDirection(-1, 0);
        }else if (e.keyCode === 38 && snake.velY !== 1){
            snake.changeDirection(0, -1);
        }else if (e.keyCode === 39 && snake.velX !== -1){
            snake.changeDirection(1, 0);
        }else if (e.keyCode === 40 && snake.velY !== -1){
            snake.changeDirection(0, 1);
        }
    },

    update: function(data){
        let {snake, animationFrame} = data;

        // Every 10 frames increase the users score by 1
        if (animationFrame % 10 === 0){
            data.score++;
        }

        snake.update();
        game.checkForCollision(data);
        
    },

    checkForCollision: function(data){
        let {snake, food, canvas} = data;

        // Within Left/Right Bounds of Food
        if ((snake.x <= food.x && (snake.x + snake.w) >= food.x) || (snake.x <= (food.x+food.w) && (snake.x+snake.w) >= (food.x+food.w))){
            // bottom of snake collision
            if ((snake.y+snake.h) >= food.y && (snake.y+snake.h) <= (food.y+food.h)){
                return game.eatFood(data);
            }
            // top of snake collision
            if (snake.y >= food.y && snake.y <= (food.y+food.h)){
                return game.eatFood(data);
            }
        }
        
        // Wall collision ends game
        if (snake.y < 0 || snake.x < 0 || (snake.y+snake.h) > canvas.height || (snake.x+snake.w) > canvas.width){
            data.gameOver = true;
        }

        // Hitting your own tail ends game

    },

    eatFood(data){
        let {food, score, foodEaten, level} = data;

        // Move food
        var randX = Math.floor(Math.random() * (canvas.width-10));
        var randY = Math.floor(Math.random() * (canvas.height-10));
        data.food.x = randX;
        data.food.y = randY;

        // Add points
        data.score += 100 + (20 * data.level);
        data.foodEaten++;

        // Every 5 food increase the level and the speed (and add a wall)
        if (data.foodEaten % 5 === 0){
            data.level++;
            data.snake.speedMultiplier += 0.2;
            game.addWall(data);
        }

        // Make snake tail longer
        data.snake.tail.push([data.snake.x, data.snake.y]);
    },

    render: function(data){
        let {context, snake, food} = data;

        // Black background
        context.fillStyle = '#000000';
        context.fillRect(0, 0, data.canvas.width, data.canvas.height);

        // white snake and tail
        context.fillStyle = 'white';
        context.fillRect(snake.x, snake.y, snake.w, snake.h);
        snake.tail.forEach( function(pos) {
            context.fillRect(pos[0], pos[1], snake.w, snake.h);
        })

        // white text
        context.font = '24px Arial';
        context.fillText('Score: ' + data.score, 50, 50);
        context.fillText('Level: ' + data.level, 50, 80);

        // Red food
        context.fillStyle = 'red';
        context.fillRect(food.x, food.y, food.w, food.h);
    },

    addWall: function(data){

    },

    gameOver(data){
        let {context, score, level, snake, food} = data;

        // Black background
        context.fillStyle = '#000000';
        context.fillRect(0, 0, data.canvas.width, data.canvas.height);

        // white snake final location
        context.fillStyle = 'white';
        context.fillRect(snake.x, snake.y, snake.w, snake.h);

        // game over text
        context.font = '24px Arial';
        context.fillText('Score: ' + data.score, 50, 50);
        context.fillText('Level: ' + data.level, 50, 80);
        context.font = '42px Arial';
        context.fillText('Game Over', 200, 300);

        // Red Food final location
        context.fillStyle = 'red';
        context.fillRect(food.x, food.y, food.w, food.h);
    },

}

game.init();
