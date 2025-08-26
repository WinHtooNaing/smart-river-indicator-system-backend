const { Schema, model } = require("mongoose");

const distanceSchema = new Schema(
    {
  distance: Number,
  timestamp: { type: Date, default: Date.now },
}
)

const distanceModel = model("Distance", distanceSchema);

module.exports = distanceModel;