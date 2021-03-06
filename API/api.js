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
      if (obj.counter == -1 && window.location == "localhost/widji-client/Counter/index.html") {
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
      // console.log(obj);
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
  if (input == "get") {
    $.ajax({
      url: domain + '/setAndGetText',
      dataType: 'text',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {
        token:token
      },
      success: function(response){
        obj = JSON.parse(response);
        $('#runningTextBox').val(obj.text);
        $('#running-text').text(obj.text);
      },
      error: function(xhr, status, error){
      },
      complete: function(){
      }
    });
  }else{
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
        swal("Success", "Running Text Has Been Changed", "success");
      },
      error: function(xhr, status, error){
        alert(error);
      },
      complete: function(){
      }
    });
  }
}

function prepareOrderTable(input){
  var obj = JSON.parse(input);
  for (var i = 0; i < obj.count; i++) {
    drawOrderRow(obj.content[i]);
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
  row = $("<tr />");
  $("#orderTable").append(row);
  row.append($("<td colspan='5'><span class='right'>Uang yang dibayarkan:</span></td><td><label id='paid'></label></td>"));
  row = $("<tr />");
  $("#orderTable").append(row);
  row.append($("<td colspan='5'><span class='right'>Kembalian:</span></td><td><label id='kembalian'></label></td>"));
  row = $("<tr />");
  $("#orderTable").append(row);
  row.append($("<td colspan='5'><span class='right'>Sisa:</span></td><td><label id='sisa'></label></td>"));

  $('#dp').text(obj.dp);
  $('#disc').text(obj.disc);
  $('#total').text(obj.jumlah_bayar);
  if (obj.dp == undefined) {
    $("#sisa").text();
  }else{
    $('#sisa').text(Number(obj.jumlah_bayar-obj.dp));
  }
  $('#tgl').val(obj.createdAt.substring(0,10));

  localStorage.setItem('customer_id',obj.customer_id);

}

function drawOrderRow(rowData) {
  var row = $("<tr />");

  $("#orderTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
  row.append($("<td>" + rowData.name + "</td>"));
  row.append($("<td>" + rowData.media + "</td>"));
  row.append($("<td>" + rowData.size + "</td>"));
  row.append($("<td>" + rowData.weight + "</td>"));
  row.append($("<td>" + rowData.quantity + "</td>"));
  row.append($("<td>" + rowData.price + "</td>"));
}

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
        // alert(obj.message);
        alert("cek");
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

function addNewProduct(input){
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
      imgbase64:input,
      sessionCode:localStorage.getItem('session'),
      price:$('#price').val()
    },
    success: function(response){
      obj = JSON.parse(response);
      alert(obj.message)
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
      refreshOrderDetails($('#bonTextBox').val());
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

function refreshOrderDetails(bon){
  $.ajax({
    url: domain + '/getAllOrderItem',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      sessionCode:localStorage.getItem('session'),
      no_bon:bon
    },
    success: function(response){
      obj = JSON.parse(response);
      drawOrderTable(obj);
      console.log(obj);
      if (obj.tanggalPengambilan != undefined) {
        $("#date").val(obj.tanggalPengambilan.substring(0,10));
      }

      if (obj.createdAt != undefined) {
        $("#tgl").val(obj.createdAt.substring(0,10));
      }

      $("#bonTextBox").val(bon);
      $("#namaPelanggan").val(obj.order_name);
      $("#telpPelanggan").val(obj.phone);
      $("#time").val(obj.jamPengambilan);
      $("#info").val(obj.keterangan);
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
    for (var i = 0; i < data.count; i++) {
        orderRow(data.content[i]);
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

function fillMatsCombobox(){
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
     drawMatsCombobox(obj);
   },
   error: function(xhr, status, error){
     alert(error);
   },
   complete: function(){
   }
 });
}

function drawMatsCombobox(mats){
  var box = $(".materialComboBox");
  for (var i = 0; i < mats.length; i++) {
  	box.append("<option value='" + mats[i].id_material + "'>" + mats[i].material_name + "</option>");
  }
}

function addProductMaterial(){
 $.ajax({
   url: domain + '/addProductMaterial',
   dataType: 'text',
   method: 'POST',
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   data: {
     token:token,
     idProduct:localStorage.getItem('currIdProd'),
     idMaterial:$(".materialComboBox").val(),
     materialQuantity:$("#qty").val(),
     sessionCode:localStorage.getItem('session')
   },
   success: function(response){
     obj = JSON.parse(response);
   },
   error: function(xhr, status, error){
     alert(error);
   },
   complete: function(){
     window.location.assign("addProductMaterials.html");
   }
 });
}

function getProductDetail(input){
 $.ajax({
   url: domain + '/getProductDetail',
   dataType: 'text',
   method: 'POST',
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   data: {
     token:token,
     idProduct:input
   },
   success: function(response){
     obj = JSON.parse(response);
     $('#idProduct').text(obj.idProduct);
     $('#productName').text(obj.productMedia + "-" + obj.productSize);
   },
   error: function(xhr, status, error){
     alert(error);
   },
   complete: function(){
   }
 });
}

function getDisc(input){
 $.ajax({
   url: domain + '/discountMember',
   dataType: 'text',
   method: 'POST',
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   data: {
     token:token,
     sessionCode:localStorage.getItem('session'),
     no_bon:$("#bonTextBox").val(),
     membershipCode:input
   },
   success: function(response){
     obj = JSON.parse(response);
     $("#total").text(obj.priceAfterDiscount);
     $("#disc").text(obj.discount);
   },
   error: function(xhr, status, error){
     alert(error);
   },
   complete: function(){
   }
 });
}


var dp = 0,
disc = 0,
total = 0,
paid = 0,
kembalian = 0,
sisa = 0,
info = "-",
jam = "00:00",
tgl = "--/--/----"
function pay(input){

  var temp = input
  if (Number(input) > Number($('#total').text())) {
    temp = $('#total').text();
  }

 $.ajax({
   url: domain + '/pay',
   dataType: 'text',
   method: 'POST',
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   data: {
     token:token,
     sessionCode:localStorage.getItem('session'),
     no_bon:$("#bonTextBox").val(),
     jumlahBayar:temp
   },
   success: function(response){
     obj = JSON.parse(response);
     if (obj.status === "DP") {
       $("#dp").text(input);
       $("#sisa").text(Number($("#total").text() - input));
       dp = input;
       sisa = Number($("#total").text() - input);
     }else{
       $("#sisa").text(sisa);
       $("#paid").text(input);
       paid = input;
     }

     if (Number(input) > Number($("#total").text())) {
       $("#kembalian").text(Number(input-$("#total").text()));
       kembalian = Number(input-$("#total").text());
     }else{
       $("#kembalian").text("0");
       kembalian = 0;
     }

     if ($("#disc").text() != "") {
       disc = $("#disc").text();
     }else{
       $("#disc").text(disc);
     }

     total = $("#total").text();

     if ($("#info").val() != "") {
       info = $("#info").val();
     }

     if ($('#date').val() != "") {
       tgl = $('#date').val();
     }

     if ($('#time').val() != "") {
       jam = $('#time').val();
     }

     urlPath = "?dp=" + dp + "&paid=" + paid + "&disc=" + disc + "&total=" + total + "&kembalian=" + kembalian + "&sisa=" +
     sisa + "&nobon=" + $("#bonTextBox").val() + "&info=" + info + "&cust=" + $("#namaPelanggan").val() + "&cashier=" +
     localStorage.getItem('username') + "&tglambil=" + tgl + "&jamambil=" + jam;
      },
   error: function(xhr, status, error){
     alert(error);
   },
   complete: function(){
   }
 });
}

function registerMember(){
 $.ajax({
   url: domain + '/registerMember',
   dataType: 'text',
   method: 'POST',
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   data: {
     token:token,
     sessionCode:localStorage.getItem('session'),
     name:$("#nama").val(),
     idCustomer:localStorage.getItem('customer_id'),
     email:$("#email").val(),
     membership:$("#membership").val(),
     birthdate:$("#birthdate").val()
   },
   success: function(response){
     obj = JSON.parse(response);
     JsBarcode("#bcTarget", obj.membershipId, {
       format: "auto",
       width:2,
       height:40,
       displayValue: false
     });
     function download() {
       var dt = canvas.toDataURL();
       this.href = dt;
     }

     var canvas = document.getElementById('bcTarget');
     document.getElementById('download').style.display = "block";
     document.getElementById('download').addEventListener('click', download, false);
   },
   error: function(xhr, status, error){
     alert(error);
   },
   complete: function(){
   }
 });
}

function registerMemberOnly(){
 $.ajax({
   url: domain + '/registerMemberOnly',
   dataType: 'text',
   method: 'POST',
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   data: {
     token:token,
     sessionCode:localStorage.getItem('session'),
     phone:$("#noTlp").val(),
     name:$("#nama").val(),
     email:$("#email").val(),
     membershipId:$("#membership").val(),
     birthdate:$("#birthdate").val()
   },
   success: function(response){
     obj = JSON.parse(response);
     JsBarcode("#bcTarget", obj.membershipId, {
       format: "auto",
       width:2,
       height:40,
       displayValue: false
     });
     function download() {
       var dt = canvas.toDataURL();
       this.href = dt;
     }

     var canvas = document.getElementById('bcTarget');
     document.getElementById('download').style.display = "block";
     document.getElementById('download').addEventListener('click', download, false);
   },
   error: function(xhr, status, error){
     alert(error);
   },
   complete: function(){
   }
 });
}

function fillMembership(){
 $.ajax({
   url: domain + '/getAllMemberType',
   dataType: 'text',
   method: 'POST',
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   data: {
     token:token
   },
   success: function(response){
     obj = JSON.parse(response);
     drawMembershipCombobox(obj.content);
   },
   error: function(xhr, status, error){
     alert(error);
   },
   complete: function(){
   }
 });
}

function drawMembershipCombobox(member){
  var box = $(".membership");
  for (var i = 0; i < member.length; i++) {
  	box.append("<option value='" + member[i].id + "'>" + member[i].name + "</option>");
  }
}

function editDiscountMembership(){
 $.ajax({
   url: domain + '/editDiscountMembership',
   dataType: 'text',
   method: 'POST',
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   data: {
     token:token,
     idMembership:$(".membership").val(),
     sessionCode:localStorage.getItem('session'),
     newDiscount:$("#disc").val()
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

function prepareBon(data){

  var date = new Date().toString();
  var url = window.location.href

  var tglambilUrl = /tglambil=([^&]+)/.exec(url)[1];
  var tglambil = tglambilUrl ? tglambilUrl : 'myDefaultValue';

  var jamambilUrl = /jamambil=([^&]+)/.exec(url)[1];
  var jamambil = jamambilUrl ? jamambilUrl : 'myDefaultValue';

  var dpUrl = /dp=([^&]+)/.exec(url)[1];
  var dp = dpUrl ? dpUrl : 'myDefaultValue';

  var discUrl = /disc=([^&]+)/.exec(url)[1];
  var disc = discUrl ? discUrl : 'myDefaultValue';

  var totalUrl = /total=([^&]+)/.exec(url)[1];
  var total = totalUrl ? totalUrl : 'myDefaultValue';

  var paidUrl = /paid=([^&]+)/.exec(url)[1];
  var paid = paidUrl ? paidUrl : 'myDefaultValue';

  var kembalianUrl = /kembalian=([^&]+)/.exec(url)[1];
  var kembalian = kembalianUrl ? kembalianUrl : 'myDefaultValue';

  var sisaUrl = /sisa=([^&]+)/.exec(url)[1];
  var sisa = sisaUrl ? sisaUrl : 'myDefaultValue';

  var nobonUrl = /nobon=([^&]+)/.exec(url)[1];
  var nobon = nobonUrl ? nobonUrl : 'myDefaultValue';

  var infoUrl = /info=([^&]+)/.exec(url)[1];
  var info = infoUrl ? infoUrl : 'myDefaultValue';

  var custUrl = /cust=([^&]+)/.exec(url)[1];
  var cust = custUrl ? custUrl : 'myDefaultValue';

  var cashierUrl = /cashier=([^&]+)/.exec(url)[1];
  var cashier = cashierUrl ? cashierUrl : 'myDefaultValue';

  var obj = JSON.parse(data);
  for (var i = 0; i < obj.count; i++) {
    drawBonRow(obj.content[i]);
  }

  if (Number(dp) != Number(0)) {
    var row = $("<tr />");
    $('#status').text("DP");
    $("#orderTable").append(row);
    row.append($("<td colspan='2'><span class='right'>DP:</span></td><td><label id='dp'></label></td>"));
  }else{
    $('#status').text("LUNAS");
  }

  if (Number(disc) != Number(0)) {
    row = $("<tr />");
    $("#orderTable").append(row);
    row.append($("<td colspan='2'><span class='right'>Discount:</span></td><td><label id='disc'></label></td>"));
  }

  if (Number(total) != Number(0)) {
    row = $("<tr />");
    $("#orderTable").append(row);
    row.append($("<td colspan='2'><span class='right'>Total:</span></td><td><label id='total'></label></td>"));
  }

  if (Number(paid) != Number(0)) {
    row = $("<tr />");
    $("#orderTable").append(row);
    row.append($("<td colspan='2'><span class='right'>Uang yang dibayarkan:</span></td><td><label id='paid'></label></td>"));
  }

  if (Number(kembalian) != Number(0)) {
    row = $("<tr />");
    $("#orderTable").append(row);
    row.append($("<td colspan='2'><span class='right'>Kembalian:</span></td><td><label id='kembalian'></label></td>"));
  }

  if (Number(sisa) != Number(0)) {
    row = $("<tr />");
    $("#orderTable").append(row);
    row.append($("<td colspan='2'><span class='right'>Sisa:</span></td><td><label id='sisa'></label></td>"));
  }

  $('#dp').text(dp);
  $('#disc').text(disc);
  $('#total').text(total);
  $('#paid').text(paid);
  $('#kembalian').text(kembalian);
  $('#sisa').text(sisa);
  $('#nobon').text(nobon);
  $('#info').text(unescape(info));
  $('#cust').text(cust);
  $('#cashier').text(cashier);
  $('#operator').text();
  $('#tglambil').text(tglambil);
  $('#jamambil').text(jamambil);
  $('#tgl').text(date.substring(3,16));
  $('#jam').text(date.substring(16,24));

}

function drawBonRow(rowData) {
  var row = $("<tr />");

  $("#orderTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
  row.append($("<td>" + rowData.media + "-" + rowData.size + "</td>"));
  row.append($("<td>" + rowData.quantity + "</td>"));
  row.append($("<td>" + rowData.price + "</td>"));
}


function newWindow(){
  window.open('bonPrint.html'+urlPath, 'newwindow', 'width=450, height=650');
}

function deleteBon(input){
 $.ajax({
   url: domain + '/deleteOrder',
   dataType: 'text',
   method: 'POST',
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   data: {
     token:token,
     no_bon:$("#bonTextBox").val(),
     sessionCode:localStorage.getItem('session'),
     passAdmin:input
   },
   success: function(response){
     obj = JSON.parse(response);
     if (obj.message == "err.. no rows on usr while p_a c") {
       swal.showInputError("Wrong password!");
       return false
     }else if (obj.error == "success") {
        swal("Nice!", "Order has been deleted", "success");
        location.reload();
     }
   },
   error: function(xhr, status, error){
     alert(error);
   },
   complete: function(){
   }
 });
}

function newWindowMonitor(nobon){
  $.ajax({
    url: 'http://localhost:3030/radAPIeon/getOrderItem',
    dataType: 'text',
    method: 'POST',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {
      token:token,
      no_bon:nobon
    },
    success: function(response){
      obj = JSON.parse(response);
      console.log(obj);
      localStorage.setItem('objSpk',response);
    },
    error: function(xhr, status, error){
      alert(error);
    },
    complete: function(){
    }
  });
    window.open('monitorPrint.html', 'newwindow', 'width=450, height=650');
}

function prepareMonitor(){
 $.ajax({
   url: domain + '/deadlineMonitor',
   dataType: 'text',
   method: 'POST',
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   data: {
     token:token
   },
   success: function(response){
     obj = JSON.parse(response);
     drawMonitoringTable(obj.content);
   },
   error: function(xhr, status, error){
     alert(error);
   },
   complete: function(){
   }
 });
}

function monitoringRow(rowData) {
  if (rowData.selisih > 0 && rowData.selisih <= 14 && rowData.selisih != null) {
    var row = $("<tr />")
    var dropdown = $("<select class='form-control' id='" + rowData.no_bon + "' ><option value='0' id='antri'>Antri</option><option value='1' id='kerja'>Sedang dikerjakan</option><option value='2' id='selesai'>Selesai</option></select>");
    $("#monitoringTable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rowData.no_bon + "</td>"));
    setTimeout(getOrderItem(rowData.no_bon), 1);
    row.append($("<td> " + localStorage.getItem('rincianjob') + " </td>"));
    row.append($("<td>" + rowData.keterangan + "</td>"));
    row.append(dropdown);

    for (var i = 0; i < 14; i++) {
      if (i+1 == rowData.selisih) {
        row.append($("<td>x</td>"))
      }else{
        row.append($("<td></td>"))
      }
    }

    row.append($("<td>" + rowData.tanggal_pengambilan.substring(0,10) + "</td>"));
    row.append($("<td><a href='#' onclick='return false;'><span class='fa fa-2x fa-print'></span></a></td>"));
    $(row[0].cells[2].nextSibling).prop('selectedIndex',rowData.status_pengerjaan);
    if (rowData.status_pengerjaan == 0 ) {
      row[0].cells[2].nextSibling.className = 'red';
    }else if (rowData.status_pengerjaan == 1 ) {
      row[0].cells[2].nextSibling.className = 'yellow';
    }else if (rowData.status_pengerjaan == 2) {
      row[0].cells[2].nextSibling.className = 'green';
    }
  }
}

function drawMonitoringTable(data) {
    for (var i = 0; i < data.length; i++) {
        monitoringRow(data[i]);
    }
}

function colorMonitoringTable(nobon, color){
  var cell = document.getElementById('nobon');
  if (color == 0) {
    cell.style.background = "#FFFFCC";
  }else if (color == 1) {
    cell.style.background = "#CCFFFF";
  }else if (color == 2){
    cell.style.background = "#CCFFCC";
  }
}

function updateColor(value,nobon){
  var cell = $('#'+nobon);
  if (value == 0) {
    cell.style.background = "#FFFFCC";
  }else if (value == 1) {
    cell.style.background = "#CCFFFF";
  }else if (value == 2){
    cell.style.background = "#CCFFCC";
  }
}

function changeStatusToOnProgress(nobon, worker){
 $.ajax({
   url: domain + '/changeStatusToOnProgress',
   dataType: 'text',
   method: 'POST',
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   data: {
     token:token,
     no_bon:nobon,
     worker:worker
   },
   success: function(response){
     obj = JSON.parse(response);
   },
   error: function(xhr, status, error){
     alert(error);
   },
   complete: function(){
   }
 });
}

function changeStatusToDone(nobon, rak){
 $.ajax({
   url: domain + '/changeStatusToDone',
   dataType: 'text',
   method: 'POST',
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   data: {
     token:token,
     no_bon:nobon,
     laci:rak
   },
   success: function(response){
     obj = JSON.parse(response);
   },
   error: function(xhr, status, error){
     alert(error);
   },
   complete: function(){
   }
 });
}

function getOrderItem(nobon){
 $.ajax({
   async: false,
   url: domain + '/getOrderItem',
   dataType: 'text',
   method: 'POST',
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   data: {
     token:token,
     no_bon:nobon
   },
   success: function(response){
     obj = JSON.parse(response);
     var res ="";
     for (var i = 0; i < obj.content.length; i++) {
       res += obj.content[i].quantity + "x " + obj.content[i].media + "-" + obj.content[i].size + "  ";
     }
    localStorage.setItem('rincianjob',res);
   },
   error: function(xhr, status, error){
     alert(error);
   },
   complete: function(){
   }
 });
}

function minItemsBon(nobon){
 $.ajax({
   async: false,
   url: domain + '/getOrderItem',
   dataType: 'text',
   method: 'POST',
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   data: {
     token:token,
     no_bon:nobon
   },
   success: function(response){
     obj = JSON.parse(response);
     for (var i = 0; i < obj.content.length; i++) {
       console.log("min items:" + nobon + " " + obj.content[i].id_order_item);
       minItem(nobon, obj.content[i].id_order_item);
     }
   },
   error: function(xhr, status, error){
     alert(error);
   },
   complete: function(){
   }
 });
}

function minItem(nobon,idOrderItem){
 $.ajax({
   async: false,
   url: domain + '/associateOrderItemAndStocks',
   dataType: 'text',
   method: 'POST',
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
   data: {
     token:token,
     no_bon:nobon,
     idOrderItem:idOrderItem
   },
   success: function(response){
     obj = JSON.parse(response);
     console.log(obj);
   },
   error: function(xhr, status, error){
     alert(error);
   },
   complete: function(){
   }
 });
}
