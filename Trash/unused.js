
const DeleteQuotes = (req,res,next) => {

  Schedule.deleteThese(req.body.quotes,(data)=>{
      res.redirect("/admin/home");
    });

}


const MakeFavorite = async(req,res,next) => {

    var _id = req.body._id;
    var isFav = req.body.isFav;

    var fav = await Schedule.MakeFavorite(_id,isFav,(success)=>{
      var data = utility.renderAllData(req,res);
      res.redirect("/admin/home");
    });

}

const CompleteQuotes = async(req,res,next)=>{

    Schedule.completeThese(req.body.quotes,(data)=>{
      res.redirect("/admin/home");
    });

}

module.exports.CompleteQuotes = CompleteQuotes;
module.exports.DeleteQuotes = DeleteQuotes;
module.exports.MakeFavorite = MakeFavorite;
