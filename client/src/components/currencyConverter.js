import React, { Component } from 'react';
import CurrencyDataService from '../services/currency';

export default class CurrencyJoined extends Component {
	constructor(props) {
		super(props);
		this.retrieveCurrencyJoined = this.retrieveCurrencyJoined.bind(this);
		this.changeSelectedCurrency = this.changeSelectedCurrency.bind(this);
		this.changeCurrentValue = this.changeCurrentValue.bind(this);
		this.getConvertedValue = this.getConvertedValue.bind(this);
		this.changeClearValue = this.changeClearValue.bind(this);

		this.state = {
			currencyList: [],
			currentValue: null,
			selectedCurrency: '',
			selectedCurrencyRate: null,
			selectedCurrencyFullTitle: null,
			selectedCurrencyUpdateDate: null,
		};
	}

	componentDidMount() {
		this.retrieveCurrencyJoined();
	}

	retrieveCurrencyJoined() {
		CurrencyDataService.getCurrencyJoined()
			.then((response) => {
				this.setState({
					currencyList: response.data,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	changeSelectedCurrency(event) {
		if (event.target.value != '-') {
			let selectedCurrencyEntry = this.state.currencyList.filter((data) => {
				return data.ccy === event.target.value;
			});

			this.setState({
				selectedCurrency: event.target.value,
				selectedCurrencyRate: selectedCurrencyEntry[0].amt,
				selectedCurrencyFullTitle: selectedCurrencyEntry[0].ccynmlt,
				selectedCurrencyUpdateDate: selectedCurrencyEntry[0].dt.substring(0, 10),
			});
		} else {
			this.setState({
				selectedCurrency: '',
				selectedCurrencyRate: null,
				selectedCurrencyFullTitle: null,
				selectedCurrencyUpdateDate: null,
			});
		}
	}

	changeCurrentValue(event) {
		this.setState({
			currentValue: event.target.value,
		});
	}

	changeClearValue() {
		this.setState({
			currentValue: 0,
		});
	}

	getConvertedValue(currentValue, selectedCurrency, selectedCurrencyRate) {
		if (currentValue === null || selectedCurrency === '') {
			return '';
		} else {
			return Number.parseFloat(currentValue * selectedCurrencyRate).toFixed(3);
		}
	}

	render() {
		const {
			currencyList,
			currentValue,
			selectedCurrency,
			selectedCurrencyRate,
			selectedCurrencyFullTitle,
			selectedCurrencyUpdateDate,
		} = this.state;
		const convertedValue = this.getConvertedValue(currentValue, selectedCurrency, selectedCurrencyRate);
		const margin = '20px';

		return (
			<div>
				<div style={{ marginTop: margin }}>Enter amount in EUR:</div>
				<input defaultValue={currentValue} onChange={this.changeCurrentValue}></input>

				<div style={{ marginTop: margin }}>Select currency:</div>
				<select value={selectedCurrency} onChange={this.changeSelectedCurrency}>
					<option key="0">-</option>
					{currencyList &&
						currencyList.map((currency) => (
							<option key={currency.id} value={currency.ccy}>
								{currency.ccy}
							</option>
						))}
				</select>
				<div style={{ display: 'inline' }}>
					{selectedCurrency === '' ? '' : ' Updated at: ' + selectedCurrencyUpdateDate}
				</div>

				<div style={{ marginTop: margin }}>Converted value:</div>
				<div>
					{convertedValue} {convertedValue === '' ? '' : selectedCurrencyFullTitle}
				</div>
			</div>
		);
	}
}
