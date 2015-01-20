// app/routes.js
// Maybe swith this to angular routing later ??
module.exports= function(app, passport){

  // ============================================================
  // Home Page (with login links)
  // ============================================================
  app.get('/', function(req, res){
    res.render('index.ejs'); // load the index.ejs file
  });

  // ============================================================
  // LOGIN
  // ============================================================
  // show the login form
  app.get('/login', function(req, res){
    // render page and pass in any flash data if exists
    res.render('login.ejs', {message:req.flash('loginMessage')});

    //process login form
    app.post('/login', passport.authenticate('local-login',{
      successRedirect :'/profile',
      failureRedirect :'/login',
      failureFlash : true //allow flash messages
    }));
  })

  // ============================================================
  // SIGNUP
  // ============================================================
  // show the sign up form
  app.get('/signup', function(req, res){
    res.render('signup.ejs', {message:req.flash('signupMessage')});

    //process the signup form
    app.post('/signup', passport.authenticate('local-signup',{
      successRedirect :'/profile',
      failureRedirect :'/signup',
      failureFlash :true
    }));
  });

  // ============================================================
  // PROFILE SECTION ============================================
  // ============================================================
  // show the profile page protected by login method
  app.get('/profile', isLoggedIn, function(req, res){
    res.render('profile.ejs', {
        user: req.user //get the user out of session and pass to template
      });
  });

  // ============================================================
  // LOGOUT ============================================
  // ============================================================

    app.get('/logout', function(req, res){
      req.logout();
      req.redirect('/');
    });
};

  //route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next){

    //if user is authenticated in the session, carry on
    if(req.isAuthenticated())
      return next()

    //if they aren't redirect them to the home page
    res.redirect('/');
  }
