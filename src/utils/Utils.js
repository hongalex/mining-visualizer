import CryptoJS from 'crypto-js';
import { conf } from '../config.js';

export function calculateHash(input) {
	var hash;

	switch(conf.hashFunction) 
	{
		case 'Double-SHA256':
			// Calculate initial hash
			hash = CryptoJS.SHA256(input);
			// Perform a second hash on the binary data of the first hash
			hash = CryptoJS.SHA256(hash);
			break;
		case 'SHA256':
			hash = CryptoJS.SHA256(input);
			break;
		case 'SHA3':
			hash = CryptoJS.SHA3(input);
			break;
		default: 
			hash = CryptoJS.SHA512(input);
	} 

	return hash;
}

/**
 * @param  {String} hash- Hash solution to check for validity
 * @param  {Number} difficulty- number of leading zeroes to check for 
 * @return {Boolean} validity of the solution
 */
export function isValidSolution(hash, difficulty) 
{
	for(var i=0; i<difficulty; i++)
	{
		if(hash[i]!=='0')
		{
			return false;
		}
	}
	return true;
}

/**
 * Calculates the next block given the current block number, previous hash, input data, time, and nonce
 * 
 * @param  {Number} blockNumber- the index of the block we are adding to the blockchain
 * @param  {String} prevHash- hash solution to the previous block (0 for genesis block)
 * @param  {String} data - input data
 * @param  {Number} time - UNIX time in seconds
 * @return {Object} result - containing hash solution & nonce
 */
export function mineBlock(blockNumber, prevHash, data, time) {
	var result = {}

	var nonce = conf.initialNonce;
	var input;
	var hash;

	do {
		input = blockNumber + prevHash + time + data + nonce;
		hash = calculateHash(input);
		nonce+=1;
	} while(!isValidSolution(hash.toString(), conf.difficulty));

	result.hash = hash.toString();
	result.nonce = nonce;

	return result;
}