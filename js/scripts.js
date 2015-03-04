
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
            ss.position = 'absolute';
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
})()