
$(document).on("click", "rect", function(){ 
    var roomId = $(this).attr('id');
    // getForm('link_roomnumber_to_id', roomId);
    // showFormChoosing(roomId)
    showBubble(roomId)
});


function showFormChoosing(tagId) {
  var forms = [  
    {
      'name':'Связать id объекта с номером аудитории',
      'formName':'link_roomnumber_to_id'
    },
    {
      'name':'Добавить название к аудитории',
      'formName':'add_roomname'
    },
    {
      'name':'Добавить сотрудника к аудитории',
      'formName':'link_users_to_room'
    },
    {
      'name':'Создать сотрудника',
      'formName':'add_user'
    }
  ];
  var mylist = $('<ul/>').addClass('link-group');
  //Наполняем
  $.each(forms, function() {
      $('<li/>').wrapInner(
        $("<a/>",{
          "onclick": "getForm('"+this.formName+"','"+tagId+"')",
          text: this.name
        }))
      .appendTo(mylist);
  });
  createPopUp(mylist)
}

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


function sendData(el,arr) {
  var formId = el.parents('form[method="post"]').attr('name');
  var xhr = new XMLHttpRequest();
  var query = 'form='+formId+'&';
  for (var i = arr.length - 1; i >= 0; i--) {
    if (document.getElementById(arr[i]).value == '') {
      $('#'+arr[i]).addClass('error');
      return
    } 
    query += arr[i] + "=" + document.getElementById(arr[i]).value + "&"
  };
  query = query.substr(0, query.length - 1)
  // var value0 = document.getElementById(arr[0]).value;
  // var value1 = document.getElementById(arr[1]).value;
  // query = arr[0]+'='+value0+"&"+arr[1]+'='+value1;
  console.warn('Запрос вида: '+query);
  xhr.open('GET','db_bridge.php?'+query, true)
  xhr.send();
  // document.getElementById('message').innerHTML=xhr.responseText;

  if (xhr.status != 200) {
    // обработать ошибку
   $('#message').html( xhr.status + ': ' + xhr.statusText );
  } else {
    // вывести результат
    $('#message').html( xhr.responseText ); // responseText -- текст ответа.
  }
  xhr.onreadystatechange = function() { // (3)
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
      $('#message').html(xhr.status + ': ' + xhr.statusText);
    } else {
      $('#message').html(xhr.responseText);
    }
  }
  el.hide();

}
