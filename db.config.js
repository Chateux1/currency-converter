exports.dbConfig = {
	host: 'sql7.freemysqlhosting.net',
	user: 'sql7368756',
	password: 'LAPxIAvJT8',
	database: 'sql7368756',
};

const table1 = 'currencies';
const table2 = 'rates';
const table3 = 'joined';
const logTable = 'logs';

exports.queries = {
	createTables: {
		Table1: `CREATE TABLE IF NOT EXISTS ${table1} (id INT PRIMARY KEY AUTO_INCREMENT,
														ccy VARCHAR(255) NOT NULL,
														ccynmlt VARCHAR(255),
														ccynmen VARCHAR(255),
														ccynbr VARCHAR(255),
														ccymnrunts SMALLINT(255))`,

		Table2: `CREATE TABLE IF NOT EXISTS ${table2} (id INT PRIMARY KEY AUTO_INCREMENT,
														tp VARCHAR(255),
														dt DATE,
														ccyeu VARCHAR(255),
														ccy VARCHAR(255),
														amt DOUBLE(255, 10))`,

		Table3: `CREATE TABLE IF NOT EXISTS ${table3} (id INT PRIMARY KEY AUTO_INCREMENT,
														ccynmlt VARCHAR(255) NOT NULL,
														ccy VARCHAR(255),
														amt DOUBLE(255, 10),
														dt DATE)`,
	},

	checkTables: {
		Table1: `SELECT * FROM information_schema.tables WHERE table_schema = 'testdb' AND table_name = '${table1}' LIMIT 1`,

		Table2: `SELECT * FROM information_schema.tables WHERE table_schema = 'testdb' AND table_name = '${table2}' LIMIT 1`,

		Table3: `SELECT * FROM information_schema.tables WHERE table_schema = 'testdb' AND table_name = '${table3}' LIMIT 1`,
	},

	removeEntries: {
		Table1: `TRUNCATE TABLE ${table1}`,

		Table2: `TRUNCATE TABLE ${table2}`,

		Table3: `TRUNCATE TABLE ${table3}`,
	},

	insertData: {
		Table1: `INSERT INTO ${table1} (ccy, ccynmlt, ccynmen, ccynbr, ccymnrunts) VALUES ?`,

		Table2: `INSERT INTO ${table2} (tp, dt, ccyeu, ccy, amt) VALUES ?`,

		Table3: `INSERT INTO ${table3} (ccynmlt, ccy, amt, dt) VALUES ?`,
	},

	getCurrencyList: `SELECT * FROM ${table1}`,

	getCurrencyRates: `SELECT * FROM ${table2} ORDER BY amt DESC`,

	getCurrencyJoined: `SELECT * FROM ${table3} ORDER BY amt DESC`,

	setCurrencyJoined: `SELECT ${table1}.ccynmlt, ${table1}.ccy, ${table2}.amt, ${table2}.dt 
                      FROM ${table1}
                      INNER JOIN ${table2} ON ${table1}.ccy = ${table2}.ccy`,

	createLogTable: `CREATE TABLE IF NOT EXISTS ${logTable} (id INT PRIMARY KEY AUTO_INCREMENT,
															backendUrl VARCHAR(255) NOT NULL,
															frontendUrl VARCHAR(255),
															userAgent VARCHAR(255),
															date DATETIME)`,

	logEntry: `INSERT INTO ${logTable} (backendUrl, frontendUrl, userAgent, date) VALUES (?,?,?,?)`,

	showLogs: `SELECT * FROM ${logTable} ORDER BY id DESC`,
};
