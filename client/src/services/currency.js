import http from '../http-common';

class CurrencyDataService {
	getCurrencyList() {
		return http.get('/currencies/list');
	}

	getCurrencyRates() {
		return http.get('/currencies/rates');
	}

	getCurrencyJoined() {
		return http.get('/currencies/joined');
	}

	refreshAll() {
		return http.get('/currencies/refresh');
	}

	deleteAll() {
		return http.get('/currencies/delete');
	}

	getLogs() {
		return http.get('/currencies/logs/show');
	}
}

export default new CurrencyDataService();
