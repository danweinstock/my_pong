class Court{
	let width = 0;
	let height = 0;

	constructor(width,height,court){
		this.width = width;
		this.height = height;
		court.context.clearRect(0,0,this.width,this.height);
	}
	let pongCourt = new Court (512,256,court)
} 
module.exports {Court}