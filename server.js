const express = require('express');
const cors = require('cors');

const hostname = 'localhost';
const port = 8080;

const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

require('./routes')(app);

app.get('/', (req, res) => {
	res.send('Welcome');
});

app.listen(process.env.PORT || port, () => {
	console.log(`Example app listening at http://${hostname}:${port}`);
});
