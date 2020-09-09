var product = {};
var commentList = [];
var puntaje;
var clicked = false;
var htmlContentToAppend = "";
var puntuacionEstrellas = "";

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

        for (let j = 0; j < 5; j++) {
            if (comment.score > j) {
                puntuacionEstrellas += `
                <i class="fa fa-star checked"></i>
            `
            } else {
                puntuacionEstrellas += `
                <i class="fa fa-star"></i>
                `
            }
        }

        let mili = Date.parse(comment.dateTime);
        let fechaObj = new Date();
        fechaObj.setTime(mili);

        let año = fechaObj.getFullYear();
        let mes = fechaObj.getMonth() + 1;
        let dia = fechaObj.getDate();
        let hora = ""
        let mins = ""
        if (fechaObj.getHours() < 10) {
            hora = "0" + fechaObj.getHours();
        } else {
            hora = fechaObj.getHours();
        }
        if (fechaObj.getMinutes() < 10) {
            mins = "0" + fechaObj.getMinutes();
        } else {
            mins = fechaObj.getMinutes();
        }

        htmlContentToAppend += `
        <div class="card">
	        <div class="card-body">
	            <div class="row">
        	        <div class="col-md-2">
        	            <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid"/>
                        <p class="text-secondary text-center">` + dia + `/` + mes + `/` + año +
            " " + hora + `:` + mins + `</p>
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
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showCommentList(resultObj.data);
        }
    });

    document.getElementById("estrella1").addEventListener("mouseover", mostrarPuntaje);
    document.getElementById("estrella2").addEventListener("mouseover", mostrarPuntaje);
    document.getElementById("estrella3").addEventListener("mouseover", mostrarPuntaje);
    document.getElementById("estrella4").addEventListener("mouseover", mostrarPuntaje);
    document.getElementById("estrella5").addEventListener("mouseover", mostrarPuntaje);
});

function mostrarPuntaje() {

    for (i = 1; i <= 5; i++) {
        if (document.getElementById("estrella" + i).value <= this.value && clicked == false) {
            document.getElementById("i" + i).className += " checked";
        }
    }
    this.addEventListener("mouseout", borrarPuntaje);

    this.addEventListener("click", e => {
        if (clicked == true) {
            clicked = false
        } else {
            clicked = true
        }
        puntaje = this.value;
    });
}

function borrarPuntaje() {
    for (i = 1; i <= 5; i++) {
        if (clicked == false) {
            document.getElementById("i" + i).className = "fa fa-star";
        }
    }
}

document.getElementById("enviar").addEventListener("click", e => {
    e.preventDefault();
    hoy = new Date();
    puntuacionEstrellas = "";
    
    for (let i = 0; i < 5; i++) {
        if (puntaje > i) {
            puntuacionEstrellas += `
            <i class="fa fa-star checked"></i>
        `
        } else {
            puntuacionEstrellas += `
            <i class="fa fa-star"></i>
            `
        }
    }

    let año = hoy.getFullYear();
    let mes = hoy.getMonth() + 1;
    let dia = hoy.getDate();
    let hora = ""
    let mins = ""
    if (hoy.getHours() < 10) {
        hora = "0" + fechaObj.getHours();
    } else {
        hora = hoy.getHours();
    }
    if (hoy.getMinutes() < 10) {
        mins = "0" + fechaObj.getMinutes();
    } else {
        mins = hoy.getMinutes();
    }

    htmlContentToAppend += `
        <div class="card">
	        <div class="card-body">
	            <div class="row">
        	        <div class="col-md-2">
        	            <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid"/>
                        <p class="text-secondary text-center">` + dia + `/` + mes + `/` + año +
                        " " + hora + `:` + mins + `</p>
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