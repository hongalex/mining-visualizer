import React, { Component } from 'react';
import moment from 'moment';

import * as Utils from '../utils/Utils';
import { conf } from '../config.js';
import Block from './Block';

class Blockchain extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			blocks: []
		};
	};

	componentDidMount() {
		/* Delay execution of the mining script to prevent UI from being blocked */
		setTimeout(() => {
			/* Mine Genesis Block */
			var blockNumber = 0;
			var prevHash = 0;
			var data = conf.initData;
			var time = moment();

			var result = Utils.mineBlock(blockNumber, prevHash, data, time);
			
			this.setState({
				isLoading: false,
				blocks: [{
					blockNumber: blockNumber,
					hash: result.hash,
					prevHash: prevHash,
					data: data,
					nonce: result.nonce,
					timestamp: time.format()
				}]
			});
		}, 500);
	};

	

	submitBlock = () => {
		var blockNumber = this.state.blocks.length;
		var prevHash = this.state.blocks[blockNumber-1].hash;
		var data = this.props.blockData;
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
			<div>
				{this.state.isLoading && <h3> Calculating genesis block... </h3>}
				{this.state.blocks.map(function(block) {
					return <Block {...block} key={block.blockNumber}/>
				})}
			</div>
		);
	}

}

export default Blockchain;