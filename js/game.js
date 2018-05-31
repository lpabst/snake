var game = {
    init: function(){
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var snake = new entities.Snake();
        var animationFrame = 0;

        var data = {canvas, context, snake, animationFrame};

        window.addEventListener('keyup', function(e){ game.handleInput(e, data) });

        game.run(data);
    },

    run: function(data){
        function loop(){
            // game.input(data);
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
        data.snake.update();
    },

    render: function(data){
        var ctx = data.context;
        var snake = data.snake;

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, data.canvas.width, data.canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(snake.x, snake.y, snake.w, snake.h);
    },
}

game.init();
