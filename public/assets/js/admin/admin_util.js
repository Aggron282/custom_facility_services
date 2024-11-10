
const RenderTopBanner = () => {

  var top_banner_html = `<div class="top_banner">Top Page </div>`;
  var view_boxes = document.getElementsByClassName("meta_root_container");
  var highest_el = null;
  var view_counter =0;

  for(var s = 0; s < view_boxes.length; s++){

    var views = parseInt(view_boxes[s].getAttribute("views"));

    if(views > view_counter){
      view_counter = views;
      highest_el = view_boxes[s];
    }

  }

  if(highest_el){
    highest_el.innerHTML += top_banner_html;
  }

}

RenderTopBanner();
