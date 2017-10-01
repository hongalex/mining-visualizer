import CryptoJS from 'crypto-js';

export function calculateHash(input) {
	// Calculate initial
	var firstHash = CryptoJS.SHA256(input);
	
	// Perform a second hash on the binary data of the first hash
	var secondHash = CryptoJS.SHA256(firstHash);

	return secondHash;
}