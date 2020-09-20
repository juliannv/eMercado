const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

const NAV_BAR = document.querySelector('nav.site-header > div');

document.addEventListener("DOMContentLoaded", function (e) {
  let usuario = localStorage.getItem("User");
  NAV_BAR.innerHTML += `
    <div class="dropdown">
      <a class="py-2 d-none d-md-inline-block dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Usuario: ` + usuario + `
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="cart.html">Ver mi carrito</a>
        <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
        <div class="dropdown-divider"></div>
        <button class="dropdown-item" id="cerrarSesion">Cerrar sesión</button>
      </div>
    </div>
`;

document.getElementById("cerrarSesion").addEventListener("click", function(){
  sessionStorage.clear();
  localStorage.clear();
  window.location.replace("login.html")
})
});


var Logged = sessionStorage.getItem("Logged")
if (Logged !== "true") {
  if (location.href.includes("login.html") == false) {
    window.location.replace("login.html");
  };
}
