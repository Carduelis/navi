var xp = []
var yp = []

/*
var x = -40;
var y = -60; 
var xp = new Array(-73,-33,7,-33); // Массив X-координат полигона
var yp = new Array(-85,-126,-85,-45); // Массив Y-координат полигона


*/


function createSvgElement(type) {
  return $(document.createElementNS('http://www.w3.org/2000/svg', type))
}
var currentLevel = 1;
var currentCorpus = 'a';
function mapView(corpus, level) {
  return $('.tab-view[data-corpus="'+currentCorpus+'"][data-level="'+currentLevel+'"]')
}
var currentSVG = mapView(currentCorpus, currentLevel).find('svg');

currentSVG.setSize = function(width, height, scale) {
  deviceWidth = $(window).width();
  deviceHeight = $(window).height();

  scrolledLeft = this.offset().left;
  scrolledTop = this.offset().top;

  console.log(scrolledLeft)

  originLeft = (deviceWidth + 2779.46)/2 - scrolledLeft;
  originTop = (deviceHeight + 454.613)/2 - scrolledTop;
// после скролла надо сохранять предыдущий trnasfrom-origin

  xShift = (width - width*scale)/2;
  yShift = (height - height*scale)/2;
  width = width*scale;
  height = height*scale;
  this.attr('width', width)
    .attr('height', height)
    .get(0).setAttribute('viewBox',  xShift+' '+yShift+' '+width+' '+height);
   this.children('g').css('transform-origin', originLeft+'px '+originTop+'px ' );
};



svgWidth = currentSVG.width();
svgHeight = currentSVG.height();
mapView(currentCorpus, currentLevel).show().scrollLeft(currentSVG.width()/2);
$('.tab-buttons [data-corpus="'+currentCorpus+'"]').show();
$('.tab-buttons a[data-level="'+currentLevel+'"]').addClass('active');
$('#corpus-selector').val(currentCorpus)


$('rect').each(function(){
  id = $(this).attr('id');
  text = id;
  width = $(this).attr('width');
  height = $(this).attr('height');
  x = $(this).attr('x');
  y = $(this).attr('y');

  gid = 'group' + id ;
  //$(this).wrap('<g id="'+gid+'">')
  $svg_g = createSvgElement('g').attr({
    id:  gid,
    fill: 'red',
    width: width*0.5,
    height: height*0.5,
    x: x,
    y: y
  })
  $svg_text = createSvgElement('text').attr({
    fill: 'red',
    x: x - -5,
    y: y - -20,
    width: width*0.5,
    height: height*0.5,

  }).text(id)
  $(this).wrap($svg_g)
  $(this).parent($svg_g).append($svg_text)
})

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

//-path
function destroyPopUp() {
  $('.popup').remove();
}
function createPopUp(content) {
  destroyPopUp();
  $('body').append('<div class="popup"><a class="close" onclick="closePopUp($(this))"></a><div class="popup-content"></div></div></div>');
  $('.popup-content').append(content);
}
function closePopUp(el) {
  el.parent().remove();
}
function showRoom(name) {
  var name = name.split("");
  corpus = name[0];
  floor = name[1].toString();
  room = name[2]+name[3];
  switch (corpus) {
    case 'А':
      corpus = 0
      break
    case 'Д':
      corpus = 1
      break
    default:
      corpus = null
      alert('Доступны корпуса А и Д');
  }
  console.log(corpus + floor + room);
  var content = $('section[data-corpus="'+corpus+'"]')
        .find('.level[data-floor="'+floor+'"]')
        .find('.room[data-roomid="'+room+'"]')
        .clone();
        if (content.get(0)) {
          createPopUp(content)
        } else {
          createPopUp('Данная аудитория пока не доступна')
        }
}


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
         
          $('#roomBLock .btn').on('click', function(){
            var p = $(this).parents('#roomBLock');
            corpus = p.find('select').val();
            number = p.find('input[type="number"]').val();
            console.log(corpus + number)
            showRoom(corpus+number)
          })


        var zoom = 1;
        var scalefactor = 0.05;
        function zoomIn() {
          zoom++;
          scale = 1 + zoom*scalefactor;
          currentSVG 
                .children('g')
                .css('transform','scale('+scale+')');

          currentSVG.setSize(svgWidth,svgHeight, scale)

          /*
                .css({  
                  'width': svgWidth*scalePX,
                  'height': svgHeight*scalePX,
                });
        */
        }




        function zoomOut() {
          zoom--;
          scale = 1 + zoom*scalefactor;
          currentSVG 
                .children('g')
                .css('transform','scale('+scale+')');

          currentSVG.setSize(svgWidth,svgHeight, scale)
        }
