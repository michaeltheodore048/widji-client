var url = 'http://localhost:3030/radAPIeon';
var domain = 'http://localhost:3030/radAPIeon';
var token = "eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ";

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
      $('.number').text(obj.category+" "+obj.nomor_antrian);
      document.reload();
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
      token = 'mczal';
    }
  });
}

function checkCounter(ip){
  $.ajax({
    url: domain + '/checkIp',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      myIp:ip
    },
    success: function(response){
      obj = JSON.parse(response);
      if (obj.counter==-1) {
        window.location.assign("login.html");
      }else{
        $('.counterNumber').text(obj.counter);
      }
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
      token = 'mczal';
    }
  });
}

function login(ip){
  var counterNumber = $('input[name=counterNumber]').val();
  $.ajax({
    url: domain + '/login',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      myIp:ip,
      counter:counterNumber
    },
    success: function(response){
      obj = JSON.parse(response);
      if (obj.message="success registering ip with counter bro congrats") {
        window.location.assign("index.html");
      }
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
      token = 'mczal';
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
      token:"eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ"
    },
    success: function(response){
      obj = JSON.parse(response);
        $('.labela').text(obj.a);
        $('.labelb').text(obj.b);
        $('.labelc').text(obj.c);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
      token = 'mczal';
    }
  });
}

function nextCustomer(ip,category){
  $.ajax({
    url: domain + '/nextCustomer',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:"eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ",
      myIp:ip,
      category:category
    },
    success: function(response){
      obj = JSON.parse(response);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
      token = 'mczal';
    }
  });
}
