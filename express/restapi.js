//basic app
let exp = require('express');
let mysql = require('mysql2');
let cors = require('cors')

let app = exp();
app.listen(3000, function() {
   console.log("exp started - rest API");
})

//middlewares
app.use(exp.json())      //req.body created
app.use(cors())

//mysql
let con = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "root",
    database: "project_db"
})
con.connect(function(err){
    if(!err)
       console.log("established");
    else
       console.log("rejected");
})

//routes

//route for login
app.post('/login' ,function(req,res){
    
    let query = "select * from users where username = ? and password = ?"
    con.query(query, [req.body.username, req.body.password], function(err,result) {
         if(!err) {
	 	if(result.length === 1)
	            res.status(200).json({user: {userid: result[0].userid, username:result[0].username, role: result[0].roleid }, token:"abc123"});
                else
	            res.status(404).send("login failed");
         } 
	 else{
              res.staus(500).send("Could not fetch data");
         }
    })
})

/*app.post('/register' ,function(req,res){
    
    
})*/



app.all('/*splat', function(req,res) {
    res.send("Invalid URL");
})
