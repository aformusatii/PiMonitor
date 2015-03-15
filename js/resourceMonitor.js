/*

ResourceMonitor.register({
	refreshInterval: 1000,
	refreshCallback: function(resources) {
		resources.cpu.cpu
		resources.cpu.cpu1
		resources.cpu.cpu2
		resources.cpu.cpu3
		resources.cpu.cpu4
		resources.ram.free
		resources.temperature
	}
});

 * */

var ResourceMonitor = function () {
	var refreshInterval = 1000;
	var monitorCallback = function() {};
	var procStatUrl = '';
	
	var register = function(config) {
		monitorCallback = config.monitorCallback;
		procStatUrl = conf.procStatUrl;
		
		window.setTimeout(function () {
			
			
			
		}, config.refreshInterval);
	}
	
	$(function () {
	    getProcStatAjax(function (procStatInfo1) {
	        window.setTimeout(function () {
	            getProcStatAjax(function (procStatInfo2) {
	                var procStatInfo1Data = procStatInfo1.split(';');
	                var procStatInfo2Data = procStatInfo2.split(';');
	                
	                var cpuInfo1 = parseCPUInfo(procStatInfo1Data[2]);
	                var cpuInfo2 = parseCPUInfo(procStatInfo2Data[2]);
	                var cpuInfo = subtractCpuInfo(cpuInfo1, cpuInfo2);
	        
	                $('#output').val(JSON.stringify(cpuInfo, null, 4));
	                $('#output2').val(procStatInfo1Data[0] + procStatInfo2Data[0]);
	                
	            });
	        }, 1000);
	    });
	});

	var getProcStatAjax = function(procStatCallback) {
	    $.ajax({
	        dataType: 'jsonp',
	        url: procStatUrl,
	        jsonpCallback: 'getProcStat',
	        success: procStatCallback
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
	    
	    for (var cpuInfoProp in cpuInfo1) {
	        if (!cpuInfo1.hasOwnProperty(cpuInfoProp)) {
	            continue;
	        }
	        var cpu1 = cpuInfo1[cpuInfoProp];
	        var cpu2 = cpuInfo2[cpuInfoProp];
	        var cpu = {};
	        
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
};