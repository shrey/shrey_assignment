const Question = require('./questionModel');

async function saveData(data, cb){
    for( let i = 1 ; i < data.length ; i++ ){
        const ques = {
            topic : data[i][0],
            difficulty : data[i][1],
            question : data[i][2],
            option1 : data[i][3],
            option2 : data[i][4],
            option3 : data[i][5],
            option4 : data[i][6],
            correctOption : data[i][7],
        }
        try{
            new Question(ques).save((err , question)=>{
                if(err || !question) throw new Error(err);
            })
        }catch(err){
            return cb({status : 0 , message : "An Error Occured!"});
        }
    }
    return cb({status : 1 , message : "Question Saved!"});
}

module.exports = {
    saveData
}