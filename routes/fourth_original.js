var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var stream = require('stream');
var fs = require("fs");

var queryString = "select * from Total_Predict limit 100 ;";
queryString += "select * from Total_Predict_h_0 order by StartTime limit 100;";

//queryString += "select * from Total_Predict_h_0 limit 600;";
//queryString += "select * from HVAC_Predict  limit 600";


var connection = mysql.createConnection({
    host: "ems.cs.nctu.edu.tw",
    user: "nchc",
    password:"nchc",
    database:"nchc",
    supportBigNumbers: true, 
    bigNumberStrings: true,
    multipleStatements: true
});



router.get("/",function(req,res){
    
    //res.render("Fourth",{IT_Predict :IT_Predict_Data});
    
    
    
    connection.query(queryString,function(error,rows,fields){
    if(!error)
    {
        
        
        console.log(rows);
        //傳query出來的資料給fourth.ejs
        res.render("fourth",{predict: rows });
    }
    else
        console.log(error);
    });
    
    
    /*

    var query = connection.query(queryString).stream({highWaterMark: Math.pow(2,16)});
    
    var testStream = stream.Writable({highWaterMark: Math.pow(2,16), objectMode: true});
    
    testStream._write = function(chunk,encoding,callback) {
        setTimeout(function() {
            console.log(chunk);
            callback();
        },500);
    }
    query.pipe(testStream);
 
    
    query.on("result",function(d,i) {
        console.log("Received data");
        
    });
    
    connection.end();
    
    */
});

module.exports = router;


/*
var IT_Predict_Data = getJsonConfig('IT_Predict_part1.json');

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}
function getJsonConfig(file){

    var filepath = __dirname + '/' + file;
    console.log(filepath);
    return readJsonFileSync(filepath);
}
*/