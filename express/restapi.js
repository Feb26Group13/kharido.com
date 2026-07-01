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
    password: "Sailesh1703",
    database: "kharido_com_db"
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
    
    let query = `
SELECT u.userid,u.username,u.roleid,r.rolename
FROM users u
JOIN roles r
ON u.roleid = r.roleid
WHERE u.username = ?
AND u.password = ?
AND u.status='ACTIVE'
`;
    con.query(query, [req.body.username, req.body.password], function(err,result) {
         if(!err) {
	 	if(result.length === 1)
	            res.status(200).json({user: {userid: result[0].userid, username:result[0].username, role: result[0].roleid, rolename:result[0].rolename }, token:"abc123"});
                else
	            res.status(404).send("login failed");
         } 
	 else{
              res.status(500).send("Could not fetch data");
         }
    })
})

app.post('/register/customer', function(req,res){

    let checkQuery = `
    SELECT *
    FROM users
    WHERE username = ?
    OR email = ?
    `;

    con.query(
        checkQuery,
        [
            req.body.username,
            req.body.email
        ],
        function(err,result){

            if(err){
                return res.status(500).send("Database Error");
            }

            if(result.length > 0){
                return res.status(409).send("Username or Email already exists");
            }

            let userQuery = `
            INSERT INTO users
            (username,email,password,roleid,status)
            VALUES(?,?,?,3,'ACTIVE')
            `;

            con.query(
                userQuery,
                [
                    req.body.username,
                    req.body.email,
                    req.body.password
                ],
                function(err,result){

                    if(err){
                        return res.status(500).send("User registration failed");
                    }

                    let userid = result.insertId;

                    let profileQuery = `
                    INSERT INTO customer_profiles
                    (
                        userid,
                        firstname,
                        lastname,
                        phone
                    )
                    VALUES(?,?,?,?)
                    `;

                    con.query(
                        profileQuery,
                        [
                            userid,
                            req.body.firstname,
                            req.body.lastname,
                            req.body.phone
                        ],
                        function(err2){

                            if(err2){
                                return res.status(500).send("Profile creation failed");
                            }

                            res.status(201).json({
                                message:"Customer Registered Successfully"
                            });

                        }
                    );

                }
            );
        }
    );
});


app.post('/register/seller', function(req,res){

    let userQuery = `
    INSERT INTO users
    (username,email,password,roleid,status)
    VALUES(?,?,?,2,'ACTIVE')
    `;

    con.query(
        userQuery,
        [
            req.body.username,
            req.body.email,
            req.body.password
        ],
        function(err,result){

            if(err){
                console.log(err);
                return res.status(500).send("Seller registration failed");
            }

            let userid = result.insertId;

            let sellerQuery = `
            INSERT INTO seller_profiles
            (
                userid,
                shop_name,
                gst_number,
                phone,
                approval_status
            )
            VALUES(?,?,?,?,?)
            `;

            con.query(
                sellerQuery,
                [
                    userid,
                    req.body.shop_name,
                    req.body.gst_number,
                    req.body.phone,
                    'PENDING'
                ],
                function(err2){

                    if(err2){
                        console.log(err2);
                        return res.status(500).send("Seller profile creation failed");
                    }

                    res.status(201).json({
                        message:"Seller Registered Successfully",
                        approval_status:"PENDING"
                    });

                }
            );
        }
    );
});

app.post('/seller/dispatch/:orderid', function(req,res){

    let orderid = req.params.orderid;

    let updateQuery = `
    UPDATE orders
    SET order_status='SHIPPED'
    WHERE orderid=?
    `;

    con.query(
        updateQuery,
        [orderid],
        function(err){

            if(err){
                return res.status(500).send(err);
            }

            res.status(200).send("Order Dispatched");

        }
    );

});

//add product route
app.post('/add-product', function(req,res){

    console.log("Received Product:");
    console.log(req.body);

    let query = `
    INSERT INTO products
    (
        sellerid,
        product_name,
        category,
        price,
        description,
        image_url
    )
    VALUES(?,?,?,?,?,?)
    `;
    con.query(
        query,
        [
            req.body.sellerid,
            req.body.product_name,
            req.body.category,
            req.body.price,
            req.body.description,
            req.body.image_url
        ],
        function(err,result){

            if(err){
                console.log(err);
                return res.status(500).json({
                    message:"Product Add Failed"
                });
            }

            res.status(201).json({
                message:"Product Added Successfully"
            });
        }
    );
});









app.get('/products',function(req,res){

    let query = `
    SELECT
        p.productid,
        p.product_name,
        p.description,
        p.price,
        p.stock_quantity,
        b.brand_name,
        c.category_name
    FROM products p
    JOIN brands b
        ON p.brandid = b.brandid
    JOIN categories c
        ON p.categoryid = c.categoryid
    WHERE p.approval_status='APPROVED'
    `;

    con.query(query,function(err,result){

        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(result);
        }

    });

});


app.get('/product/:id', function(req,res){

    let query = `
    SELECT
        p.productid,
        p.product_name,
        p.description,
        p.price,
        p.stock_quantity,
        b.brand_name,
        c.category_name
    FROM products p
    JOIN brands b
        ON p.brandid = b.brandid
    JOIN categories c
        ON p.categoryid = c.categoryid
    WHERE p.productid = ?
    `;

    con.query(
        query,
        [req.params.id],
        function(err,result){

            if(err){
                return res.status(500).send(err);
            }

            if(result.length === 0){
                return res.status(404).send("Product Not Found");
            }

            res.status(200).json(result[0]);

        }
    );

});


app.get('/delivery/orders/:userid', function(req,res){

    let query = `
    SELECT
        da.assignmentid,
        o.orderid,
        o.total_amount,
        o.order_status,
        da.pickup_status,
        a.city

    FROM delivery_assignments da

    JOIN orders o
        ON da.orderid = o.orderid

    JOIN delivery_partners dp
        ON da.deliveryid = dp.deliveryid

    JOIN users u
        ON dp.userid = u.userid

    JOIN addresses a
        ON o.addressid = a.addressid

    WHERE u.userid = ?
    `;

    con.query(
        query,
        [req.params.userid],
        function(err,result){

            if(err){
                return res.status(500).send(err);
            }

            res.status(200).json(result);
        }
    );
});

app.all('/*splat', function(req,res) {
    res.send("Invalid URL");
})