//                                                                                                                                                                             
//                                                                                                                                                                             
//  HHHHHHHHH     HHHHHHHHH                                                                                                                              jjjj                  
//  H:::::::H     H:::::::H                                                                                                                             j::::j                 
//  H:::::::H     H:::::::H                                                                                                                              jjjj                  
//  HH::::::H     H::::::HH                                                                                                                                                    
//    H:::::H     H:::::H    aaaaaaaaaaaaa      mmmmmmm    mmmmmmm      mmmmmmm    mmmmmmm       eeeeeeeeeeee    rrrrr   rrrrrrrrr                     jjjjjjj    ssssssssss   
//    H:::::H     H:::::H    a::::::::::::a   mm:::::::m  m:::::::mm  mm:::::::m  m:::::::mm   ee::::::::::::ee  r::::rrr:::::::::r                    j:::::j  ss::::::::::s  
//    H::::::HHHHH::::::H    aaaaaaaaa:::::a m::::::::::mm::::::::::mm::::::::::mm::::::::::m e::::::eeeee:::::eer:::::::::::::::::r                    j::::jss:::::::::::::s 
//    H:::::::::::::::::H             a::::a m::::::::::::::::::::::mm::::::::::::::::::::::me::::::e     e:::::err::::::rrrrr::::::r                   j::::js::::::ssss:::::s
//    H:::::::::::::::::H      aaaaaaa:::::a m:::::mmm::::::mmm:::::mm:::::mmm::::::mmm:::::me:::::::eeeee::::::e r:::::r     r:::::r                   j::::j s:::::s  ssssss 
//    H::::::HHHHH::::::H    aa::::::::::::a m::::m   m::::m   m::::mm::::m   m::::m   m::::me:::::::::::::::::e  r:::::r     rrrrrrr                   j::::j   s::::::s      
//    H:::::H     H:::::H   a::::aaaa::::::a m::::m   m::::m   m::::mm::::m   m::::m   m::::me::::::eeeeeeeeeee   r:::::r                               j::::j      s::::::s   
//    H:::::H     H:::::H  a::::a    a:::::a m::::m   m::::m   m::::mm::::m   m::::m   m::::me:::::::e            r:::::r                               j::::jssssss   s:::::s 
//  HH::::::H     H::::::HHa::::a    a:::::a m::::m   m::::m   m::::mm::::m   m::::m   m::::me::::::::e           r:::::r                               j::::js:::::ssss::::::s
//  H:::::::H     H:::::::Ha:::::aaaa::::::a m::::m   m::::m   m::::mm::::m   m::::m   m::::m e::::::::eeeeeeee   r:::::r             ......            j::::js::::::::::::::s 
//  H:::::::H     H:::::::H a::::::::::aa:::am::::m   m::::m   m::::mm::::m   m::::m   m::::m  ee:::::::::::::e   r:::::r             .::::.            j::::j s:::::::::::ss  
//  HHHHHHHHH     HHHHHHHHH  aaaaaaaaaa  aaaammmmmm   mmmmmm   mmmmmmmmmmmm   mmmmmm   mmmmmm    eeeeeeeeeeeeee   rrrrrrr             ......            j::::j  sssssssssss    
//                                                                                                                                                      j::::j                 
//                                                                                                                                            jjjj      j::::j                 
//                                                                                                                                           j::::jj   j:::::j                 
//                                                                                                                                           j::::::jjj::::::j                 
//                                                                                                                                            jj::::::::::::j                  
//                                                                                                                                              jjj::::::jjj                   
//                                                                                                                                                 jjjjjj                                                                                                                                                                                                                                                                                                                                                                      
   var eventsHandler;

        eventsHandler = {
          haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']
        , init: function(options) {
            var instance = options.instance
              , initialScale = 1
              , pannedX = 0
              , pannedY = 0

            // Init Hammer
            // Listen only for pointer and touch events
            this.hammer = Hammer(options.svgElement, {
              inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
            })

            // Enable pinch
            this.hammer.get('pinch').set({enable: true})

            // Handle double tap
            this.hammer.on('doubletap', function(ev){
              instance.zoomIn()
            })

            // Handle pan
            this.hammer.on('panstart panmove', function(ev){
              // On pan start reset panned variables
              if (ev.type === 'panstart') {
                pannedX = 0
                pannedY = 0
              }

              // Pan only the difference
              instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
              pannedX = ev.deltaX
              pannedY = ev.deltaY
            })

            // Handle pinch
            this.hammer.on('pinchstart pinchmove', function(ev){
              // On pinch start remember initial zoom
              if (ev.type === 'pinchstart') {
                initialScale = instance.getZoom()
                instance.zoom(initialScale * ev.scale)
              }

              instance.zoom(initialScale * ev.scale)

            })

            // Prevent moving the page on some devices when panning over SVG
            options.svgElement.addEventListener('touchmove', function(e){ e.preventDefault(); });
          }

        , destroy: function(){
            this.hammer.destroy()
          }
        }

