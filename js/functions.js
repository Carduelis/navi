var xp = []
var yp = []



var loader = {
  start : function() {
    $('#loading').addClass('loader');
  },
  add: function(obj) {
    obj.name;
    obj.text;
    console.info(obj.text)
  },
  remove: function(obj) {
    obj.name;
    obj.text;
    console.info(obj.text)
  },
  stop : function() {
    $('#loading').removeClass('loader');
  }
}
function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
  $('#fullscreen').hide();
  $('#exitfullscreen').show();
}
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  $('#exitfullscreen').hide();
  $('#fullscreen').show();
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

function highlightRoom(roomId) {
  for (var i = document.getElementsByTagName('rect').length - 1; i >= 0; i--) {
    document.getElementsByTagName('rect')[i].classList.remove('highlighted')
  };
  document.getElementById(roomId).classList.add('highlighted')

}
function createSvgElement(type) {
  return $(document.createElementNS('http://www.w3.org/2000/svg', type))
}

// var currentLevel = 1;
var defaultCorpus  = 'a';

// $('.tab-buttons [data-corpus="'+currentCorpus+'"]').show();
// $('.tab-buttons a[data-level="'+currentLevel+'"]').addClass('active');
// $('#corpus-selector').val(currentCorpus)




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
function removeAllPopUps() {
  $('.popup').remove();
}



function closeMap() {
  $('html').removeClass('map');
  $('.svg-holder').addClass('hidden');

}


function parseRoomName(text, latin) {
  var auditoryName = text.split('');
  var auditory = {
    corpus : '',
    floor: '',
    level: '',
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

  if ((auditory.corpus == 'A') || (auditory.corpus == '0')) {
    auditory.level = auditory.floor - 1;
  } else {
    auditory.level = auditory.floor - 2;
  }

  auditory.roomId = auditory.corpus+auditory.floor+auditory.room+auditory.postfix;
  return auditory
}
function showRoom(text) {
  // findRoomOnMap(text)
  var auditory = parseRoomName(text, true);
  var center = centerOfRect(auditory.roomId);
  openMap(center.x,center.y);


  for (var i = document.getElementsByTagName('rect').length - 1; i >= 0; i--) {
    document.getElementsByTagName('rect')[i].classList.remove('highlighted')
  };
  document.getElementById(auditory.roomId).classList.add('highlighted')
}

function showRoomPopUp(text) {
  var auditory = parseRoomName(text,true);
  // console.log(auditory.corpus + auditory.floor + auditory.room);
  var content = $('section[data-corpus="'+parseRoomName(text).corpus+'"]')
        .find('.level[data-floor="'+parseRoomName(text).floor+'"]')
        .find('.room[data-roomid="'+parseRoomName(text).room+'"]')
        .clone()
        .append('<button class="button" onclick="setStartAuditory(\''+auditory.roomId+'\',$(this))">Маршрут отсюда</button>')
        .append('<button class="button" onclick="setEndAuditory(\''+auditory.roomId+'\',$(this))">Маршрут сюда</button>')
       
  if (content.get(0)) {
    createPopUp(content)
  } else {
    content = $("<div/>", {
      "class": "clickme",
      text: "Информация о данной аудитории пока не доступна.",
    }).append('<button class="button" onclick="setStartAuditory(\''+auditory.roomId+'\',$(this))">Маршрут отсюда</button>')
    .append('<button class="button" onclick="setEndAuditory(\''+auditory.roomId+'\',$(this))">Маршрут сюда</button>')
   
    createPopUp(content)
  }
}


var startIdAud = null;
function setStartAuditory(id,button) {
  startIdAud = id;
  //console.log(startIdAud);
  removeAllPopUps();
  button.addClass('active');
  if (endIdAud != null) {
    makePath(startIdAud,endIdAud);
  }
}
var endIdAud = null;
function setEndAuditory(id,button) {
  endIdAud = id;
  removeAllPopUps();
  console.log(endIdAud);
  button.addClass('active');
  if (startIdAud != null) {
    makePath(startIdAud,endIdAud);
  }
}


function setAuditoryNames(el) {
 id = el.attr('id');
      text = id;
      width = el.attr('width');
      height = el.attr('height');
      x = el.attr('x');
      y = el.attr('y');

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
      el.wrap($svg_g)
      el.parent($svg_g).append($svg_text)
}


function changeLevelButton(el) {
    var container = el.parents('.tab-buttons');
    var currentCorpus = container.find('select').val();
    // console.log(currentCorpus)
    container.find('a.btn').removeClass('active');
    el.addClass('active');
}
function changeLevelButtonsByCorpus(el,level) {
  var container = el.parents('.tab-buttons');
  var currentCorpus = el.val();
  //console.log(currentCorpus);
  container.find('div[data-corpus]').hide();
  container.find('div[data-corpus="'+currentCorpus+'"]').show();
  container.find('a.btn').removeClass('active');
  container.find('a.btn[data-level="'+level+'"]').addClass('active');
}

function setControls(obj) {
  obj.corpus;
  obj.level;
  var thisOption = $('#corpus-selector option[value="'+obj.corpus+'"]');
  thisOption.attr('selected','selected');
  changeLevelButtonsByCorpus(thisOption,obj.level);
}

$(document).ready(function(){


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


// Какие данные нам нужно получать?

// SVG-карты
// Подгрузка номеров аудиторий на SVG-карту (не факт, что нужно)
// Данные об аудитории: тип аудитории, время работы, обед, ФИО, телефон
// Данные о человеке: должность, телефон, какие кафедры возглавляет
// Данные о кафедре: телефоны, люди, аудитория
// Данные о факультете: какие подразделения и в каких аудиториях имеет
// 




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
    var corpus = $(this).val();
    var level = $('.tab-buttons [data-corpus="'+corpus+'"]').find('a.active').data('level');
    changeLevelButtonsByCorpus($(this),level);
  });
  $('.tab-buttons a.btn').on('click', function(){
    var level = $(this).data('level');
    changeLevelButton($(this));
    initSvg(level, function(){
      svgAction.view(level);
    });
  });


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


