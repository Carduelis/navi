//fitText if needed
//jQuery(".phones b").fitText();
var x = -40;
var y = -60; 
var xp = new Array(-73,-33,7,-33); // Массив X-координат полигона
var yp = new Array(-85,-126,-85,-45); // Массив Y-координат полигона


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

var zoom = 1;
function zoomIn() {
  zoom++;
  $('.svg-holder svg > g').css('transform','scale('+zoom+')')
}
function zoomOut() {
  zoom--;
  $('.svg-holder svg > g').css('transform','scale('+zoom+')')
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
$('polygon:eq(70)').each(function(){
  var points = [];
  var pointsX = [520,540,440,530];
  var pointsY = [340,360,350,320];
  /*
  */
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

$(document).ready(function(){
  // Обрезка пустых значений
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
    var dataCorpus = $(this).val();
    console.log(dataCorpus);
    container.find('div[data-corpus]').hide();
    container.find('div[data-corpus="'+dataCorpus+'"]').show();
    $('.tab-view').hide();
    $('.tab-view[data-corpus="'+dataCorpus+'"][data-level="1"]').show();
    container.find('a.btn').removeClass('active');
    container.find('a.btn[data-level="1"]').addClass('active');
  });
  $('.tab-buttons a.btn').on('click', function(){
    var dataCorpusLevel = $(this).attr('data-level');
    var container = $(this).parents('.tab-buttons');
    var dataCorpus = container.find('select').val();
    container.find('a.btn').removeClass('active');
    $(this).addClass('active');
    $('.tab-view').hide();
    $('.tab-view[data-corpus="'+dataCorpus+'"][data-level="'+dataCorpusLevel+'"]').show();
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
    } else if ($(this).attr("class") == 'land active') {
      $(this).attr("class", "land");
    }
  });
});


// ----------------------------
// Показать верхнее меню
// ----------------------------
/*
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
*/


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