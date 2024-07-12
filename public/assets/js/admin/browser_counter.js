var hasCounted = false;

const getBrowserName =  () => {

    let browserInfo = navigator.userAgent;
    let browser;

    if (browserInfo.includes('Opera') || browserInfo.includes('Opr')) {
      browser = 'Opera';
    } else if (browserInfo.includes('Edg')) {
      browser = 'Edge';
    } else if (browserInfo.includes('Chrome')) {
      browser = 'Chrome';
    } else if (browserInfo.includes('Safari')) {
      browser = 'Safari';
    } else if (browserInfo.includes('Firefox')) {
      browser = 'Firefox'
    } else {
      browser = 'unknown'
    }

    return browser;

  }

const InitBrowser =  async ()=>{


    var v =  getBrowserName();
    var root = GetRoot();
    var obj ={
      browser:v,
      root:root
    }
    console.log(obj);

    var  a =  await axios.post("/admin/browser",obj)
    console.log(a);

}

window.onload = (event) => {
   InitBrowser();
}
