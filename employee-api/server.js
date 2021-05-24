var express = require("express");
var cors = require('cors');
var app = express();
var mysql = require("mysql");
var bodyParser = require('body-parser'); 

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"paypaydb" 

});
app.use(cors());
con.connect((error)=>{
    if(error){
        throw error;
    }
    console.log("Database connected");
})
app.listen(9000,function(){
    console.log("Server started");
})

//service calls starts here

//This function is used for login varification
app.post('/loginValidation', jsonParser, function (req, res){
    let userName = req.body.userName;
    let password = req.body.password;
   var query = `select * from logindetails WHERE userName='${userName}' AND password='${password}'`;   
   con.query(query,(err,result,fields)=>{
       if(err){
           throw err;
           res.end(JSON.stringify("error")); 
       }
       console.log(result);
       var flag = "failure";
       if(result.length>0){
        flag = "success";
       }
       var returnObj = {
           status:flag,
           dataValue:result
       };
       res.end(JSON.stringify(returnObj));    

   })   

});

//This function is used for listing employee
app.post('/listEmployee', jsonParser, function (req, res){
    let search = req.body.search;// can use in future if search required    
   var query = `select * from empdetails`;   
   con.query(query,(err,result,fields)=>{
       if(err){
           throw err;
           res.end(JSON.stringify("error")); 
       }
       console.log(result);
       var returnObj = {
           status:"success",
           dataValue:result
       };
       res.end(JSON.stringify(returnObj));    

   })   

});

//This function is used for add employee
app.post('/addEmployee', jsonParser, function (req, res){  
    let emp_name = req.body.emp_name;
    let emp_contact = req.body.emp_contact;
    let emp_roll = req.body.emp_roll;
    let userName = req.body.userName;
    let password = req.body.password;  
   var query = `INSERT INTO empdetails (emp_name,emp_contact,emp_roll) VALUES ('${emp_name}','${emp_contact}','${emp_roll}')`;   
   con.query(query,(err,result,fields)=>{
       if(err){
           throw err;
           res.end(JSON.stringify("error")); 
       }          
       var query2 =  `INSERT INTO logindetails (userName,password,emp_id,emp_roll) VALUES ('${userName}','${password}','${result.insertId}','${emp_roll}')`;   
       con.query(query2,(err,result,fields)=>{
            if(err){
                throw err;
                res.end(JSON.stringify("error")); 
            }

            var returnObj = {
                status:"success",
                dataValue:result
            };
            
            res.end(JSON.stringify(returnObj));
        }) 

           

   })   

});

//This function is used for login details fetch
app.post('/selectedEmpUserDetails', jsonParser, function (req, res){
    let emp_id = req.body.emp_id;    
   var query = `select * from logindetails WHERE emp_id='${emp_id}'`;   
   con.query(query,(err,result,fields)=>{
       if(err){
           throw err;
           res.end(JSON.stringify("error")); 
       }
       console.log(result);
       var returnObj = {
           status:"success",
           dataValue:result
       };
       res.end(JSON.stringify(returnObj));    

   })   

});

//This function is used for update empdetails and login details details fetch
app.post('/updateEmpdetails', jsonParser, function (req, res){
    let emp_id = req.body.emp_id;
    let emp_name = req.body.emp_name;
    let emp_contact = req.body.emp_contact;
    let emp_roll = req.body.emp_roll;
    let userName = req.body.userName;
    let password = req.body.password;
    let actionSttus = req.body.actionSttus;

   var query = `UPDATE empdetails SET emp_name='${emp_name}', emp_contact='${emp_contact}', emp_roll='${emp_roll}' WHERE emp_id='${emp_id}'`;   
   con.query(query,(err,result,fields)=>{
       if(err){
           throw err;
           res.end(JSON.stringify("error")); 
       }
      
       var innerQuery = `UPDATE logindetails SET userName='${userName}', password='${password}', emp_roll='${emp_roll}' WHERE emp_id='${emp_id}'`;
            con.query(innerQuery,(err,result,fields)=>{
                console.log(result);
                if(err){
                    throw err;
                    res.end(JSON.stringify("error")); 
                }
                var returnObj = {
                    status:"success",
                    dataValue:result
                };
                res.end(JSON.stringify(returnObj)); 
            })
         

   })   

});

//This function is used for detele the details of employee
app.post('/deleteEmpdetails', jsonParser, function (req, res){
    let emp_id = req.body.emp_id;    
   var query = `DELETE FROM empdetails WHERE emp_id='${emp_id}'`;   
   con.query(query,(err,result,fields)=>{
       if(err){
           throw err;
           res.end(JSON.stringify("error")); 
       }
       var innerQueryDelete = `DELETE FROM logindetails WHERE emp_id='${emp_id}'`;  
       con.query(innerQueryDelete,(err,result,fields)=>{
        if(err){
            throw err;
            res.end(JSON.stringify("error")); 
        }
        console.log(result);
       var returnObj = {
           status:"success",
           dataValue:result
       };
       res.end(JSON.stringify(returnObj));   
       })
        

   })   

});

