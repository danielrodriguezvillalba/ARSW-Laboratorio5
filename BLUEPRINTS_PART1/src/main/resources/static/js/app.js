app= (function (){
    var funcModify = function (variable) {
        if(variable != null){
            var arreglo = variable.map(function(blueprint){
                return {key:blueprint.name, value:blueprint.points.length}
            })
            $("#tabla tbody").empty();
            arreglo.map(function(blueprint){
                var temporal = '<tr>'+ '<td>' + blueprint.key + '</td><td>' + blueprint.value + '</td><td><input type="button" value="Open"></td></tr>';
                $("#tabla tbody").append(temporal);
            })

            var valorTotal = arreglo.reduce(function(total, valor){
                return total.value + valor.value;
            })
            document.getElementById("autorLabel").innerHTML = author;
            document.getElementById("puntosLabel").innerHTML = valorTotal;
        }
    };
    return {
            updatePlans: function () {
                author = document.getElementById("autor").value;
                apimok.getBlueprintsByAuthor(author,funcModify);

            }
        };
})();
