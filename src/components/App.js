import React, { Component } from 'react';

import './App.css';
import pick from '../img/pick.png';

import Blockchain from './Blockchain';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			blockData: ''
		}
	};

	updateBlockData = (event) => {		
		this.setState({blockData: event.target.value})
	};

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Simple Blockchain Mining Demo</h1>
				</header>

				<h1 className="App-intro">
					To get started, press give some data as input and hit "Mine New Block"
				</h1>

				<form className="form-inline" onSubmit={e => { e.preventDefault(); this.refs.blockchain.createBlock() }}>
					<div className="form-group">
						<input type="text" className="form-control" name="blockData" placeholder="Data" value={this.state.blockData} onChange={this.updateBlockData} />
					</div>
					<button className="btn btn-primary" onClick={() => this.refs.blockchain.createBlock()} type="button">
						Mine New Block&nbsp;
						<img src={pick} height="20" width="20" alt=""/>
					</button>
				</form>
				<Blockchain ref="blockchain" blockData={this.state.blockData}/>
			</div>
		);
	};
};

export default App;