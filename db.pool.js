const mysql = require('mysql');

const dbConfig = require('./db.config').dbConfig;

var pool = mysql.createPool({
	connectionLimit: 10,
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.database,
});

exports.getConnection = () => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				return reject(err);
			}
			resolve(connection);
		});
	});
};
