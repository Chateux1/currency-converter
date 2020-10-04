import React, { Component } from 'react';
import CurrencyDataService from '../services/currency';

export default class Preferences extends Component {
	constructor(props) {
		super(props);
		this.refreshData = this.refreshData.bind(this);
		this.deleteData = this.deleteData.bind(this);
		this.clearResponse = this.clearResponse.bind(this);

		this.state = {
			response: null,
		};
	}

	refreshData() {
		CurrencyDataService.refreshAll()
			.then((response) => {
				this.setState({
					response: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	deleteData() {
		CurrencyDataService.deleteAll()
			.then((response) => {
				this.setState({
					response: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	clearResponse() {
		this.setState({
			response: null,
		});
	}

	render() {
		const { response } = this.state;
		const margin = '20px';
		return (
			<div>
				<button onClick={this.refreshData}>Refresh Data</button>
				<button onClick={this.deleteData}>Delete Data</button>
				<button onClick={this.clearResponse}>Clear Response</button>
				<div style={{ marginTop: margin }}>Response:</div>
				<div>{response}</div>
			</div>
		);
	}
}
