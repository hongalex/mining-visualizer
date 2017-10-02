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

	createBlock = () => {
		this.setState({ isLoading: true });

		/* Yield execution of the mining script to prevent UI from being blocked */
		setTimeout(() => {
			console.log("so it begins")
			var blockNumber = this.state.blocks.length;		
			var time = moment();
			var prevHash, data;

			// Do something different for genesis block
			if(blockNumber === 0) {
				prevHash = 0;
				data = conf.initData;
			} else {
				prevHash = this.state.blocks[blockNumber-1].hash;
				data = this.props.blockData;
			}

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

			this.setState({isLoading: false, blocks: updatedBlocks});
		}, 1000);
	};


	componentDidMount() {
		/* Mine Genesis Block */
		this.createBlock();
	};

	render() {
		return (
			<div>
				{this.state.blocks.map(function(block) {
					return <Block {...block} key={block.blockNumber}/>
				})}
				{this.state.isLoading && <h3> Mining block {this.state.blocks.length}... </h3>}
			</div>
		);
	}

}

export default Blockchain;