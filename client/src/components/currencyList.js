import React, { Component } from 'react';
import CurrencyDataService from '../services/currency';

export default class CurrencyList extends Component {
	constructor(props) {
		super(props);
		this.retrieveCurrencyList = this.retrieveCurrencyList.bind(this);

		this.state = {
			currencyList: [],
		};
	}

	componentDidMount() {
		this.retrieveCurrencyList();
	}

	retrieveCurrencyList() {
		CurrencyDataService.getCurrencyList()
			.then((response) => {
				this.setState({
					currencyList: response.data,
				});
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		const { currencyList } = this.state;

		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Ccy</th>
						<th scope="col">CcyNmLt</th>
						<th scope="col">CcyNmEn</th>
						<th scope="col">CcyNbr</th>
						<th scope="col">CcyMnrUnts</th>
					</tr>
				</thead>
				<tbody>
					{currencyList &&
						currencyList.map((currency) => (
							<tr key={currency.id}>
								<th scope="row">{currency.id}</th>
								<td>{currency.ccy}</td>
								<td>{currency.ccynmlt}</td>
								<td>{currency.ccynmen}</td>
								<td>{currency.ccynbr}</td>
								<td>{currency.ccymnrunts}</td>
							</tr>
						))}
				</tbody>
			</table>
		);
	}
}
