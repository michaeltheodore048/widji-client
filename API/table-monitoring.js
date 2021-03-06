var token = "eyJhbGciOiJIUzI1NiJ9.dXNlcg.2Tbs8TkRGe7ZNu4CeiR5BXpK7-MMQZXc6ZTOLZiBoLQ";
var TableEditable = function () {

    var handleTable = function () {

        function restoreRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);

            // for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
            //     oTable.fnUpdate(aData[i], nRow, i, false);
            // }
            // oTable.fnDraw();
            jqTds[0].innerHTML = aData.material_code;
            jqTds[1].innerHTML = aData.material_name;
            jqTds[2].innerHTML = aData.smallest_unit;
            jqTds[3].innerHTML = aData.stock_per_unit;
            jqTds[4].innerHTML = aData.unit_name;
            jqTds[5].innerHTML = aData.quantity;
            jqTds[6].innerHTML = '<a class="add" href="javascript:;">Add</a>';

        }

        function editRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);
            jqTds[0].innerHTML = '<input type="text" class="form-control input-small" value="' + aData._id + '" disabled>';
            jqTds[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData.name + '">';
            jqTds[2].innerHTML = '<input type="text" class="form-control input-small" value="' + aData.nfcid + '">';
            jqTds[3].innerHTML = '<a class="cancel" href="">cancel</a>';
            jqTds[4].innerHTML = '<a class="edit" href="">Save</a>';
            // jqTds[5].innerHTML = ;
        }

        function addRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);
            jqTds[0].innerHTML = '<input type="text" class="form-control input-small" disabled>';
            jqTds[1].innerHTML = '<input type="text" class="form-control input-small">';
            jqTds[2].innerHTML = '<input type="text" class="form-control input-small">';
            jqTds[3].innerHTML = '<a class="cancel" href="">cancel</a>';
            jqTds[4].innerHTML = '<a class="babi" href="">Save</a>';
            // jqTds[5].innerHTML = ;
        }

        function saveRow(oTable, nRow) {
            var jqInputs = $('input', nRow);
            // alert(jqInputs[0].value);
            oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
            oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
            oTable.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 4, false);
            oTable.fnUpdate('<a class="delete" href="">Delete</a>', nRow, 5, false);
            oTable.fnDraw();
        }

        function cancelEditRow(oTable, nRow) {
            var jqInputs = $('input', nRow);
            console.log(jqInputs);
            oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
            oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
            oTable.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 4, false);
            oTable.fnUpdate('<a class="delete" href="">Delete</a>', nRow, 4, false);
            oTable.fnDraw();
        }

        var table = $("#monitoringTable");

        var obj;
        var oTable = table.dataTable({

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js).
            // So when dropdowns used the scrollable div should be removed.
            //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},

            // set the initial value
            "pageLength": 5,

            "language": {
                "lengthMenu": " _MENU_ records"
            },
            "columnDefs": [{ // set default column settings
                'orderable': false,
                'targets': [0]
            }, {
                "searchable": true,
                "targets": [0]
            }],
            "order": [
                [5, "desc"]
            ], // set first column as a default sort by asc

            "ajax": { // define ajax settings
              "url": "http://localhost:3030/radAPIeon/getAllOrders", // ajax URL
              "type": "POST", // request type
              "timeout": 20000,
              "data": function(data) { // add request parameters before submit
                  data.token = token,
                  data.sessionCode = localStorage.getItem('session');
              },
              "dataSrc": function (json) {
               return json.content;
              }
            },
            "columns": [
              {data: 'status', className: "no_bon"},
              {data: 'no_bon'},
              {data: 'name'},
              {data: 'jumlah_bayar'},
              {data: 'created_at'},
              {data: 'created_at'},
              {
                data: null,
                defaultContent: '<a class="print" href="#">Print</a> <a class="update" href="#">Update</a> <a class="finish" href="#">Finish</a>',
                orderable: false
              }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
              console.log(aData.name);
              if (aData.name == "jonjon") {
                $(nRow).addClass('blah');
              }
              else {
                $(nRow).addClass('bleh');
              }
            }
        });

        table.on( 'xhr', function () {
            var json = table.ajax.json();
            alert(' row(s) were loaded' );
        } );

        var tableWrapper = $("#sample_editable_1_wrapper");

        // tableWrapper.find(".dataTables_length select").select2({
        //     showSearchInput: false //hide search box with special css class
        // }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

        $('#sample_editable_1_new').click(function (e) {
            e.preventDefault();
            alert = function() {};

            if (nNew && nEditing) {
                if (confirm("Previose row not saved. Do you want to save it ?")) {
                    saveRow(oTable, nEditing); // save
                    $(nEditing).find("td:first").html("Untitled");
                    nEditing = null;
                    nNew = false;

                } else {
                    oTable.fnDeleteRow(nEditing); // cancel
                    nEditing = null;
                    nNew = false;

                    return;
                }
            }

            var aiNew = oTable.fnAddData(['', '', '', '', '', '']);
            var nRow = oTable.fnGetNodes(aiNew[0]);
            addRow(oTable, nRow);
            // editRow(oTable, nRow);
            nEditing = nRow;
            nNew = true;
        });

        table.on('click', '.change', function (e) {

            var nRow = $(this).parents('tr')[0];

            var status;
            if (nRow.cells[4].innerHTML == 0) {
              status = 1;
            }else{
              status = 0;
            }

            $.ajax({
              url: 'http://localhost:3030/radAPIeon/changeAvailabilityProduct',
              dataType: 'text',
              method: 'POST',
              contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
              data: {
                token:token,
                sessionCode: localStorage.getItem('session'),
                status:status,
                idProduct:nRow.cells[0].innerHTML
              },
              success: function(response){
                obj = JSON.parse(response);
              },
              error: function(xhr, status, error){
                alert(error);
              },
              complete: function(){
                window.location.assign('jbProducts.html');
              }
            });
        });

        table.on('click', '.update', function (e) {
            var nRow = $(this).parents('tr')[0];

            swal({
              title: "Input operator name!",
              text: "Operator name:",
              type: "input",
              showCancelButton: true,
              closeOnConfirm: false,
              animation: "slide-from-top"
            },
            function(inputValue){
              if (inputValue === false) return false;
              if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false
              }
              swal("Nice!", "You wrote: " + inputValue, "success"); });

        });

        table.on('click', '.finish', function (e) {

            swal({
              title: "Input rack number!",
              text: "Rack number:",
              type: "input",
              showCancelButton: true,
              closeOnConfirm: false,
              animation: "slide-from-top"
            },
            function(inputValue){
              if (inputValue === false) return false;
              if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false
              }
              swal("Nice!", "You wrote: " + inputValue, "success"); });

        });

        table.on('click', '.print', function (e) {
            newWindowMonitor();
        });

        table.on('click', '.delete', function (e) {
            e.preventDefault();

            if (confirm("Are you sure to delete this row ?") == false) {
                return;
            }

            var nRow = $(this).parents('tr')[0];
            oTable.fnDeleteRow(nRow);
            // console.log(nRow.cells[2].innerHTML);
            $.ajax({
               url:'https://188.166.247.55:8080/handshake',
               dataType: 'text',
               method: 'POST',
               contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
               success: function(response){
                 obj = JSON.parse(response);
                 //obj.token
                   $.ajax({
                    url: 'https://188.166.247.55:8080/deleteEmployee',
                    dataType: 'text',
                    method: 'POST',
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data: {
                      session: localStorage.getItem('session'),
                      nfcid:nRow.cells[2].innerHTML,
                      token:obj.token
                    },
                    success: function(response){
                      obj = JSON.parse(response);
                      var temp = nRow.cells[1].innerHTML+" telah dihapus!";
                      if (obj.message == temp) {
                        alert(temp);
                        window.location.assign('table_editable');
                      }
                    },
                    error: function(xhr, status, error){
                      alert(error);
                    },
                    complete: function(){
                    }
                  });
               },
               error: function(xhr, status, error){
                 alert(error);
               },
               complete: function(){
               }
             });
        });

        table.on('click', '.cancel', function (e) {
            e.preventDefault();
            if (nNew) {
                oTable.fnDeleteRow(nEditing);
                nEditing = null;
                nNew = false;
            } else {
                restoreRow(oTable, nEditing);
                nEditing = null;
            }
        });

        table.on('click', '.babi', function (e) {
            e.preventDefault();
            var nRow = $(this).parents('tr')[0];
            var jqTds = $('input', nRow);
            var aData = oTable.fnGetData(nRow);

            // console.log(jqTds[1].value);
            $.ajax({
               url:'https://188.166.247.55:8080/handshake',
               dataType: 'text',
               method: 'POST',
               contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
               success: function(response){
                 obj = JSON.parse(response);
                 $.ajax({
                  url: 'https://188.166.247.55:8080/addEmployee',
                  dataType: 'text',
                  method: 'POST',
                  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                  data: {
                    session: localStorage.getItem('session'),
                    nfcid:jqTds[2].value,
                    name:jqTds[1].value,
                    _id:jqTds[0].value,
                    token:obj.token
                  },
                  success: function(response){
                    obj = JSON.parse(response);
                    // alert('hao');
                    if (obj.message == 'nfcid has been used') {

                    }else{
                     saveRow(oTable, nEditing);

                    }
                    console.log(obj.message);
                  },
                  error: function(xhr, status, error){
                    alert(error);
                  },
                  complete: function(){
                  }
                });
               },
               error: function(xhr, status, error){
                 alert(error);
               },
               complete: function(){
                 window.location.assign('table_editable');
               }
             });

        });

        table.on('click', '.edit', function (e) {
            e.preventDefault();

            /* Get the row as a parent of the link that was clicked on */
            var nRow = $(this).parents('tr')[0];
            var jqTds = $('input', nRow);

            if (nEditing !== null && nEditing != nRow) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow(oTable, nEditing);
                editRow(oTable, nRow);
                nEditing = nRow;
            } else if (nEditing == nRow || this.innerHTML == "Save") {
                /* Editing this row and want to save it */
                // alert("Updated! Do not forget to do some ajax to sync with backend :)");
                $.ajax({
                   url:'https://188.166.247.55:8080/handshake',
                   dataType: 'text',
                   method: 'POST',
                   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                   success: function(response){
                     obj = JSON.parse(response);
                     $.ajax({
                      url: 'https://188.166.247.55:8080/addEmployee',
                      dataType: 'text',
                      method: 'POST',
                      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                      data: {
                        session: localStorage.getItem('session'),
                        nfcid:jqTds[2].value,
                        name:jqTds[1].value,
                        _id:jqTds[0].value,
                        token:obj.token
                      },
                      success: function(response){
                        obj = JSON.parse(response);
                        if (obj.message == 'nfcid has been used') {
                          alert('nfcid has been used');
                        }
                        console.log(obj.message);
                      },
                      error: function(xhr, status, error){
                        alert(error);
                      },
                      complete: function(){
                        window.location.assign('table_editable');
                      }
                    });
                   },
                   error: function(xhr, status, error){
                     alert(error);
                   },
                   complete: function(){
                      //  window.location.assign('table_editable');
                   }
                 });
                saveRow(oTable, nEditing);
                nEditing = null;
            } else {
                /* No edit in progress - let's start one */
                editRow(oTable, nRow);
                nEditing = nRow;
            }
        });
    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable();
        }

    };

}();
