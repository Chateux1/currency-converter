import React, { Component } from 'react';
import CurrencyDataService from '../services/currency';

export default class CurrencyJoined extends Component {
	constructor(props) {
		super(props);
		this.retrieveCurrencyJoined = this.retrieveCurrencyJoined.bind(this);

		this.state = {
			currencyJoined: [],
		};
	}

	componentDidMount() {
		this.retrieveCurrencyJoined();
	}

	retrieveCurrencyJoined() {
		CurrencyDataService.getCurrencyJoined()
			.then((response) => {
				this.setState({
					currencyJoined: response.data,
				});
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		const { currencyJoined } = this.state;

		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">CcyNmLt</th>
						<th scope="col">Ccy</th>
						<th scope="col">Amt</th>
						<th scope="col">Dt</th>
					</tr>
				</thead>
				<tbody>
					{currencyJoined &&
						currencyJoined.map((currency) => (
							<tr key={currency.id}>
								<td>{currency.ccynmlt}</td>
								<td>{currency.ccy}</td>
								<td>{currency.amt.toFixed(3)}</td>
								<td>
									{new Date(currency.dt).toLocaleDateString()}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		);
	}
}
