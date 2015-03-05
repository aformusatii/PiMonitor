
(function() {
    var v=window,d=document;

    var onResizeShowSize = function() {
        var w = v.innerWidth ? v.innerWidth :
                d.documentElement.clientWidth,
            h = v.innerHeight ? v.innerHeight : 
                d.documentElement.clientHeight,
            s = d.getElementById('WSzPlgIn'),
            ss;
        if (!s) {
            s = d.createElement('div');
            s.id = 'WSzPlgIn';
            d.body.appendChild(s);
            s.onclick = function() {
                s.parentNode.removeChild(s)
            };
            ss = s.style;
            ss.position = 'fixed';
            ss.bottom = 0;
            ss.right = 0;
            ss.backgroundColor = 'black';
            ss.opacity = '.5';
            ss.color = 'white';
            ss.fontFamily = 'monospace';
            ss.fontSize = '10pt';
            ss.padding = '5px';
            ss.textAlign = 'right';
        }
        s.innerHTML = 'w ' + w + '<br />h ' + h;
    };
    
    v.onresize = onResizeShowSize;
    onResizeShowSize();
})();

var data = null;

google.load('visualization', '1.1', {packages: ['line']});
google.setOnLoadCallback(drawChart);

function drawChart() {

  /* data = new google.visualization.DataTable();
  data.addColumn('number', '');
  data.addColumn('number', 'Day');

  data.addRows([
    [1,  37.8],
    [2,  30.9],
    [3,  30.9],
    [4,  30.9],
    [5,  30.9],
    [6,  40.9],
    [7,  37.8],
    [8,  30.9],
    [9,  30.9],
    [10,  30.9],
    [11,  30.9],
    [12,  50.9],
  ]); */
  
  var data = google.visualization.arrayToDataTable([
      ['V1', 'L'],
      ['1', 10],
      ['2', 20],
      ['3', 10],
  ]);  

  var options = {
    legend: {position: 'right', textStyle: {fontSize: 7}},
    width: 290,
    height: 155
  };

  var chart = new google.charts.Line(document.getElementById('linechart_material'));

  chart.draw(data, options);
}

window.setTimeout(function() {
},3000)