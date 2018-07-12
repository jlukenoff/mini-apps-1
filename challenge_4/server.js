const express = require('express');
const app = express();

app.use(express.static('./public'));

app.get('/', (res, resp) => console.log('request received'));

app.listen(3000, () => console.log('Listening on port 3000'));

