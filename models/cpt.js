var mongoose = require('mongoose');

var cptSchema = mongoose.Schema({
  questions: [
    {
      question: "some question here",//schemas must be stirings
      options: [
        "creatine",
        "glucose",
        "phosphate",
        "carbs"
      ],
      answer: 2
    },
    {
      question: "question 2 question here",
      options: [
        "creatine 2",
        "glucose2",
        "phosphate2",
        "carbs2"
      ],
      answer: 2
    },

  ]

}); // End cptSchema


// create model for cpt exam and expose to app
module.exports = mongoose.model('CPTExam', cptSchema);
