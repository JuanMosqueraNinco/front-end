window.onload = function traerInformacionBikes_Bike() {
  $.ajax({
    url: "http://150.230.75.10/api/Client/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);

      pintarRespuestaCliente(respuesta);
    },
  });
};
function pintarRespuestaCliente(respuesta) {
  let myTable = "<table>";
  myTable += "<th> Id </th>";
  myTable += "<th> Email </th>";
  myTable += "<th> Name </th>";
  myTable += "<th> contraseña </th>";
  myTable += "<th> edad </th>";

  for (i = 0; i < respuesta.length; i++) {
    myTable += "<tr>";
    myTable += "<td>" + respuesta[i].idClient + "</td>";
    myTable += "<td>" + respuesta[i].email + "</td>";
    myTable += "<td>" + respuesta[i].name + "</td>";
    myTable += "<td>" + respuesta[i].password+ "</td>";
    myTable += "<td>" + respuesta[i].age + "</td>";
    myTable +=
      "<td> <button class='btn btn-success' onclick='enviarIdParaActualizarCliente(" +
      respuesta[i].idClient +
      ")'>Actualizar</button></td>";
    myTable +=
      "<td> <button class='btn btn-danger' onclick='borrarCliente(" +
      respuesta[i].idClient +
      ")'>Eliminar</button></td>";
    myTable += "</tr>";
  }
  myTable += "</table>";
  $("#registroClientes").html(myTable);
}
function enviarIdParaActualizarCliente(idClient){
    document.actualizarCliente.idItem.value=idClient;
}
function actualizarInformacionCliente() {
    let myData = {
      idClient: $("#idItem").val(),
      email: $("#emailItem").val(),
      password: $("#itemPassword").val(),
      name: $("#nameItem").val(),
      age: $("#ageItem").val(),
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
      url: "http://150.230.75.10/api/Client/update",
      type: "PUT",
      data: dataToSend,
      contentType: "application/JSON",
      datatype: "JSON",
      success: function (respuesta) {
        console.log(respuesta);
        alert("se ha Actualizado correctamente la Bicicleta");
        window.location.reload();
      },
    });
  }

  function borrarCliente(idClient) {
    console.log("entrreeeeeeeeeeeeeeeeeeeeeeeeeee " + idClient);
    let myData = {
      idMessage: idClient,
    };
    console.log("mi dato es " + myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
      url: "http://150.230.75.10/api/Client/"+idClient,
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