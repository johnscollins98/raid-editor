const router = require("express").Router({ mergeParams: true });
let Log = require("../models/log.model");

router.get("/", async (req, res) => {
  try {
    const log = await Log.find();
    res.json(log);
  } catch (err) {
    res.status(400).json(`Error: ${err}`);
  }
});

module.exports = router;
