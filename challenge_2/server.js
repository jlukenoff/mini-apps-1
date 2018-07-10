const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./client'));

/* ----App-State------ */
const renderDataCSV = function(obj) {
  let csv = '';
  let id = 0;
  const renderEmp = function(emp) {
    id++;
    csv += `${id},${emp.firstName},${emp.lastName},${emp.county},${emp.city},${emp.role},${emp.sales}\n`;
    if (emp.children !== undefined && emp.children.length > 0) {
      for (let i = 0; i < emp.children.length; i++) {
        renderEmp(emp.children[i]);
      }
    }
  } 
  renderEmp(obj);
  return csv;
}


app.post('/', (req, resp) => {
  resp.writeHead(201);
  resp.end(renderDataCSV(req.body));
});  

app.listen(3000, () => console.log('listening on port: 3000'));