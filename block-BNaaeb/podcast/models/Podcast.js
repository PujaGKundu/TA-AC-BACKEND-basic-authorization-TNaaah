var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var podcastSchema = new Schema(
  {
    file: { type: Object, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    subscriptionType: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Podcast", podcastSchema);
