var loading = document.querySelector("#loading");
var imgContainer = document.querySelectorAll("#page1 section .hh-card");
var allAudios = document.querySelectorAll("#musics audio");
var cursor = document.querySelectorAll("#cursor");
var cursorhead = document.querySelector("#cursor h1");
var page1 = document.querySelector("#page1");
var allAudioArr = [];
allAudios.forEach(element => {
  allAudioArr.push(element)
});

loading.style.display="flex";

setTimeout(() => {
    let tl = gsap.timeline();
    tl.to(loading,{
        y:"-100%",
        ease: "power1",
        duration:1.5
    })

    tl.from(".mainhead",{
        y: 200,
        opacity: 0,
        duration: 1,
    })    

    tl.from(imgContainer,{
      scale: 0,
      opacity:0,
      stagger:0.2,
    })
    
}, 8000);

page1.addEventListener("mousemove",(e)=>{
  let rect = page1.getBoundingClientRect();
  let dleft = e.clientX - rect.left;
  let dtop = e.clientY -  rect.top;
  gsap.to(cursor,{
    x: dleft+"px",
    y: dtop+"px",
  })
})


imgContainer.forEach((img,idx) =>{
  img.addEventListener("click", () => {
    allAudioArr.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    allAudioArr[idx].play();
  });

  img.addEventListener("mousemove", () => {
    gsap.to(cursor, {
      width: 80,
      height: 80,
      duration: 0.3,
      ease: "power1.out",
    });
    gsap.to(cursorhead,{
      opacity:1,
      ease: "power1",
      fontSize: "1.7vw",
    })
  });



  img.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      width: 30, 
      height: 30,
      duration: 0.3,
      ease: "power1.out",
    });
    gsap.to(cursorhead,{
      opacity:0,
      ease: "power1"
    })
  });
})



function locomotive(){
  const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
  });
}
locomotive();