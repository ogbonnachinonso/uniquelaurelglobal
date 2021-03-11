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
    if(req.user.id === '603d5948b706ba39381057bc'){
       return next();
    } else {
      res.status(403).send('UNAUTHORIZED');
      res.redirect('/')
    }
}
}


// 603d5948b706ba39381057bc remote

// 603e0259c019e81ad8ab314b local