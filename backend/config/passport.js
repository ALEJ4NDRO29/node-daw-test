var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GithubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');
var MyUser = mongoose.model('MyUser');
var secret = require('../config/secret');

var logger = require('log4js').getLogger();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log(`id: ${id}`);
  MyUser.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
});

passport.use(new LocalStrategy({
  usernameField: 'user[username]',
  passwordField: 'user[password]'
}, function (username, password, done) {
  MyUser.findOne({ username: username }).then(function (user) {

    if (!user || !user.validPassword(password)) {
      return done(null, false, { errors: { 'nickname or password': 'is invalid' } });
    }

    return done(null, user);
  }).catch(done);
}));


passport.use(new GithubStrategy({
  clientID: secret.GITHUB_CLIENT_ID,
  clientSecret: secret.GITHUB_CLIENT_SECRET,
  callbackURL: secret.GITHUB_CALLBACK,
  passReqToCallback: true,
  scope: 'user:email'
},
  function (request, accessToken, refreshToken, profile, done) {
    // logger.debug(profile);

    MyUser.findOne({ socialid: profile.id.toString() }).then(function (user) {
      if (user) {
        done(null, user);
      } else {
        user = new MyUser({
          socialid: profile.id,
          username: profile.username,
          img: profile.photos[0].value,
          email: profile.emails[0].value
        });
        user.save(function(err) {
          if(err){
            logger.error(err);
            return done(null);
          }
          return done(null, user);
      });
      }
    }).catch(done);

  }));

// passport.use(new LocalStrategy({
//   usernameField: 'user[email]',
//   passwordField: 'user[password]'
// }, function(email, password, done) {
//   User.findOne({email: email}).then(function(user){
//     if(!user || !user.validPassword(password)){
//       return done(null, false, {errors: {'email or password': 'is invalid'}});
//     }

//     return done(null, user);
//   }).catch(done);
// }));