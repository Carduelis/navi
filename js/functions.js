var xp = []
var yp = []

var loading = {
  start : function(text) {
    $('#loading').addClass('loader');
  },
  stop : function() {
    $('#loading').removeClass('loader');
  }
}

function centerOfRect(id) {
  var el = $('rect#'+id);
  var rect = {};
  var center = {};
  rect.x = parseInt(el.attr('x'));
  rect.y = parseInt(el.attr('y'));
  rect.width = parseInt(el.attr('width'));
  rect.height = parseInt(el.attr('height'));

  center.x = (rect.x + rect.width/2)
  center.y = (rect.y + rect.height/2)

  return center
}

var mapWasOpened = 0;
function openMap(targetX, targetY) {
  $('html').addClass('map');
  $('.svg-holder').removeClass('hidden');
  if (!mapWasOpened) {
    svg.resize();
    svg.fit();
    svg.center();
  }
  if (targetX) {
    // svg.getSizes.width;
    // svg.getSizes.height;
    realZoom = svg.getSizes().realZoom;
    svg.pan({
      x:-targetX*realZoom + $(window).width()/2,
      y:-targetY*realZoom + $(window).height()/2
    })
    // svg.zoom строго после svg.pan
    svg.zoom(10);
    //svg.zoomAtPointBy(5, {x: targetX, y: targetY})
  }
  mapWasOpened = 1;
}

function closeMap() {
  $('html').removeClass('map');
  $('.svg-holder').addClass('hidden');

}

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
function parseRoomName(text, latin) {
  var auditoryName = text.split('');
  var auditory = {
    corpus : '',
    floor: '',
    room: '',
    postfix: '',
  }
  for (var i = auditoryName.length - 1; i >= 0; i--) {
    if (auditoryName[i] == '-') {
      auditoryName.splice(i,1);
    }
  }

  auditory.corpus = auditoryName[0];
  if (latin) {
    switch (auditory.corpus) {
      case 'A': // latin
        auditory.corpus = 'A'
        break
      case 'А': // russian
        auditory.corpus = 'A'
        break
      case 'a': // latin
        auditory.corpus = 'A'
        break
      case 'а': // russian
        auditory.corpus = 'A'
        break
      case 'Б': // russian
        auditory.corpus = 'B'
        break
      case 'б': // russian
        auditory.corpus = 'B'
        break
      case 'В': // russian
        auditory.corpus = 'V'
        break
      case 'в': // russian
        auditory.corpus = 'V'
        break
      case 'Г': // russian
        auditory.corpus = 'G'
        break
      case 'г': // russian
        auditory.corpus = 'G'
        break
      case 'Д': // russian
        auditory.corpus = 'D'
        break
      case 'д': // russian
        auditory.corpus = 'D'
        break
      default:
        corpus = null
        alert('Первым символом должен быть номер корпуса');
    }
  } else {
    switch (auditory.corpus) {
      case 'A': // latin
        auditory.corpus = 0
        break
      case 'А': // russian
        auditory.corpus = 0
        break
      case 'a': // latin
        auditory.corpus = 0
        break
      case 'а': // russian
        auditory.corpus = 0
        break
      case 'Б': // russian
        auditory.corpus = 1
        break
      case 'б': // russian
        auditory.corpus = 1
        break
      case 'В': // russian
        auditory.corpus = 2
        break
      case 'в': // russian
        auditory.corpus = 2
        break
      case 'Г': // russian
        auditory.corpus = 3
        break
      case 'г': // russian
        auditory.corpus = 3
        break
      case 'Д': // russian
        auditory.corpus = 4
        break
      case 'д': // russian
        auditory.corpus = 5
        break
      default:
        corpus = null
        alert('Первым символом должен быть номер корпуса');
    }
  }


  if (auditoryName.length == 2) {
    // перед нами большая аудитория A1-A9
    auditory.floor = 0;
    auditory.room = auditoryName[2];

  } else if (auditoryName.length == 3) {
    // перед нами большая аудитория A10-A18
    auditory.floor = 0;
    auditory.room = auditoryName[2]+auditoryName[3];
  } else if (auditoryName.length == 4) {
    // перед нами обычная аудитория 
    auditory.floor = auditoryName[1];
    auditory.room = auditoryName[2]+auditoryName[3];
  } else if (auditoryName.length > 4) {
    // перед нами обычная аудитория с постфиксами
    auditory.floor = auditoryName[1];
    auditory.room = auditoryName[2]+auditoryName[3];
    auditory.postfix = auditoryName[4];
  }
  auditory.roomId = auditory.corpus+auditory.floor+auditory.room+auditory.postfix;
  return auditory
}
function showRoom(text) {
  // findRoomOnMap(text)
  var auditory = parseRoomName(text, true);
  var center = centerOfRect(auditory.roomId);
  openMap(center.x,center.y);
}

function showRoomPopUp(text) {
  var auditory = parseRoomName(text);
  // console.log(auditory.corpus + auditory.floor + auditory.room);
  var content = $('section[data-corpus="'+auditory.corpus+'"]')
        .find('.level[data-floor="'+auditory.floor+'"]')
        .find('.room[data-roomid="'+auditory.room+'"]')
        .clone();
  if (content.get(0)) {
    createPopUp(content)
  } else {
    createPopUp('Информация о данной аудитории пока не доступна')
  }
}
var startIdAud = null;
function setStartAuditory(id,button) {
  startIdAud = id;
  console.log(startIdAud);
  button.addClass('active');
  if (endIdAud != null) {
    makePath(startIdAud,endIdAud);
  }
}
var endIdAud = null;
function setEndAuditory(id,button) {
  endIdAud = id;
  console.log(endIdAud);
  button.addClass('active');
  if (startIdAud != null) {
    makePath(startIdAud,endIdAud);
  }
}

         
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
          //   , gutterWidth = 0.9 * $(window).width()
          //   , gutterHeight = 0.3 * $(window).height()
          //     // Computed variables
          //   , sizes = this.getSizes()
          //   , leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth
          //   , rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom)
          //   , topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight
          //   , bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom)

          // customPan = {}
          // customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x))
          // customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y))

          // return customPan
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

  $('#Audit rect').on('click', function(){

    var id = $(this).attr('id');
    showRoom(id)
  })
      svgAlive('level1');

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
  $('.hidden-block').not(openBlock).removeClass('opened');
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


