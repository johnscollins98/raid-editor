let Log = require("../models/log.model");

const createLog = async (user, action, dataType, changedId) => {
  try {
    const newLog = new Log({
      user,
      action,
      dataType,
      changedId,
    });

    const addedLog = await newLog.save();
    console.log("Added new log successfully.");
  } catch (err) {
    console.log(`Error creating log: ${err}`);
  }
};

module.exports.createLog = createLog;
