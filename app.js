const app = require('express')();
var mysql = require('mysql');
bodyParser = require('body-parser');
//test data files
var testData = require('./Result/result');
var con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "test"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("Server Started in 3000");
});
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    let result = "hai";
    res.render('index', { testcase: "Testcase result will display here" });
});

//verify route
app.post('/verify', async (req, res) => {
    let query = req.body.query,
        resultArray = [];
    await con.query(query, (err, rows) => {
        //handling err
        if (err) {
            res.render('index', { err: err });
        }
        else {
            // console.log(rows);
            // converting to array
            rows.forEach(element => {
                resultArray.push(element);
            });
            // comparing the result
            if (JSON.stringify(testData.question1) == JSON.stringify(resultArray))
                res.render('index', { message: "Passed" });
            else res.render('index', { err: "Failed" });
        }
    });
});


