const express = require('express');
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/connect_four';
let players = [];

MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
  if (err) throw err;
  console.log('Database Created!');
  db.close();
});

app.use(express.static('./public'));

app.use(parser.json());
app.use(parser.urlencoded({type: 'application/x-www-form-urlencoded'}));

app.post('/winfo', (req, resp) => {
  console.log('request received');
  players.push(req.body);
  resp.writeHead(201);
  resp.end(JSON.stringify(req.body));
});

app.listen(3000, () => console.log('Listening on port 3000'));

