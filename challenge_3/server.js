const express = require('express');
const app = express();
const mysql = require('mysql');
const parser = require('body-parser');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'user_data'
});

connection.connect();

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.use(express.static('./public'));

app.get('/', (req, resp) => console.log('request received'));

app.post('/signin', (req, resp) => {
  console.log(req.body);
  let queryString = `insert into users(username, email, pword) value ("${req.body.username}", "${req.body.email}", "${req.body.pword}")`;
  connection.query(queryString, req.body, (err, res) => {
    if (err) throw err;
    console.log(res);
  });
  resp.writeHead(201);
  resp.end();
});

app.post('/address', (req, resp) => {
  console.log(req.body.user);
  let queryString = `insert into addresses(street_num, street_name, city, province, zip, phone, user_id) value (${req.body.streetNum}, "${req.body.streetName}", "${req.body.city}", "${req.body.state}", ${req.body.zip}, "${req.body.phone}", (select id from users where username="${req.body.user}"))`;
  console.log(queryString);
  connection.query(queryString, req.body, (err, res) => {
    if (err) throw err;
  });
  resp.writeHead(201);
  resp.end();
});

app.post('/cc', (req, resp) => {
  console.log('request received');
  let queryString = `insert into payment(cc_num, exp, cvv, zip, user_id) value ("${req.body.ccNum}", "${req.body.expDate}", ${req.body.cvv}, ${req.body.billZip}, (select id from users where username="${req.body.user}"))`;
  connection.query(queryString, req.body, (err, res) => {
    if (err) throw err;
    console.log(res);
  });
  resp.writeHead(201);
  resp.end();
});

app.listen(3000, () => console.log('Listening on port 3000'));

