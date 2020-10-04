import React, { Component } from 'react';
import CurrencyDataService from '../services/currency';

export default class Logs extends Component {
	constructor(props) {
		super(props);
		this.retrievelogs = this.retrievelogs.bind(this);

		this.state = {
			logs: [],
		};
	}

	componentDidMount() {
		this.retrievelogs();
	}

	retrievelogs() {
		CurrencyDataService.getLogs()
			.then((response) => {
				this.setState({
					logs: response.data,
				});
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		const { logs } = this.state;

		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Backend URL</th>
						<th scope="col">Frontend URL</th>
						<th scope="col">User Agent</th>
						<th scope="col">Date</th>
					</tr>
				</thead>
				<tbody>
					{logs &&
						logs.map((log) => (
							<tr key={log.id}>
								<th scope="row">{log.id}</th>
								<td>{log.backendUrl}</td>

								<td>{log.frontendUrl}</td>
								<td>{log.userAgent}</td>
								<td>{new Date(log.date).toLocaleString()}</td>
							</tr>
						))}
				</tbody>
			</table>
		);
	}
}
