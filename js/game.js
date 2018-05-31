var game = {
    init: function(){
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var animationFrame = 0;

        var snake = new entities.Snake();
        var score = 0;
        
        // Add food to the screen
        var randX = Math.floor(Math.random() * canvas.width);
        var randY = Math.floor(Math.random() * canvas.height);
        var food = new entities.Food(randX, randY);
        
        var data = {canvas, context, animationFrame, snake, score, food};

        window.addEventListener('keyup', function(e){ game.handleInput(e, data) });

        game.run(data);
    },

    run: function(data){
        function loop(){
            game.update(data);
            game.render(data);

            data.animationFrame++;

            window.requestAnimationFrame(loop);
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
        let {snake, food} = data;
        // left side
        if (snake.x < food.x && (snake.x + snake.w) > food.x){
            // top left
            if ((snake.y+snake.h) > food.y && (snake.y+snake.h) < (food.y+food.h)){
                game.eatFood(data);
            }
            // bottom left
            if (snake.y > food.y && snake.y < (food.y+food.h)){
                game.eatFood(data);
            }
        }
        // right side
        if (snake.x < (food.x+food.w) && (snake.x+snake.w) > (food.x+food.w)){
            // top left
            if ((snake.y+snake.h) > food.y && (snake.y+snake.h) < (food.y+food.h)){
                game.eatFood(data);
            }
            // bottom left
            if (snake.y > food.y && snake.y < (food.y+food.h)){
                game.eatFood(data);
            }
        }
    },

    eatFood(data){
        // Move food
        var randX = Math.floor(Math.random() * canvas.width);
        var randY = Math.floor(Math.random() * canvas.height);
        data.food.x = randX;
        data.food.y = randY;

        // Add points
        data.score += 1000;

        // Make snake longer

    },

    render: function(data){
        let {context, snake, food} = data;

        context.fillStyle = '#000000';
        context.fillRect(0, 0, data.canvas.width, data.canvas.height);
        context.fillStyle = 'white';
        context.fillRect(snake.x, snake.y, snake.w, snake.h);
        context.fillStyle = 'red';
        context.fillRect(food.x, food.y, food.w, food.h);
    },

}

game.init();
