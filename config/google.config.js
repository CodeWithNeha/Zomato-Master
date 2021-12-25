import googleOAuth from "passport-google-oauth20";

import {UserModel} from "../database/allModels";

const GoogleStrategy = googleOAuth.Strategy;


export default (passport) => {
  passport.use(
    new GoogleStrategy({
      clientID: "1072559483862-23gvd6a2m94nhjd6bqrs2koek1ehi3k9.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback"
    },
async(accessToken, refreshToken, profile, done) => {
  //creating a new user
  const newUser = {
    fullname: profile.displayName,
    email: profile.emails[0].value,
    profilePic: profile.photos[0].value
  };
  try{
    //check whether user exists or not
    const user = await UserModel.findOne({email: newUser.email});
    if(user) {

      //generating jwt token
      const token = user.generateJwtToken();
      //return user
      done(null, {user, token});
    } else {
      //create a new user
      const user = await UserModel.create(newUser);

      //generating jwt token
      const token = user.generateJwtToken();
      //return user
      done(null, {user, token});
    }
  } catch(error) {
    done(error, null);
  }
}
)
);

passport.serializeUser((userData,done) => done(null, {...userData}));
passport.deserializeUser((id, done) => done(null, id));

};

