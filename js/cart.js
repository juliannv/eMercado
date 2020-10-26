document.addEventListener("DOMContentLoaded", function (e) {
const PREMIUM = document.getElementById("premiumradio")
const EXPRESS = document.getElementById("expressradio")
const STANDARD = document.getElementById("standardradio")
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            showCartProducts(resultObj.data.articles);
        }

        let monedas = document.getElementsByClassName("moneda")
        let cantidades = document.getElementsByClassName("cantidad");
        let subTotales = document.getElementsByClassName("subTotalxArticulo");
        let preciosUnitarios = document.getElementsByClassName("precioUnitario");
        for (let i = 0; i < cantidades.length; i++) {
            cantidades[i].addEventListener("change", () => {
                let sumatoria = 0;
                let precioUnitario = preciosUnitarios[i].textContent;
                let cantidad = cantidades[i].value;
                subTotales[i].innerHTML = precioUnitario * cantidad;
                for(let j = 0; j < cantidades.length; j++) {
                    let subTotal = 0;
                    if(monedas[j].textContent === "USD"){
                        subTotal = (parseInt(subTotales[j].textContent) * 40)
                    } else {
                        subTotal = parseInt(subTotales[j].textContent);
                    }
                    sumatoria += subTotal
                    document.getElementById("productCostText").innerHTML = sumatoria;
                    document.getElementById("productCostText").value = sumatoria;
                }
            });
        }
    });

    PREMIUM.addEventListener("click", mostrarPorcentaje);
    EXPRESS.addEventListener("click", mostrarPorcentaje);
    STANDARD.addEventListener("click", mostrarPorcentaje);

    document.getElementById("pagoConTarjeta").addEventListener("click", mostrarPagos);
    document.getElementById("transferenciaBancaria").addEventListener("click", mostrarPagos);
    document.getElementById("mostrarTotal").addEventListener("click", calcularTotal);

    function showCartProducts(cartProductsArray) {
        for (i = 0; i < cartProductsArray.length; i++) {
            let htmlContentToAppend = "";
            let cartProduct = cartProductsArray[i];
            let subTotalXArticulo = cartProduct.unitCost * cartProduct.count;
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + cartProduct.src + `" class="img-thumbnail">
                    </div>
                    <div class="col" style="position: relative">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ cartProduct.name + `</h4>
                            <input type="number" class="text-muted cantidad" value="` + cartProduct.count + `" min="0" max="99" style="height: 2em"><p class="bb-3">artículos</p>
                        </div>
                        <p class="bb-3"><small> Precio unitario: </small><span class="precioUnitario">` + cartProduct.unitCost + `</span><small> ` + cartProduct.currency + `</small></p>
                        <div style="text-allign: right;position: absolute; bottom: 0; right: 0">
                            <p class="mb-3">Sub-total por artículo: <span class="subTotalxArticulo">` + subTotalXArticulo + `</span><span class="moneda">` + cartProduct.currency + `</span></p>
                        </div>
                    </div>
                </div>
            <div>
            `
            document.getElementById("cart-list-container").innerHTML += htmlContentToAppend;
        }
    }

    function mostrarPorcentaje(){
        porcentaje = this.value;
        document.getElementById("comissionText").innerHTML = porcentaje + "%";
    }

    function mostrarPagos(){
        if (this.value == 0) {
            document.getElementById("datosTarjeta").hidden = false
            document.getElementById("datosBanco").hidden = true
        }
        else {
            document.getElementById("datosBanco").hidden = false
            document.getElementById("datosTarjeta").hidden = true
        }
    }

    function calcularTotal(){
        let porcentaje = parseInt(document.getElementById("comissionText").textContent)
        let total = parseInt(document.getElementById("productCostText").value) + (parseInt(document.getElementById("productCostText").value) * parseFloat(porcentaje / 100))
        document.getElementById("totalCostText").innerHTML = total
    }
});