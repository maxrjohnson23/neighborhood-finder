const bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, user) {
  let User = user;
  const localStrategy = require("passport-local").Strategy;

  //serialize
passport.serializeUser(function(user, done) {
 
    done(null, user.id);
 
});

// deserialize user 
passport.deserializeUser(function(id, done) {
 
    User.findById(id).then(function(user) {
 
        if (user) {
 
            done(null, user.get());
 
        } else {
 
            done(user.errors, null);
 
        }
 
    });
 
});

  passport.use(
    "local-signup",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },

      function(req, email, password, done) {
        const generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        User.findOne({
          where: {
            email: email
          }
        }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: "That email is already taken"
            });
          } else {
            let userPassword = generateHash(password);

            let data = {
              email: email,
              password: password,
              first_name: req.body.first_name,
              lastname: req.body.last_name
            };

            User.create(data).then(function(newUser, created) {
              if (!newUser) {
                return done(null, false);
              }
              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );
};
