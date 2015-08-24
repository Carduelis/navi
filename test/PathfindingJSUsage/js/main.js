
function drawPath(path) {
	setTimeout(function loop() {
	    var current = path.shift();

	    var point = document.querySelector('.c'+current[0]+current[1])
	    point.classList.add('path')
	    
	    if (path.length)
	        setTimeout(loop, 500);
	}, 500);
}

window.onload = function () {
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
            tizen.application.getCurrentApplication().exit();
    });
    
    var matrix = [
        [0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0]
    ];
    var grid = new PF.Grid(5, 5, matrix);
    
    var finder = new PF.AStarFinder();

    var path = finder.findPath(0, 0, 2, 3, grid);

    console.log(JSON.stringify(path));
    
    drawPath(path);
};
