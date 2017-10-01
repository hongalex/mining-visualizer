import React, { Component } from 'react';
import Block from './Block';

class Blockchain extends Component {

	render() {
		return (
			<div>
				{this.props.blocks.map(function(block) {
					return <Block {...block} key={block.blockNumber}/>
				})}
			</div>
		);
	}

}

export default Blockchain;