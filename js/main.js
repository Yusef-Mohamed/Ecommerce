if (window.sessionStorage.getItem("category") == undefined) {
  window.sessionStorage.setItem("category", "electronics");
}
if (window.sessionStorage.getItem("product") == undefined) {
  window.sessionStorage.setItem("product", "1");
}
// categories slider
let categSliderBullets = document.querySelectorAll(".bullets span");
if (categSliderBullets.length > 0) {
  categSliderBullets.forEach((e, index) => {
    e.addEventListener("click", (eve) => {
      categSliderBullets.forEach((ele) => {
        ele.classList.remove("active");
      });
      eve.target.classList.add("active");
      slideCounter = index + 1;
      if (eve.target === categSliderBullets[0]) {
        document.querySelector(".categories img").src = "img/carousel-1.jpg";
        document.querySelector(".categories h2").innerHTML = "Men Fashion";
      } else if (eve.target === categSliderBullets[1]) {
        document.querySelector(".categories img").src = "img/carousel-2.jpg";
        document.querySelector(".categories h2").innerHTML = "Women Fashion";
      } else {
        document.querySelector(".categories img").src = "img/carousel-3.jpg";
        document.querySelector(".categories h2").innerHTML = "Kids Fashion";
      }
    });
  });
}

let productContainer = document.querySelectorAll(".product-container");
if (productContainer.length > 0) {
  // Adding porducts to page func
  let addProduts = function (arrOfContainerEle) {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        for (i = 0; i < json.length; i++) {
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
            mainDiv.classList.add("col-sm-6", "col-md-4", "col-lg-3");
            mainDiv.innerHTML = `
        <div class="card product mb-4 w-100">
        <div class="overflow-hidden hover position-relative">
          <div class="product-overlay" data-id=${json[i].id}>
            <i class="fa-solid fa-cart-shopping shopping-add" data-id=${json[i].id}></i>
            <i class="fa-regular fa-heart fav-add ${favActive}" data-id=${json[i].id} ></i>
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
            shopingCartFun();
          }
        }
      });
  };
  addProduts(productContainer);
}

// Open A Cate Page
let cateEle = document.querySelectorAll(".categories-list div");
cateEle.forEach((e) => {
  e.addEventListener("click", (ele) => {
    if (ele.target.parentElement.dataset.categore) {
      window.sessionStorage.setItem(
        "category",
        ele.target.parentElement.dataset.categore
      );
    } else {
      window.sessionStorage.setItem(
        "category",
        ele.target.parentElement.parentElement.dataset.categore
      );
    }
    window.open("Shop.html");
  });
});

// open Shop Detal
setTimeout(() => {
  let prducts = document.querySelectorAll(".product");
  prducts.forEach((e) => {
    e.addEventListener("click", (ele) => {
      if (ele.target.classList.contains("product-overlay")) {
        window.sessionStorage.setItem("product", ele.target.dataset.id);
        window.open("detail.html");
      }
    });
  });
}, 1000);

// Adding Item To shoping Cart

let shopingCartFun = function () {
  let shopingCart = [];
  if (localStorage.getItem("cartArr")) {
    shopingCart = JSON.parse(localStorage.getItem("cartArr"));
  }
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("shopping-add")) {
      let newOne = true;
      for (i = 0; i < shopingCart.length; i++) {
        if (shopingCart[i].id == e.target.dataset.id) {
          newOne = false;
        }
      }
      if (newOne) {
        shopingCart.push({
          id: e.target.dataset.id,
          amount: 1,
        });
      } else {
        for (i = 0; i < shopingCart.length; i++) {
          if (shopingCart[i].id == e.target.dataset.id) {
            shopingCart[i].amount += 1;
          }
        }
      }
      localStorage.setItem("cartArr", JSON.stringify(shopingCart));
      cartNav();
    }
  });

  // Add number of products in nav
};
let cartNav = function () {
  if (localStorage.getItem("cartArr")) {
    let span = document.querySelectorAll(".cart-counter");
    span[0].innerHTML = JSON.parse(localStorage.getItem("cartArr")).length;
    span[1].innerHTML = JSON.parse(localStorage.getItem("cartArr")).length;
  }
};
let favNav = function () {
  if (localStorage.getItem("favList")) {
    let span = document.querySelectorAll(".fav-counter");
    span[0].innerHTML = JSON.parse(localStorage.getItem("favList")).length;
    span[1].innerHTML = JSON.parse(localStorage.getItem("favList")).length;
  }
};

// Fav List
let favListFun = function () {
  let favList = [];
  if (localStorage.getItem("favList")) {
    favList = JSON.parse(localStorage.getItem("favList"));
  }
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-heart")) {
      e.target.classList.toggle("on");
      let isnew = true;
      for (i = 0; i < favList.length; i++) {
        if (favList[i].id == e.target.dataset.id) {
          favList = favList.filter((ele) => ele.id != e.target.dataset.id);
          isnew = false;
        }
      }
      if (isnew) {
        favList.push({ id: e.target.dataset.id });
      }
      localStorage.setItem("favList", JSON.stringify(favList));
    }
    favNav();
  });
};
favListFun();
if (localStorage.getItem("cartArr")) {
  cartNav();
}
if (localStorage.getItem("favList")) {
  favNav();
}
