let addProduts = function (productContainer) {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      // The Cart
      for (i = 0; i < json.length; i++) {
        if (localStorage.getItem("cartArr")) {
          let cartProduts = JSON.parse(localStorage.getItem("cartArr"));
          for (e = 0; e < cartProduts.length; e++) {
            if (json[i].id == cartProduts[e].id) {
              let tr = document.createElement("tr");
              tr.classList.add("bg-white", "my-2");
              tr.setAttribute("data-id", json[i].id);
              tr.innerHTML = `
              <td class="align-middle">
              <span
                ><img src="${
                  json[i].image
                }" class="pe-3" style="width: 50px" alt=""
              /></span>
              <span >${json[i].title.slice(0, 10)}...</span>
              </td>
              <td class="align-middle">$${json[i].price}</td>
              <td class="align-middle">
              <div
                class="num mx-auto d-flex text-center align-items-center bg-grey"
              >
                <span>
                  <i class="fa-solid fa-minus"></i>
                </span>
                <span class="px-2">${cartProduts[e].amount}</span>
                <span>
                  <i class="fa-solid fa-plus"></i>
                </span>
              </div>
              </td>
              <td class="align-middle final-price">$<span>${
                json[i].price * cartProduts[e].amount
              }</span></td>
              <td class="align-middle">
              <span class="cart-del del">X</span>
              </td>`;
              productContainer[0].appendChild(tr);
            }
          }
        }
      }
      deleteCart();
      totalfun();
      // The Fav
      for (i = 0; i < json.length; i++) {
        if (localStorage.getItem("favList")) {
          let favProducts = JSON.parse(localStorage.getItem("favList"));

          for (e = 0; e < favProducts.length; e++) {
            if (json[i].id == favProducts[e].id) {
              let tr = document.createElement("tr");
              tr.classList.add("bg-white", "my-2");
              tr.setAttribute("data-id", json[i].id);
              tr.innerHTML = `
              <td class="align-middle">
              <span
                ><img src="${
                  json[i].image
                }" class="pe-3" style="width: 50px" alt=""
              /></span>
              <span >${json[i].title.slice(0, 10)}...</span>
              </td>
              <td class="align-middle">$${json[i].price}</td>
              <td class="align-middle">
              <div
                class="num mx-auto d-flex text-center align-items-center bg-grey"
              >
                <button>
                  <i class="fa-solid fa-minus"></i>
                </button>
                <span class="px-2">1</span>
                <button>
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              </td>
              <td class="align-middle">$<span>${json[i].price}</span></td>
              <td class="align-middle">
              <span class="fav-del del">X</span>
              </td>`;
              productContainer[1].appendChild(tr);
            }
          }
        }
      }
      deleteFav();
    });
};

let totalfun = function () {
  let total = 0;
  document.querySelectorAll(".final-price span").forEach((e) => {
    total += parseFloat(+e.innerHTML);
  });
  document.querySelector(".sub-total").innerHTML = `$${total.toFixed(3)}`;
  document.querySelector(".full-total").innerHTML = `$${
    10 + +total.toFixed(3)
  }`;
};
let deleteCart = function () {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-del")) {
      let products = JSON.parse(localStorage.getItem("cartArr"));
      e.target.parentElement.parentElement.remove();
      products = products.filter(
        (product) =>
          product.id != e.target.parentElement.parentElement.dataset.id
      );
      localStorage.setItem("cartArr", JSON.stringify(products));
      totalfun();
    }
  });
};
let deleteFav = function () {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("fav-del")) {
      let products = JSON.parse(localStorage.getItem("favList"));
      e.target.parentElement.parentElement.remove();
      products = products.filter(
        (product) =>
          product.id != e.target.parentElement.parentElement.dataset.id
      );
      localStorage.setItem("favList", JSON.stringify(products));
    }
  });
};

addProduts(document.querySelectorAll("tbody"));
