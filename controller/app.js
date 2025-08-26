const Distance = require("../model/app")

// POST API (ESP8266 will send data here)
exports.sendDistanceData = async (req, res) => {
    try {
    const { distance } = req.body;
    const newData = new Distance({ distance });
    await newData.save();
    res.status(201).send("Data saved");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
// GET API (Home Page → latest data)
exports.getLatestData = async (req, res) => {
  try {
    const latestData = await Distance.findOne().sort({ timestamp: -1 });
    res.json(latestData);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET API (Weekly Page → max data per day)
exports.getWeeklyData = async (req, res) => {
  try {
      const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const weeklyMax = await Distance.aggregate([
    { $match: { timestamp: { $gte: oneWeekAgo } } },
    {
      $group: {
        _id: { $dayOfWeek: "$timestamp" },
        maxDistance: { $min: "$distance" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json(weeklyMax);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
