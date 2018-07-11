class App {
  constructor(server) {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderData = this.renderData.bind(this);
    this.server = server;
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.sendData(e.target[0].value);
    e.target[0].value = '';
  }

  sendData(data) {
    $.post(this.server, JSON.parse(data), this.renderData);
  }

  renderData(resp) {
    document.getElementById('employees').innerHTML = '';
    let emps = resp.split('\n');
    for (let i = 0; i < emps.length; i++) {
      let employee = emps[i].split(',');
      if (employee.length <= 1) {
        continue;
      } else if (employee.length === 7) {
        employee.push('N/A');
      }
      let output = 
      `<td>${employee[0]}</td>
      <td>${employee[1]}</td>
      <td>${employee[2]}</td>
      <td>${employee[3]}</td>
      <td>${employee[4]}</td>
      <td>${employee[5]}</td>
      <td>${employee[6]}</td>
      <td>${employee[7]}</td>`;
      let node = document.createElement('tr');
      node.setAttribute('class', 'employee-data');
      node.innerHTML = output;
      document.getElementById('employees').appendChild(node);
    }
  }
}

document.getElementById('user-info-form').addEventListener('submit', new App('http://127.0.0.1:3000').handleFormSubmit);



