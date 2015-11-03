
var startPoint = {
  x: 14,
  y: 0
} 

var endPoint = {
  x: 14,
  y: 36
}

function inPoly(x,y){
  npol = xp.length;
  j = npol - 1;
  var c = 0;
  for (i = 0; i < npol;i++){
      if ((((yp[i]<=y) && (y<yp[j])) || ((yp[j]<=y) && (y<yp[i]))) &&
      (x > (xp[j] - xp[i]) * (y - yp[i]) / (yp[j] - yp[i]) + xp[i])) {
       c = !c
       }
       j = i;
  }
  if (c === true) {
    return 1;
  } else if (c === false) {
    return 0;
  } else {
    return 0;
  }
}
var   xMin = 0,
  xMax = 0,
  yMin = 0,
  yMax = 0;

var coordinates = [[]];

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}
function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}



//------ path
function getCoordinates(element) {

  var tagName = element.get(0).tagName.toLowerCase();
  var a = [];
  var points = [];
  var pointsX = [];
  var pointsY = [];
  //console.log(tagName);
  if (tagName == 'polygon') {
    points = element.attr('points').split(' ');
    ////console.log(points);
    for (var i = points.length - 1; i >= 0; i--) {
      points[i] = points[i].split(',');
      pointsX[i] = parseInt(points[i][0])
      pointsY[i] = parseInt(points[i][1])
    };
  } else if (tagName == 'rect') {
    pointsX[0] = parseInt($(this).attr('x'));
    pointsX[1] = parseInt($(this).attr('x')) + parseInt($(this).attr('width'));
    pointsY[0] = parseInt($(this).attr('y'));
    pointsY[1] = parseInt($(this).attr('y')) + parseInt($(this).attr('height'));
  } else if (tagName == 'path') {

  } else {
    //console.log('this is not coord-tag')
  }
    xMin = getMinOfArray(pointsX);
    xMax = getMaxOfArray(pointsX);
    yMin = getMinOfArray(pointsY);
    yMax = getMaxOfArray(pointsY);
    xp = pointsX;
    yp = pointsY;

    //console.log("xMin: "+xMin+" . xMax: "+xMax+" . yMin: "+yMin+" . yMax: "+yMax+" . ");
    //console.log(pointsX);
    //console.log(pointsY);
    x = xMin;
    y = yMin;
    
    for (var i = yMax; i>= 0; i--) {
      coordinates[i] = [];
      
      for (var j = xMax; j>=0; j--) {
        coordinates[i][j] = 0;
      }
    }


    for (var i = yMax; i >= yMin; i--) {
        y = i;
        //coordinates[i] = [];
        
        for (var j = xMax; j >= xMin; j--) {
            x = j;
            coordinates[i][j] = inPoly(x,y);
            //a[i][j] = coordinates[i][j];
            //coordinates[i].length = j;
            //coordinates[j].length = i;
           // coordinates[j][i] = a[i][j];

        };
    };
    return coordinates
}



 


$(document).ready(function(){
  getCoordinates($('#Walkable'));

 
  // coordinates.splice(0,yMin);
  // for (var i = coordinates.length - 1; i >= 0; i--) {
  //   coordinates[i].splice(0,xMin);
  // };
 

  //DrawSvg(pathArray);


  // console.info(coordinates.length)
  // for (var i = grid.nodes.length - 1; i >= 0; i--) {
  //     //console.log(coordinates[i]);
  //   for (var j = grid.nodes[0].length - 1; j >= 0; j--) {
  //     ////console.log(grid.nodes[i][j]);
  //     //console.info(coordinates);
  //   //  //console.log(coordinates.length);
  // // 450 25 20
  // //    grid.setWalkableAt(i,j ,coordinates[i][j]);
  //   };
  // };
   var containerA2  = $('.tab-view[data-corpus="a"][data-level="2"]');
  containerA2.append('<pre>');
  containerA2.find('pre').text(coordinates.join('\n') + '\n\n');

});

 // //console.log(coordinates.join('\n') + '\n\n');
 // 



//coordinates = [
//    [0, 0, 0, 0, 0],
//     [1, 0, 1, 0, 1],
//     [0, 0, 1, 0, 0],
//     [0, 1, 0, 1, 0],
//     [0, 0, 0, 0, 0]
// ];
//matrix1 = coordinates;
//var sampleGrid = new PF.Grid(matrix);
// //console.log(sampleGrid);

var gridTest;

function setWalkable(grid) {

}


