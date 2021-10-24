// Fetch data from  server
window.onload = function () {
  console.log("On load");
  traerInformacionBikes_Bike();
  traerInformacionReservas();
};

function traerInformacionBikes_Bike() {
  $.ajax({
    url: "http://150.230.75.10/api/Bike/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
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

  for (i = 0; i < respuesta.length; i++) {
    myTable += "<tr>";
    myTable += "<td>" + respuesta[i].name + "</td>";
    myTable += "<td>" + respuesta[i].brand + "</td>";
    myTable += "<td>" + respuesta[i].year + "</td>";
    myTable += "<td>" + respuesta[i].description + "</td>";
    myTable +=
      '<td><button onclick="" id=' + respuesta[i].id + "+>ver</button></td>";
    myTable +=
      "<td><button id='createOpinion' onclick='showIdBike(" +
      respuesta[i].id +
      ")'>crear reserva</button></td>";

    myTable += "</tr>";
  }
  myTable += "</table>";
  $("#ContenteTableBikeForReserva").html(myTable);
}

function traerInformacionReservas() {
  $.ajax({
    url: "http://150.230.75.10/api/Reservation/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log("Reservas");
      console.log(respuesta);
      pintarRespuestaReservaciones(respuesta);
    },
  });
}
function pintarRespuestaReservaciones(respuesta) {
  let myTable = "<table>";

  myTable += "<th> Start Date </th>";
  myTable += "<th> Devolution Date </th>";
  myTable += "<th> Client </th>";
  myTable += "<th> Bike </th>";

  for (i = 0; i < respuesta.length; i++) {
    let reserva = respuesta[i];
    myTable += "<tr>";
    myTable += "<td>" + reserva.startDate + "</td>";
    myTable += "<td>" + reserva.devolutionDate + "</td>";
    myTable += "<td>" + reserva.client.name + "</td>";
    myTable += "<td>" + reserva.bike.name + "</td>";
    myTable +=
      "<td><button onclick='colocarIdReserva(" +
      reserva.idReservation +
      "," +
      reserva.client.idClient +
      "," +
      reserva.bike.id +
      ")' class='btn btn-secondary'>Actualizar</button></td>";
    myTable +=
      "<td><button id='createOpinion' onclick='borrarReserva(" +
      reserva.idReservation +
      ")' class='btn btn-danger mt-2'>Eliminar </button></td>";

    myTable += "</tr>";
  }
  myTable += "</table>";
  $("#misReservas").html(myTable);
}

function guardarInformacionReservacion() {
  let var2 = {
    startDate: $("#fechaDeInicio").val(),
    devolutionDate: $("#fechaDeEntrega").val(),
    client: { idClient: $("#id_client").val() },
    bike: { id: $("#id_Bike").val() },
  };

  console.log(var2),
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "JSON",
      data: JSON.stringify(var2),

      url: "http://150.230.75.10/api/Reservation/save",

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

function colocarIdReserva(reservaId, clientId, bikeId) {
  console.log("mi id reserva " + reservaId, clientId, bikeId);
  let myForm = "<form>";
  myForm +=
    "<input type='number' id='RidReserva' readonly  value='" + reservaId + "'>";
  myForm += "<input type='date' id='RfechaInicio' required> ";
  myForm += "<input type='date' id='RfechaEntrega' required>";
  myForm += "<input type='number' id='Rcliente' readonly value='" + clientId + "'>";
  myForm += "<input type='number' id='Rbike' readonly value='" + bikeId + "'></input>";
  myForm +=
    "<button onclick='actualizarInformacionReserva() ' class='btn btn-secondary'>Guardar Cambios</button>";

  myForm += "</form>";

  $("#misReservasActualizar").html(myForm);
}
function actualizarInformacionReserva() {
  console.log("entrrrrrrrrrre");
  let myData = {
    idReservation: $("#RidReserva").val(),
    startDate: $("#RfechaInicio").val(),
    devolutionDate: $("#RfechaEntrega").val(),
    client: { idClient: $("#Rcliente").val() },
    bike: { id: $("#Rbike").val() },
  };
  console.log(myData);
  let dataToSend = JSON.stringify(myData);
  console.log(dataToSend);
  $.ajax({
    url: "http://150.230.75.10/api/Reservation/update",
    type: "PUT",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      alert("se ha Actualizado correctamente la reserva");
    },
  });
}

function borrarReserva(idElemento) {
  let myData = {
    id: idElemento,
  };
  console.log("mi dato es " + myData);
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "http://150.230.75.10/api/Reservation/" + idElemento,
    type: "DELETE",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {
      $("#resultado").empty();
      alert("Se ha Eliminado la Reservacion.");
      window.location.reload();
    },
  });
}

function showIdBike(bikeId) {
  //con javaScript
  let inputIdBikeMessage = (document.getElementById("id_Bike").value = bikeId);
  //con Jquery
  // var inputIdBikeMessage = $("#idBikeMessage").val(bikeId);
  console.log(inputIdBikeMessage);
}
