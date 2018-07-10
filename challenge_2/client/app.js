const handleFormSubmit = (e) => {
  e.preventDefault();
  sendData(e.target[0].value);
  e.target[0].value = '';
}

const sendData = function(data) {
  data = data.split(',');
  let body = {
    "firstName": data[0],
      "lastName": data[1],
      "county": data[2],
      "city": data[3],
      "role": data[4],
      "sales": data[5],
  };
  $.post('http://127.0.0.1:3000', body, renderData);
}

const renderData = function(resp) {
  console.log(resp);
}

document.getElementById('user-info-form').addEventListener('submit', handleFormSubmit);