//                                                                                                                     
//                                                                                                                     
//     SSSSSSSSSSSSSSS                                            iiii                     iiii          tttt          
//   SS:::::::::::::::S                                          i::::i                   i::::i      ttt:::t          
//  S:::::SSSSSS::::::S                                           iiii                     iiii       t:::::t          
//  S:::::S     SSSSSSS                                                                               t:::::t          
//  S:::::S      vvvvvvv           vvvvvvvggggggggg   ggggg     iiiiiiinnnn  nnnnnnnn    iiiiiiittttttt:::::ttttttt    
//  S:::::S       v:::::v         v:::::vg:::::::::ggg::::g     i:::::in:::nn::::::::nn  i:::::it:::::::::::::::::t    
//   S::::SSSS     v:::::v       v:::::vg:::::::::::::::::g      i::::in::::::::::::::nn  i::::it:::::::::::::::::t    
//    SS::::::SSSSS v:::::v     v:::::vg::::::ggggg::::::gg      i::::inn:::::::::::::::n i::::itttttt:::::::tttttt    
//      SSS::::::::SSv:::::v   v:::::v g:::::g     g:::::g       i::::i  n:::::nnnn:::::n i::::i      t:::::t          
//         SSSSSS::::Sv:::::v v:::::v  g:::::g     g:::::g       i::::i  n::::n    n::::n i::::i      t:::::t          
//              S:::::Sv:::::v:::::v   g:::::g     g:::::g       i::::i  n::::n    n::::n i::::i      t:::::t          
//              S:::::S v:::::::::v    g::::::g    g:::::g       i::::i  n::::n    n::::n i::::i      t:::::t    tttttt
//  SSSSSSS     S:::::S  v:::::::v     g:::::::ggggg:::::g      i::::::i n::::n    n::::ni::::::i     t::::::tttt:::::t
//  S::::::SSSSSS:::::S   v:::::v       g::::::::::::::::g      i::::::i n::::n    n::::ni::::::i     tt::::::::::::::t
//  S:::::::::::::::SS     v:::v         gg::::::::::::::g      i::::::i n::::n    n::::ni::::::i       tt:::::::::::tt
//   SSSSSSSSSSSSSSS        vvv            gggggggg::::::g      iiiiiiii nnnnnn    nnnnnniiiiiiii         ttttttttttt  
//                                                 g:::::g                                                             
//                                     gggggg      g:::::g                                                             
//                                     g:::::gg   gg:::::g                                                             
//                                      g::::::ggg:::::::g                                                             
//                                       gg:::::::::::::g                                                              
//                                         ggg::::::ggg                                                                
//                                            gggggg                                                                                                            gggggg                                                                                    
        var beforePan

        beforePan = function(oldPan, newPan){
          var stopHorizontal = false
            , stopVertical = false
            , gutterWidth = 0.9 * $(window).width()
            , gutterHeight = 0.3 * $(window).height()
              // Computed variables
            , sizes = this.getSizes()
            , leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth
            , rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom)
            , topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight
            , bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom)

          customPan = {}
          customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x))
          customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y))

          return customPan
        }

        window.svg = null;
        function svgAlive(svgId) {

          // to do
          // 1) надо запомнить предыдущий уровень зума и центровку
  
          $('.map-controls').removeClass('show');
            if (svg) {
              svgPanZoom('svg').destroy();
            }
            svg = svgPanZoom('#'+svgId, {
            zoomEnabled: true,
            controlIconsEnabled: true,
            fit: true,
            center: true,
            zoomScaleSensitivity: 0.3,
            minZoom: 1,
            maxZoom: 14,
            customEventsHandler: eventsHandler,
            beforePan: beforePan
          });
          $('.map-controls').addClass('show');
          $(window).resize(function(){
            svg.resize();
            svg.fit();
            svg.center();
          })
        }

