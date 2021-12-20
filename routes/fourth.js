var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var time = require('time');

var queryString = "select * from Total_Predict_h_0_2017_01;";
//queryString += "select * from IT order by DataTime desc limit 500;";
//queryString += "select * from HVAC order by DataTime desc limit 500";


var connection = mysql.createConnection({
    host: "ems.cs.nctu.edu.tw",
    user: "nchc",
    password:"nchc",
    database:"nchc",
    multipleStatements: true
});



//繼承Date做出回傳year跟month 最後天數是補充的 以後可能用的到
Date.prototype.yyyy = function() {
  
  return this.getFullYear();
};
Date.prototype.mm = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  
  return (mm>9 ? '' : '0') + mm;
};

Date.prototype.dd = function() {
  var dd = this.getDate ;
  
  return (dd>9 ? '' : '0') + dd;
};

//取得使用者存取的時間以query當時的表
var date = new Date();
var year = date.yyyy();
var month = date.mm();





router.get("/",function(req,res){
    
    month = "01";
    
    queryString = "select * from Total_Predict_h_0_" + year + "_" + month;
    
    connection.query(queryString,function(error,rows,fields){
    if(!error)
    {
        console.log(rows);
        //傳query出來的資料給address.ejs
        res.render("fourth",{power: rows , yearNow: year , monthNow: month});
    }
    else
        console.log(error);
    });
});

router.get("/update",function(req,res){
   
    //如果有呼叫get方法 "req.query.傳送的變數名稱" 就會是有值的
    var yearSelected = req.query.year;
    var monthSelected = req.query.month;
    var modeSelected = req.query.modeSelected;
    var crossModelSelected = req.query.crossModelSelected;
    var resolutionSelected = req.query.resolutionSelected;
    
    var mode = ["Total","IT","HVAC","PUE"];
    var resolution = ["h","d"];
    
    console.log(monthSelected + "/" + yearSelected);
    
    
    
    queryString = "select * from " + mode[modeSelected] + "_Predict_" +
        resolution[resolutionSelected] + "_" + crossModelSelected + "_" + yearSelected + "_" + monthSelected;
    console.log(queryString);
    
    
    connection.query(queryString , function(error,rows,fields){
        if(!error)
            res.send(rows);
        
        //console.log(rows);
    });
    
    
    
});


module.exports = router;