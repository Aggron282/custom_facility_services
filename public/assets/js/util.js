const Delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const DelayedRefresh = async (time) => {
  await Delay(time);
  window.location.assign(window.location.href)
}

const DelayedRedirect = async (time,url) => {
  await Delay(time);
  window.location.assign(url)
}

const ToggleActiveClasses = async (element,inactive_class,active_class,is_active) => {

  if(!element.classList){
    return null;
  }

  if(is_active){
    element.classList.remove(inactive_class);
    element.classList.add(active_class);
  }
  else{
    element.classList.remove(active_class);
    element.classList.add(inactive_class);
  }

}
