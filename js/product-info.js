var product = {};
var commentList = [];

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
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

function showCommentList(array){

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let comment = array[i];
           
        htmlContentToAppend += `
            <hr>
            <br><br>
            <p>Puntuación: ` + comment.score + `<p>
            <br>
            <p> ` + comment.description + `<p>
            <br>
            <p>Usuario: ` + comment.user + `<p>
            <br>
            <p>Fecha: ` + comment.dateTime + `<p>
            <br><br>
        `

        document.getElementById("comment-list-container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
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
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            showCommentList(resultObj.data);
        }
    });
});