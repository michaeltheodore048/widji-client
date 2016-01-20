var url = 'http://localhost:3000/radAPIeon';
var domain = 'http://localhost:3000/radAPIeon';
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
      // alert(obj.nomor_antrian);
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
