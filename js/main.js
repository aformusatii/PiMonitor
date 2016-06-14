$(function () {
	CpuGraph.init();
	CpuGraph.drawData(); 
	
	MemChart.init();
	
	TaskManager.init();
	
	ResourceMonitor.register({
		refreshInterval: 1000,
		procStatUrl: 'http://192.168.1.120/cgi-bin/resource_stat',
		monitorCallback: function(resourceStat) {
			//console.log(JSON.stringify(resourceStat, null, 4));
			
			if (resourceStat.cpuStat != null) {
				traverseItems(resourceStat.cpuStat, function(cpuStat) {
					if (cpuStat.index == 0) {
						CpuGraph.pushData(Math.round(cpuStat.usage), resourceStat.temperatureInfo);
					} else {
						$('#cpu' + cpuStat.index + ' .usage span').html(Math.round(cpuStat.usage) + '%');
						$('#cpu' + cpuStat.index + ' .cover').css('height', (100 - cpuStat.usage) + '%');
					}

					CpuGraph.drawData();
					MemChart.drawChart(resourceStat.memInfo);
				});
			}
		}
	});
	 
});