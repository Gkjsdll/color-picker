var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/colorPicker');

userSchema = mongoose.Schema({
  //Hex color codes only!!
  username: String,
  email: String,
  likes: [],
  saved: [],
});

var user = mongoose.model('User', userSchema);

module.exports = userSchema;

// TODO
// change colorFamilySchema
  // incorporate primary, secondary, tertiary
  // add like count
  // add tags
  // add parent
  // add userid
// add userSchema
  // userid
  // username
  // email
  // liked colors
  // saved colors