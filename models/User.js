var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  userImage: {
    type: String
  },

  facebookID: {
    type: String,
    default: null
  },

  favourites: [{ itineraryId: String, timestamp: Date }]
});

module.exports = User = mongoose.model("User", userSchema);
