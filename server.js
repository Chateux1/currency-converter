const express = require('express');
const cors = require('cors');

const hostname = 'localhost';
const port = 8080;

const app = express();

app.use(cors());

require('./routes')(app);

app.get('/', (req, res) => {
	res.send('Welcome');
});

app.listen(port, () => {
	console.log(`Example app listening at http://${hostname}:${port}`);
});