//This function is used for the feedback of selectd employee
app.post('/listFeedbackSelectedEmp', jsonParser, function (req, res){
    let emp_id = req.body.emp_id;    
    var joinquery = `SELECT feedbackdetails.feedback_id,feedbackdetails.feedback, feedbackdetails.feedback_date,empdetails.emp_name FROM feedbackdetails INNER JOIN empdetails ON feedbackdetails.provider_id=empdetails.emp_id WHERE feedbackdetails.emp_id = '${emp_id}'`;
   var query = `select * from feedbackdetails WHERE emp_id='${emp_id}'`;   
   con.query(joinquery,(err,result,fields)=>{
       if(err){
           throw err;
           res.end(JSON.stringify("error")); 
       }
       console.log(result);
       var returnObj = {
           status:"success",
           dataValue:result
       };
       console.log(returnObj);
       res.end(JSON.stringify(returnObj));    

   })   

});

//This function is used to inser feednack
app.post('/saveFeedbackSelectedEmp', jsonParser, function (req, res){
    let emp_id = req.body.emp_id;    
    let feedbackProvidedBy =  req.body.feedbackProvidedBy;    
    let onDate =  req.body.onDate.split("T");    
    let feedback =  req.body.feedback;    
   var query = `INSERT INTO feedbackdetails (emp_id,feedback,provider_id,feedback_date) VALUES ('${emp_id}','${feedback}','${feedbackProvidedBy}','${onDate[0]}')`;   
   con.query(query,(err,result,fields)=>{
       if(err){
           throw err;
           res.end(JSON.stringify("error")); 
       }
       console.log(result);
       var returnObj = {
           status:"success",
           dataValue:result
       };
       res.end(JSON.stringify(returnObj));    

   })   

});

//This function is used for emp details fetch other than the selected one
app.post('/listEmployeeExceptSelected', jsonParser, function (req, res){
    let emp_idList = req.body.emp_idList;
    var valueStr = "";
    var finalList = "";
    for(var j=0;j<emp_idList.length;j++)  {
        valueStr += "'"+emp_idList[j]+"',"
    } 
    console.log(valueStr); 
    finalList = valueStr.slice(0, -1);

    var query = `SELECT * FROM empdetails WHERE emp_id not in (${finalList})`;
   //var query = `select * from empdetails WHERE emp_id !='${emp_id}'`;   
   con.query(query,(err,result,fields)=>{
       if(err){
           throw err;
           res.end(JSON.stringify("error")); 
       }
       console.log(result);
       var returnObj = {
           status:"success",
           dataValue:result
       };
       res.end(JSON.stringify(returnObj));    

   })   

});

//This function is to insert to taging table
app.post('/tageEmployeeSelected', jsonParser, function (req, res){
    let emp_id = req.body.emp_id;
    let selectedEmpList =  req.body.selectedEmpID;

    console.log("list");
    console.log(selectedEmpList);
    var values = [];
    var innerArray = [];    
    for(var k=0;k<selectedEmpList.length;k++){
        innerArray = [emp_id, selectedEmpList[k].value]
        values .push(innerArray);
    }
    var sql = "INSERT INTO employeetaging (emp_id, provider_id) VALUES ?";
            

   
   con.query(sql,[values],(err,result,fields)=>{
       if(err){
           throw err;
           res.end(JSON.stringify("error")); 
       }
       console.log(result);
       var returnObj = {
           status:"success",
           dataValue:result
       };
       res.end(JSON.stringify(returnObj));    

   })   

});


//This function is used for fettching taged list for a user
app.post('/taggedusersListForSelectedEmp', jsonParser, function (req, res){
    let emp_id = req.body.emp_id;    
    var joinquery = `SELECT employeetaging.tag_id,employeetaging.provider_id, empdetails.emp_name FROM employeetaging INNER JOIN empdetails ON employeetaging.provider_id=empdetails.emp_id WHERE employeetaging.emp_id = '${emp_id}'`;
  console.log(joinquery);
   con.query(joinquery,(err,result,fields)=>{
       if(err){
           throw err;
           res.end(JSON.stringify("error")); 
       }
       console.log(result);
       var returnObj = {
           status:"success",
           dataValue:result
       };
       console.log(returnObj);
       res.end(JSON.stringify(returnObj));    

   })   

});

//This function is used for fettching taged list for a provider
app.post('/listFeedbackTobeProvided', jsonParser, function (req, res){
    let emp_id = req.body.emp_id;    
    var joinquery = `SELECT employeetaging.tag_id,employeetaging.emp_id, empdetails.emp_name FROM employeetaging INNER JOIN empdetails ON employeetaging.emp_id=empdetails.emp_id WHERE employeetaging.provider_id = '${emp_id}'`;
  console.log(joinquery);
   con.query(joinquery,(err,result,fields)=>{
       if(err){
           throw err;
           res.end(JSON.stringify("error")); 
       }
       console.log(result);
       var returnObj = {
           status:"success",
           dataValue:result
       };
       console.log(returnObj);
       res.end(JSON.stringify(returnObj));    

   })   

});

app.post('/listEmployeeSelected', jsonParser, function (req, res){
    let emp_id = req.body.emp_id;// can use in future if search required    
   var query = `select * from empdetails  WHERE emp_id=${emp_id}`;   
   con.query(query,(err,result,fields)=>{
       if(err){
           throw err;
           res.end(JSON.stringify("error")); 
       }
       console.log(result);
       var returnObj = {
           status:"success",
           dataValue:result
       };
       res.end(JSON.stringify(returnObj));    

   })   

});

