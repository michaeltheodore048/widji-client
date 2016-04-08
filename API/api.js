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
        $('.username').text(localStorage.getItem('username'));
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
  $.ajax({
    url: domain + '/login',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      myIp:localStorage.getItem('IP'),
      counter:$('input[name=counterNumber]').val(),
      username:$('input[name=username]').val(),
      password:$('input[name=password]').val()
    },
    success: function(response){
      obj = JSON.parse(response);
      if (obj.message == "success registering ip with counter bro congrats") {
        localStorage.setItem('session', obj.session);
        localStorage.setItem('counterNumber', $('input[name=counterNumber]').val());
        localStorage.setItem('username', $('input[name=username]').val());
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
      session:localStorage.getItem('session'),
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
      session: localStorage.getItem('session')
    },
    success: function(response){
      obj = JSON.parse(response);
      if (input != "get") {
        swal("Success", "Running Text Has Been Changed", "success");
      }
      $('#runningTextBox').val(obj.text);
      $('#running-text').text(obj.text);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function prepareOrderTable(input){
  var obj = JSON.parse(input);

  for (var i = 0; i < obj.count; i++) {
    orderRow(obj.content[i]);
  }

  var row = $("<tr />");
  $("#orderTable").append(row);
  row.append($("<td colspan='5'><span class='right'>DP:</span></td><td><label id='dp'></label></td>"));
  row = $("<tr />");
  $("#orderTable").append(row);
  row.append($("<td colspan='5'><span class='right'>Discount:</span></td><td><label id='disc'></label></td>"));
  row = $("<tr />");
  $("#orderTable").append(row);
  row.append($("<td colspan='5'><span class='right'>Total:</span></td><td><label id='total'></label></td>"));

  $('#dp').text(obj.dp);
  $('#disc').text(obj.disc);
  $('#total').text(obj.jumlah_bayar);
  $('#bonTextBox').val(obj.no_bon);

}

function orderRow(rowData) {
  var row = $("<tr />");

  $("#orderTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
  row.append($("<td>" + rowData.name + "</td>"));
  row.append($("<td>" + rowData.media + "</td>"));
  row.append($("<td>" + rowData.size + "</td>"));
  row.append($("<td>" + rowData.weight + "</td>"));
  row.append($("<td>" + rowData.quantity + "</td>"));
  row.append($("<td>" + rowData.price + "</td>"));
}
//
// function drawUserTable(data) {
//     for (var i = 0; i < data.length; i++) {
//         userRow(data[i]);
//     }
// }
//
// function deleteUser(src) {
//
//     var table = src.parentNode.parentNode.parentNode;
//     var row = src.parentNode.parentNode;
//     for(var i = table.rows.length; i--; )
//     {
//         if ( table.rows[i] == row )
//         {
//           if (table.rows[i].cells[1].innerHTML == "admin") {
//             alert("cant delete admin");
//           } else{
//             deleteUserCounter(table.rows[i].cells[0].innerHTML);
//             // alert(table.rows[i].cells[0].innerHTML);
//             table.deleteRow(i);
//           }
//         }
//     }
// }

function getUsers(){
  $.ajax({
    url: domain + '/getUsers',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      session:localStorage.getItem('session')
    },
    success: function(response){

      obj = JSON.parse(response);
      // drawUserTable(obj);
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
      session:localStorage.getItem('session'),
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
  $.ajax({
    url: domain + '/editAccount',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      session:localStorage.getItem('session'),
      usernameAdminType:$('#username').val(),
      passwordAdminType:$('#password').val(),
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

function logout(){
  $.ajax({
    url: domain + '/logout',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      session:localStorage.getItem('session')
    },
    success: function(response){
      obj = JSON.parse(response);
      if (obj.message == "success cuuuy" || obj.message == "success deleting session") {
        localStorage.setItem('session', "out");
        window.location.assign("login.html");
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

function loginAdmin(){
  $.ajax({
    url: domain + '/loginAdmin',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      usernameAdmin:$('input[name=username]').val(),
      passwordAdmin:$('input[name=password]').val()
    },
    success: function(response){
      obj = JSON.parse(response);
      if (obj.message == "success inserting session" || obj.message == "success updating session") {
        localStorage.setItem('session', obj.session);
        localStorage.setItem('username', $('input[name=username]').val());
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

function deleteUserCounter(input){
  $.ajax({
    url: domain + '/deleteUserCounter',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      session:localStorage.getItem('session'),
      usernameDelete:input
    },
    success: function(response){
      obj = JSON.parse(response);
      alert(obj.message);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function addNewMaterial(){
  $.ajax({
    url: domain + '/addNewMaterial',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      session:localStorage.getItem('session'),
      kodeBahan:$('#kodeBahan').val(),
      namaBahan:$('#namaBahan').val(),
      unit:$('#unit').val(),
      ukuranPerUnit:$('#ukuranPerUnit').val(),
      jumlahStok:$('#jumlahStok').val(),
      satuan:$('#satuan').val()
    },
    success: function(response){
      obj = JSON.parse(response);
      alert(obj.message);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function getMaterials(){
  $.ajax({
    url: domain + '/getMaterials',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token
    },
    success: function(response){
      obj = JSON.parse(response);
      // drawMaterialTable(obj);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function addMaterialStock(idMaterial,unitQuantity){
  $.ajax({
    url: domain + '/addStock',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      idMaterial:idMaterial,
      unitQuantity:unitQuantity
    },
    success: function(response){
      obj = JSON.parse(response);
      swal({
        title: "Done!",
        text: "Successfully added!",
        type: "success"
      },
      function(){
        location.reload();
      });
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

// function materialRow(rowData) {
//     var row = $("<tr />")
//     var btn = $("<td><button type='button' id='edit' class='btn btn-round btn-primary'><span class='fa fa-plus'/></button></td>")
//     $("#materialTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
//     row.append($("<td>" + rowData.material_code + "</td>"));
//     row.append($("<td>" + rowData.material_name + "</td>"));
//     row.append($("<td>" + rowData.smallest_unit + "</td>"));
//     row.append($("<td>" + rowData.stock_per_unit + "</td>"));
//     row.append($("<td>" + rowData.unit_name + "</td>"));
//     row.append($("<td>" + rowData.quantity + "</td>"));
//     if (window.location.pathname == "/C:/xampp/htdocs/widji-client/Storage/index.html") {
//       row.append(btn);
//     }
// }
//
// function drawMaterialTable(data) {
//     for (var i = 0; i < data.length; i++) {
//         materialRow(data[i]);
//     }
// }

function addNewProduct(){
  $.ajax({
    url: domain + '/addNewProduct',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      idCategory:$('#category').val(),
      media:$('#media').val(),
      size:$('#size').val(),
      weight:$('#weight').val(),
      imgbase64:$('#img').val(),
      sessionCode:localStorage.getItem('session'),
      price:$('#price').val()
    },
    success: function(response){
      obj = JSON.parse(response);
      alert(obj.message)
      // swal({
      //   title: "Done!",
      //   text: "Successfully added!",
      //   type: "success"
      // },
      // function(){
      //   location.reload();
      // });
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function createOrder(){
  $.ajax({
    url: domain + '/createOrder',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      sessionCode:localStorage.getItem('session'),
      name:$('#namaPelanggan').val(),
      phone:$('#telpPelanggan').val()
    },
    success: function(response){
      obj = JSON.parse(response);
      $('#bonTextBox').val(obj.no_bon);
      // document.getElementById('bonTextBox').disabled = true;
      alert(obj.message);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function createCustomerNonMember(){
  $.ajax({
    url: domain + '/createCustomerNonMember',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      sessionCode:localStorage.getItem('session'),
      name:$('#namaPelanggan').val(),
      phone:$('#telpPelanggan').val()
    },
    success: function(response){
      obj = JSON.parse(response);
      alert(obj.message);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function getAvailableProducts(idCategory, panelId){
  $.ajax({
    url: domain + '/getAvailableProducts',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      idCategory:idCategory
    },
    success: function(response){
      obj = JSON.parse(response);
      // alert(obj);
      fillThePanel(panelId,obj);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function makeRadioButton(name, value) {

  var label = document.createElement("label");
  var radio = document.createElement("input");
  var text = name;
  radio.type = "radio";
  radio.name = "product";
  radio.value = value;
  label.appendChild(radio);

  var div = document.createElement('div');
  div.className = "col-md-6";

  label.appendChild(document.createTextNode(text));
  div.appendChild(label)
  return div;

}

function fillThePanel(panelId,obj){
  var panel = document.getElementById(panelId);

  for (var i = 0; i < obj.length; i++) {
    var radioButton = makeRadioButton(obj[i].media + "-" + obj[i].size,obj[i].id);
    panel.appendChild(radioButton);
  }
}

function addOrderItem(idProduct, qtyId){
  $.ajax({
    url: domain + '/addOrderItem',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      sessionCode:localStorage.getItem('session'),
      no_bon:$('#bonTextBox').val(),
      idProduct:idProduct,
      quantity:$(qtyId).val()

    },
    success: function(response){
      obj = JSON.parse(response);
      alert(obj.message);
      $(qtyId).val("");
      refreshOrderDetails();
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function setOrderInfo(idProduct, quantity){
  $.ajax({
    url: domain + '/setOrderInfo',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      sessionCode:localStorage.getItem('session'),
      no_bon:$('#bonTextBox').val(),
      tanggalPengambilan:$('#date').val(),
      jamPengambilan:$('#time').val(),
      keterangan:$('#info').val()
    },
    success: function(response){
      obj = JSON.parse(response);
      alert(obj.message);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function getCustomers(){
  $.ajax({
    url: domain + '/getCustomers',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token
    },
    success: function(response){
      obj = JSON.parse(response);
      return obj;
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function checkCashier(){
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
      if (obj.counter == -1 && window.location == "file:///C:/xampp/htdocs/widji-client/Cashier/index.html") {
        window.location.assign("login.html");
      }else if (obj.counter != -1) {
        $('.cashierNumber').text(obj.counter);
        $('.username').text(localStorage.getItem('username'));
        $('input[name=cashierNumber]').val(obj.counter);
        $('input[name=username]').focus();
      }
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function loginCashier(){
  $.ajax({
    url: domain + '/login',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      myIp:localStorage.getItem('IP'),
      counter:$('input[name=cashierNumber]').val(),
      username:$('input[name=username]').val(),
      password:$('input[name=password]').val()
    },
    success: function(response){
      obj = JSON.parse(response);
      if (obj.message == "success registering ip with counter bro congrats") {
        localStorage.setItem('session', obj.session);
        localStorage.setItem('cashierNumber', $('input[name=cashierNumber]').val());
        localStorage.setItem('username', $('input[name=username]').val());
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

function refreshOrderDetails(){
  $.ajax({
    url: domain + '/getAllOrderItem',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      sessionCode:localStorage.getItem('session'),
      no_bon:$('#bonTextBox').val()
    },
    success: function(response){
      obj = JSON.parse(response);
      drawOrderTable(obj.content);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
}

function drawOrderTable(data) {
  $("#tableBody").empty();
    for (var i = 0; i < data.length; i++) {
        orderRow(data[i]);
    }
}

function orderRow(rowData) {
    var row = $("<tr />")
    var btn = $("<td><center><input type='button' id='delete' class='btn btn-danger' value='Delete'></center></td>")
    $("#listPesanan").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rowData.id_order_item + "</td>"));
    row.append($("<td>" + rowData.name + "-" + rowData.media + " " + rowData.size + "</td>"));
    row.append($("<td>" + rowData.quantity + "</td>"));
    row.append(btn);
}

var tableListPesanan = $("#listPesanan");

tableListPesanan.on('click', '#delete', function (e) {
  var nRow = $(this).parents('tr')[0];

  $.ajax({
    url: domain + '/deleteItemOrder',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      sessionCode: localStorage.getItem('session'),
      no_bon:$('#bonTextBox').val(),
      idOrderItem:nRow.cells[0].innerHTML
    },
    success: function(response){
      obj = JSON.parse(response);
      nRow.remove();
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });

});
