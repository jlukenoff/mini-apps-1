class App {
  constructor() {
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderData = this.renderData.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.sendData(e.target[0].value);
    e.target[0].value = '';
  }

  sendData(data) {
    $.post('http://127.0.0.1:3000', JSON.parse(data), this.renderData);
  }

  renderData(resp) {
    document.getElementById('employees').innerHTML = '';
    let emps = resp.split('\n');
    for (let i = 0; i < emps.length; i++) {
      let employee = emps[i].split(',');
      if (employee.length <= 1) {
        continue;
      }
      let output = 
      `<td>${employee[0]}</td>
      <td>${employee[1]}</td>
      <td>${employee[2]}</td>
      <td>${employee[3]}</td>
      <td>${employee[4]}</td>
      <td>${employee[5]}</td>
      <td>${employee[6]}</td>`;
      let node = document.createElement('tr');
      node.setAttribute('class', 'employee-data');
      node.innerHTML = output;
      document.getElementById('employees').appendChild(node);
    }
  }
}

document.getElementById('user-info-form').addEventListener('submit', new App().handleFormSubmit);



