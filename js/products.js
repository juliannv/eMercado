var categoriesArray = [];

function showCategoriesList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        htmlContentToAppend += ` 
        <div>
            <h2>` + category.name + `</h2>
        </div>
        <div>
            <img src="` + category.imgSrc + `">
        </div>
        <div>
            <p>` + category.description + `</p>
            <p>Precio: ` + category.cost + ` ` + category.currency + `</p>
            <p>Vendidos: ` + category.soldCount + `</p>
        </div>
        `

        document.getElementById("listado").innerHTML = htmlContentToAppend;
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
        }
    });
});