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

    // adjusted height, width and borderwidth to make it look like a paddle
    var myRectangle = {
        x: 10,
        y: 75,
        width: 20,
        height:100,
        borderWidth: 1
    };
    var myRectangle02 = {
        x: 450,
        y: 75,
        width: 20,
        height:100,
        borderWidth: 1
    };
  
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    function movePaddle(someRectangle, canvas, context,newPosition) {
        // console.log("I am starting the animation. the newPosition is " +newPosition);
        var currentRectangleY = someRectangle.y;
        var newY = currentRectangleY + newPosition;

        someRectangle.y = newY;
        // console.log("I have set the position of the paddle to be at " +someRectangle.y);

        // erase the canvas, including the drawing of the rectangle
        context.clearRect(0, 0, canvas.width, canvas.height);
        // console.log("I have erased the canvas");

        // console.log("Now I am going to redraw BOTH RECTANGLES/paddle with its new y.");
    }

    // function that responds to keyPresses
    function onKeyDown(event){
        // event can be called e if you like
        console.log("onKeyDown event handler is fired");
        switch (event.keyCode){
            case 65:
                console.log("a");
                movePaddle(myRectangle,canvas,context,-10);
                break;
            case 90:
                console.log("z");
                movePaddle(myRectangle,canvas,context,10);
                break;
            case 38:
                console.log("up");
                movePaddle(myRectangle02,canvas,context,-10);
                break;
            case 40:
                console.log("down");
                movePaddle(myRectangle02,canvas,context,10);
                break;
            default:
                console.log("you pressed " + event.keyCode);
                break;
        }
    }
    
    // listen for keypresses
    document.addEventListener("keydown",onKeyDown);