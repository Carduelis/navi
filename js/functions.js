//fitText if needed
//jQuery(".phones b").fitText();
var x = -40;
var y = -60; 
var xp = new Array(-73,-33,7,-33); // Массив X-координат полигона
var yp = new Array(-85,-126,-85,-45); // Массив Y-координат полигона


var currentLevel = 1;
var currentCorpus = 'a';
function mapView(corpus, level) {
  return $('.tab-view[data-corpus="'+currentCorpus+'"][data-level="'+currentLevel+'"]')
}
var currentSVG = mapView(currentCorpus, currentLevel).find('svg');
svgWidth = currentSVG.width();
svgHeight = currentSVG.height();
mapView(currentCorpus, currentLevel).show().scrollLeft(currentSVG.width()/2);
$('.tab-buttons [data-corpus="'+currentCorpus+'"]').show();
$('.tab-buttons a[data-level="'+currentLevel+'"]').addClass('active');
$('#corpus-selector').val(currentCorpus)

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
    return '*';
  } else if (c === false) {
    return '_';
  } else {
    return '_';
  }
}
function onPinch(e) {
    if (e.scale > 1)
    {
       alert('in')
   } else if (e.scale < 1) {
       alert('out')
     }
}

/*
  var elm = document.getElementById('gf-root');
  var svg = document.getElementById('svg14643');

  elm = document.getElementById('svg14643');
  function hammerIt(elm) {
  hammertime = new Hammer(elm, {});
  hammertime.get('pinch').set({
      enable: true
  });
  var posX = 0,
      posY = 0,
      scale = 1,
      last_scale = 1,
      last_posX = 0,
      last_posY = 0,
      max_pos_x = 0,
      max_pos_y = 0,
      transform = "",
      el = elm;

  hammertime.on('doubletap pan pinch panend pinchend', function(ev) {
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

      //pan    
      if (scale != 1) {
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


      //pinch
      if (ev.type == "pinch") {
          scale = Math.max(.999, Math.min(last_scale * (ev.scale), 4));
      }
      if(ev.type == "pinchend"){last_scale = scale;}

      //panend
      if(ev.type == "panend"){
      last_posX = posX < max_pos_x ? posX : max_pos_x;
      last_posY = posY < max_pos_y ? posY : max_pos_y;
      }

      if (scale != 1) {
          transform =
              "translate3d(" + posX + "px," + posY + "px, 0) " +
              "scale3d(" + scale + ", " + scale + ", 1)";
      }

      if (transform) {
          el.style.webkitTransform = transform;
      }
  });
  }
  hammerIt(elm)
  $('#roomBLock .btn').on('click', function(){
    var p = $(this).parents('#roomBLock');
    corpus = p.find('select').val();
    number = p.find('input[type="number"]').val();
    console.log(corpus + number)
    showRoom(corpus+number)
  })
   $("svg").on("gestureend", onPinch);
 */

var zoom = 1;

function zoomIn() {
  zoom++;
  scale = 1 + zoom*0.05;
  currentSVG 
        .children('g')
        .css('transform','scale('+scale+')');

  currentSVG
        .css({  
          'width': svgWidth*scale,
          'height': svgHeight*scale,
        });
}
function zoomOut() {
  zoom--;
  scale = 1 + zoom*0.05;
  currentSVG 
        .children('g')
        .css('transform','scale('+scale+')');

  currentSVG
        .css({  
          'width': svgWidth*scale,
          'height': svgHeight*scale,
        });
}

  xConstStart = 670;
  xConstEnd = 420;
  yConstStart = 350;
  yConstEnd = 320;

var coordinates = [[]];

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}
function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}
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
  xConstStart = getMaxOfArray(pointsX);
  xConstEnd = getMinOfArray(pointsX);
  yConstStart = getMaxOfArray(pointsY);
  yConstEnd = getMinOfArray(pointsY);
  xp = pointsX;
  yp = pointsY;
  console.log(pointsX);
  console.log(pointsY);
  x = xConstStart;
  y = yConstStart;
  for (var i = xConstStart; i >= xConstEnd; i--) {
      x = i;
      coordinates[i] = [];
      for (var j = yConstStart; j >= yConstEnd; j--) {
          y = j;
          coordinates[i][j] = inPoly(x,y);
      };
  };
})
*/
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
    case 'Б':
      corpus = 2
      break
    default:
      console.error('Неверный корпус')
  }
  console.log(corpus + floor + room);
  var content = $('section[data-corpus="'+corpus+'"]')
        .find('.level[data-floor="'+floor+'"]')
        .find('.room[data-roomid="'+room+'"]')
        .clone();
  createPopUp(content)
}
$(document).ready(function(){
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
  coordinates.splice(0,xConstEnd);
  for (var i = coordinates.length - 1; i >= 0; i--) {
    coordinates[i].splice(0,yConstEnd);
  };
 // console.log(coordinates.join('\n') + '\n\n');
 // 
 var containerA2  = $('.tab-view[data-corpus="a"][data-level="2"]');
  containerA2.append('<pre>');
  containerA2.find('pre').text(coordinates.join('\n') + '\n\n');





  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////


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