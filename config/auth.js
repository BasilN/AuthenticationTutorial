// config/auth.js

module.exports = {
  'facebookAuth' : {
    'clientID'         :'',
    'clientSecret'     :'',
    'callbackURL'      :'http://localhost:8080/auth/facebook/callback'
  },

  'twitterAuth' : {
    'consumerKey'      :'',
    'consumerSecret'   :'',
    'callbackURL'      :'http://localhost:8080/auth/twitter/callback'
  },
  'googleAuth' : {
    'clientID'         :'',
    'cleintSecret'     :'',
    'callbackURL'      :'http://localhost:8080/auth/google/callback'
  }
};
