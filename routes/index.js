var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var app = express();
var d3 = require("d3");
var queryString = "select * from tempData_2017_02";

var connection = mysql.createConnection({
//var pool = mysql.createPool({
    host: "ems.cs.nctu.edu.tw",
    user: "nchc",
    password:"nchc",
    database:"nchc",
    multipleStatements: true,
    //waitForConnections : true,
    //connectionLimit : 10
});


//開各種檔案前需要fs模組
var fs = require("fs");

var text = fs.readFileSync(__dirname + "/diffusion_rate.txt").toString("utf-8");
var diffusionRateArray = text.split(",")




router.get("/",function(req,res){
    //為了不讓refresh之後還停留在之前的資料，所以queryString需要改
    queryString = "select * from tempData_2017_02";
    //pool.getConnection(function(error, connection) {
      //  if(!error)
        //{
            connection.query(queryString,function(error,rows,fields){
            if(!error)
            {
                //console.log(diffusionRateArray);
                //傳query出來的資料給index.ejs
                res.render("index",{items:rows , DF: diffusionRateArray});
            }
            else
                console.log("error query");
            });
        //}
    //});
});

//在client side頁面中使用get方法把資料傳到這個get

router.get("/update",function(req,res){
    
    //如果有呼叫get方法 "req.query.傳送的變數名稱" 就會是有值的
    var year = req.query.year;
    var month = req.query.month;
    
    //因為拿到的month的個位數是沒有0在前面的 所以要加 而造成不同的query選項
    if(month >= 1 && month <= 9)
        queryString = "select * from tempData_" + year + "_0" + month;
    else
        queryString = "select * from tempData_" + year + "_" + month;
    
    //pool.getConnection(function(error, connection) {
      //  if(!error)
        //{
            connection.query(queryString , function(error,rows,fields){
                if(!error)
                    res.send(rows);
            });
        //}
    //});
});



module.exports = router;

/*
//以下是開啟json的function，跟上方fs部分連接
//會從route裡面讀取json
var fixtureData = getJsonConfig('IT_Predict_part1.json');

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