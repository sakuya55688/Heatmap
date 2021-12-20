var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var queryString = "select * from temperaturedata  limit 10";


var connection = mysql.createConnection({
    host: "ems.cs.nctu.edu.tw",
    user: "nchc",
    password:"nchc",
    database:"nchc"
});



//在首次進入頁面時會從這個get開始
//或是refresh之後也會回到這裡
router.get("/",function(req,res){
    
    
    connection.query(queryString , function(error,rows,fields){
        
    
        if(!error)
        {  
            console.log(rows);
            res.render("third",{title:"3D Map" , powerData: rows});
            
        }
        else
            console.log(error);
        

    });

    
});

//在client side頁面中使用get方法把資料傳到這個get

router.get("/:update",function(req,res){
    
    //如果有呼叫get方法 "req.query.傳送的變數名稱" 就會是有值的
    var updateData = req.query.updateData;
    
    if(updateData % 2 == 0)
    {
        console.log("succeed:",updateData);
        queryString = "select * from temperaturedata limit 1";   
    }
    else 
    {    
        console.log("Not Yet");
        queryString = "select * from PDUB1 limit 2"; 
    }

    
    connection.query(queryString , function(error,rows,fields){
        if(!error)
            res.send(rows);
    });
});



module.exports = router;