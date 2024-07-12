// var is_flipped = false;
// var images = document.getElementsByClassName("image_container_before_and_after_inner");
// var banner = document.querySelector(".banner_flip_inner");
//
// function AddClass(i){
//   console.log(i)
//   if(!is_flipped){
//     images[i].classList.add("image_container_before_and_after_inner--flipped")
//   }else{
//     images[i].classList.remove("image_container_before_and_after_inner--flipped")
//   }
//
// }
//
// const timer = ms => new Promise(res => setTimeout(res, ms));
//
// setInterval(async ()=>{
//
//
//
//         for(var i = 0; i < images.length; i++){
//           await timer(200);
//           AddClass(i);
//       }
//
//         if(!is_flipped){
//
//           banner.classList.add("banner_flip_inner--flipped")
//         }else{
//
//           banner.classList.remove("banner_flip_inner--flipped")
//         }
//
//         if(!is_flipped){
//           is_flipped = true;
//         }else{
//          is_flipped = false;
//         }
//
//
//
//
// },4000)
