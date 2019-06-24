const mongoose = require("mongoose");
const MongooseMap = require("mongoose-map")(mongoose);
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  discogsUserData: {
      type: Map,
      default: null
    },
  discogsAccessData: {
      type: Map,
      default: null
    },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});



module.exports = User = mongoose.model("users", UserSchema);
