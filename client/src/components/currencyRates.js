import React, { Component } from 'react';
import CurrencyDataService from '../services/currency';

export default class CurrencyRates extends Component {
	constructor(props) {
		super(props);
		this.retrieveCurrencyRates = this.retrieveCurrencyRates.bind(this);

		this.state = {
			currencyRates: [],
		};
	}

	componentDidMount() {
		this.retrieveCurrencyRates();
	}

	retrieveCurrencyRates() {
		CurrencyDataService.getCurrencyRates()
			.then((response) => {
				this.setState({
					currencyRates: response.data,
				});
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		const { currencyRates } = this.state;

		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Tp</th>
						<th scope="col">Dt</th>
						<th scope="col">CcyEu</th>
						<th scope="col">Ccy</th>
						<th scope="col">Amt</th>
					</tr>
				</thead>
				<tbody>
					{currencyRates &&
						currencyRates.map((currency) => (
							<tr key={currency.id}>
								<th scope="row">{currency.id}</th>
								<td>{currency.tp}</td>
								<td>
									{new Date(currency.dt).toLocaleDateString()}
								</td>
								<td>{currency.ccyeu}</td>
								<td>{currency.ccy}</td>
								<td>{currency.amt}</td>
							</tr>
						))}
				</tbody>
			</table>
		);
	}
}
