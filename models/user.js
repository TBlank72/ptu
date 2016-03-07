var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({

  local         : {
    email       : String,
    password    : String,
    username    : String,
    name        : String
  },
  certs         : {
    cpt         : {
      attempts  : Number,
      score     : Number,
      passed    : Boolean,
      passed_on : Date,
    },
    cmt         : {
      attempts  : Number,
      score     : Number,
      passed    : Boolean,
      passed_on : Date,
    },
    cns         : {
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

// methods ==================
// generating a hash ========
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
//********may need to change to synchronous
// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create model for users and expose to app
module.exports = mongoose.model('User', userSchema);
