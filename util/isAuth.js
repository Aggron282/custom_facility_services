const CheckAuth = (req,res,next) => {

    if(req.session.owner){
        next();
        return;
    }
    else{
        res.redirect("/auth/login");
        res.end();
        return;
    }

}

module.exports.CheckAuth = CheckAuth;
