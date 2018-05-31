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
        var walls = [];
        
        // Add food to the screen
        var randX = Math.floor(Math.random() * (canvas.width/10)) * 10;
        var randY = Math.floor(Math.random() * (canvas.height/10)) * 10;
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
                // Every 2 levels, the speedModulus goes down, and the snake's speed goes up (up to a certain point)
                let speedModulus = 6 - Math.floor(data.level / 2);
                if (speedModulus < 2) speedModulus = 2;

                if (data.animationFrame % speedModulus === 0){
                    game.update(data);
                    game.render(data);
                }
    
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

        if (snake.x === food.x && snake.y === food.y){
            return game.eatFood(data);
        }
        
        // Wall collision ends game
        if (snake.y < 0 || snake.x < 0 || (snake.y+snake.h) > canvas.height || (snake.x+snake.w) > canvas.width){
            return data.gameOver = true;
        }

        // Hitting any piece of your0   tail array ends the game
        snake.tail.forEach( function(pos){
            if (snake.x === pos[0] && snake.y === pos[1]){
                return data.gameOver = true;
            }
        })
    },

    eatFood(data){
        let {food, score, foodEaten, level} = data;

        // Move food
        var randX = Math.floor(Math.random() * (canvas.width/10)) * 10;
        var randY = Math.floor(Math.random() * (canvas.height/10)) * 10;
        data.food.x = randX;
        data.food.y = randY;

        // Add points
        data.score += 100 + (20 * data.level);
        data.foodEaten++;

        // Every 5 food increases the level and adds a wall
        if (data.foodEaten % 5 === 0){
            data.level++;
            game.addWall(data);
        }

        // Make snake tail longer
        data.snake.tail.push([data.snake.oldX, data.snake.oldY]);
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
        let randX = Math.floor(Math.random() * (canvas.width/10)) * 10;
        let randY = Math.floor(Math.random() * (canvas.height/10)) * 10;
        let width, height;
        let coinFlip = Math.random();

        if (coinFlip < 0.5){
            //vertical wall
            width = 10;
            height = Math.floor(Math.random() * 40) * 10;
        }else{
            // horizontal wall
            width = Math.floor(Math.random() * 40) * 10;
            height = 10;
        }

        let newWall = entities.Wall(randX, randY, width, height);
        data.walls.push(newWall);
    },

    gameOver(data){
        game.render(data);

        // game over text
        let context = data.context;
        context.fillStyle = 'white';
        context.font = '42px Arial';
        context.fillText('Game Over', 200, 300);
    },

}

game.init();
