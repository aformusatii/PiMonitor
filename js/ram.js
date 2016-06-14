var MemChart = (function() {
	
	var chart;

  var options = {
    is3D: false,
    legend: 'none',
    tooltip: { trigger: 'none' },
    chartArea: {
  	  left:0,
  	  top:10, 
  	  width: '100%', 
  	  height: '80%'
    },
    legend: {'position': 'bottom'},
    pieSliceText: 'value'
  };
	
	var init = function() {
		google.load("visualization", "1", {packages:["corechart"]});
		chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
	};
	
  google.load("visualization", "1", {packages:["corechart"]});
  google.setOnLoadCallback(drawChart);
      
  var drawChart = function(memInfo) {
  	console.log(memInfo['MemFree']);
  	var usedMem = memInfo['MemTotal'] - (memInfo['Buffers'] + memInfo['Cached'] + memInfo['MemFree']);
      var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Used',      usedMem],
        ['MemFree',   memInfo['MemFree']],
        ['Buffers',   memInfo['Buffers']],
        ['Cached',    memInfo['Cached']],
      ]);
      chart.draw(data, options);
  };
	
	return {
		init: init,
		drawChart: drawChart
	};
	
})();