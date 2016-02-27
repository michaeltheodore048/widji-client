var url = 'http://52.76.73.21:3000/api';
var url2 = 'http://52.76.211.241:3000/api';
var things = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTI0ODM4OTd9.u89Rk5KYnbLAcsGB-FasVKrIgIJQIaKrRaym4hm7r_0';
var things2 = '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NTI0ODM4OTd9.u89Rk5KYnbLAcsGB-FasVKrIgIJQIaKrRaym4hm7r_0';

// var test = 0;
$.get(url+'/driverC'+things2).success(function(data1){
    $('.nomorAntri').text(data1.message.length);
});