//                                                                                                                                                                      
//              dddddddd                                                                                                                dddddddd                        
//              d::::::d                                                                                                                d::::::d                        
//              d::::::d                                                                                                                d::::::d                        
//              d::::::d                                                                                                                d::::::d                        
//              d:::::d                                                                                                                 d:::::d                         
//      ddddddddd:::::d    ooooooooooo       cccccccccccccccc        rrrrr   rrrrrrrrr       eeeeeeeeeeee    aaaaaaaaaaaaa      ddddddddd:::::dyyyyyyy           yyyyyyy
//    dd::::::::::::::d  oo:::::::::::oo   cc:::::::::::::::c        r::::rrr:::::::::r    ee::::::::::::ee  a::::::::::::a   dd::::::::::::::d y:::::y         y:::::y 
//   d::::::::::::::::d o:::::::::::::::o c:::::::::::::::::c        r:::::::::::::::::r  e::::::eeeee:::::eeaaaaaaaaa:::::a d::::::::::::::::d  y:::::y       y:::::y  
//  d:::::::ddddd:::::d o:::::ooooo:::::oc:::::::cccccc:::::c        rr::::::rrrrr::::::re::::::e     e:::::e         a::::ad:::::::ddddd:::::d   y:::::y     y:::::y   
//  d::::::d    d:::::d o::::o     o::::oc::::::c     ccccccc         r:::::r     r:::::re:::::::eeeee::::::e  aaaaaaa:::::ad::::::d    d:::::d    y:::::y   y:::::y    
//  d:::::d     d:::::d o::::o     o::::oc:::::c                      r:::::r     rrrrrrre:::::::::::::::::e aa::::::::::::ad:::::d     d:::::d     y:::::y y:::::y     
//  d:::::d     d:::::d o::::o     o::::oc:::::c                      r:::::r            e::::::eeeeeeeeeee a::::aaaa::::::ad:::::d     d:::::d      y:::::y:::::y      
//  d:::::d     d:::::d o::::o     o::::oc::::::c     ccccccc         r:::::r            e:::::::e         a::::a    a:::::ad:::::d     d:::::d       y:::::::::y       
//  d::::::ddddd::::::ddo:::::ooooo:::::oc:::::::cccccc:::::c         r:::::r            e::::::::e        a::::a    a:::::ad::::::ddddd::::::dd       y:::::::y        
//   d:::::::::::::::::do:::::::::::::::o c:::::::::::::::::c ......  r:::::r             e::::::::eeeeeeeea:::::aaaa::::::a d:::::::::::::::::d        y:::::y         
//    d:::::::::ddd::::d oo:::::::::::oo   cc:::::::::::::::c .::::.  r:::::r              ee:::::::::::::e a::::::::::aa:::a d:::::::::ddd::::d       y:::::y          
//     ddddddddd   ddddd   ooooooooooo       cccccccccccccccc ......  rrrrrrr                eeeeeeeeeeeeee  aaaaaaaaaa  aaaa  ddddddddd   ddddd      y:::::y           
//                                                                                                                                                   y:::::y            
//                                                                                                                                                  y:::::y             
//                                                                                                                                                 y:::::y              
//                                                                                                                                                y:::::y               
//                                                                                                                                               yyyyyyy                
//                                                                                                                                                                      
//                                                                                                                                                                      
$(document).ready(function(){

      svgAlive('leftA');
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
    
//                                                                                                                                           
//                                                                                                                                           
//                                                   tttt                           jjjj                                                     
//                                                ttt:::t                          j::::j                                                    
//                                                t:::::t                           jjjj                                                     
//                                                t:::::t                                                                                    
//     ggggggggg   ggggg    eeeeeeeeeeee    ttttttt:::::ttttttt                   jjjjjjj    ssssssssss      ooooooooooo   nnnn  nnnnnnnn    
//    g:::::::::ggg::::g  ee::::::::::::ee  t:::::::::::::::::t                   j:::::j  ss::::::::::s   oo:::::::::::oo n:::nn::::::::nn  
//   g:::::::::::::::::g e::::::eeeee:::::eet:::::::::::::::::t                    j::::jss:::::::::::::s o:::::::::::::::on::::::::::::::nn 
//  g::::::ggggg::::::gge::::::e     e:::::etttttt:::::::tttttt                    j::::js::::::ssss:::::so:::::ooooo:::::onn:::::::::::::::n
//  g:::::g     g:::::g e:::::::eeeee::::::e      t:::::t                          j::::j s:::::s  ssssss o::::o     o::::o  n:::::nnnn:::::n
//  g:::::g     g:::::g e:::::::::::::::::e       t:::::t                          j::::j   s::::::s      o::::o     o::::o  n::::n    n::::n
//  g:::::g     g:::::g e::::::eeeeeeeeeee        t:::::t                          j::::j      s::::::s   o::::o     o::::o  n::::n    n::::n
//  g::::::g    g:::::g e:::::::e                 t:::::t    tttttt                j::::jssssss   s:::::s o::::o     o::::o  n::::n    n::::n
//  g:::::::ggggg:::::g e::::::::e                t::::::tttt:::::t                j::::js:::::ssss::::::so:::::ooooo:::::o  n::::n    n::::n
//   g::::::::::::::::g  e::::::::eeeeeeee        tt::::::::::::::t                j::::js::::::::::::::s o:::::::::::::::o  n::::n    n::::n
//    gg::::::::::::::g   ee:::::::::::::e          tt:::::::::::tt                j::::j s:::::::::::ss   oo:::::::::::oo   n::::n    n::::n
//      gggggggg::::::g     eeeeeeeeeeeeee            ttttttttttt                  j::::j  sssssssssss       ooooooooooo     nnnnnn    nnnnnn
//              g:::::g                                                            j::::j                                                    
//  gggggg      g:::::g                                                  jjjj      j::::j                                                    
//  g:::::gg   gg:::::g                                                 j::::jj   j:::::j                                                    
//   g::::::ggg:::::::g                                                 j::::::jjj::::::j                                                    
//    gg:::::::::::::g                                                   jj::::::::::::j                                                     
//      ggg::::::ggg                                                       jjj::::::jjj                                                      
//         gggggg                                                             jjjjjj                                                         

 $.getJSON( "js/data.json", function( data ) {
  var items = [];
  $.each( data, function( corpusKey, val ) {
    var corpusVal = data[corpusKey].corpus;
    $('body').append('<section class="json" data-corpus='+corpusKey+'>');
    $.each( data[corpusKey], function( key2, val2 ) {
      //console.log(key2 + ' - ' + val2);
      var section = $('section.json[data-corpus="'+corpusKey+'"]');
      if (key2 == 'corpus') {
          section.append('<div class="'+key2+'">Корпус '+val2+'</div>');
      } else {
        $('<ul/>', {
          "class": key2,
          "data-corpus": corpusKey,
          html: val2
        }).appendTo(section)
        //section.append('<ul class="'+key2+'" data-corpus="'+corpusKey+'">'+val2+'</ul>');
      }
      var corpusVal = data[corpusKey].corpus;
      $.each( this, function( levelKey, val3 ) {
        //console.log(levelKey + ' - ' + val3);
        var levels = section.find('.levels[data-corpus="'+corpusKey+'"]');
        var levelVal = data[corpusKey].levels[levelKey].level;
        var floorVal = data[corpusKey].levels[levelKey].floor;
        $('<li/>', {
          "class": "level",
          "data-level": levelVal,
          "data-floor": floorVal,
          html: val3
        }).appendTo(levels)

        $.each( this, function( key4, val4 ) {
            var level = levels.find('.level[data-level="'+levelVal+'"]');
            if (key4 != 'rooms') {
                level.append('<div class="'+key4+'">'+val4+'</div>');
            } else {
                level.append('<ul class="'+key4+'">'+val4+'</div>');
            }
            $.each( this, function( roomKey, val5 ) {
                var rooms = level.find('.rooms');
                var roomVal = data[corpusKey].levels[levelKey].rooms[roomKey].num;
                var roomName = corpusVal+'-'+floorVal+roomVal;
                rooms.append('<li class="room" data-roomId="'+roomVal+'">');

                $.each( this, function( key6, val6 ) {
                    var room = rooms.find('.room[data-roomid="'+roomVal+'"]');
                    if (key6 == 'num') {
                      $('<div/>', {
                          "class": key6,
                          html: roomName
                      }).appendTo(room);
                      //room.append('<div class="'+key6+'">'+roomName+'</div>');
                    } else if (key6 == 'subrooms') {
                      room.append('<ul class="subrooms">')
                      $.each( this, function( key7, val7 ) {
                          //room.children('.subrooms').append('<div class="subroom-'+key7+'">'+val7+'</div>');
                          var subroom = [];
                          $.each( this, function(key8, val8) {
                              if (key8 == 'postfix') {
                                subroom.push('<div class="num">'+roomName+'<sup>'+val8+'</sup></div>')
                              } else {
                                subroom.push('<div class="'+key8+'">'+val8+'</div>')
                              }
                          });
                          $('<li/>', {
                            "class": "subroom",
                            "data-subroomid": key7,
                            html: subroom.join('')
                          }).appendTo(room.children('.subrooms'))
                      });
                    } else {
                      room.append('<div class="'+key6+'">'+val6+'</div>');
                    }
                });
            });
        });
        
      });
    });
    
  });
  
}).done(function() {
    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
  


//                                                                              
//  bbbbbbbb                                                                    
//  b::::::b                     tttt                                           
//  b::::::b                  ttt:::t                                           
//  b::::::b                  t:::::t                                           
//   b:::::b                  t:::::t                                           
//   b:::::bbbbbbbbb    ttttttt:::::ttttttt  nnnn  nnnnnnnn        ssssssssss   
//   b::::::::::::::bb  t:::::::::::::::::t  n:::nn::::::::nn    ss::::::::::s  
//   b::::::::::::::::b t:::::::::::::::::t  n::::::::::::::nn ss:::::::::::::s 
//   b:::::bbbbb:::::::btttttt:::::::tttttt  nn:::::::::::::::ns::::::ssss:::::s
//   b:::::b    b::::::b      t:::::t          n:::::nnnn:::::n s:::::s  ssssss 
//   b:::::b     b:::::b      t:::::t          n::::n    n::::n   s::::::s      
//   b:::::b     b:::::b      t:::::t          n::::n    n::::n      s::::::s   
//   b:::::b     b:::::b      t:::::t    ttttttn::::n    n::::nssssss   s:::::s 
//   b:::::bbbbbb::::::b      t::::::tttt:::::tn::::n    n::::ns:::::ssss::::::s
//   b::::::::::::::::b       tt::::::::::::::tn::::n    n::::ns::::::::::::::s 
//   b:::::::::::::::b          tt:::::::::::ttn::::n    n::::n s:::::::::::ss  
//   bbbbbbbbbbbbbbbb             ttttttttttt  nnnnnn    nnnnnn  sssssssssss    
//                                                                              
//                                                                              
//                                                                              
//                                                                              
//                                                                              
//                                                                              
//                                                                              


  $('.tab-buttons select').on('change', function(){
    var container = $(this).parents('.tab-buttons');
    var currentCorpus = $(this).val();
    //console.log(currentCorpus);
    container.find('div[data-corpus]').hide();
    container.find('div[data-corpus="'+currentCorpus+'"]').show();
    $('.tab-view').hide();
    $('.tab-view[data-corpus="'+currentCorpus+'"][data-level="1"]').show();
    container.find('a.btn').removeClass('active');
    container.find('a.btn[data-level="1"]').addClass('active');
  });
  $('.tab-buttons a.btn').on('click', function(){
    var currentLevel = $(this).attr('data-level');
    var container = $(this).parents('.tab-buttons');
    var currentCorpus = container.find('select').val();
    container.find('a.btn').removeClass('active');
    $(this).addClass('active');
    $('.tab-view').hide();
    $('.tab-view[data-corpus="'+currentCorpus+'"][data-level="'+currentLevel+'"]').show();
  })
  $('#openTheForm').bind('click',function() {
    $('#form').slideDown();
    $('#thx').slideUp();
    $(this).attr('id','sendTheForm').text('Отправить!');
    $('#sendTheForm').bind('click',function() {
      $('#form').slideUp();
      $('#thx').slideDown();
      $(this).remove();
    });
  });
  $('.toggler').on('click', function(){
    $('.toggler').not($(this)).removeClass('active');
    $('.toggleBlock').not($(this).next()).hide();
    $(this).toggleClass('active');
    $(this).next().toggle();
  })
  $('path').click(function () {
    if ($(this).attr("class") == 'land') {
      $(this).attr("class", "land active");
      showRoom('А101');
    } else if ($(this).attr("class") == 'land active') {
      $(this).attr("class", "land");
    }
  });
});


// ----------------------------
// Показать верхнее меню
// ----------------------------

$('header .btn a').bind('click',function() {
  var thisLink = $(this);
  var openBlockId = thisLink.parent().attr('id');
  var openBlockId = openBlockId+'Body';
  var openBlock = $('.hidden-block#'+openBlockId);
  openBlock.toggleClass('opened');
  thisLink.toggleClass('active');
  $('.hidden-block').not(openBlock).removeClass('opened')();
  $('header .btn a').not(thisLink).removeClass('active');
});


// ----------------------------
// Переключение видов
// ----------------------------
$('.btn-group > .inside > .btn').bind('click',function() {
  var t = $(this);
  var p = t.parents('.multi-view');
  p.find('.btn').removeClass('active');
  p.find('.view').hide();
  t.addClass('active');
  p.find('.view:eq('+ t.index() +')').fadeIn(300);
});
$('.btn-group > .inside > .btn:first-child').addClass('active');
$('.view-group > .view:first-child').show();


