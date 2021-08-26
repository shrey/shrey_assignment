const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    topic : {
        type : String,
    },
    difficulty : {
        type : String,
    },
    question : {
        type : String,
    },
    option1 : {
        type : String,
    },
    option2 : {
        type : String,
    },
    option3 : {
        type : String,
    },
    option4 : {
        type : String,
    },
    correctOption : {
        type : String,
    },
})

const Question= mongoose.model('Question' , questionSchema);
module.exports = Question;