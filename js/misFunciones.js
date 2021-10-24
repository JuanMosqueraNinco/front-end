// Fetch data from  server
window.onload = function () {
  console.log("On load");
  traerInformacionBikes();
  traerInformacionClientes();
  traerInformacionCategorias();
};

function traerInformacionCategorias() {
  $.ajax({
    url: "http://150.230.75.10/api/Category/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      pintarRespuesta(respuesta);
    },
  });
}

function pintarRespuesta(respuesta) {
  let myTable = "<table>";

  
  myTable += "<th> ID CATEGORY </th>";
  myTable += "<th> NAME </th>";
  myTable += "<th> DESCRIPTION </th>";

  for (i = 0; i < respuesta.length; i++) {
    myTable += "<tr>";
    myTable += "<td>" + respuesta[i].id + "</td>";
    myTable += "<td>" + respuesta[i].name + "</td>";
    myTable += "<td>" + respuesta[i].description + "</td>";
    myTable += "</tr>";
  }
  myTable += "</table>";
  $("#resultado1").html(myTable);
}

function guardarInformacionCategorias() {
  let var2 = {
    name: $("#Cname").val(),
    description: $("#Cdescription").val(),
  };

  $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    dataType: "JSON",
    data: JSON.stringify(var2),

    url: "http://150.230.75.10/api/Category/save",

    success: function (response) {
      console.log(response);
      console.log("Se guardo correctamente");
      alert("Se guardo correctamente");
      window.location.reload();
    },

    error: function (jqXHR, textStatus, errorThrown) {
      window.location.reload();
      alert("No se guardo correctamente");
    },
  });
}

///////////////////Bikes/////////////////////////////////////
function traerInformacionBikes() {
  $.ajax({
    url: "http://150.230.75.10/api/Bike/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      console.log("TRAER RESPUESTA");
      pintarRespuestaBikes(respuesta);
    },
  });
}

function pintarRespuestaBikes(respuesta) {
  let myTable = "<table>";
  myTable += "<th> Name </th>";
  myTable += "<th> BRAND </th>";
  myTable += "<th> YEAR </th>";
  myTable += "<th> DESCRIPTION </th>";
  myTable += "<th> CATEGORIA </th>";

  for (i = 0; i < respuesta.length; i++) {
    console.log(respuesta[i].category+ "esto esss");
    myTable += "<tr>";
    myTable += "<td>" + respuesta[i].name + "</td>";
    myTable += "<td>" + respuesta[i].brand + "</td>";
    myTable += "<td>" + respuesta[i].year + "</td>";
    myTable += "<td>" + respuesta[i].description + "</td>";
    myTable += "<td>" + respuesta[i].category.name+ "</td>";
    myTable += "</tr>";
  }
  myTable += "</table>";
  $("#resultado2").html(myTable);
}

function guardarInformacionBikes() {
  let var3 = {
    name: $("#Bname").val(),
    brand: $("#Bbrand").val(),
    year: $("#Byear").val(),
    description: $("#Bdescription").val(),
    category:{id:$("#Bcategory").val()},
    
  };
  console.log(JSON.stringify(var3))
  
  console.log(var3+ "estoooooooooo")
  $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    dataType: "JSON",
    data: JSON.stringify(var3),

    url: "http://150.230.75.10/api/Bike/save",

    success: function (response) {
      console.log(response);
      console.log("Se guardo correctamente");
      alert("Se guardo correctamente");
      window.location.reload();
    },

    error: function (jqXHR, textStatus, errorThrown) {
      window.location.reload();
      alert("No se guardo correctamente");
    },
  });
}
//////////////////////Clientes//////////////////////////////////
function traerInformacionClientes() {
  $.ajax({
    url: "http://150.230.75.10/api/Client/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      pintarRespuestaClientes(respuesta);
    },
  });
}

function pintarRespuestaClientes(respuesta) {
  let myTable = "<table>";
  myTable += "<th> Id </th>";
  myTable += "<th> Email </th>";
  myTable += "<th> Nombre </th>";
  myTable += "<th> Edad </th>";

  for (i = 0; i < respuesta.length; i++) {
    myTable += "<tr>";
    myTable += "<td>" + respuesta[i].idClient + "</td>";
    myTable += "<td>" + respuesta[i].email + "</td>";
    myTable += "<td>" + respuesta[i].name + "</td>";
    myTable += "<td>" + respuesta[i].age + "</td>";
    myTable += "</tr>";
  }
  myTable += "</table>";
  $("#resultado3").html(myTable);
}

function guardarInformacionClientes() {
  let var4 = {
    email: $("#CLemail").val(),
    password: $("#CLpassword").val(),
    name: $("#CLname").val(),
    age: $("#CLage").val(),
  };

  $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    dataType: "JSON",
    data: JSON.stringify(var4),

    url: "http://150.230.75.10/api/Client/save",

    success: function (response) {
      console.log(response);
      console.log("Se guardo correctamente");
      alert("Se guardo correctamente");
      window.location.reload();
    },

    error: function (jqXHR, textStatus, errorThrown) {
      window.location.reload();
      alert("No se guardo correctamente");
    },
  });
}
