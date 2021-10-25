window.onload = function traerInformacionBikes_Bike() {
  $.ajax({
    url: "http://150.230.75.10:8080/api/Bike/all",
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
  myTable += "<th> MODELO </th>";
  myTable += "<th> CATEGORIA </th>";
  myTable += "<th> DESCRIPTION </th>";

  for (i = 0; i < respuesta.length; i++) {
    myTable += "<tr>";
    myTable += "<td>" + respuesta[i].name + "</td>";
    myTable += "<td>" + respuesta[i].brand + "</td>";
    myTable += "<td>" + respuesta[i].year + "</td>";
    myTable += "<td>" + respuesta[i].category.name + "</td>";
    myTable += "<td>" + respuesta[i].description + "</td>";
    myTable += "<td> <button class='btn btn-success' onclick='enviarIdParaActualizar("+respuesta[i].id+ ","+ respuesta[i].category.id+")'>Actualizar</button></td>";
    myTable += "<td> <button class='btn btn-danger' onclick='borrarBike("+respuesta[i].id+")'>Eliminar</button></td>";
    myTable += "</tr>";
  }
  myTable += "</table>";
  $("#elementosRegistradosBike").html(myTable);
}

function enviarIdParaActualizar(idBike, categoria){
    document.actualizarBici.idBicicleta.value=idBike;
    document.actualizarBici.categoria.value=categoria;
}

function actualizarInformacionBike() {
  let myData = {
    id: $("#idBicicleta").val(),
    name: $("#nombreBicicleta").val(),
    brand: $("#brand").val(),
    year: $("#año").val(),
    description: $("#descripcion").val(),
    category: {id:$("#categoria").val()} ,
  };
  let dataToSend = JSON.stringify(myData);
  console.log(dataToSend);
  $.ajax({
    url: "http://150.230.75.10:8080/api/Bike/update",
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
function borrarBike(idBikeAEliminar) {
  let myData = {
    id: idBikeAEliminar,
  };
  console.log("mi dato es " + myData);
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "http://150.230.75.10:8080/api/Bike/" + idBikeAEliminar,
    type: "DELETE",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {
      $("#resultado").empty();
      alert("Se ha Eliminado la Bicicleta.");
      window.location.reload();
    },
  });
}
