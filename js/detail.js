fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    for (i = 0; i < json.length; i++) {
      if (json[i].id == window.sessionStorage.getItem("product")) {
        // Check if Product in Cart Arr
        let amountOfPr = 0;
        if (localStorage.getItem("cartArr")) {
          JSON.parse(localStorage.getItem("cartArr")).forEach((e) => {
            if (e.id == window.sessionStorage.getItem("product")) {
              amountOfPr = e.amount;
            }
          });
        }
        // add Photo Src
        document.querySelector(
          ".carousel-inner"
        ).innerHTML = `<div class="carousel-item active" data-bs-interval="10000">
          <img src="${json[i].image}" class="d-block w-100" alt="..." />
        </div>`;
        // add Name
        document.querySelector(".product-info").innerHTML = `
        <div class="bg-white p-4 t-ddark">
        <h2>${json[i].title}</h2>
        <div class="reviews">
          <i class="fa-solid fa-star t-gold"></i>
          <i class="fa-solid fa-star t-gold"></i>
          <i class="fa-solid fa-star t-gold"></i>
          <i class="fa-solid fa-star t-gold"></i>
          <i class="fa-solid fa-star t-gold"></i>
          <span>(99 reviews)</span>
        </div>
        <h4 class="price t-ddark py-4 m-0">$${json[i].price}</h4>
        <p class="m-0">
        ${json[i].description}
        </p>
        <div class="sizes-filter">
          <div
            class="p-3 ps-0 pb-0 d-flex align-items-center"
            style="flex-wrap: wrap"
          >
            <span class="t-ddark fw-semibold">Sizes: </span>
            <div class="form-check d-flex align-items-center ms-3">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="xs"
              />
              <label class="form-check-label ms-2 pt-1" for="xs">
                XS
              </label>
            </div>
            <div class="form-check d-flex align-items-center ms-3">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="s"
              />
              <label class="form-check-label ms-2 pt-1" for="s"> S </label>
            </div>
            <div class="form-check d-flex align-items-center ms-3">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="m"
              />
              <label class="form-check-label ms-2 pt-1" for="m"> M </label>
            </div>
            <div class="form-check d-flex align-items-center ms-3">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="l"
              />
              <label class="form-check-label ms-2 pt-1" for="l"> L </label>
            </div>
            <div class="form-check d-flex align-items-center ms-3">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="lg"
              />
              <label class="form-check-label ms-2 pt-1" for="lg">
                LG
              </label>
            </div>
          </div>
        </div>
        <div class="color-filter">
          <div
            class="p-3 ps-0 pb-0 d-flex align-items-center"
            style="flex-wrap: wrap"
          >
            <span class="t-ddark fw-semibold">Colors: </span>
            <div class="form-check d-flex align-items-center ms-3">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="black"
              />
              <label class="form-check-label ms-2 pt-1" for="black">
                Black
              </label>
            </div>
            <div class="form-check d-flex align-items-center ms-3">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="white"
              />
              <label class="form-check-label ms-2 pt-1" for="white">
                White
              </label>
            </div>
            <div class="form-check d-flex align-items-center ms-3">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="red"
              />
              <label class="form-check-label ms-2 pt-1" for="red">
                Red
              </label>
            </div>
            <div class="form-check d-flex align-items-center ms-3">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="blue"
              />
              <label class="form-check-label ms-2 pt-1" for="blue">
                Blue
              </label>
            </div>
            <div class="form-check d-flex align-items-center ms-3">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="green"
              />
              <label class="form-check-label ms-2 pt-1" for="green">
                Green
              </label>
            </div>
          </div>
        </div>
        <div class="cart-adder d-flex gap-3 py-4">
          <div class="num d-flex text-center align-items-center bg-grey">
            <span class="minus">
              <i class="fa-solid fa-minus minus"></i>
            </span>
            <span class="px-3 num">${amountOfPr}</span>
            <span class ="plus">
              <i class="fa-solid fa-plus plus"></i>
            </span>
          </div>
          <div class="submit sub">
            <i class="fa-solid fa-cart-shopping sub"></i>
            <span class="sub">Add To Cart</span>
          </div>
        </div>
        <div class="share d-flex gap-3">
          <span class="t-ddark fw-semibold">Share on : </span>
          <ul class="list-unstyled d-flex gap-3">
            <li>
              <a href="#">
                <i class="fa-brands fa-facebook-f t-ddark"></i
              ></a>
            </li>
            <li>
              <a href="#"> <i class="fa-brands fa-twitter t-ddark"></i></a>
            </li>
            <li>
              <a href="#">
                <i class="fa-brands fa-linkedin-in t-ddark"></i
              ></a>
            </li>
          </ul>
        </div>
      </div>`;
      }
    }
    addProduts();
  });

// Add To Cart From + -

let addProduts = function () {
  let plus = document.querySelector("fa-plus");
  let minus = document.querySelector("fa-minus");
  let num = document.querySelector("span.num");
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("plus")) {
      num.innerHTML = +num.innerHTML + 1;
    }
    if (e.target.classList.contains("minus")) {
      num.innerHTML = +num.innerHTML - 1;
    }
    if (e.target.classList.contains("sub")) {
      // ============================================
      if (localStorage.getItem("cartArr")) {
        let cartArr = JSON.parse(localStorage.getItem("cartArr"));
        let isnew = true;
        cartArr.forEach((el) => {
          if (el.id == window.sessionStorage.getItem("product")) {
            cartArr = cartArr.filter(
              (ele) => ele.id != sessionStorage.getItem("product")
            );
            cartArr.push({
              id: window.sessionStorage.getItem("product"),
              amount: +num.innerHTML,
            });
            localStorage.setItem("cartArr", JSON.stringify(cartArr));
            isnew = false;
          }
        });
        if (isnew) {
          cartArr.push({
            id: sessionStorage.getItem("product"),
            amount: +num.innerHTML,
          });
          localStorage.setItem("cartArr", JSON.stringify(cartArr));
        }
      } else {
        localStorage.setItem(
          "cartArr",
          JSON.stringify([
            { id: sessionStorage.getItem("product"), amount: +num.innerHTML },
          ])
        );
      }
      carttNav();
    }
  });
};

// products info

let infoSpan = document.querySelectorAll(".info-bar span");
let description = document.querySelector(".description");
let Information = document.querySelector(".Information");
let reviews = document.querySelector(".reviews");
let arrOfSub = [description, Information, reviews];
infoSpan.forEach((e, index) => {
  e.onclick = function (ele) {
    infoSpan.forEach((spans) => {
      spans.classList.remove("active");
    });
    ele.target.classList.add("active");
    arrOfSub.forEach((sub) => {
      sub.classList.remove("active");
    });
    arrOfSub[index].classList.add("active");
  };
});
let carttNav = function () {
  if (localStorage.getItem("cartArr")) {
    let span = document.querySelectorAll(".cart-counter");
    span[0].innerHTML = JSON.parse(localStorage.getItem("cartArr")).length;
    span[1].innerHTML = JSON.parse(localStorage.getItem("cartArr")).length;
  }
};
