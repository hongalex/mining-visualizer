import CryptoJS from 'crypto-js';

export function calculateHash(input) {
	// Calculate initial
	var firstHash = CryptoJS.SHA256(input);
	
	// Perform a second hash on the binary data of the first hash
	var secondHash = CryptoJS.SHA256(firstHash);

	return secondHash;
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
	
	var nonce = 0;

	var input;
	
	var hash;
	do {
		input = blockNumber.toString() + prevHash.toString() + time + data.toString() + nonce.toString();
		hash = calculateHash(input);
		nonce+=1;
	} while(!isValidSolution(hash.toString(), 4));

	result.hash = hash.toString();
	result.nonce = nonce;

	return result;
}