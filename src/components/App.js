import React, { Component } from 'react';
import './App.css';
import * as Utils from '../utils/Utils'

import Block from './Block';
import Blockchain from './Blockchain';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			blockData: ''
		}
	}

	updateBlockData = (event) => {
		this.setState({blockData: event.target.value})
	}

	submitBlock = () => {
		var hash = Utils.calculateHash(this.state.blockData);

		this.setState({blockData: ''});
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">This is a blockchain mining demo</h1>
				</header>

				<p className="App-intro">
					To get started, press add some data and press the button
				</p>

				<input type="text" name="blockData" value={this.state.blockData} onChange={this.updateBlockData} />
				
				<button onClick={this.submitBlock}>Mine new block</button>

				<Blockchain/>
			</div>
		);
	}
}

export default App;