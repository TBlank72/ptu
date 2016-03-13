// Relating 2 databases:
//  add a userId field with the ObjectId of the user on the cert schema.

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({

  local         : {
    email       : { type: String, set: toLower },
    password    : String,
    username    : String,
    name        : String
  },
  certs         : {
    cpt         : {
      verify_id : String,
      attempts  : Number,
      score     : Number,
      passed    : Boolean,
      passed_on : Date,
    },
    cmt         : {
      verify_id : String,
      attempts  : Number,
      score     : Number,
      passed    : Boolean,
      passed_on : Date,
    },
    cns         : {
      verify_id : String,
      attempts  : Number,
      score     : Number,
      passed    : Boolean,
      passed_on : Date,
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
module.exports = mongoose.model('User', userSchema);


