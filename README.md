## ARSW-Laboratorio5

```
Nicolás Cárdenas Chaparro

Daniel Rodriguez Villalba
```

# Blueprint Management 3 - Heavy Client
##### Building a 'heavy' client with a REST API, HTML5, Javascript and CSS3. Part I.

- When you press 'Get blueprints', consult the plans of the user given in the form. For now, if the query generates an error, nothing will simply be displayed. 
- When making a successful query, a message should be displayed that includes the author's name, and a table with: the name of each author's plan, the number of points of the author, and a button to open it. In the end, the total points of all plans must be shown (suppose, for example, that the application has a payment model that requires such information). 
- When selecting one of the plans, the drawing of the plan must be shown. For now, the drawing will simply be a sequence of line segments made in the same order in which the points come.

## Backend Fixes

- Include within the Gradle dependencies (build.gradle) the 'webjars' of jQuery and Bootstrap (this allows you to have these JavaScript libraries locally when building the project):

```
  dependencies { 
    ...
    compile group: 'org.webjars', name: 'webjars-locator', version: '0.14'
      compile group: 'org.webjars', name: 'bootstrap', version: '4.1.2'
      compile group: 'org.webjars', name: 'jquery', version: '3.1.0'
  }     
```
Nuestro `build.gradle`:

```
group 'edu.eci.arsw'

buildscript {
    ext {
        springBootVersion = '2.0.0.BUILD-SNAPSHOT'
    }
    repositories {
        mavenCentral()
        maven { url "https://repo.spring.io/snapshot" }
        maven { url "https://repo.spring.io/milestone" }
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
    }
}

apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'org.springframework.boot'
apply plugin: 'io.spring.dependency-management'

version = '0.0.1-SNAPSHOT'
sourceCompatibility = 1.8

repositories {
    mavenCentral()
    maven { url "https://repo.spring.io/snapshot" }
    maven { url "https://repo.spring.io/milestone" }
}

dependencies {
    compile group: 'org.webjars', name: 'webjars-locator', version: '0.14'
    compile group: 'org.webjars', name: 'bootstrap', version: '4.1.2'
    compile group: 'org.webjars', name: 'jquery', version: '3.1.0'
    compile('org.springframework.boot:spring-boot-starter-web')
    testCompile group: 'junit', name: 'junit', version: '4.12'
    
}
```


## Frontend Views

- Create the directory where the JavaScript application will reside. As SpringBoot is being used, the path to put in the same static content (static Web pages, HTML5 / JS applications, etc.) is:

`src/main/resources/static`

- Create, in the previous directory, the index.html page, only with the basics: title, field for author capture, 'Get blueprints' button, field where the name of the selected author will be displayed, the HTML table where it will be displayed the list of plans (with only the headings), and a field where the total points of the author's plans will be shown. Remember to associate identifiers with these components to facilitate your search through selectors.
- In the <head> element of the page, add the references to the jQuery, Bootstrap libraries and the Bootstrap style sheet.
  
  ```
  <head>
      <title>Blueprints</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <script src="/webjars/jquery/3.1.0/jquery.min.js"></script>
      <script src="/webjars/bootstrap/4.1.2/js/bootstrap.min.js"></script>
      <link rel="stylesheet"
        href="/webjars/bootstrap/4.1.2/css/bootstrap.min.css" />
  ```
  
- Upload the application (mvn spring-boot: run), and rectify:
  - That the page is accessible from: http://localhost:8080/index.html
  - When you open the browser developer console, you should NOT receive 404 error messages (that is, the JavaScript libraries were loaded correctly).
  
Nuestro `index.html`:

```
<!DOCTYPE html>
<html lang="en">
<style type="text/css">
    form{
        margin: 20px 0;
    }
    form input, button{
        padding: 5px;
    }
    table{
        width: 40%;
        margin-bottom: 20px;
        border-collapse: collapse;
    }
    table, th, td{
        border: 1px solid #cdcdcd;
    }
    table th, table td{
        padding: 10px;
        text-align: left;
    }
</style>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script src="/webjars/jquery/3.1.0/jquery.min.js"></script>
    <script src="/webjars/bootstrap/4.1.2/js/bootstrap.min.js"></script>
    <script src="js/apimock.js"></script>
    <script src="js/app.js"></script>
    <link rel="stylesheet"
          href="/webjars/bootstrap/4.1.2/css/bootstrap.min.css" />
    <title>Title</title>
</head>
<body>
<h1>Blueprints</h1>
<div>
    <div >
        <a>AUTHOR :</a>

        <input type="text" id="autor">
        <button type="button"  onclick="app.plansAuthor()">Get Blueprints</button>

        </br>
        </br>
        <body>
        <label id="autorLabel">autor</label>
        <label>'s blueprints :</label>
        <table id="tabla">
            <thead>
            <tr>
                <th>Blueprint name</th>
                <th>Number of points</th>
                <th>Open</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td id="nombreActor">Peter Parker</td>
                <td id="puntos">peterparker@mail.com</td>
                <td type="button" value=nombreActor onclick="app.drawPlan()">Open</td>
            </tr>
            </tbody>
        </table>
        <label>Total user points : </label>
        <label id="puntosLabel">0</label>
        </br>
        </br>
        <canvas id="myCanvas" width="500" height="500" style="border:1px solid #000000;">

        </canvas>
        </body>

    </div>

</div>
</body>
</html>
```
  
