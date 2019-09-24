app= (function (){
    var _funcModify = function (variable) {
        if(variable != null){
            var arreglo = variable.map(function(blueprint){
                return {key:blueprint.name, value:blueprint.points.length}
            })
            $("#tabla tbody").empty();

            arreglo.map(function(blueprint){
                var temporal = '<tr><td id="nombreActor">'+blueprint.key+'</td><td id="puntos">'+blueprint.value+'</td><td type="button" onclick="app.drawPlan()">Open</td></tr>';
                $("#tabla tbody").append(temporal);
            })

            var valorTotal = arreglo.reduce(function(total, valor){
                return total.value + valor.value;
            })
            document.getElementById("autorLabel").innerHTML = author;
            document.getElementById("puntosLabel").innerHTML = valorTotal;
        }
    };

    var _funcDraw = function (variable) {
        var dibuje = variable.points.map(function(puntos)){
            return puntos;
        }
        document.write(variable.points);
    }
    return {
            plansAuthor: function () {
                author = document.getElementById("autor").value;
                apimok.getBlueprintsByAuthor(author,_funcModify);

            },

            drawPlan: function() {
                author = document.getElementById("autor").value;
                plan = document.getElementById('nombreActor').innerHTML;
                apimok.getBlueprintsByNameAndAuthor(author,plan,_funcDraw);
            }
        };
})();
