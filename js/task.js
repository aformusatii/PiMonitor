var TaskManager = (function() {
    var refreshInterval = 2000;
    var tasks = [];
    var trTemplate;
    
	var init = function() {
		tasks = TasksToMonitor.tasks;
		trTemplate = $('#taskTable tbody tr').clone();
		
        getTaskStatus();
        drawElements();
	};
	
	var drawElements = function() {
		$('#taskTable tbody').html('');
	    traverseItems(tasks, function(task) {
	    	var newTrElem = $(trTemplate).clone();
	    	
	    	var elements = newTrElem.find('td.p_name abbr');
	    	$(elements.get(0)).html(task.name);
	    	
	    	newTrElem.appendTo('#taskTable tbody');
	    	
	    	newTrElem.find('span.p_start').click(function() {
			    $.ajax({
			        dataType: 'jsonp',
			        url: 'http://192.168.1.120/cgi-bin/node.js?procId=' + task.id + '&action=start',
			        jsonpCallback: 'taskAction',
			        success: function (result) {
			        	console.log(result);
			        }
			    });
	    	});
	    	
	    	newTrElem.find('span.p_stop').click(function() {
			    $.ajax({
			        dataType: 'jsonp',
			        url: 'http://192.168.1.120/cgi-bin/node.js?procId=' + task.id + '&action=stop',
			        jsonpCallback: 'taskAction',
			        success: function (result) {
			        	console.log(result);
			        }
			    });
	    	});
	    	
	    	task.htmElem = newTrElem;
	    });	
	};
	
	var register = function(task) {
	    tasks.push(task);
	};
	
	var scheduleTaskStatQuery = function() {
		window.setTimeout(getTaskStatus, refreshInterval);
	}
	
	var getTaskStatus = function() {
	    var taskToFind = 'dummyNone';
	    
	    traverseItems(tasks, function(item) {
	        taskToFind += ',' + item.procName;
	    });
	    
	    $.ajax({
	        dataType: 'jsonp',
	        url: 'http://192.168.1.120/cgi-bin/find_proc?p=' + taskToFind,
	        jsonpCallback: 'pushTaskStat',
	        success: function (taskState) {
                
                var runningTasks = {};
                
			    traverseItems(taskState, function(taskState) {
			    	//console.log(taskState.proc);
			    	var oldValue = runningTasks[taskState.procName];
			    	if (oldValue) {
			    		runningTasks[taskState.procName] = oldValue + '\n' + taskState.procPath;
			    	} else {
			    		runningTasks[taskState.procName] = taskState.procPath;
			    	}
			    });
                
			    traverseItems(tasks, function(task) {
			    	//console.log(task.procName + '->' + runningTasks[task.procName]);
			    	if (runningTasks[task.procName]) {
			    		$(task.htmElem).find('td.p_status').html('RUNNING');
			    		$(task.htmElem).find('td.p_name abbr').attr('title', runningTasks[task.procName]);
			    	} else {
			    		$(task.htmElem).find('td.p_status').html('STOPPED');
			    		$(task.htmElem).find('td.p_name abbr').attr('title', 'none');
			    	}
			    });
                
                scheduleTaskStatQuery();
	        }
	    });
	}

    
	return {
		init: init,
		register: register
	};
	
})();