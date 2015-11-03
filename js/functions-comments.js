
/*
var x = -40;
var y = -60; 
var xp = new Array(-73,-33,7,-33); // Массив X-координат полигона
var yp = new Array(-85,-126,-85,-45); // Массив Y-координат полигона


*/

//var matrix = coordinates;
//console.log(matrix);
// var grid = new PF.Grid(matrix);
// var finder = new PF.BiAStarFinder();
//var path = finder.findPath(55, 55, 180, 180, grid);

/*
$('polygon:eq(70)').each(function(){
  var points = [];
  var pointsX = [520,540,440,530];
  var pointsY = [340,360,350,320];

  points = $(this).attr('points').split(' ');
 
  for (var i = points.length - 1; i >= 0; i--) {
    points[i] = points[i].split(',');
    pointsX[i] = points[i][0]
    pointsY[i] = points[i][1]
  };
  xMin = getMaxOfArray(pointsX);
  xMax = getMinOfArray(pointsX);
  yMin = getMaxOfArray(pointsY);
  yMax = getMinOfArray(pointsY);
  xp = pointsX;
  yp = pointsY;
  console.log(pointsX);
  console.log(pointsY);
  x = xMin;
  y = yMin;
  for (var i = xMin; i >= xMax; i--) {
      x = i;
      coordinates[i] = [];
      for (var j = yMin; j >= yMax; j--) {
          y = j;
          coordinates[i][j] = inPoly(x,y);
      };
  };
})

$currentRect = $('#ToiletA-L-2-1')
$currentRect.each(function(){
  var points = [];
  var pointsX = [];
  var pointsY = [];
 
  pointsX[0] = parseInt($(this).attr('x'));
  pointsX[1] = parseInt($(this).attr('x')) + parseInt($(this).attr('width'));
  pointsY[0] = parseInt($(this).attr('y'));
  pointsY[1] = parseInt($(this).attr('y')) + parseInt($(this).attr('height'));


  xMin = getMaxOfArray(pointsX);
  xMax = getMinOfArray(pointsX);
  yMin = getMaxOfArray(pointsY);
  yMax = getMinOfArray(pointsY);
  xp = pointsX;
  yp = pointsY;
  console.log(pointsX);
  console.log(pointsY);
  x = xMin;
  y = yMin;
  for (var i = xMin; i >= xMax; i--) {
      x = i;
      coordinates[i] = [];
      for (var j = yMin; j >= yMax; j--) {
          y = j;
          coordinates[i][j] = inPoly(x,y);
      };
  };
})
*/
/*
          var svgId = "testsvg"
          elm = document.getElementById(svgId);;
        function hammerIt(elm) {
          hammertime = new Hammer(elm, {});
          hammertime.get('pinch').set({
              enable: true,
          });
          hammertime.get('rotate').set({ 
            enable: true,
          });
          var posX = 0,
              posY = 0,
              perX = 50,
              perY = 50,
              scale = 1,
              deg = 0,
              last_deg = 0,
              last_scale = 1,
              last_posX = 0,
              last_posY = 0,
              max_pos_x = 0,
              max_pos_y = 0,
              transform = "",
              el = elm;
            hammertime.on('doubletap  pinch  pinchend rotate rotateend rotatestart center', function(ev) {
              if (ev.type == "doubletap") {
                  transform =
                      "translate3d(0, 0, 0) " +
                      "scale3d(2, 2, 1) ";
                  scale = 2;
                  last_scale = 2;
                  try {
                      if (window.getComputedStyle(el, null).getPropertyValue('-webkit-transform').toString() != "matrix(1, 0, 0, 1, 0, 0)") {
                          transform =
                              "translate3d(0, 0, 0) " +
                              "scale3d(1, 1, 1) ";
                          scale = 1;
                          last_scale = 1;
                      }
                  } catch (err) {}
                  el.style.webkitTransform = transform;
                  transform = "";
             
              }

              if (ev.type == "pan") {
                  posX = last_posX + ev.deltaX;
                  posY = last_posY + ev.deltaY;
                  max_pos_x = Math.ceil((scale - 1) * el.clientWidth / 2);
                  max_pos_y = Math.ceil((scale - 1) * el.clientHeight / 2);
                  if (posX > max_pos_x) {
                      posX = max_pos_x;
                  }
                  if (posX < -max_pos_x) {
                      posX = -max_pos_x;
                  }
                  if (posY > max_pos_y) {
                      posY = max_pos_y;
                  }
                  if (posY < -max_pos_y) {
                      posY = -max_pos_y;
                  }
            }
            //  }


              //pinch
              if (ev.type == "pinch") {
                  scale = Math.max(.8, Math.min(last_scale * (ev.scale),2));
                  $('#DEBUG_scale').text(scale);
                  svgWidth = $('#'+svgId).width();
                  svgHeight = $('#'+svgId).height();
                  perX = ev.center.x / svgWidth * 100;
                  perY = ev.center.y / svgHeight * 100;

                  $('#DEBUG_center').text('x: '+ev.center.x + ' '+ perX+'; y:' +ev.center.y + ' '+ perY);

              }
              if(ev.type == "pinchend"){
                last_scale = scale;
                
                $('#'+svgId).hide();
                $('#'+svgId).get(0).offsetHeight; // no need to store this anywhere, the reference is enough
                $('#'+svgId).show();


              }

              //panend
              if(ev.type == "panend"){
                last_posX = posX < max_pos_x ? posX : max_pos_x;
                last_posY = posY < max_pos_y ? posY : max_pos_y;
              }
              if (ev.type == "rotate") {
                if (last_deg == 0) {
                  deg =  ev.rotation;
                } else {
                  deg = last_deg + ev.rotation;
                }

                $('#DEBUG_rotate').text(deg);
              }

              if (ev.type == "rotateend") {
                last_deg = deg;
              }
              //if (scale != 1) {
                  transform =
                      "translate3d(" + posX + "px," + posY + "px, 0) " +
                      "scale3d(" + scale + ", " + scale + ", 1)" + 
                      "rotate("+deg+"deg)" 

             // }

              if (transform) {

                  el.style.webkitTransform = transform;

                  el.style.transformOrigin = perX + "% " + perY+"%";
                  $('#DEBUG_posX').text(posX);
                  $('#DEBUG_posY').text(posY);
              }
          });
        }
        hammerIt(elm)
*/         


  /*
      window.addEventListener(
          "deviceorientation",
          function(e){
              $('#DEBUG_hyro_alpha').text(e.alpha);
              $('#DEBUG_hyro_beta').text(e.beta);
              $('#DEBUG_hyro_gamma').text(e.gamma);
          }
      );
      window.addEventListener(
          "devicelight",
          //e.value - значение освещенности в люксах
          function(e){ $('#DEBUG_devicelight').text(e.value); }
      );
      window.addEventListener(
          'lightlevel',
          // e.value = ("normal"|"dim"|"bright")
          function(e){ $('#DEBUG_lightlevel').text(e.value); }
      );

window.addEventListener(
    "deviceproximity",
    function(e){
      $('#DEBUG_proximity_value').text(e.value+'сантиметров'); // текущая дистанция до датчика в сантиметрах (!)
        $('#DEBUG_proximity_min').text(e.min);   // минимальное значение, которое может определить датчик (==0)
        $('#DEBUG_proximity_max').text(e.max);    // максимальное значение, которое может определить датчик
    }
);
window.addEventListener(
    "userproximity",
    function(e){console.log(
        e.near //true - близко, false - далеко
    )}
);        

*/



      // Don't use window.onLoad like this in production, because it can only listen to one function.
    
     



      // Don't use window.onLoad like this in production, because it can only listen to one function.
      // $(function() {
      //   var lastEventListener = null;

      //   function createNewEmbed(src){
      //     var embed = document.createElement('embed');
      //     embed.setAttribute('style', 'width: 500px; height: 500px; border:1px solid black;');
      //     embed.setAttribute('type', 'image/svg+xml');
      //     embed.setAttribute('src', src);

      //     document.getElementById('container').appendChild(embed)

      //     lastEventListener = function(){
      //       svgPanZoom(embed, {
      //         zoomEnabled: true,
      //         controlIconsEnabled: true
      //       });
      //     }
      //     embed.addEventListener('load', lastEventListener)

      //     return embed
      //   }

      //   var lastEmbedSrc = 'tiger.svg'
      //     , lastEmbed = createNewEmbed(lastEmbedSrc)
      //     ;

      //   function removeEmbed(){
      //     // Destroy svgpanzoom
      //     svgPanZoom(lastEmbed).destroy()
      //     // Remove event listener
      //     lastEmbed.removeEventListener('load', lastEventListener)
      //     // Null last event listener
      //     lastEventListener = null
      //     // Remove embed element
      //     document.getElementById('container').removeChild(lastEmbed)
      //     // Null reference to embed
      //     lastEmbed = null
      //   }


      //   $('#swap').on('click', function(){
      //     // Remove last added svg
      //     removeEmbed()

      //     if (lastEmbedSrc == 'tiger.svg') {
      //       lastEmbedSrc = 'Tux.svg'
      //     } else {
      //       lastEmbedSrc = 'tiger.svg'
      //     }

      //     lastEmbed = createNewEmbed(lastEmbedSrc)
      //   })
      // });
    