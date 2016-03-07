var CPTExam = require('../models/cpt');

module.exports.create = function(req,res) {
  var cptExam = new CPTExam(req.body);
  cptExam.save();
}
