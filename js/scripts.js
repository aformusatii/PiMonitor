$(function () {
	var $graphContainer = $('.cpus .graph-container');
	var $canvas = $('#canvas');
	$canvas.height($graphContainer.height());
	$canvas.width($graphContainer.width());
	
	var canvas = $canvas.get(0);
	var ctx = canvas.getContext("2d");
	
	ctx.lineWidth = 1;	
	ctx.translate(0.5, 0.5);
	 
	var w = ctx.canvas.width;
	var h = ctx.canvas.height;
 
	 ctx.beginPath();
	 
	 ctx.clearRect(0, 0, w, h);
	 
	 ctx.strokeStyle = "#BED2D9";
	 
	 drawLine(ctx, 0, h - 100, (canvas.width - 2), h - 100);
	 drawLine(ctx, 0, h - 75, (canvas.width - 2), h - 75);
	 drawLine(ctx, 0, h - 50, (canvas.width - 2), h - 50);
	 drawLine(ctx, 0, h - 25, (canvas.width - 2), h - 25);
	 drawLine(ctx, 0, h - 5, (canvas.width - 2), h - 5);
 
	 ctx.stroke();
	 ctx.closePath();
	
	 ctx.beginPath();
	 
	 for (i = 0; i < w - 2; i++) {
		 var grad = ctx.createLinearGradient(i, h - 100, i, h);
		 grad.addColorStop(0, "#ff0000");
		 grad.addColorStop(1, "#00e535");
		 ctx.strokeStyle = grad;
		 drawLine(ctx, i, h - getRandomArbitrary(0, 100), i, h);
	 }
	 
	 ctx.stroke();
	 ctx.closePath();
	 
	 ctx.beginPath();

	 ctx.font="9px Noto Sans";
	 ctx.fillStyle = '#000';
	 ctx.fillText("100", 2, h - 102);
	 ctx.fillText("75", 2, h - 77);
	 ctx.fillText("50", 2, h - 52);
	 ctx.fillText("25", 2, h - 27);
	 ctx.fillText("5", 2, h - 7);
	 
	 ctx.stroke();
	 ctx.closePath();
});

function drawLine(ctx, x1, y1, x2, y2) {
	 ctx.moveTo(x1, y1);    
	 ctx.lineTo(x2, y2);  // X axis	
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
