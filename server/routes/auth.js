const router = require("express").Router();
const passport = require("passport");
const axios = require("axios");

router.get("/", passport.authenticate("discord"));

router.get(
  "/redirect",
  passport.authenticate("discord", {
    failureRedirect: "/forbidden",
    successRedirect: "/",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/authorization", async (req, res) => {
  if (req.user) {
    const loggedIn = true;
    const inSO = req.user.guilds.find((g) => g.id == process.env.SO_ID) != null;

    let authorized = false;
    if (inSO) {
      const roles = await getRoles(req.user.id);
      authorized = roles.includes(process.env.VALID_ROLE);
    }
    res.json({ loggedIn, authorized, username: req.user.username });
  } else {
    res.status(403).json("Forbidden");
  }
});

const getRoles = async (userId) => {
  const url = `https://discord.com/api/guilds/${process.env.SO_ID}/members/${userId}`;
  const params = { headers: { Authorization: `Bot ${process.env.BOT_TOKEN}` } };
  const user = await axios.get(url, params);
  return user.data.roles;
};

module.exports = router;
