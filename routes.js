module.exports = (app) => {
	const currency = require('./controller.js');

	var router = require('express').Router();

	router.get('/', currency.createTable);

	router.get('/list', currency.getCurrencyList);

	router.get('/rates', currency.getCurrencyRates);

	router.get('/joined', currency.getCurrencyJoined);

	router.get('/refresh', currency.refreshAll);

	router.get('/delete', currency.deleteAll);

	router.get('/logs', currency.createLogTable);

	router.get('/logs/show', currency.showLogs);

	app.use('/api/currencies', router);
};
