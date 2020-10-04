const axios = require('axios');
const xml2js = require('xml2js');

const pool = require('./db.pool');
const queries = require('./db.config').queries;

logUserAction = async (req) => {
	requestDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

	entry = [req.originalUrl, req.headers.referer, req.headers['user-agent'], requestDate];
	const connection = await pool.getConnection();

	connection.query(queries.logEntry, entry, (err) => {
		if (err) throw err;
		console.log('Logging user data');
	});

	connection.release();
};

exports.createLogTable = async (req, res) => {
	const connection = await pool.getConnection();

	connection.query(queries.createLogTable, (err, result) => {
		if (err) throw err;
		console.log('Creating log table');
		res.send(result);
	});

	connection.release();
};

exports.createTable = async (req, res) => {
	logUserAction(req);

	const connection = await pool.getConnection();

	connection.query(queries.checkTables.Table1, (err, result) => {
		if (err) throw err;
		if (Object.entries(result).length == 0) {
			console.log('Creating table 1');
			connection.query(queries.createTables.Table1, (err, result) => {
				if (err) throw err;
				console.log('Table 1 created');
				res.write(JSON.stringify(result));
			});
		} else {
			console.log('Table 1 already exists');
			res.write(JSON.stringify(result));
		}

		connection.query(queries.checkTables.Table2, (err, result) => {
			if (err) throw err;
			if (Object.entries(result).length == 0) {
				console.log('Creating table 2');
				connection.query(queries.createTables.Table2, (err, result) => {
					if (err) throw err;
					console.log('Table 2 created');
					res.write(JSON.stringify(result));
				});
			} else {
				console.log('Table 2 already exists');
				res.write(JSON.stringify(result));
			}

			connection.query(queries.checkTables.Table3, (err, result) => {
				if (err) throw err;
				if (Object.entries(result).length == 0) {
					console.log('Creating table 3');
					connection.query(queries.createTables.Table3, (err, result) => {
						if (err) throw err;
						console.log('Table 3 created');
						res.write(JSON.stringify(result));
						res.send();
					});
				} else {
					console.log('Table 3 already exists');
					res.write(JSON.stringify(result));
					res.send();
				}
			});
		});
	});
	connection.release();
};

exports.refreshAll = (req, res) => {
	logUserAction(req);

	axios
		.get('http://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrencyList?')

		.then((response) => {
			xml2js.parseString(response.data, async (err, result) => {
				if (err) {
					throw err;
				}

				const jsonString = JSON.stringify(result, null, 4);
				const jsonObj = JSON.parse(jsonString);

				var currencies = [];

				for (i = 0; i < jsonObj.CcyTbl.CcyNtry.length - 1; i++) {
					currencies[i] = [
						jsonObj.CcyTbl.CcyNtry[i].Ccy[0],
						jsonObj.CcyTbl.CcyNtry[i].CcyNm[0]._,
						jsonObj.CcyTbl.CcyNtry[i].CcyNm[1]._,
						jsonObj.CcyTbl.CcyNtry[i].CcyNbr[0],
						jsonObj.CcyTbl.CcyNtry[i].CcyMnrUnts[0],
					];
				}

				const connection = await pool.getConnection();

				connection.query(queries.removeEntries.Table1, async (err, result) => {
					if (err) throw err;
					console.log('Removing old entries');

					connection.query(queries.insertData.Table1, [currencies], function (err, result) {
						if (err) throw err;
						console.log('Adding new entries');
						console.log(result);
						res.write('Table 1 updated ');

						axios
							.get('http://www.lb.lt/webservices/FxRates/FxRates.asmx/getCurrentFxRates?tp=EU')

							.then((response) => {
								xml2js.parseString(response.data, (err, result) => {
									if (err) {
										throw err;
									}

									const jsonString = JSON.stringify(result, null, 4);
									const jsonObj = JSON.parse(jsonString);

									var currencies = [];

									for (i = 0; i < jsonObj.FxRates.FxRate.length - 1; i++) {
										currencies[i] = [
											jsonObj.FxRates.FxRate[i].Tp[0],
											jsonObj.FxRates.FxRate[i].Dt[0],
											jsonObj.FxRates.FxRate[i].CcyAmt[0].Ccy[0],
											jsonObj.FxRates.FxRate[i].CcyAmt[1].Ccy[0],
											jsonObj.FxRates.FxRate[i].CcyAmt[1].Amt[0],
										];
									}

									connection.query(queries.removeEntries.Table2, function (err, result) {
										if (err) throw err;
										console.log('Removing old entries');
										connection.query(queries.insertData.Table2, [currencies], function (
											err,
											result
										) {
											if (err) throw err;
											console.log('Adding new entries');
											console.log(result);
											res.write('Table 2 updated ');

											connection.query(queries.removeEntries.Table3, function (err, result) {
												if (err) throw err;
												console.log('Removing old entries');
												connection.query(queries.setCurrencyJoined, function (err, result) {
													if (err) throw err;

													var results = [];

													for (i = 0; i < Object.entries(result).length; i++) {
														results[i] = [
															result[i].ccynmlt,
															result[i].ccy,
															result[i].amt,
															result[i].dt,
														];
													}
													connection.query(queries.insertData.Table3, [results], function (
														err,
														result
													) {
														if (err) throw err;
														console.log('Adding new entries');
														console.log(result);
														res.write('Table 3 updated');
														res.send();
													});
												});
											});
										});
									});
								});
							})
							.catch((error) => {
								throw error;
							});
					});
				});
				connection.release();
			});
		})
		.catch((error) => {
			throw error;
		});
};

exports.getCurrencyList = async (req, res) => {
	logUserAction(req);

	const connection = await pool.getConnection();

	connection.query(queries.getCurrencyList, function (err, result) {
		if (err) throw err;
		console.log('Retrieving currency list');
		res.send(result);
	});

	connection.release();
};

exports.getCurrencyRates = async (req, res) => {
	logUserAction(req);

	const connection = await pool.getConnection();

	connection.query(queries.getCurrencyRates, function (err, result) {
		if (err) throw err;
		console.log('Retrieving currency rates');
		res.send(result);
	});

	connection.release();
};

exports.getCurrencyJoined = async (req, res) => {
	logUserAction(req);

	const connection = await pool.getConnection();

	connection.query(queries.getCurrencyJoined, function (err, result) {
		if (err) throw err;
		console.log('Retrieving currency joined');
		res.send(result);
	});

	connection.release();
};

exports.deleteAll = async (req, res) => {
	logUserAction(req);

	const connection = await pool.getConnection();

	connection.query(queries.removeEntries.Table1, function (err, result) {
		if (err) throw err;

		connection.query(queries.removeEntries.Table2, function (err, result) {
			if (err) throw err;

			connection.query(queries.removeEntries.Table3, function (err, result) {
				if (err) throw err;
				res.write('Data deleted');
				res.send();
			});
		});
	});

	connection.release();
};

exports.showLogs = async (req, res) => {
	logUserAction(req);

	const connection = await pool.getConnection();

	connection.query(queries.showLogs, function (err, result) {
		if (err) throw err;
		console.log(result);
		res.send(result);
	});

	connection.release();
};
