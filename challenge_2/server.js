const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./client'));

class Server {
  constructor() {
    this.data = [];
    this.currentId = 1;
    this.renderCSV = this.renderCSV.bind(this);
    this.post = this.post.bind(this);
  }

  renderCSV(emp, str = '', parentId = 'N/A') {
    str += `${this.currentId},${emp.firstName},${emp.lastName},${emp.county},${emp.city},${emp.role},${emp.sales},${parentId}\n`;
    let managerId = this.currentId;
    this.currentId++;
    if (emp.children !== undefined && emp.children.length > 0) {
      for (let i = 0; i < emp.children.length; i++) {
        str += this.renderCSV(emp.children[i], '', managerId);
      }
    }
    return str;
  }

  post(req, resp) {
    resp.writeHead(201);
    this.data.push(req.body);
    resp.end(this.renderCSV(req.body));
  }
}

let server = new Server();
app.post('/', server.post);  

app.listen(3000, () => console.log('Listening on port 3000'));