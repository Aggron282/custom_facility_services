const AddBrowserView = (req,res,next) =>{

    const ipAddress = req.ip;

    if(req.body.root !== "Schedule Page"){
      Meta.AddPageView(ipAddress);
      Meta.AddRootView(req.body.root);
      Meta.AddBrowserView(req.body.browser);
    }

}

const GetBrowserCounts = async ()=>{

      var browsers =   await Meta.ReturnAllBrowsers();

      var new_brow = {...brow};

      for(var i = 0; i < browsers.length;i++){

        if(browsers[i].browser == "Edge"){
          new_brow.edge = browsers[i].qty
        }
        else if(browsers[i].browser == "Chrome"){
          new_brow.chrome = browsers[i].qty
        }
        else if(browsers[i].browser == "Safari"){
          new_brow.safari = browsers[i].qty
        }
        else if(browsers[i].browser == "Firefox"){
          new_brow.firefox = browsers[i].qty
        }

      }

      return new_brow;
}


const RootCount = (req,res,next) =>{

    const pageName = Object.keys(req.body)[0];
    Meta.AddRootView(pageName);

}

module.exports.GetBrowserCounts = GetBrowserCounts;
module.exports.RootCount = RootCount;
module.exports.AddBrowserView = AddBrowserView;
