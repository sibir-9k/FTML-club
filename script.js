let position = 0;
const slidesToShow = 3;
const slidesToScroll = 1;
const container = document.querySelector(".slider-container");
const track = document.querySelector(".slider-track");
//   const item = document.querySelector('.slider-item');
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const items = document.querySelectorAll(".slider-item");
const itemsCount = items.length;
const itemWidth = container.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;

items.forEach((item) => {
  item.style.minWidth = `${itemWidth}px`;
});

btnNext.addEventListener("click", () => {
  const itemsLeft =
    itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

  position -=
    itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

  setPosition();
  checkBtns();
});

btnPrev.addEventListener("click", () => {
  const itemsLeft = Math.abs(position) / itemWidth;

  position +=
    itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

  setPosition();
  checkBtns();
});

const setPosition = () => {
  track.style.transform = `translateX(${position}px)`;
};

const checkBtns = () => {
  btnPrev.disabled = position === 0;
  btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
};

checkBtns();



const slider = document.querySelector(".slider-track");
const progressBar = document.querySelector(".prog-bar-inner");

let sliderGrabbed = false;

slider.parentElement.addEventListener("scroll", (e) => {
  progressBar.style.width = `${getScrollPercentage()}%`;
});

slider.addEventListener("mousedown", (e) => {
  sliderGrabbed = true;
  slider.style.cursor = "grabbing";
});

slider.addEventListener("mouseup", (e) => {
  sliderGrabbed = false;
  slider.style.cursor = "grab";
});

slider.addEventListener("mouseleave", (e) => {
  sliderGrabbed = false;
});

slider.addEventListener("mousemove", (e) => {
  if (sliderGrabbed) {
    slider.parentElement.scrollLeft -= e.movementX;
  }
});

slider.addEventListener("wheel", (e) => {
  e.preventDefault();
  slider.parentElement.scrollLeft += e.deltaY;
});

function getScrollPercentage() {
  return (
    (slider.parentElement.scrollLeft /
      (slider.parentElement.scrollWidth - slider.parentElement.clientWidth)) *
    100
  );
}
