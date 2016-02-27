var url = 'http://localhost:3030/radAPIeon';
var domain = 'http://localhost:3030/radAPIeon';
var token = "eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ";
var nomorKonter;
// localStorage.IP = 'konter1';
localStorage.setItem('IP', 'konter');

function newEntry(category){
  $.ajax({
    url: domain + '/newEntry',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      category:category
    },
    success: function(response){
      obj = JSON.parse(response);
      obj.category != undefined && $('.number').text(obj.category+" "+obj.nomor_antrian);
      document.reload();
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}


function checkCounter(){
  $.ajax({
    url: domain + '/checkIp',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      myIp:localStorage.getItem('IP')
    },
    success: function(response){
      obj = JSON.parse(response);
      if (obj.counter == -1 && window.location == "file:///C:/xampp/htdocs/widji-client/Counter/index.html") {
        window.location.assign("login.html");
      }else if (obj.counter != -1) {
        $('.counterNumber').text(obj.counter);
        $('input[name=counterNumber]').val(obj.counter);
        $('input[name=username]').focus();
      }
  		nomorKonter = new Audio('asset/sound/' + localStorage.getItem('counterNumber') + '.mp3');
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function login(){
  localStorage.setItem('counterNumber', $('input[name=counterNumber]').val());
  localStorage.setItem('username', $('input[name=username]').val());
  localStorage.setItem('password', $('input[name=password]').val());
  $.ajax({
    url: domain + '/login',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      myIp:localStorage.getItem('IP'),
      counter:localStorage.getItem('counterNumber'),
      username:localStorage.getItem('username'),
      password:localStorage.getItem('password')
    },
    success: function(response){
      obj = JSON.parse(response);
      if (obj.message == "success registering ip with counter bro congrats") {
        window.location.assign("index.html");
      }else{
        alert(obj.message);
      }
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function refreshAntrian(){
  $.ajax({
    url: domain + '/queueByCategoryCount',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token
    },
    success: function(response){
      obj = JSON.parse(response);
      obj.a != "undefined" && $('.labela').text(obj.a);
      obj.b != "undefined" && $('.labelb').text(obj.b);
      obj.c != "undefined" && $('.labelc').text(obj.c);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function nextCustomer(ip,category){
  var nomor = document.getElementById("nomor");
  var jenis = document.getElementById("jenis");

  $.ajax({
    url: domain + '/nextCustomer',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      category:category,
      username:localStorage.getItem('username'),
      ipCounter:ip
    },
    success: function(response){
      obj = JSON.parse(response);
      nomor.src = 'asset/sound/' + obj.nomor_antrian + '.mp3';
      jenis.src = 'asset/sound/' + obj.category + '.mp3';
      nomor.load();
      jenis.load();
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    refreshAntrian();
    }
  });
}

function display(){
  $.ajax({
    url: domain + '/display',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token
    },
    success: function(response){
      obj = JSON.parse(response);
      obj.category_1 != undefined && $('#antrian1').text(obj.category_1 + " " + obj.nomor_antrian_1);
      obj.counter_1 != undefined && $('#counter1').text(obj.counter_1);
      obj.category_2 != undefined && $('#antrian2').text(obj.category_2 + " " + obj.nomor_antrian_2);
      obj.counter_2 != undefined && $('#counter2').text(obj.counter_2);
      obj.category_3 != undefined && $('#antrian3').text(obj.category_3 + " " + obj.nomor_antrian_3);
      obj.counter_3 != undefined && $('#counter3').text(obj.counter_3);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function setAndGetText(input){
  $.ajax({
    url: domain + '/setAndGetText',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      text: input,
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password')
    },
    success: function(response){
      obj = JSON.parse(response);
      $('#running-text').text(obj.text);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function drawRow(rowData) {
    var row = $("<tr />")
    var btn = $("<td><button type='button' id='del' class='btn btn-round btn-danger'><span class='fa fa-trash'/></button></td>")
    $("#userTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rowData.id_counter + "</td>"));
    row.append($("<td>" + rowData.counter_name + "</td>"));
    row.append(btn);
}

function drawTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
}

function tes(){
  $.ajax({
    url: domain + '/testJson',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token
    },
    success: function(response){
      obj = JSON.parse(response);
      drawTable(obj);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function addAccount(){
  var usernameAdmin =	localStorage.getItem('username');
  var passwordAdmin =	localStorage.getItem('password');

  $.ajax({
    url: domain + '/createUser',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      usernameAdmin:'tes',
      password:'123',
      newUsername:$('#username').val(),
      newPassword:$('#password').val(),
      role:$('#role option:selected').val()
    },
    success: function(response){
      obj = JSON.parse(response);
      $('#username').val("");
      $('#password').val("");
      alert(obj.message);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function editAccount(){
  var usernameAdmin =	localStorage.getItem('username');
  var passwordAdmin =	localStorage.getItem('password');

  $.ajax({
    url: domain + '/editAccount',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      usernameLocal:localStorage.getItem('username'),
      passwordLocal:'123',
      usernameType:$('#username').val(),
      passwordType:$('#password').val(),
      newPassword:$('#newPassword').val(),
      confirmation:$('#confPassword').val()
    },
    success: function(response){
      obj = JSON.parse(response);
      localStorage.setItem('username', $('#username').val());
      alert(obj.message);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}
