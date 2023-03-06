let slider = document.querySelector(".slider");
let isdown = false;
let startx;
let scrollLeft;
slider.addEventListener("mousedown", (e) => {
  isdown = true;
  startx = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  isdown = false;
});
slider.addEventListener("mouseup", () => {
  isdown = false;
  console.log("folse");
});
slider.addEventListener("mousemove", (e) => {
  if (!isdown) return;
  e.preventDefault();
  let x = e.pageX - slider.offsetLeft;
  let walk = x - startx;
  console.log({ startx, x, walk });
  slider.scrollLeft = scrollLeft - walk;
});
