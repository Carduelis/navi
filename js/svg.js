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

var loadSvg = null;
var lastSvgLevel = null;
var svg = null;
var svgAction = {
  show : function() {
    $('html').addClass('map');
    $('.svg-holder').removeClass('hidden');
  },
  view : function(level) {
    $('.svg-view').addClass('hided');
    $('.svg-view[data-level="'+level+'"]').removeClass('hided');
  },
  close : function() {  
    $('html').removeClass('map');
    $('.svg-holder').addClass('hidden');
  },
  ajaxLoad : function(level) {
    loadSvg = $.ajax({
      url:  "./img/level"+level+".svg",
      dataType: 'html',
      beforeSend: function(param){
        loader.start();
        loader.add({
          name: 'map',
          text: 'Загружаются планы здания. Уровень '+level
        });
      }
    })
    .done(function(data) {
      loader.remove({
          name: 'map',
          text: 'Уровень '+level+'. Загрузка завершена.'
        });
      loader.stop('map');
      $('.svg-view[data-level="'+level+'"]').append(data);
      console.info("Svg has been successfully loaded");
      setNamesForAllAuditories(level);
    })
    .fail(function(){
      console.warn("Cant load svg-file");
    })
    .always(function(){
      console.log('ajax has been worked');
    });
  },
  centerBy : function(obj) {
    
    realZoom = svg.getSizes().realZoom;
    svg.pan({
      x:-obj.x*realZoom + $(window).width()/2,
      y:-obj.y*realZoom + $(window).height()/2
    })
    svg.resize();
    // svg.zoom строго после svg.pan
    svg.zoom(obj.zoom);
  },
  enablePanZoom : function(level) {
      svg = svgPanZoom('#level'+level, {
      zoomEnabled: true,
      controlIconsEnabled: true,
      fit: true,
      center: true,
      zoomScaleSensitivity: 0.3,
      minZoom: 1,
      maxZoom: 14,
      customEventsHandler: eventsHandler,
      //beforePan: beforePan
    });
    // везде далее идет проверка на то, является ли текущая
    // активная svg той, которую необходимо включить
    lastSvgLevel = level;
    setControls({
      corpus: defaultCorpus,
      level: level
    });
  },

  isExisted : function(level) {
    if (!document.getElementById('level'+level) ) {
      return false
    } else {
      return true
    }
  }
}

    // var $auditories = $('#level'+level).find('.auditories');
    // if ($auditories.get(0)) { 
    //   $auditories.find('rect').on('click', function(){
    //     var id = $(this).attr('id');
    //     showRoomPopUp(id)
    //   });
    // } else {
    //   console.warn('"auditories"-class is not represented')
    // }

function setNamesForAllAuditories(level) {
    var $auditories = $('#level'+level).find('.auditories');
    $auditories.find('rect').each(function(){
      setAuditoryNames($(this));
    });
    console.info('Имена к аудиториям проставлены.')
}


function findRoom(text) {

  var auditory = parseRoomName(text, true);
  var center = centerOfRect(auditory.roomId);
  highlightRoom(auditory.roomId);
  svgAction.show();
  svgAction.view(auditory.level);
  
  svgAction.centerBy({
    x: center.x, 
    y: center.y,
    zoom: 10
  });


}
function initSvg(level, func) {

    if (!svgAction.isExisted(level)) {
      svgAction.ajaxLoad(level);
      loadSvg.success(function(){
        svgAction.enablePanZoom(level);


     
        func();
      })
    } else {
      if (lastSvgLevel == level) {



        func();
      } else {
        svgAction.enablePanZoom(level);


        func();
      }
    }  
}


$(document).ready(function(){
  Path.map("#/room/:roomId").to(function(){
    roomId = this.params['roomId'];
    var level = parseRoomName(roomId).level;
    initSvg(level, function(){
      findRoom(roomId);
    });
  });
  Path.listen();

  $('#roomBLock .btn').on('click', function(){
    var p = $(this).parents('#roomBLock');
    corpus = p.find('select').val();
    number = p.find('input[type="number"]').val();
    roomId = corpus+number;

    var level = parseRoomName(roomId).level;
    initSvg(level, function(){
      findRoom(roomId);
    });
  })



  

});
$(document).ajaxSuccess(function() {
  $('rect').on('click',function(){
    var roomId = $(this).attr('id');
    getForm('link_roomnames_to_id', roomId)
  })
});

  function getForm(formId, tagId) {
    var html = null;
    loadForm = $.ajax({
      url:  "./includes/forms/"+formId+".php",
      dataType: 'html',
      beforeSend: function(param){
        loader.start();
        loader.add({
          name: 'form',
          text: 'Загружается форма '+formId
        });
      }
    })
    .success(function(data) {
      loader.remove({
          name: 'form',
          text: 'Форма '+formId+'. Загрузка завершена.'
        });
      loader.stop('map');
      html = $('<div id="newData">').html(data);
      html.find('#tagId').attr('value',tagId);
      returnAjaxData(html);
    })
    .fail(function(){
      console.warn('Cant load form#'+formId+' from '+formId+'.php');
      html = false
    });
 }


function returnAjaxData(obj) {
  createPopUp(obj);
}


function sendData(arr) {
  var xmlhttp = new XMLHttpRequest();
  var query;
  // for (var i = arr.length - 1; i >= 0; i--) {
  //   query = arr[i]+"='"
  // };
  var value0 = document.getElementById(arr[0]).value;
  var value1 = document.getElementById(arr[1]).value;
  query = arr[0]+'='+value0+"&"+arr[1]+'='+value1;
  console.log(query)
  xmlhttp.open('GET','db_bridge.php?'+query, false)
  xmlhttp.send(null);
  document.getElementById('message').innerHTML=xmlhttp.responseText;
}