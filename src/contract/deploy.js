import Escrow from "../artifacts/contracts/Escrow.sol/Escrow"
import {ethers} from "ethers"

//const provider = new ethers.providers.Web3Provider(window.ethereum);

const deploy = async (arbiter, beneficiary, value ) => {
    await window.ethereum.request({ method: "eth_requestAccounts"});
    const signer = window.provider.getSigner();
    const factory = new ethers.ContractFactory(Escrow.abi, Escrow.bytecode, signer);

    return factory.deploy(arbiter, beneficiary, {
        value
    })
}


export default deploy;