var coordTest;
pathArray = [];
newPath = [];
function calculatePathArray(array) {

// for (var i = array.length - 1; i >= 0; i--) {
//   exX = array[i][0];
//   exY = array[i][1];
//   array[i][0] = exY;
//   array[i][1] = exX;
// }
  var grid = new PF.Grid(array[0].length, array.length);

  var sampleFinder = new PF.BestFirstFinder();
  //var grid = new PF.Grid(5, 5, matrix);
  gridTest = grid;
  coordTest = array;
  ////console.log(array);
  for (var y = array.length - 1; y >= 1; y--) { // height // y
    for (var x = array[0].length - 1; x >= 0; x--) { // width // x
      //console.info(array[i][j]);
      if (coordinates[y-1][x] == 0) {
        grid.setWalkableAt(x,y,false)
        //console.info('unwalkable');
      }
    };
  };
  gridTest = grid;
  // for(var i = 0; i < grid.nodes.length; i++) {
  //   for (var j = 0; j < grid.nodes[0].length; j++) {
  //     //console.log(coordinates[i][j]);
  //     if (coordinates[i][j] == 0) {
  //       grid.setWalkableAt(i,j ,false)
  //     } else  if (coordinates[i][j] == 1) {
  //       grid.setWalkableAt(i,j ,true)
  //     }
  //   }
  // }
 // pathArray = sampleFinder.findPath(14, 0, 14, 36, grid);

  pathArray = sampleFinder.findPath(startPoint.x, startPoint.y, endPoint.x, endPoint.y, grid);
  newPath = PF.Util.smoothenPath(grid, pathArray);
  //console.log(newPath);
  //console.log(pathArray);
  return pathArray 
}
//var path = finder.findPath(20, 5 , 60, 80, sampleGrid);
function drawPath(pathArray, idOfTheTargetSvg){

var drawHolder = $('.tab-view')

// for (var i = pathArray.length - 1; i >= 0; i--) {
//    x= pathArray[i][1]
//    y= pathArray[i][0]
//    drawHolder.append('<div style="opacity: .6; left: '+x*10 +'px; top: '+y*10 +'px; border: 1px solid green; position: absolute; margin-left: 2%; margin-top: 13%; width: 10px; height: 10px; background: red;">')
// };

  for (var i = pathArray.length - 1; i >= 0; i--) {
    // Почему-то раньше надо было переворчаивать массив
    // exX = pathArray[i][0];
    // exY = pathArray[i][1];
    // pathArray[i][0] = exY;
    // pathArray[i][1] = exX;

   pathArray[i] = pathArray[i].join();   
  };
  var polylinePoints = pathArray.join(' ');

  $svg_polyline = createSvgElement('polyline').attr({
    id:  "pathLine",
    stroke: "black",
    points: polylinePoints
  })
  

  // $svg_polyline = createSvgElement('polyline').attr({
  //   id:  "pathLine",
  //   stroke: "black",
  //   points: polylinePoints
  // })
  

  // $svg_rectstart = createSvgElement('svg_circlestart').attr({
  //   id:  "pathLine",
  //   stroke: "black",
  //   cx: polylinePoints[1][1]
  //   cy: polylinePoints[1][2]
  // })

  $('#'+ idOfTheTargetSvg +' > .svg-pan-zoom_viewport').append($svg_polyline);
  //$('#'+ idOfTheTargetSvg +' > .svg-pan-zoom_viewport').append($svg_circlestart);
//  $('#'+ idOfTheTargetSvg +' > .svg-pan-zoom_viewport').append($svg_circleend);
}
/////grid.setWalkableAt(0, 1, false);
// //var matrix = [
//     [0,0,0,0,0],
//     [0,1,1,0,0],
//     [0,0,1,1,1],
//     [0,0,0,1,0],
//     [0,0,0,0,0]
// ];

/*
var arr1 = [
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0]
  [0,0,0,0,0,0]
]
*/


function makePath(idAudStart, idAudEnd) {
  /// to do 
  //  start animation progress bar
  //loading.start();
 $("svg").find("#pathLine").remove();
  destroyPopUp();

  var doorPointsStart = $('#door-'+idAudStart).children().attr('points');
  // doorPointsStart = '395.8,532.8 395.8,534.8 386.4,534.8 386.4,532.8 395.8,532.8'

  doorPointsStart = doorPointsStart.split(' ');
  if (doorPointsStart.length == 5) {
    doorPointsStart = doorPointsStart.slice(1);
  }
    ////console.log(points);
  for (var i = doorPointsStart.length-1; i >= 0; i--) {
    doorPointsStart[i] = doorPointsStart[i].split(',');
    doorPointsStart[i][0] = parseInt(doorPointsStart[i][0]);
    doorPointsStart[i][1] = parseInt(doorPointsStart[i][1]);
  }; 

  var doorPointsEnd = $('#door-'+idAudEnd).children().attr('points');
  // doorPointsEnd = '395.8,532.8 395.8,534.8 386.4,534.8 386.4,532.8 395.8,532.8'

  doorPointsEnd = doorPointsEnd.split(' ');
  if (doorPointsEnd.length == 5) {
    doorPointsEnd = doorPointsEnd.slice(1);
  }
    ////console.log(points);
  for (var i = doorPointsEnd.length-1; i >= 0; i--) {
    doorPointsEnd[i] = doorPointsEnd[i].split(',');
    doorPointsEnd[i][0] = parseInt(doorPointsEnd[i][0]);
    doorPointsEnd[i][1] = parseInt(doorPointsEnd[i][1]);
  }; 



  ////console.log(doorPointsStart);
  startPoint.x = doorPointsStart[0][0] - (doorPointsStart[0][0] - doorPointsStart[2][0])/2;
  startPoint.x = parseInt(Math.round(startPoint.x));

  startPoint.y = doorPointsStart[0][1] - (doorPointsStart[0][1] - doorPointsStart[2][1])/2;
  startPoint.y = parseInt(Math.round(startPoint.y));

  endPoint.x = doorPointsEnd[0][0] - (doorPointsEnd[0][0] - doorPointsEnd[2][0])/2;
  endPoint.x = parseInt(Math.round(endPoint.x));

  endPoint.y = doorPointsEnd[0][1] - (doorPointsEnd[0][1] - doorPointsEnd[2][1])/2;
  endPoint.y = parseInt(Math.round(endPoint.y));


  //console.log(startPoint, endPoint)

  drawPath(calculatePathArray(getCoordinates($('#Walkable'))), 'level1');

  //loading.stop();
 
  /// to do
  // end animation
  // зум и перемещение к маршруту
  // анимация маршрута (по точкам)

}



function path(x1,y1,x2,y2) {
  startPoint.x = x1;
  startPoint.y = y1;
  endPoint.x = x2;
  endPoint.y = y2;
  drawPath(calculatePathArray(getCoordinates($('#Walkable'))), 'level1');
}