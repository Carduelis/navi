function centerRoom() {

}

function hightlightRoom() {

}

function showSvgHolder() {

}

function showSvg() {

}

function loadSvg() {

}

function roomCenterCoordinates(obj) {

}

var svgAction = {
  show : function(level) {

  },
  load : function(level) {
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
      console.info("svg has been successfully loaded");
      Path.listen();
    })
    .fail(function(){
      console.warn("Cant load svg-file");
    })
    .always(function(){
      console.log('ajax has been worked')
    });
  },
  panZoomEnable : function(level) {

  },
  centerBy : function(obj) {
    obj.x;
    obj.y;
    obj.zoom;
  }
}