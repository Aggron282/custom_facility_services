window.addEventListener("DOMContentLoaded", (event) => {
    
    var admin_text_quote = document.querySelector(".admin_text--quote");
    var admin_text_completed = document.querySelector(".admin_text--completed");

    admin_text_quote.addEventListener("click",async (e)=>{
       await axios.post("/admin/prospect/toggle",{toggle:0});
    });

    if(admin_text_completed){
        
        console.log(admin_text_completed)
        
        admin_text_completed.addEventListener("click",async (e)=>{
            await axios.post("/admin/prospect/toggle",{toggle:1});
        });

    }

    console.log(admin_text_completed,admin_text_quote);

})