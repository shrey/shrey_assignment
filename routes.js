const express = require("express") ;
const router = new express.Router();
const Question = require('./questionModel');
const { saveData } = require('./helper');

//GOOGLEAPIS
const { google } = require("googleapis");
const auth = new google.auth.GoogleAuth({
    keyFile : "keys.json", 
    scopes: "https://www.googleapis.com/auth/spreadsheets", 
});

router.post('/capture' , async( req, res ) =>{
    const { ssLink }  = req.body || {};
    var spreadsheetId ="";
    let i = 39;
    while(ssLink[i] !== '/' && i<ssLink.length) {
        spreadsheetId+=ssLink[i] ; 
        i++;
    }
    try{
        const authClientObject = await auth.getClient();
        const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
        const readData = await googleSheetsInstance.spreadsheets.values.get({
            auth, 
            spreadsheetId, 
            range: "A:H", 
        })
        await saveData(readData.data.values , (resp)=>{
            if(resp.status === 1 ) return res.status(200).send({status : resp.status , message : resp.message});
            else throw new Error(resp.message);
        });
    }catch(err){
        return res.status(500).send({status : 0 , message : err});
    }
});

router.post('/getQuestions', async(req, res)=>{
    let { pageNumber } = req.body;
    try{
        Question.find({}).skip(pageNumber*15).limit(15).exec((err , resp)=>{
            if(err || !resp) throw new Error(err);
            return res.status(200).send({status : 1 , questions : resp});
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : "Something went wrong!!"});
    }
})

module.exports = router;