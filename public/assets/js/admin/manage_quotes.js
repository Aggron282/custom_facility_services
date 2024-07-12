var quotes_to_be_deleted = [];

var option_buttons = document.getElementsByClassName("option_button");
var favorite_buttons = document.getElementsByClassName("favorite_button");
var delete_button = document.querySelector(".delete_quote_button");
var complete_button = document.querySelector(".complete_quote_button");
const sendQuotes  = async (className,backend_url,frontend_url)=>{
var interactable = complete_button.getAttribute("interactable");
var r;
complete_button = document.querySelector("."+className)

  if(interactable == 1){

      r = await axios.post(`/admin/${backend_url}`,{quotes:quotes_to_be_deleted}, {

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }

    });

     window.location.assign(`/admin/${frontend_url}`);

  }

}

function MakeDeleteButtonVisible(){

  if(quotes_to_be_deleted.length > 0 ){

    delete_button.classList.add("active_quote_button");
    delete_button.setAttribute("interactable",1);

  }else{

    delete_button.classList.remove("active_quote_button");
    delete_button.setAttribute("interactable",-1);

  }

}

function ToggleDelete(element){

  var id = element.parentElement.getAttribute("quote_id");
  var found = false;

  if(quotes_to_be_deleted.length == 0 ){

    quotes_to_be_deleted.push(id);

    element.classList.add("active_delete");

    if(quotes_to_be_deleted.length >= 0){
      complete_button.classList.remove("inactive_quote");
      complete_button.setAttribute("interactable",1);
    }

    found = false;

  }else{

    complete_button.classList.remove("inactive_quote");
    complete_button.setAttribute("interactable",1);

    for(var i = 0; i < quotes_to_be_deleted.length; i++){

      if(id == quotes_to_be_deleted[i]){

        var index = quotes_to_be_deleted.indexOf(id);

        if(index > 0){
          quotes_to_be_deleted.splice(index,1);
          element.classList.remove("active_delete");
        }

        found = true;

      }

    }

    if(!found){
        quotes_to_be_deleted.push(id);
        element.classList.add("active_delete");
    }

  }

  MakeDeleteButtonVisible();

}

function AddFavoriteEvents(){

  for (var i = 0; i < favorite_buttons.length; i++)
  {

    var isFav = favorite_buttons[i].getAttribute("isFav");

    if(isFav == "true"){
      favorite_buttons[i].classList.add("active_fav");
    }else{
      favorite_buttons[i].classList.remove("active_fav");
    }

    favorite_buttons[i].addEventListener("click", async (e)=>{

        var toggle = false;

        isFav = e.target.getAttribute("isFav");

        if(!isFav || isFav == "false" || isFav == false){
          toggle = true;
        }else{
          toggle = false;
        }

        await axios.post("/admin/favorite",{isFav:toggle,_id:e.target.getAttribute("quote_id")}, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        e.target.setAttribute("isFav",toggle);

        if(toggle){
          e.target.classList.add("active_fav");
        }else{
          e.target.classList.remove("active_fav");
        }

      })

    }

}

function AddOptionEvents(){

    for (var i = 0; i < option_buttons.length; i++) {
      option_buttons[i].addEventListener("click", (e)=>{ToggleDelete(e.target)})
    }

}

function Init(){

  if(delete_button){

    delete_button.addEventListener("click", async (e)=>{
      sendQuotes("delete_quote_button","delete_quotes","home");
    });

    complete_button.addEventListener("click", async (e)=>{
      setQuotesToBeCompleted("complete_quote_button","complete_quotes","home");
    })

    AddOptionEvents();
    AddFavoriteEvents();
  }

}

Init();
