document.querySelector(".cate-name").innerHTML =
  window.sessionStorage.getItem("category");

let productShop = document.querySelectorAll(".products-shop");
let addProdutsShop = function (arrOfContainerEle) {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      for (i = 0; i < json.length; i++) {
        if (json[i].category == window.sessionStorage.getItem("category")) {
          for (e = 0; e < arrOfContainerEle.length; e++) {
            let favActive = "";
            if (localStorage.getItem("favList")) {
              let favArr = JSON.parse(localStorage.getItem("favList"));
              for (x = 0; x < favArr.length; x++) {
                if (favArr[x].id == json[i].id) {
                  favActive = "on";
                }
              }
            }
            let mainDiv = document.createElement("div");
            mainDiv.classList.add("col-sm-6", "col-lg-3");
            mainDiv.innerHTML = `
                <div class="card product mb-4 w-100">
                <div class="overflow-hidden hover position-relative">
                  <div class="product-overlay" data-id=${json[i].id}>
                    <i class="fa-solid fa-cart-shopping shopping-add" data-id=${json[i].id}></i>
                    <i class="fa-regular fa-heart fav-add ${favActive}" data-id=${json[i].id}></i>
                    <i class="fa-solid fa-repeat"></i>
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <img src="${json[i].image}" class="card-img-top "
                  alt="..." />
                </div>
                <div class="card-body text-center">
                  <h6 class="card-title t-ddark pt-2">${json[i].title}</h6>
                  <div class="price">
                    <span class="t-ddark">$${json[i].price}</span>
                    <del>$${json[i].price}</del>
                  </div>
                  <div class="rate">
                    <i class="fa-solid fa-star t-gold"></i>
                    <i class="fa-solid fa-star t-gold"></i>
                    <i class="fa-solid fa-star t-gold"></i>
                    <i class="fa-solid fa-star t-gold"></i>
                    <i class="fa-solid fa-star t-gold"></i>
                    <span class="fs-6">(99)</span>
                  </div>
                </div>
              </div>`;
            arrOfContainerEle[e].appendChild(mainDiv);
          }
        }
      }
    });
};
addProdutsShop(productShop);
