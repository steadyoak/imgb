const imgbu = window.location.href;
alert(imgbu);
if(imgbu == "https://www.imagebam.com/") {
const hinp = document.querySelector(".dz-hidden-input");
hinp.addEventListener("change", function(){
document.querySelector("[value='nsfw']").click();
document.querySelector(".btn").click();
}}
