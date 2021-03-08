module.exports = {
  isUser: (req, res, next)=> {
      if(req.user.role === 'User'){
         return next();
      } else {
        req.flash("error_msg", "Please Login in first to access this page");
        res.redirect('/login')
      }
  },


  isAdmin: (req, res, next)=> {
    if(req.user.role !== 'User'){
       return next();
    } else {
      res.status(403).send('UNAUTHORIZED');
    }
}
}