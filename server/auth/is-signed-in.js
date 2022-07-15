const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const Users = require("../models/users.model");

const jwtCallback = async (payload, done) => {
  const user = await Users.findById(payload._id);

  if (user)
    return done(null, {
      _id: user._id,
      name: user.name,
      email: user.email,
    });

  return done(null, false);
};

const init = passport.initialize();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JwtStrategy(opts, jwtCallback));

const passAuth = passport.authenticate("jwt", {
  session: false,
});

module.exports = [init, passAuth];
