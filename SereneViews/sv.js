var loading = document.querySelector("#loading");
var heading = document.querySelector("nav h1");
var page1 = document.querySelector("#page1");
var vidCards = document.querySelectorAll(".card-video");
var videoPlayer = document.querySelector("#video-player");
var crossSvg = document.querySelector(".crosssvg");
var vidContainer = document.querySelector("#video-player video");
var scrollPosition;
let aud;
const tl = gsap.timeline();

setTimeout(() => {
  tl.to(loading, {
    y: "-100%",
    ease: "power1.out",
    duration: 1,
  });
  tl.from(heading, {
    x: 50,
    opacity: 0,
    ease: "power1.out",
  });
  tl.from(vidCards, {
    scale: 0.8,
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power1.out",
    stagger: 0.1,
  });
}, 20000);

vidCards.forEach((vid) => {
  vid.addEventListener("click", () => {
    const specificAud = vid.querySelector("audio");
    let name = vid.querySelector(".txt").innerText.split(" ").join("");
    vidContainer.setAttribute("src", `../Assets/${name}.mp4`);
    gsap.to(videoPlayer, {
      x: 0,
      top: `${scrollPosition}`,
      opacity: 1,
      duration: 1,
      ease: "none",
    });
    vidContainer.play();
    document.body.style.overflow = "hidden";
  });
});
crossSvg.addEventListener("click", () => {
  gsap.to(videoPlayer, {
    x: "-100%",
    opacity: 0,
    ease: "power1.out",
    duration: 1,
  });
  vidContainer.pause();
  document.body.style.overflow = "unset";
});

function locomotive() {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
  });
  scroll.on("scroll", (p) => {
    scrollPosition = p.scroll.y;
  });
}
locomotive();
