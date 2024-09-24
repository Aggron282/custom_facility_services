// var quote_submit_button  = document.querySelector(".quote_submit_button");
// var container_quote = document.querySelector(".modal_container_toggle");
// var didGetQuote = false;
//
// function ReturnModal(outside,total,name){
//
//   return( `
//
//   <div  class= "cfs_modal_wrapper max-z  modal_wrapper_pos" id="blackWrapper"></div>
//
//     <div id="mainModal" tabindex="-1">
//
//     <div class="row">
//
//       <div class="col-3 mobile-col-1"></div>
//
//       <div class='col-6 modal_body no-padding mobile-col-10 white-background border-radius-5px heavy-shadow background-modal'>
//
//           <div class="row">
//
//             <div class="col-6">
//
//                 <div class="row margin-left-0">
//
//                   <div class="before_box width-100">
//                       <p class="text-banner width-40 float-left margin-top-5 mobile-width-80 mobile-font-20"> Before </p>
//                   </div>
//
//                   <div class="after_box width-100 >
//                       <p class="text-banner mobile-width-80 width-40 float-right margin-top-30 mobile-margin-right-5 mobile-after"> After </p>
//                   </div>
//
//                   </div>
//
//               </div>
//
//            <div class="col-6">
//
//               <div class="modal-dialog">
//
//                 <p class="quote_title font-40  bold akrobat text-center margin-top-10 mobile-margin-top-20">Your Quote:</p>
//
//                 <p class="quote_number quote_outside font-25  bold akrobat text-center margin-top-10" >$  <span class="quote_outside">${outside} </span> Inside or Outside</p>
//
//                 <p class="quote_number  font-25 margin-top-2_5 akrobat text-center ">$ <span class="quote_total">${total} </span> Inside and Outside</p>
//
//                 <div class="quote_contact_us font-25 margin-top-2_5 akrobat text-center margin-top-10"style="margin-top:15%">
//                   <p class="quote_pitch italic  akrobat  text-center font-20">Schedule a Cleaning Now!</p>
//                   <button class="btn width-90 btn-danger quote_button_modal width-80 margin-left-5 black  akrobat transparent border-radius-30px relative super-max-z font-20 border-bottom-black mobile-font-15"style="color:black !important">480-822-0511</button>
//                 </div>
//
//              </div>
//
//               <a href="/"><button class="no-style-button exit_button " type="submit"><p class="super-max-z font-25 absolute" style="right:-75% !important" id="modal_exit">X</p></button></a>
//
//             </div>
//
//           </div>
//
//         </div>
//
//      </div>
//
//   </div>`)
//
// }
//
// quote_submit_button.addEventListener("click",async (e)=>{
//
//   e.preventDefault();
//
//   var outside_text = document.querySelector(".quote_outside");
//   var total_text = document.querySelector(".quote_total");
//   var x = document.querySelector(".exit_button");
//   var fullName = document.querySelector("#full-name");
//   var address = document.querySelector("#address");
//   var zip = document.querySelector("#zip");
//   var screen_ = document.querySelector("#screen");
//   var small = document.querySelector("#small");
//   var medium = document.querySelector("#medium");
//   var large = document.querySelector("#large");
//
//   var price = {
//     large: 7,
//     medium:4,
//     small:2,
//     screen:6
//   }
//
//   var quote = {
//     name :fullName.value,
//     address:address.value,
//     zip:zip.value,
//     screen:parseInt(screen_.value),
//     small:parseInt(small.value),
//     medium: parseInt(medium.value),
//     large:parseInt(large.value)
//   }
//
//   var calc = {
//     small: quote.small * price.small,
//     medium: quote.medium * price.medium,
//     large: quote.large * price.large,
//     screens: quote.screen * price.screen,
//   }
//
//   var total = calc.small + calc.medium + calc.large + calc.screens;
//
//   var outside = Math.ceil(total * .6);
//
//   var form = {
//     name:quote.name,
//     outside:outside,
//     total:total
//   }
//
//   exit_button = document.querySelector(".modal_exit");
//
//   container_quote.innerHTML = ReturnModal(outside,total,null);
//
//   document.body.style.overflow = "hidden !important";
//
//   await axios.post("/",quote);
//
//   didGetQuote = true;
//
// });
