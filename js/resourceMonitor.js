function traverseItems(items, itemHandler) {
    for (var prop in items) {
        if (!items.hasOwnProperty(prop)) {
            continue;
        }
        
        itemHandler(items[prop], prop);
    }
}

var ResourceMonitor = (function () {
	var refreshInterval = 1000;
	var monitorCallback = function() {};
	var procStatUrl = '';
	
	var lastCpuStat = null;
	
	var register = function(config) {
		monitorCallback = config.monitorCallback;
		procStatUrl = config.procStatUrl;
		refreshInterval = config.refreshInterval;
		
		scheduleResourceStatQuery();
	}
	
	var scheduleResourceStatQuery = function() {
		window.setTimeout(getResourceStatus, refreshInterval);
	}
	
	var getResourceStatus = function() {
	    $.ajax({
	        dataType: 'jsonp',
	        url: procStatUrl,
	        jsonpCallback: 'pushResourceStat',
	        success: function (resourceStatAll) {
	        	var resourceStatArray = resourceStatAll.split(';');
	        	var temperatureStat = resourceStatArray[0];
	        	var memoryStat = resourceStatArray[1];
	        	var cpuStat = resourceStatArray[2];
	        	
	        	var currentCpuStat = parseCPUInfo(cpuStat);
	        	
	        	var resourceStat = {};
	        	
	        	if (lastCpuStat == null) {
	        		resourceStat.cpuStat = null;
	        	} else {
	        		resourceStat.cpuStat = subtractCpuInfo(lastCpuStat, currentCpuStat);
	        	}
	        	
        		lastCpuStat = currentCpuStat;
	        	
	        	monitorCallback(resourceStat);
	        	
	        	scheduleResourceStatQuery();
	        }
	    });
	}

	var parseCPUInfo = function(cpuData) {
	    var cpuLines = $.trim(cpuData).split('|');
	    var cpuInfo = {};

	    for (var i = 0; i < cpuLines.length; i++) {
	        var cpuLine = cpuLines[i];
	        if (cpuLine.indexOf('cpu') === 0) {
	            var cpuParams = cpuLine.replace('  ', ' ').split(' ');
	            var propIndex = 1;
	            var cpu = {};
	            cpuInfo[cpuParams[0]] = cpu; // cpu name
	            cpu.user = parseInt(cpuParams[propIndex++]);
	            cpu.nice = parseInt(cpuParams[propIndex++]);
	            cpu.system = parseInt(cpuParams[propIndex++]);
	            cpu.idle = parseInt(cpuParams[propIndex++]);
	            cpu.iowait = parseInt(cpuParams[propIndex++]);
	            cpu.irq = parseInt(cpuParams[propIndex++]);
	            cpu.softirq = parseInt(cpuParams[propIndex++]);
	            cpu.steal = parseInt(cpuParams[propIndex++]);
	            cpu.guest = parseInt(cpuParams[propIndex++]);
	            cpu.guest_nice = parseInt(cpuParams[propIndex++]);
	        }
	    }    

	    return cpuInfo;
	}

	var subtractCpuInfo = function(cpuInfo1, cpuInfo2) {
	    var cpuInfo = {};
	    var index = 0;
	    
	    for (var cpuInfoProp in cpuInfo1) {
	        if (!cpuInfo1.hasOwnProperty(cpuInfoProp)) {
	            continue;
	        }
	        var cpu1 = cpuInfo1[cpuInfoProp];
	        var cpu2 = cpuInfo2[cpuInfoProp];
	        var cpu = {index: index++};
	        
	        cpuInfo[cpuInfoProp] = cpu;
	        
	        for (var cpuProp in cpu1) {
	            if (!cpu1.hasOwnProperty(cpuProp)) {
	                continue;
	            }
	            cpu[cpuProp] = cpu2[cpuProp] - cpu1[cpuProp];
	        }
	        
	        cpu.active = cpu.user 
	                   + cpu.nice 
	                   + cpu.system 
	                   + cpu.iowait
	                   + cpu.irq
	                   + cpu.softirq
	                   + cpu.steal
	                   + cpu.guest
	                   + cpu.guest_nice;
	        cpu.total = cpu.active + cpu.idle;
	        cpu.usage = (cpu.active * 100) / cpu.total;
	    }     
	    
	    return cpuInfo;
	}
	
	return {
		register: register
	};
})();