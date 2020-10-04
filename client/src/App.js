import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/home';
import CurrencyList from './components/currencyList';
import CurrencyRates from './components/currencyRates';
import CurrencyJoined from './components/currencyJoined';
import CurrencyConverter from './components/currencyConverter';
import Logs from './components/logs';
import Preferences from './components/preferences';

class App extends Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<Link to={'/'} className="navbar-brand">
						Home
					</Link>
					<div className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to={'/currencyList'} className="nav-link">
								Currency List
							</Link>
						</li>
						<li className="nav-item">
							<Link to={'/currencyRates'} className="nav-link">
								Currency Rates
							</Link>
						</li>
						<li className="nav-item">
							<Link to={'/currencyJoined'} className="nav-link">
								Currency Joined
							</Link>
						</li>
						<li className="nav-item">
							<Link to={'/currencyConverter'} className="nav-link">
								Currency Converter
							</Link>
						</li>
						<li className="nav-item">
							<Link to={'/logs'} className="nav-link">
								Logs
							</Link>
						</li>
						<li className="nav-item">
							<Link to={'/preferences'} className="nav-link">
								Preferences
							</Link>
						</li>
					</div>
				</nav>

				<div className="container mt-3">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path={'/currencyList'} component={CurrencyList} />
						<Route path={'/currencyRates'} component={CurrencyRates} />
						<Route path={'/currencyJoined'} component={CurrencyJoined} />
						<Route path={'/currencyConverter'} component={CurrencyConverter} />
						<Route path={'/logs'} component={Logs} />
						<Route path={'/preferences'} component={Preferences} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
