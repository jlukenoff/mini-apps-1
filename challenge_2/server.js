const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./client'));

const renderDataCSV = function(obj) {
  return renderEmployee(obj, 'firstName,lastName,county,city,role,sales\n');
};

const renderEmployee = function(emp, csv = '') {
  csv += `${emp.firstName},${emp.lastName},${emp.county},${emp.city},${emp.role},${emp.sales}\n`;
  if (emp.children !== undefined && emp.children.length > 0) {
    for (let i = 0; i < emp.children.length; i++) {
      renderEmployee(emp.children[i]);
    }
  }
  return csv;
}

let data = {
    "firstName": "Joshie",
    "lastName": "Wyattson",
    "county": "San Mateo",
    "city": "San Mateo",
    "role": "Broker",
    "sales": 1000000,
    "children": [
    {
      "firstName": "Beth Jr.",
      "lastName": "Johnson",
      "county": "San Mateo",
      "city": "Pacifica",
      "role": "Manager",
      "sales": 2900000,
      "children": [
        {
          "firstName": "Smitty",
          "lastName": "Won",
          "county": "San Mateo",
          "city": "Redwood City",
          "role": "Sales Person",
          "sales": 4800000,
          "children": []
        },
        {
          "firstName": "Allen",
          "lastName": "Price",
          "county": "San Mateo",
          "city": "Burlingame",
          "role": "Sales Person",
          "sales": 2500000,
          "children": []
        }
      ]
    },
    {
      "firstName": "Beth",
      "lastName": "Johnson",
      "county": "San Francisco",
      "city": "San Francisco",
      "role": "Broker/Sales Person",
      "sales": 7500000,
      "children": []
    }
  ]
};



app.post('/', (req, resp) => {
  data.children.push(req.body);
  resp.writeHead(201);
  resp.end(renderDataCSV(data));
});  

app.listen(3000, () => console.log('listening on port: 3000'));

