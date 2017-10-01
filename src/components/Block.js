import React, { Component } from 'react';
import * as Utils from '../utils/Utils'

class Block extends Component {
	constructor(props) {
		super(props);

		this.state = {
			blockNumber: 0
		}
	}
	render() {
		return (
			<div>
				Block Number: {this.state.blockNumber}
			</div>
		);
	}

}

export default Block;