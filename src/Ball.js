class Ball{
	constructor(x,y){
		this.x = x || 200;
		this.y = y || 150;
		this.color = color || "#fff";
		this.radius = 5;
	}
}
let ballOne = new Ball ( 200,150, #fff);
context.arc(x, y, radius, 0, Math.PI*2, true);
function moveBall(){
	var x = 512;
	var y = 256;
	var currentx = this.ball.x;
	var currenty = this.ball.y;
	var dx = Math.round(Math.random()*5)+1;
	var dy = Math.round(Math.random()*5)+1;
	this.ball.x = currentx + dx;
	this.ball.y = currenty + dy;  
}
setInterval(moveBall,3000);
// export function moveBall