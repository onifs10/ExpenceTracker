import { PassportStatic } from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import authConfig from "./auth.config";
import UserModel from "../models/User.model";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: authConfig.secret_key,
  expiresIn: authConfig.expiresIn,
};

export default (passport: PassportStatic) => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      UserModel.findOne({ where: { id: payload.sub } })
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          return done(err, false);
        });
    })
  );
};
