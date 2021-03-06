    /*
     * requestAnimFrame is a property of window.
     * It actually is a function.
     * It takes a function as its argument
     * The function will be called every time the window/browser 'refreshes'
     * (think like an old school TV screen a particular frame of a movie)
     * each frame is shown at frame rate relevant for that browser
     * but instead of a new "frame" argument that is the function
     * "renders" a new frame, i.e. drawing a new rectangle or whatever.
     * */
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
    })();

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    // centreX and centreY are the initial coordinates of the ball
    // wrt the centre of the ball.
    var myPongBall = {
        centreX: (canvas.width / 2),
        centreY: (canvas.height  / 2),
        ballRadius:10,
        borderWidth: 2
    };
    var myRectangle = {
        x: 10,
        y: 75,//old value is 75
        width: 20,
        height:100,//old value is 100
        borderWidth: 1
    };
    var myRectangle02 = {
        x: 770,
        y: 0, // old value is 75
        width: 20,
        height:1000, //old value is 100
        borderWidth: 1
    };

    function drawCourtEdge(context){
        context.beginPath(); //begins drawing the court
        context.strokeStyle = 'green';//sets the colour of the edge
        context.strokeRect(0,0,canvas.width,canvas.height); //completes the stroke

    }

    function drawPongBall(myPongBall, context) {
        context.beginPath();
        context.arc(myPongBall.centreX, myPongBall.centreY,
                myPongBall.ballRadius, 0, 2 * Math.PI); // in the arc method, we specify (x, y, r, startAngle, endAngle)
        context.fillStyle = '#8ED6FF';
        context.fill();
        context.lineWidth = myPongBall.borderWidth;
        context.strokeStyle = 'black';
        context.stroke();
    }

    function drawRectangle(myRectangle, context) {
        //console.log("I am drawing the rectangle");
        context.beginPath();
        context.rect(myRectangle.x, myRectangle.y,
                myRectangle.width, myRectangle.height);
        context.fillStyle = '#8ED6FF';
        context.fill();
        context.lineWidth = myRectangle.borderWidth;
        context.strokeStyle = 'black';
        context.stroke();
    }

    drawRectangle(myRectangle, context);
    drawRectangle(myRectangle02,context);
    drawPongBall(myPongBall, context);

    var directionX = 1; // 1 is positive (to the right), -1 is to the left
    var directionY = 1;
    var speedX = 5; // set the ball's initial speed
    var speedY = 4;
    var pongBallX = myPongBall.centreX; // set the ball's initial x position;
    var pongBallY = myPongBall.centreY; // set the ball's initial y position;

    function animate(myPongBall, canvas, context) {
        //console.log("The animate method is refreshing the 'screen'.");
        // check if the ball hits the left or right edge
        checkIfBallHitsLeftOrRightEdge(myPongBall.centreX,myPongBall.centreY);
        // check if ball hits the bottom or top edge
        checkIfBallHitsTopOrBottomEdge(myPongBall.centreX,myPongBall.centreY);

        checkIfBallHitsLeftPaddle(myPongBall, myRectangle);
        checkIfBallHitsRightPaddle(myPongBall, myRectangle02);
        // set the x-coordinate of the pong ball
        pongBallX = pongBallX + (speedX*directionX);
        myPongBall.centreX = pongBallX;
        // set the y-coordinate of the pong ball
        pongBallY = pongBallY + (speedY*directionY);
        myPongBall.centreY= pongBallY;
        // set the x-coordinate of paddle 1

        //set the x-coordinate of paddle 2
        // erase the canvas, including the drawing of the pong ball
        context.clearRect(0, 0, canvas.width, canvas.height);

        // redraw the pong ball at the new position
        drawPongBall(myPongBall, context);
        drawRectangle(myRectangle, context);
        drawRectangle(myRectangle02,context);

        // request new frame
        var callBack = function() {
            animate(myPongBall, canvas, context );
        };
        requestAnimFrame(callBack);
    }
    function checkIfBallHitsLeftOrRightEdge(currentX,currentY){
        //console.log("checking for left/right edge collision.");
        // how dow we check for collision?
        // TODO: with a paddle
        // with a border
        var rightEdge = canvas.width;
        var leftEdge = 0;
        //console.log("the currentX of target is " + currentX);

        // add compensation for pong ball's radius
        if (directionX==1){
            currentX = currentX + myPongBall.ballRadius;
        }else{
            currentX = currentX - myPongBall.ballRadius;
        }

        var ballHitsRightEdge = (currentX>=rightEdge);
        var ballHitsLeftEdge = (currentX<=leftEdge);

        if(ballHitsLeftEdge || ballHitsRightEdge){
            directionX = -directionX;
        }
    }


    function checkIfBallHitsTopOrBottomEdge (currentyX,currentY) {
        var bottomEdge = canvas.height;
        var topEdge = 0;

        if(directionY == 1){
            currentY = currentY + myPongBall.ballRadius;
        } else {
            currentY = currentY - myPongBall.ballRadius;
        }
        var ballHitsBottomEdge = (currentY>=bottomEdge);
        var ballHitsTopEdge= (currentY<=topEdge);

        if (ballHitsBottomEdge || ballHitsTopEdge) {
            //console.log("vertical collision detected");
            directionY= -directionY;
        }
    }

    function checkIfBallHitsLeftPaddle () {
        var topOfBall = myPongBall.centreY - myPongBall.ballRadius;
        var bottomOfBall = myPongBall.centreY + myPongBall.ballRadius;
        var topOfPaddle = myRectangle.y;
        var bottomOfPaddle = myRectangle.y + myRectangle.height;
        if ((myPongBall.centreX - myPongBall.ballRadius) == (myRectangle.x + 20)) {
            console.log(bottomOfBall, topOfBall);
            if ((topOfPaddle < topOfBall) && (bottomOfBall < bottomOfPaddle)) {
                directionX = -directionX;
                console.log('it registers paddle');
            }
        }
    }
    function checkIfBallHitsRightPaddle(){
    		var topOfBall = myPongBall.centreY - myPongBall.ballRadius;
        var bottomOfBall = myPongBall.centreY + myPongBall.ballRadius;
        var topOfPaddle = myRectangle02.y;
        var bottomOfPaddle = myRectangle02.y + myRectangle02.height;
        if ((myPongBall.centreX - myPongBall.ballRadius) == (myRectangle02.x + 20)){
        	console.log("right hit")
        }
    }
    function movePaddle(someRectangle, canvas, context,newPosition) {
        //console.log("I am starting the animation. the newPosition is " +newPosition);
        var currentRectangleY = someRectangle.y;
        var newY = currentRectangleY + newPosition;

        someRectangle.y = newY;
       // console.log("I have set the position of the paddle to be at " +someRectangle.y);

        // erase the canvas, including the drawing of the rectangle
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawRectangle(myRectangle, context);
        drawRectangle(myRectangle02,context);
    }

    function onKeyDown(event){
        // event can be called e if you like
        //console.log("onKeyDown event handler is fired");

        switch (event.keyCode){
            case 65:
               // console.log("a");
                    if (myRectangle.y > 0) {
                        movePaddle(myRectangle, canvas, context, -20);
                    }
                break;
            case 90:
               // console.log("z");
                    if (myRectangle.y < 280) {
                        movePaddle(myRectangle, canvas, context, 20);
                    }
                break;
            case 38:
               // console.log("up");
                    if(myRectangle02.y > 0) {
                        movePaddle(myRectangle02, canvas, context, -20);
                    }
                break;
            case 40:
                //console.log("down");
                    if(myRectangle02.y < 280) {
                        movePaddle(myRectangle02, canvas, context, 20);
                    }
                break;
        }
    }
    setTimeout(animate, 1000,myPongBall,canvas,context);
    document.addEventListener("keydown",onKeyDown);