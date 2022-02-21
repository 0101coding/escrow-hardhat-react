import Escrow from "../artifacts/contracts/Escrow.sol/Escrow"
import { ethers } from "ethers";

//const provider = new ethers.providers.Web3Provider(window.ethereum);

 const approveContract = async (address) => {
//     const contract = new ethers.ContractFactory.attach(address);
//     const signer = provider.getSigner();
    const signer = window.provider.getSigner();
    const factory = new ethers.ContractFactory(Escrow.abi, Escrow.bytecode, signer);
    const contract = factory.attach(address);

    

    await contract.connect(signer).approve();
}

export default approveContract;