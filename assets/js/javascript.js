$(document).ready(function(){
    let botonBuscar = $("#searchButton");
    let busquedaSuperheroe = $("#searchSuperhero");
    


    botonBuscar.on("click", function (){
        let resultado = busquedaSuperheroe.val();
        let validacion = /^[0-9]+$/;
        if (resultado.match(validacion)){
            $.ajax ({
                type:"GET",
                url:"https://www.superheroapi.com/api.php/4905856019427443/"+resultado,
                dataType: "json",
                success: function(superhero){
                    $("#superheroCard").html(`<div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src="${superhero.image.url}" class="img-fluid rounded-start" alt="...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">Nombre: ${superhero.name}</h5>
                          <hr>
                          <p class="card-text">Conexiones: ${superhero.connections["group-affiliation"]}</p>
                          <hr>
                          <p class="card-text">Nombre Completo: ${superhero.biography["full-name"]}</small></p>
                          <hr>
                          <p class="card-text">Lugar de Nacimiento: ${superhero.biography["place-of-birth"]}</small></p>
                          <hr>
                          <p class="card-text">Publicado por: ${superhero.biography.publisher}</small></p>
                          <hr>
                          <p class="card-text">Primera aparición: ${superhero.biography["first-appearance"]}</small></p>
                          <hr>
                          <p class="card-text">Alineación: ${superhero.biography.alignment}</small></p>
                        </div>
                      </div>
                    </div>
                  </div>`)
                  let arregloSuperheroStats=Object.entries(superhero.powerstats).map (function (powerstats){
                    return {y:powerstats[1], label:powerstats[0]}
                  })
                  let stats = {
                    title: {
                        text: "Estadísticas de Poder de "+superhero.name
                    },
                    animationEnabled: true,
                    data: [{
                        type: "pie",
                        startAngle: 40,
                        toolTipContent: "<b>{label}</b>: {y}%",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}%",
                        dataPoints: arregloSuperheroStats
                        
                    }]
                };
              
                $("#superheroStats").CanvasJSChart(stats);
                
                }
              
            })
          }else {
            alert ("Por favor, ingrese sólo números")
          }
          if(resultado >732){
            alert ("Ingrese un número del 1 al 732")
          }
    })


})

