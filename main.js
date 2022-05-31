import { BigNumber, utils } from "ethers";
import { MerkleTree } from "merkletreejs";

import keccak256 from "keccak256";
import fs from "fs";
 
const Airdrop = JSON.parse(fs.readFileSync('airdrop-balances.json'));
 
let elements = []
 
for (const [k, v] of Object.entries(Airdrop)) {
    elements.push(
        utils.solidityKeccak256(["address", "uint256"], [k, BigNumber.from(v).mul(10**12)])
    )
  }
 
const merkleTree = new MerkleTree(elements, keccak256);
 
const root = merkleTree.getHexRoot();

const expectedRoot = "0x8f4e1c18aa0323d567b9abc6cf64f9626e82ef1b41a404b3f48bfa92eecb9142";

if (root != expectedRoot) {
    console.log("Calculated Merkle Root does not match the PLSD contract!");
    console.log("Calculated Root:", root);
    console.log("Expected Root:", expectedRoot);
}

else {
    console.log("Merkel Root Verified:", root);
}