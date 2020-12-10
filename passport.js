const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");

require("dotenv").config();

// JSON WEB TOKEN STRATEGY
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromHeader("authorization");
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      // Find the user specified in token
      const user = await User.findById(payload.sub);

      // if user doesn't exist, handle it
      if (!user) {
        return done(null, false);
      }

      // Otherwise, return the user
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  })
);

// JSON WEB TOKEN STRATEGY
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // find the user given the email
      const user = await User.findOne({ email });
      // if not, handle it
      if (!user) {
        return done(null, false);
      }
      // check, if the password is correct

      // if not, handle it
      // Otherwise, return the user
    }
  )
);
