var product = {};
var relatedProduct = {} 
var commentList = [];
var puntaje;
var clicked = false;
var htmlContentToAppend = "";
var puntuacionEstrellas = "";
var fechaCompleta = "";


function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showCommentList(array) {

    for (let i = 0; i < array.length; i++) {
        let comment = array[i];
        puntuacionEstrellas = "";

        let mili = Date.parse(comment.dateTime);

        //let prueba = new Date(mili).toLocaleString();

        let fechaObj = new Date();
        fechaObj.setTime(mili);
        crearFecha(fechaObj);
        crearEstrellas(comment.score);

        htmlContentToAppend += `
        <div class="card">
	        <div class="card-body">
	            <div class="row">
        	        <div class="col-md-2">
        	            <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid"/>
                        <p class="text-secondary text-center">` + fechaCompleta + `</p>
        	        </div>
        	        <div class="col-md-10">
        	            <p>
        	                <a class="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>` + comment.user + `</strong></a>
        	                <span class="float-right">` + puntuacionEstrellas + `</span>
        	            </p>
        	        <div class="clearfix"></div>
        	            <p>` + comment.description + `</p>
        	        </div>
	            </div>
	        </div>
	    </div>
        `

        document.getElementById("comment-list-container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");


            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost + " " + product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;

            showImagesGallery(product.images);
            
            getJSONData(PRODUCTS_URL).then(function (resultObj, product.relatedProducts) {
                
            });
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showCommentList(resultObj.data);
        }
    });

    let estrellas = document.getElementsByClassName("estrella");
    for (let i = 0; i < estrellas.length; i++) {
        estrellas[i].addEventListener("mouseover", mostrarPuntaje);
        estrellas[i].addEventListener("mouseout", borrarPuntaje);
        estrellas[i].addEventListener("click", function(){enviarPuntaje(e, estrellas[i].value)});
    }

    /* document.getElementById("estrella2").addEventListener("mouseover", mostrarPuntaje);
    document.getElementById("estrella3").addEventListener("mouseover", mostrarPuntaje);
    document.getElementById("estrella4").addEventListener("mouseover", mostrarPuntaje);
    document.getElementById("estrella5").addEventListener("mouseover", mostrarPuntaje); */
});

function mostrarPuntaje() {

    for (i = 1; i <= 5; i++) {
        if (document.getElementById("estrella" + i).value <= this.value && clicked == false) {
            document.getElementById("i" + i).className += " checked";
        }
    }
}

function enviarPuntaje(e, valor) {
    console.log(this);
    e.stopImmediatePropagation();
    if (clicked == true) {
        clicked = false
    } else {
        clicked = true
    }
    puntaje = valor;
}

function borrarPuntaje() {
    for (i = 1; i <= 5; i++) {
        if (clicked == false) {
            document.getElementById("i" + i).className = "fa fa-star";
        }
    }
}

function crearFecha(fecha) {

    let año = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    let dia = fecha.getDate();
    let hora = ""
    let mins = ""

    if (fecha.getHours() < 10) {
        hora = "0" + fecha.getHours();
    } else {
        hora = fecha.getHours();
    }
    if (fecha.getMinutes() < 10) {
        mins = "0" + fecha.getMinutes();
    } else {
        mins = fecha.getMinutes();
    }

    fechaCompleta = dia + "/" + mes + "/" + año + " " + hora + ":" + mins
}

function crearEstrellas(num) {
    puntuacionEstrellas = "";
    for (let i = 0; i < 5; i++) {
        if (num > i) {
            puntuacionEstrellas += `
        <i class="fa fa-star checked"></i>
    `
        } else {
            puntuacionEstrellas += `
        <i class="fa fa-star"></i>
        `
        }
    }
}

document.getElementById("enviar").addEventListener("click", e => {
    e.preventDefault();
    hoy = new Date();
    
    crearFecha(hoy);
    crearEstrellas(puntaje);

    htmlContentToAppend += `
        <div class="card">
	        <div class="card-body">
	            <div class="row">
        	        <div class="col-md-2">
        	            <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid"/>
                        <p class="text-secondary text-center">` + fechaCompleta + `</p>
        	        </div>
        	        <div class="col-md-10">
        	            <p>
        	                <a class="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html"><strong>` + localStorage.getItem("User") + `</strong></a>
        	                <span class="float-right">` + puntuacionEstrellas + `</span>
        	            </p>
        	        <div class="clearfix"></div>
        	            <p>` + document.getElementById("contenido").value + `</p>
        	        </div>
	            </div>
	        </div>
	    </div>
        `

    document.getElementById("comment-list-container").innerHTML = htmlContentToAppend;
})