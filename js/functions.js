//fitText if needed
//jQuery(".phones b").fitText();



$(document).ready(function(){


  $('.slider').bxSlider({
    pager: false,
    auto: true
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


// ----------------------------
// Плавная прокрутка
// ----------------------------
 function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');
 
  $('a[href*=#]').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
            location.hash = target;
          });
        });
      }
    }
  });
 
  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }