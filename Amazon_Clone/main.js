
/* MAKING SLIDE EFFECT ON CLICK ON BOTTONS */
const img=document.querySelectorAll(".header-slider ul img")
const prev_btn=document.querySelector(".control-prev");
const next_btn=document.querySelector(".control-next");
let n=0;
function changeSlide(){
    for(let i=0;i<img.length;i++){
        img[i].style.display='none';
    }
}

changeSlide();
img[0].style.display="block";
prev_btn.addEventListener("click",()=>{
    img[n].style.display="none";
    n--;
    if(n<0){
        n=img.length-1;
    }
    img[n].style.display="block";
});
next_btn.addEventListener("click",()=>{
    img[n].style.display="none";
    n++;
    if(n>=img.length){
        n=0;
    }
    img[n].style.display="block";

});

/* MAKING SLIDER IMAGES AUTOMTICALLY SLIDE AFTER 2 SECOND */
/* 
let currentIndex = 0;
const slides = document.querySelectorAll('.product-slider img');

function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    const offset = -currentIndex * 100;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
}

// Initial call to show the first slide
showNextSlide();

// Automatically switch slides every 3 seconds
setInterval(showNextSlide, 3000);

 */
/* MAKING THE PRODUCt SCROLL WITH MOUSE WHEEL */
const scrollContainer=document.querySelectorAll(".products");
for(const item of scrollContainer){
    item.addEventListener("wheel",(evt)=>{
        evt.preventDefault();
        item.scrollLeft +=evt.deltaY;
    })
}

/* 
const margin = getMarginBetween(prev_btn,box_row);

function getMarginBetween(div1, div2) {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();
    
    const margin = Math.abs(rect1.bottom - rect2.top);
    if(margin >=2){
        div2.style.mergin.top=margin;
    }
    return margin;
}
const box_row=document.querySelector(".box-row1");


console.log(`Margin between divs: ${margin}px`); 
*/

/* const box_row=document.querySelector(".box-row1");
const header_img=document.querySelector(".slider-img");

let imgHeight=header_img.clientHeight;
console.log(imgHeight);
if(imgHeight>420){
    let margin=-110-(imgHeight-420);
    console.log(margin);
    box_row.style.marginTop=margin;
} */
// if(headre_img.clientHeight-box_row.clientHeight >=250){
//     box.style.marginTop=-250;
// }


// MAkeing all below body blur 

const input = document.querySelector(".search-input");
const main = document.querySelector("main");
const header_slider = document.querySelector(".header-slider")
const nav_bottom = document.querySelector(".nav-bottom");

main.addEventListener('click',()=>{
    makeBlur(false);
})
header_slider.addEventListener('click',()=>{
    makeBlur(false);
})
nav_bottom.addEventListener('click',()=>{
    makeBlur(false);
})
input.addEventListener('click',()=>{
   makeBlur(true);
})
function makeBlur(blur){
    if(blur){
        nav_bottom.style.filter = "blur(3px)";
        header_slider.style.filter = "blur(3px)";
        main.style.filter = "blur(3px)";
    }else{
        nav_bottom.style.filter = "none";
        header_slider.style.filter = "none";
        main.style.filter = "none";
    }
}