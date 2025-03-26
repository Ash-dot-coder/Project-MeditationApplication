var cursor = document.getElementById("cursor");
var body = document.body;
var page1 = document.getElementById("page1");
var page2 = document.getElementById("page2");
var page3 = document.getElementById("page3");
var menuSvg = document.querySelector("nav #svgDiv");
var sideMenu = document.querySelector("#side-Menu");
var sideHeads = document.querySelectorAll("#SideHeadings h1");
var crossSvg = document.querySelector(".crossSvg");
var p2heading = document.querySelector(".marq");
var p3Images = document.querySelectorAll("#page3 .imageDiv img");
var p3Content = document.querySelector("#p3Content");
var page4 = document.querySelector("#page4");
var p4svg = document.querySelector("#p4nav svg");
var ogh = document.querySelector("#og h4");
var page5 = document.querySelector("#page5");
var ogp = document.querySelector("#og p");
var loading = document.querySelector("#loading");
var p3imageDiv = document.querySelectorAll(".imageDiv");
var body = document.body;
var isSideMenu = false;

function locoMotive() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locoMotive();

page1.addEventListener("mousemove", (d) => {
  let rect = page1.getBoundingClientRect();
  gsap.to(cursor, {
    x: `${d.clientX - rect.left}px`,
    y: `${d.clientY - rect.top}px`,
    ease: "power2",
  });
});

page1.addEventListener("mouseenter", () => {
  gsap.to(cursor, {
    opacity: 1,
    scale: 1,
  });
});

page1.addEventListener("mouseleave", () => {
  gsap.to(cursor, {
    opacity: 0,
    scale: 0,
  });
});

menuSvg.addEventListener("mouseenter", (e) => {
  const rect = menuSvg.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  gsap.to(cursor, {
    x: centerX + "px",
    y: centerY + "px",
    scale: 1.4,
  });
});

menuSvg.addEventListener("mouseleave", () => {
  gsap.to(cursor, {
    scale: 1,
    ease: "power1",
    duration: 0.5,
  });
});

menuSvg.addEventListener("click", () => {
  if (!isSideMenu) {
    gsap.to(sideMenu, {
      top: "0",
      ease: "bounce.out",
      duration: 1,
    });
    body.style.overflow = "hidden";
    isSideMenu = true;
  }
});

crossSvg.addEventListener("click", () => {
  gsap.to(sideMenu, {
    top: "-100%",
    ease: "power3.out",
    duration: 1.5,
  });
  isSideMenu = false;
});

sideHeads.forEach((ele, idx) => {
  ele.addEventListener("click", () => {
    gsap.to(sideMenu, {
      top: "-100%",
      ease: "power3.out",
      duration: 1.5,
    });
    isSideMenu = false;
  });
});

// --------------------------------------------------------

gsap.to("#page2 .marq", {
  transform: "translateX(-50%)",
  scrollTrigger: {
    trigger: "#page2",
    scroller: "#main",
    start: "top 0%",
    end: "top -1500%",
    pin: true,
    scrub: 2,
  },
});

p3Images.forEach((img, idx) => {
  gsap.from(img, {
    opacity: 0,
    y: -100,
    stagger: true,
    duration: 2,
    scrollTrigger: {
      trigger: img,
      scroller: "#main",
      start: "top 60%",
      end: "top 50%",
      scrub: 2,
    },
  });

  img.addEventListener("click", () => {
    if (idx == 0) {
      window.location.href = "./MeditationTimer/mt.html";
    } else if (idx == 1) {
      window.location.href = "./HarmonyHeaven/hh.html";
    } else if (idx == 2) {
      window.location.href = "./SereneViews/sv.html";
    }
  });
});

//-----------------------page 4 svg animation---------------------------

let iniPath = "M 10 60 Q 400 60 840 60";
p4svg.addEventListener("mousemove", (e) => {
  const rect = page4.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  let path = `M 10 60 Q 400 ${mouseY} 840 60`;

  gsap.to("#page4 #p4nav svg path", {
    attr: {
      d: path,
    },
    duration: 0.2,
  });
});

p4svg.addEventListener("mouseleave", () => {
  gsap.to("#page4 #p4nav svg path", {
    attr: {
      d: iniPath,
    },
    ease: "elastic.out(1,0.1)",
    duration: 1,
  });
});

gsap.from(ogh, {
  opacity: 0,
  y: 50,
  scrollTrigger: {
    trigger: ogh,
    scroller: "#main",
    start: "top 90%",
    end: "top 80%",
    scrub: 2,
  },
});

gsap.from(ogp, {
  opacity: 0,
  y: 50,
  scrollTrigger: {
    trigger: ogp,
    scroller: "#main",
    start: "top 90%",
    end: "top 80%",
    scrub: 2,
  },
});

gsap.from("#aboutus1 img", {
  opacity: 0,
  y: 50,
  scrollTrigger: {
    trigger: ogp,
    scroller: "#main",
    start: "top 90%",
    end: "top 80%",
    scrub: 2,
  },
});

gsap.from("#page5 h1", {
  opacity: 0,
  y: 50,
  scrollTrigger: {
    trigger: "#page5 h1",
    scroller: "#main",
    start: "top 70%",
    end: "top 60%",
    scrub: 2,
  },
});
gsap.from("#page5 li", {
  opacity: 0,
  y: -50,
  stagger: 0.6,
  scrollTrigger: {
    trigger: "#page5 li",
    scroller: "#main",
    start: "top 70%",
    end: "top 60%",
    scrub: 1,
  },
});

window.addEventListener("load", () => {
  loading.style.display = "flex";
  body.style.overflowY = "hidden";
  setTimeout(() => {
    loading.style.display = "none";
    body.style.overflow = "unset";
  }, Math.floor(Math.random() * 1000) + 8000);
});
