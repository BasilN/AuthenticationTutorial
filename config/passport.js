    // config/passport.js

    //load all the things we need
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStratevy = require('passport-facebook').Strategy;

    var User = require('../app/models/user');

    var configAuth = require('./auth')

    //expose this function to our app using module.exports
    module.exports = function(passport){
        // =========================================================================
        // passport session setup ==================================================
        //==========================================================================
        //required for persistent login sessions
        //passport needs ability to serialize and unserialize users out of session

        //used to serialize the user for the session
        passport.serializeUser(function(user, done){
          done(null, user.id);
        });

        //used to deserialize user
        passport.deserializeUser(function(id, done){
            User.findById(id, function(err, user){
              done(err, user);
            });
        });

        // =========================================================================
        // LOCAL SIGNUP ============================================================
        // =========================================================================

        //we are using named strategies since we have one for login and one for signup
        //by default, if there was no name, it would just be called 'local'

        passport.use('local-signup', new LocalStrategy({
          // by default, local strategy uses username and password, we will override with email
          usernameField :'email',
          passwordField :'password',
          passReqToCallback :true //allows us to pass back the entire request to the callback
          },
          function(req, email, password, done) {
            //asynchronous
            // Use.findOne wont fire unless data is sent back
            process.nextTick(function(){
              //find use by name
              User.findOne({'local.email': email}, function(err, user){
                if(err)
                  return done(err);
                //check to see if there's a user with that email
                if(user){
                  return done(null, false, req.flash('signupMessage', 'That email is already taken'))
                } else{
                  var newUser = new User();
                  newUser.local.email = email;
                  newUser.local.password = newUser.generateHash(password);

                  newUser.save(function(err){
                      if(err)
                        throw err;
                      return done(null, newUser);
                  });
                }
              });
            });
          }));

          // =========================================================================
          // LOCAL LOGIN ============================================================
          // =========================================================================

          passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback :true
          },
          function(req, email, password, done){
            User.findOne({'local.email': email}, function(err, user){
              if(err)
                return done(err);
              if(!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

              if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

              return done(null, user);

            });
          }));
  }
