const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");

let xValue = 0,
  yValue = 0;
let rotateDegree = 0;

//NOTES:
// speedx is the name of a custom data attribute, which could be defined in the HTML code like this: data-speedx="0.032"
// dataset is a property of the el variable that allows access to all the custom data attributes of the HTML element, prefixed with data-.
function reload(cursorPosition) {
  parallax_el.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;
    let isInLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue =
      (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

    el.style.transform = `perspective(2300px) translateZ(${
      zValue * speedz
    }px ) rotateY(${rotateDegree * rotateSpeed}deg)
        translateX(calc(-50% + ${-xValue * speedx}px)) 
        translateY(calc(-50% + ${yValue * speedy}px )) 
        `;
  });
}
reload(0);
window.addEventListener("mousemove", (e) => {
  if (timeline.isActive()) return;
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;
  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;
  reload(e.clientX);
  console.log(rotateDegree);
});

if (window.innerWidth >= 725) {
  main.style.maxHeight = `${window.innerWidth * 0.6}px`;
} else {
  main.style.maxHeight = `${window.innerWidth * 1.6}px`;
}

//GSAP Animation : but is not working properly figure it out

let timeline = gsap.timeline();

//This is for each layer of the image
Array.from(parallax_el)
  .filter((el) => !el.classList.contain("text"))
  .forEach((el) => {
    timeline.from(el, {
      //   top: "0px" original,
      //   top: "-820px from top working properly",
      top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
      duration: 3.5,
      ease: "Power3.out",
    });
  });
timeline
  .from(
    ".text h1",
    {
      y:
        window.innerHeight -
        document.querySelector(".text h1").getBoundingClientRect().top +
        200,
      duration: 2,
    },
    "2.5"
  )
  .from(
    ".text h2",
    {
      y: -150,
      opacity: 0,
      duration: 1.5,
    },
    "3"
  )
  .from(
    ".hide",
    {
      opacity: 0,
      duration: 1.5,
    },
    "3"
  );

// timeline.from(".bg-img", {
//   //   top: "0px" original,
//   //   top: "-820px from top working properly",
//   top: `${document.querySelector("bg-img").offsetHeight / 2 - 200}px`,
//   duration: 3.5,
//   ease: "Power3.easeOut",
// });
