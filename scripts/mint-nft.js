const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
require("dotenv").config({ path: ".env" });

async function main() {
    console.log('Getting the non fun token contract...\n');
    const contractAddress = '0x50EAe049De1b4Fbe0544513633eAFE49Bd984154';
    // const nonFunToken = await ethers.getContractAt('MyNFT', contractAddress);
    const provider = new ethers.providers.JsonRpcProvider("https://alfajores-forno.celo-testnet.org")
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    // const signers = await ethers.getSigners();
    console.log(signer)
    const abi = contract.abi
    const contractOwner = signer.address;
    const nft = new ethers.Contract(
        contractAddress,
        abi,
        signer
   );
  
    
    console.log(`Minting initial NFT collection to ${contractOwner}...`)
    const initialMintCount = 2;
    for (let i = 1; i <= initialMintCount; i++) {
        let tx = await nft.safeMint(signer.address, '1');
        await tx.wait(); // wait for this tx to finish to avoid nonce issues
        console.log(`NFT ${i} minted to ${contractOwner}`);
    }

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });