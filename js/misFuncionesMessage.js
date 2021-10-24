// Fetch data from  server
window.onload = function () {
  console.log("On load");
  traerInformacionBikes_Bike();
  traerInformacionMensajes();
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
  console.log(respuesta.messages);

  myTable += "<th> Name </th>";
  myTable += "<th> BRAND </th>";
  myTable += "<th> YEAR </th>";
  myTable += "<th> DESCRIPTION </th>";
  myTable += "<th> OPINIONES </th>";

  for (i = 0; i < respuesta.length; i++) {
    myTable += "<tr>";
    myTable += "<td>" + respuesta[i].name + "</td>";
    myTable += "<td>" + respuesta[i].brand + "</td>";
    myTable += "<td>" + respuesta[i].year + "</td>";
    myTable += "<td>" + respuesta[i].description + "</td>";

    var mensajes = "";
    respuesta[i].messages.forEach((message) => {
      mensajes += "<li>" + message.messageText + "</li>";
    });

    myTable += "<td><ul>" + mensajes + "</ul></td>";
    myTable +=
      "<td><button id='createOpinion' onclick='showIdBike(" +
      respuesta[i].id +
      ")'>crear opinion</button></td>";

    myTable += "</tr>";
  }
  myTable += "</table>";
  $("#ContenteTable").html(myTable);
}
function guardarInformacionMensaje() {
  let var2 = {
    messageText: $("#opinion").val(),
    client: { idClient: $("#id_client").val() },
    bike: { id: $("#idBikeMessage").val() },
  };

  $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    dataType: "JSON",
    data: JSON.stringify(var2),

    url: "http://150.230.75.10/api/Message/save",

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

function traerInformacionMensajes() {
  $.ajax({
    url: "http://150.230.75.10/api/Message/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      pintarRespuestaMessage(respuesta);
    },
  });
}
function pintarRespuestaMessage(respuesta) {
  console.log(respuesta);
  let myTableMessage = "<table>";

  myTableMessage += "<th> Comentario </th>";
  myTableMessage += "<th> Cliente </th>";
  myTableMessage += "<th> Bike </th>";

  for (i = 0; i < respuesta.length; i++) {
    let message = respuesta[i];
    let idMessageAEliminar = message.idMessage;
    console.log("el id de mi mensaje es " + idMessageAEliminar);
    myTableMessage += "<tr>";
    myTableMessage += "<td>" + message.messageText + "</td>";
    myTableMessage += "<td>" + message.client.name + "</td>";
    myTableMessage += "<td>" + message.bike.name + "</td>";
    myTableMessage +=
      "<td><button onclick='colocarIdReserva(" +
      message.idMessage +
      "," +
      message.client.idClient +
      "," +
      message.bike.id +
      ")' class='btn btn-secondary'>Actualizar</button></td>";
    myTableMessage +=
      "<td><button id='createOpinion' onclick='borrarMensaje(" +
      idMessageAEliminar +
      ")' class='btn btn-danger mt-2'>Eliminar </button></td>";

    myTableMessage += "</tr>";
  }
  myTableMessage += "</table>";
  $("#misMensajes").html(myTableMessage);
}
function colocarIdReserva(messageId, clientId, bikeId) {
  console.log("mi id message " + messageId, clientId, bikeId);
  let myForm = "<form>";
  myForm +=
    "<input type='number' id='idMesage' readonly  value='" + messageId + "'>";
  myForm +=
    " <textarea name='opinion' id='opinionNueva' class='form-control'></textarea>";
  myForm +=
    "<input type='number' id='Mcliente' readonly value='" + clientId + "'>";
  myForm +=
    "<input type='number' id='Mbike' readonly value='" + bikeId + "'></input>";
  myForm +=
    "<button onclick='actualizarInformacionMessage() ' class='btn btn-secondary'>Guardar Cambios</button>";

  myForm += "</form>";

  $("#misMensajesActualizar").html(myForm);
}
function actualizarInformacionMessage() {
  let myData = {
    idMessage: $("#idMesage").val(),
    messageText: $("#opinionNueva").val(),
    client: { idClient: $("#Mcliente").val() },
    bike: { id: $("#Mbike").val() },
  };
  console.log(myData);
  let dataToSend = JSON.stringify(myData);
  console.log(dataToSend);
  $.ajax({
    url: "http://150.230.75.10/api/Message/update",
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
function showIdBike(bikeId) {
  //con javaScript
  let inputIdBikeMessage = (document.getElementById("idBikeMessage").value =
    bikeId);
  //con Jquery
  // var inputIdBikeMessage = $("#idBikeMessage").val(bikeId);
  console.log(inputIdBikeMessage);
}
function borrarMensaje(idMessageAEliminar) {
  console.log("entrreeeeeeeeeeeeeeeeeeeeeeeeeee " + idMessageAEliminar);
  let myData = {
    idMessage: idMessageAEliminar,
  };
  console.log("mi dato es " + myData);
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "http://150.230.75.10/api/Message/" + idMessageAEliminar,
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
