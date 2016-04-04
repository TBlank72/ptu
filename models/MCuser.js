// models/user.js

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({

  local         : {
    email       : { type: String, set: toLower, unique: true },
    password    : String,
    name        : String
  },
  certs         : {
    cpt         : {
      title     : { type: String, default: 'Certified Personal Trainer' },
      verify_id : String,
      attempts  : Array,
      score     : { type: Number, default: 0 },
      passed    : { type: Boolean, default: false },
      passed_on : { type: Date, default: null },
      paid      : { type: Boolean, default: false },
      paid_on   : { type: Date, default: null }
    },
    cmt         : {
      title     : { type: String, default: 'Certified Master Trainer' },
      verify_id : String,
      attempts  : Array,
      score     : { type: Number, default: 0 },
      passed    : { type: Boolean, default: false },
      passed_on : { type: Date, default: null },
      paid      : { type: Boolean, default: false },
      paid_on   : { type: Date, default: null }
    },
    cns         : {
      title     : { type: String, default: 'Certified Nutrition Specialist' },
      verify_id : String,
      attempts  : Array,
      score     : { type: Number, default: 0 },
      passed    : { type: Boolean, default: false },
      passed_on : { type: Date, default: null },
      paid      : { type: Boolean, default: false },
      paid_on   : { type: Date, default: null }
    }
  },
  facebook      : {
    id          : String,
    token       : String,
    email       : String,
    name        : String
  },
  twitter       : {
    id          : String,
    token       : String,
    displayName : String,
    username    : String
  },
  google        : {
    id          : String,
    token       : String,
    email       : String,
    name        : String
  }

}); // End userSchema

// toLowerCase function
function toLower(v) {
  return v.toLowerCase();
}

// methods ==================
// generating a hash ========
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//********may need to change to synchronous
// checking if password is valid
userSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};
/* For accepting username or email for logins
userSchema.statics.isValidUserPassword = function(username, password, done) {
    var criteria = (username.indexOf('@') === -1) ? {username: username} : {email: username};
    this.findOne(criteria, function(err, user){
        // All the same...
    });
};*/


// create model for users and expose to app
var User = mongoose.model('User', userSchema);
module.exports = User; 

//-------------------------------------------------
