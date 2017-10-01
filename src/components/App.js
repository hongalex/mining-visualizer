import React, { Component } from 'react';
import moment from 'moment';

import './App.css';
import * as Utils from '../utils/Utils'

import Blockchain from './Blockchain';

class App extends Component {
	constructor(props) {
		super(props);

		/* Mine Genesis Block */
		var blockNumber = 0;
		var prevHash = 0;
		var data = 'Genesis Block';
		var time = moment();

		// Contains calculated hash solution and nonce
		var result = Utils.mineBlock(blockNumber, prevHash, data, time);

		this.state = {
			blockData: '',
			blocks: [
				{ 
					blockNumber: blockNumber,
					hash: result.hash,
					prevHash: prevHash,
					data: data,
					nonce: result.nonce,
					timestamp: time.format()
				}
			]
		}
	};

	updateBlockData = (event) => {		
		this.setState({blockData: event.target.value})
	};

	submitBlock = () => {
		var blockNumber = this.state.blocks.length;
		var prevHash = this.state.blocks[blockNumber-1].hash;
		var data = this.state.blockData;
		var time = moment();

		// Contains calculated hash solution and nonce
		var result = Utils.mineBlock(blockNumber, prevHash, data, time);

		var newBlock = { 
			blockNumber: blockNumber,
			hash: result.hash,
			prevHash: prevHash,
			data: data,
			nonce: result.nonce,
			timestamp: time.format()
		};

		var updatedBlocks = this.state.blocks;
		updatedBlocks.push(newBlock);

		this.setState({blocks: updatedBlocks});
	};

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">This is a blockchain mining demo</h1>
				</header>

				<p className="App-intro">
					To get started, press give some data as input and hit "Mine New Block"
				</p>

				<form className="form-inline" onSubmit={e => { e.preventDefault(); this.submitBlock(); }}>
					<div className="form-group">
						<input type="text" className="form-control" name="blockData" placeholder="Data" value={this.state.blockData} onChange={this.updateBlockData} />
					</div>
					<button className="btn btn-default" onClick={this.submitBlock} type="button">Mine New Block</button>
				</form>
				<Blockchain blocks={this.state.blocks}/>
			</div>
		);
	};
};

export default App;