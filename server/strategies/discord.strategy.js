const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const DiscordUser = require("../models/user.model");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await DiscordUser.findById(id);
  if (user) {
    done(null, user);
  }
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_AUTH_REDIRECT,
      scope: ["identify", "guilds"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await DiscordUser.findOne({ id: profile.id });
        if (user) {
          done(null, user);
        } else {
          const newUser = await DiscordUser.create({
            id: profile.id,
            username: profile.username,
            guilds: profile.guilds,
          });
          const savedUser = await newUser.save();
          done(null, savedUser);
        }
      } catch (err) {
        console.log(err);
        done(err, null);
      }
    }
  )
);
