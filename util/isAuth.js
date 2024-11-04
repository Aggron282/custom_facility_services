const CheckAuth = (req,res,next) => {
    if(req.session.isAuth){
        next();
        return;
    }else{
       
        next();
        return;   
    }
}

module.exports.CheckAuth = CheckAuth;