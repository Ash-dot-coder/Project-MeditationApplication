var loadingScreen = document.querySelector("#loading");
var mtnav = document.querySelector("#page1 nav h1")
var h = document.querySelector(".hr");
var m = document.querySelector(".min");
var s = document.querySelector(".sec");
var timer = document.querySelector(".timer");
var sTBtn = document.querySelector("#timerbtn");
var Duration = document.querySelector("#duration");
var p1sound = document.querySelector(".timer audio");
var interval;
var isStarted = false;


loadingScreen.style.display = "flex";
document.body.style.overflow = "auto";


let tl = gsap.timeline();

setTimeout(() => {
  tl.to(loadingScreen,{
    y:"-100%",
    ease: "power1"
  })
  document.body.style.overflow = "auto";
  tl.from(mtnav,{
    y: 200,
    opacity: 0,
    duration: 1,
  })
  tl.from(".timer span",{
    y: 100,
    opacity: 0,
    duration: .5,
    stagger: 0.2
  });
  tl.to(sTBtn,{
    y: 0,
    opacity:1,
    duration: .2,
  })

  tl.from(Duration,{
    y: 100,
    opacity: 0,
    duration: .5,
  })

  tl.from(".betterEx",{
    opacity:0,
    x: 50,
    duration: .5
  })


}, 8000);

console.log(sTBtn);

sTBtn.addEventListener("click", () => {
  if (isStarted) {
    clearInterval(interval);
    p1sound.pause();
    isStarted = false;
    sTBtn.innerText = `Start Timer`;
  } else {
    p1sound.play();
    sTBtn.innerText = `Pause Timer`;
    let seconds = parseInt(s.innerText);
    let minutes = parseInt(m.innerText);
    interval = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          alert("Time's up!");
          sTBtn.innerText = `Start Timer`; 
          p1sound.pause();
          isStarted = false;
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      s.innerText = seconds < 10 ? "0" + seconds : seconds;
      m.innerText = minutes < 10 ? "0" + minutes : minutes;
    }, 1000);

    isStarted = true;
  }
});


Duration.addEventListener("change", (e) => {
  const selectedOption = e.target.value;
  const selectedText = e.target.options[e.target.selectedIndex].text;
  let num;
  if (selectedOption === "2") {
    num = +e.target.value;
    m.innerText = "0"+num
    s.innerText = "00";
  } else if (selectedOption === "5") {
    num = +e.target.value
    m.innerText = "0"+num;
    s.innerText = "00";
  } else if (selectedOption === "10") {
    num = +e.target.value
    m.innerText = num; 
    s.innerText = "00";
  }
});












function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


}
locomotive();