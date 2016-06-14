#!/usr/local/bin/node
var url = require('url');
var tasksToMonitor = require('../js/tasksToMonitor.js');
var exec = require('child_process').exec;

var queryData = url.parse('dummy?' + process.env.QUERY_STRING, true).query;

//===========================================================================
console.log('Cache-Control: no-cache, no-store, must-revalidate');
console.log('Pragma: no-cache');
console.log('Expires: 0');
console.log('Content-Type: text/javascript\n');
//===========================================================================
var task = tasksToMonitor.tasks[queryData.procId];

process.stdout.write('taskAction("');

exec(task[queryData.action], function(error, stdout, stderr) {
  // command output is in stdout
  process.stdout.write(stdout.replace(/\s/g, ''));
  process.stdout.write(stderr.replace(/\s/g, ''));
  process.stdout.write('");');
});