## Frontend Logic

- Now, you will create a JavaScript Module that, as a controller, maintains the states and offers the operations required by the view. For this, consider the JavaScript Module pattern, and create a module in the static/js/app.js path.
- Copy the provided module (apimock.js) in the same path of the module created before. In this one add more planes (with more points) to the 'burned' authors in the code.
- Add the import of the two new modules to the HTML page (after importing the jQuery and Bootstrap libraries):

  ```
  <script src="js/apimock.js"></script>
  <script src="js/app.js"></script>
  ```
  
- Have the previously created module keep private:
  - The name of the selected author. 
  - The list of name and size of the plans of the selected author. That is, a list of objects, where each object will have two properties: plan name, and number of points on the plane. Together with a public operation that allows changing the name of the currently selected author.

El siguiente es el `apimock.js`, la lista con los blueprints es privada, no se puede acceder por fuera de la funcion.
```
var apimok = (function () {

    var mockdata = [];

        mockdata["JhonConnor"] = [
        {
            author: "JhonConnor",
            name: "house",
            points: [
                {
                    x: 50,
                    y: 2
                },
                {
                    x: 100,
                    y: 50
                },
                {
                    x: 200,
                    y: 200
                }
            ]
        },
        {
            author: "JhonConnor",
            name: "gear",
            points: [
                {
                    x: 30,
                    y: 35
                },
                {
                    x: 40,
                    y: 45
                },
                {
                    x: 200,
                    y: 200
                }
            ]
        }
    ];

    return {
        getBlueprintsByAuthor:function(name, callback) {
            callback(
                mockdata[name]
            )
        },
        getBlueprintsByNameAndAuthor:function(autor,obra,callback){
            callback(
                mockdata[author].map((function (variable) {
                        if( variable.name == obra){
                            return variable.points;
                        }
                    })
                )
            );
        }
    }

})();
```

- Add to the module app.js a public operation that allows updating the list of plans, based on the name of its author (given as a parameter). To do this, said operation must invoke the getBlueprintsByAuthor operation of the provided apimock module, sending as a callback a function that:
  - Take the list of plans, and apply a map function that converts your elements to objects with only the name and number of points.
  - On the resulting list, make another map, which takes each of these elements, and through jQuery add a  element (with the respective ) to the table created in point 4. Consider the jQuery selectors and tutorials available online. For now do not add buttons to the generated rows.
  - On any of the two listings (the original, or the one transformed by map), apply a reduce that calculates the number of points. With this value, use jQuery to update the corresponding field within the DOM.
- Associate the previously created operation (that of app.js) with the on-click event of the page query button.
- Verify the operation of the application. Start the server, open the HTML5/JavaScript application, and rectify that when entering an existing user, the list of the same is loaded.
##
Todas las funcionalidades para el punto anterior se implementaron, el `app.js` se muestra al final de la pagina.
En el `app.js` se implemento la funcion callback que junto con el nombre del mockdata se le pasa como parametros a la función `getBlueprintsByAuthor` para que esta se ejecute de forma asincrona.

  
## Next Week

- To the page, add an element of type Canvas, with its respective identifier. Make your dimensions not too large to make room for the other components, but enough to be able to draw the plans.
- To the app.js module add an operation that, given the name of an author, and the name of one of its planes given as parameters, using the getBlueprintsByNameAndAuthor method of apimock.js and a callback function:
  - Consult the points of the corresponding plane, and with them, draw straight line segments, using the available HTML5 elements (Canvas, 2DContext, etc.)Update the field with jQuery where the name of the plane being drawn is shown (if that field does not exist, group it to the DOM). 
- Verify that the application now, in addition to displaying the list of the plans of an author, allows you to select one of these and graph it. To do this, have the button generated with the click event associated with the operation done in the last column (sending the corresponding names as a parameter).
- Verify that the application now allows: consult the plans of an author and graph the one selected.
- Once the application works (front-end only), make a module (call it apiclient) that has the same operations of the apimock, but for the same use real data consulted from the REST API. For the above, review how to make GET requests with jQuery, and how the callback scheme is handled in this context.
- Modify the app.js code so that it is possible to switch between the apimock and the apiclient with just one line of code.
- Review the documentation and examples of Bootstrap styles (already included in the exercise), add the necessary elements to the page to make it more colorful, and closer to the mock given at the beginning of the statement.

El `app.js` es el siguiente:
```
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
        if(variable){
            var punts = variable.map(function(puntos,index){
                var c = document.getElementById("myCanvas");
                var ctx = c.getContext("2d");
                //ctx.clearRect(0, 0, 500, 500);
                //ctx.beginPath();
                ctx.moveTo(puntos[index].x,puntos[index].y);
                ctx.lineTo(400,400);
                ctx.stroke();
            });

        }

        //document.write(dibuje);
    };
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
```
  
  
  
