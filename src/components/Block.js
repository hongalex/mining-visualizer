import React, { Component } from 'react';

class Block extends Component {
	render() {
		return (
			<table className="table table-bordered">
				<caption>
					Block Number: {this.props.blockNumber}
				</caption>
				<tbody>
					<tr>
						<td>Hash</td>
						<td>{this.props.hash}</td>
					</tr>
					<tr>
						<td>Previous Hash</td>
						<td>{this.props.prevHash}</td>
					</tr>
					<tr>
						<td>Data</td>
						<td>{this.props.data}</td>
					</tr>
					<tr>
						<td>Nonce</td>
						<td>{this.props.nonce}</td>
					</tr>
					<tr>
						<td>Timestamp</td>
						<td>{this.props.timestamp}</td>
					</tr>
				</tbody>
			</table>
		);
	}

}

export default Block;