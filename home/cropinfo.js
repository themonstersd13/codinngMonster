const images=["ss.png","float.jpg","logo.jpg"];
let imageCont=document.querySelector(".imageCont");
let forward=document.querySelector(".forward");
let backward=document.querySelector(".backward");
let i=0;
let j=images.length-1;
forward.addEventListener("click",(ele)=>{
    imageCont.style.backgroundImage = `url(${images[i]})`;
    i++;
    if(i == images.length)
    {
        i=0;
    }
   
})
backward.addEventListener("click",(ele)=>{
    imageCont.style.backgroundImage = `url(${images[j]})`;
    j--;
    if(j == -1)
    {
        j=images.length-1;
    }
})
