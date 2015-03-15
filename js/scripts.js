$(function () {
	CpuGraph.init();
	CpuGraph.drawData(); 
	
	ResourceMonitor.register({
		refreshInterval: 1000,
		procStatUrl: 'http://192.168.1.120/cgi-bin/resource_stat',
		monitorCallback: function(resourceStat) {
			//console.log(JSON.stringify(resourceStat, null, 4));
			
			if (resourceStat.cpuStat != null) {
				traverseItems(resourceStat.cpuStat, function(cpuStat) {
					if (cpuStat.index == 0) {
						CpuGraph.pushData(Math.round(cpuStat.usage));
					} else {
						$('#cpu' + cpuStat.index + ' .usage span').html(Math.round(cpuStat.usage) + '%');
						$('#cpu' + cpuStat.index + ' .cover').css('height', (100 - cpuStat.usage) + '%');
					}
					CpuGraph.drawData();
				});
			}
			

		}
	});
	 
});

var CpuGraph = (function() {
	var canvas;
	var ctx;
	var w;
	var h;
	var graphData = [];
	var graphDataIndex = 0;
	
	var init = function() {
		var $graphContainer = $('.cpus .graph-container');
		var $canvas = $('#canvas');
		
		$canvas.height($graphContainer.height());
		$canvas.width($graphContainer.width());
		
		canvas = $canvas.get(0);
		ctx = canvas.getContext("2d");
		
		ctx.lineWidth = 1;	
		ctx.translate(0.5, 0.5);
		 
		w = ctx.canvas.width;
		h = ctx.canvas.height;
	};
	
	var drawData = function() {
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
		var cpuUsage = 0;
		for (i = 0; i < w - 2; i++) {
			var grad = ctx.createLinearGradient(i, h - 100, i, h);
			grad.addColorStop(0, "#ff0000");
			grad.addColorStop(1, "#00e535");
			ctx.strokeStyle = grad;
			
			cpuUsage = graphData[i];
			if ((typeof cpuUsage) !== 'undefined') {
				//var relativeCpuUsage = (cpuUsage * (h - 10)) / 100;
				drawLine(ctx, i, h - cpuUsage, i, h);				
			}
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
		
		ctx.beginPath();
		
		ctx.font="16px Noto Sans";
		ctx.fillStyle = '#000';
		
		if ((typeof cpuUsage) !== 'undefined') {
			ctx.fillText('TOTAL CPU USAGE ' + cpuUsage + '%', 2, 20);
		} else {
			ctx.fillText('Loading...', 2, 20);
		}
		 
		ctx.stroke();
		ctx.closePath();
	};
	
	var drawLine = function(ctx, x1, y1, x2, y2) {
		 ctx.moveTo(x1, y1);    
		 ctx.lineTo(x2, y2);  // X axis	
	};
	
	var pushData = function(value) {
		for (var i = 0; i < (graphData.length - 1); i++) {
			graphData[i] = graphData[i + 1];
		}
		
		graphData[w - 3] = value;
	}
	
	return {
		init: init,
		pushData: pushData,
		drawData: drawData
	};
})();

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function traverseItems(items, itemHandler) {
    for (var prop in items) {
        if (!items.hasOwnProperty(prop)) {
            continue;
        }
        
        itemHandler(items[prop], prop);
    }
}