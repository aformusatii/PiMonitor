// tasksToMonitor.js
// ========
var TasksToMonitor = {
  tasks: [
    {
        id: 0,
        name: "Cloud 9",
        procName: "server.js",
        start: "/home/pi/c9sdk/start.sh",
        stop: "",
        log: ""
    },
    {
        id: 1,
        name: "Motion",
        procName: "motion",
        start: "sudo service motion start",
        stop: "sudo service motion stop",
        log: ""
    },
    {
        id: 2,
        name: "Transmitter",
        procName: "transmitter",
        start: "",
        stop: "",
        log: ""
    },
    {
        id: 3,
        name: "MySql",
        procName: "sql",
        start: "sudo who",
        stop: "who",
        log: ""
    }
  ]
};

// used by nodeJS
module.exports = TasksToMonitor;
