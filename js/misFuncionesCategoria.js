window.onload = function traeInformacionCategorias(){

    $.ajax({
        url: "http://150.230.75.10/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
          console.log(respuesta);
    
          pintarRespuestaCategorias(respuesta);
        },
      });

}
function pintarRespuestaCategorias(respuesta) {
    let myTable = "<table>";
    myTable += "<th> Nombre </th>";
    myTable += "<th> Descripcion </th>";
  
    for (i = 0; i < respuesta.length; i++) {
      myTable += "<tr>";
      myTable += "<td>" + respuesta[i].name + "</td>";
      myTable += "<td>" + respuesta[i].description + "</td>";
      myTable +=
        "<td> <button class='btn btn-success' onclick='enviarIdParaActualizarCategoria(" +
        respuesta[i].id +
        ")'>Actualizar</button></td>";
      myTable +=
        "<td> <button class='btn btn-danger' onclick='borrarCategoria(" +
        respuesta[i].id +
        ")'>Eliminar</button></td>";
      myTable += "</tr>";
    }
    myTable += "</table>";
    $("#categoriasExistentes").html(myTable);
  }

function enviarIdParaActualizarCategoria(idCategoria){
    document.ActualizacionCategoria.categoryIdActualice.value=idCategoria;
} 

function actualizarInformacionCategoria() {
    let myData = {
      id: $("#categoryIdActualice").val(),
      name: $("#categoryNameActualice").val(),
      description: $("#texActualice").val(),
    };
    let dataToSend = JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
      url: "http://150.230.75.10/api/Category/update",
      type: "PUT",
      data: dataToSend,
      contentType: "application/JSON",
      datatype: "JSON",
      success: function (respuesta) {
        console.log(respuesta);
        alert("se ha Actualizado correctamente la Categoria");
        window.location.reload();
      },
    });
  }

  function borrarCategoria(idCategoria) {
    let myData = {
      id: idCategoria,
    };
    console.log("mi dato es " + JSON.stringify(myData));
    let dataToSend = JSON.stringify(myData);
    $.ajax({
      url: "http://150.230.75.10/api/Category/" + idCategoria,
      type: "DELETE",
      data: dataToSend,
      contentType: "application/JSON",
      datatype: "JSON",
      success: function (respuesta) {
        $("#resultado").empty();
        alert("Se ha Eliminado la Categoria.");
        window.location.reload();
      },
    });
  }
  