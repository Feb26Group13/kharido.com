let exp = require('express');
let mysql = require('mysql2');
let cors = require('cors');

let app = exp();

// Middleware
app.use(exp.json());
app.use(cors());

// Start Server
app.listen(9000, function () {
    console.log("exp started - rest API");
});

// MySQL Connection
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sailesh1703",
    database: "project_db"
});

con.connect(function (err) {
    if (!err) {
        console.log("MySQL Connected Successfully");
    } else {
        console.log("MySQL Connection Error:");
        console.log(err);
    }
});


// ================= LOGIN API =================

app.post('/login', function (req, res) {

    console.log("Login Request:", req.body);

    let query =
        "select * from users where username=? and password=?";

    con.query(
        query,
        [req.body.username, req.body.password],
        function (err, result) {

            if (!err) {

                if (result.length === 1) {

                    console.log("Login Successful");

                    res.status(200).json({
                        user: {
                            userid: result[0].userid,
                            username: result[0].username,
                            role: result[0].roleid
                        },
                        token: "abc123"
                    });

                } else {

                    console.log("Invalid Username or Password");
                    res.status(404).send("Login Failed");
                }

            } else {

                console.log(err);
                res.status(500).send("Could not fetch data");
            }
        }
    );
});


// ================= REGISTER API =================

app.post("/register", (req, res) => {
  console.log("Register Request:", req.body);

  const { username, password, roleid } = req.body;

  if (!username || !password || !roleid) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const sql = "INSERT INTO users (username, password, roleid) VALUES (?, ?, ?)";

con.query(sql, [username, password, roleid], (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);

      return res.status(500).json({
        message: "Database error",
        error: err.sqlMessage
      });
    }

    return res.status(200).json({
      message: "User registered successfully"
    });
  });
});