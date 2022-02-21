 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "./components/Nav"
import ContractDetails from './components/ContractDetails';
import AddContract from './components/AddContract';
import {useState, useEffect } from "react" 
import deploy  from './contract/deploy';
import approveContract from './contract/approveContract';
import {ethers} from "ethers";
import { css } from "@emotion/react";
import { useAlert, types } from 'react-alert';



function App() {
  const alert = useAlert();
  let [loading, setLoading] = useState(false);
  const [contractDetails, setConractDetails] = useState([]);
  const [chain, setChain] = useState("local");
  //window.network = "local";

  useEffect(() => {
    const getContracts = async(network) => {
      const contracts = await fetchContracts(network);
      setConractDetails(contracts);
    }

    getContracts(chain);
   
    setProvider(chain);
  }, [chain]);


  const setProvider = (network) => {
    if (network === "local"){
      window.provider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
      window.provider = new ethers.providers.Web3Provider(window.ethereum, "rinkeby");
    }
    setChain(network);
  }

  const fetchContracts = async (network) => {
    const res = await fetch(`http://localhost:3010/contracts?network=${network}`);
    const data = await res.json();
    return data;
  }

  const updateContract = async (contract) => {
    await  fetch(`http://localhost:3010/contracts/${contract.id}`, {
      method: "PUT",
      body: JSON.stringify(contract),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  }

  const saveContract = async (contract) => {
    await  fetch("http://localhost:3010/contracts", {
      method: "POST",
      body: JSON.stringify(contract),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
  }

  const approve = async (contract) => {
    await approveContract(contract.address);
    // set to Approved and Update
   
    contract.isApproved = true;
    await updateContract(contract);

    setConractDetails(
      contractDetails.map(
        (c) => c.id === contract.id
        ? {...c, isApproved: true}
        : c
      ) 
    )
  }

  const createContract = async (contractDetail) => {
    setLoading(!loading);
    const contractInstance = deploy(contractDetail.arbiter, contractDetail.beneficiary, ethers.utils.parseUnits(contractDetail.ether, "18"))
    .then((res) => {
      contractDetail.isApproved = false;
      contractDetail.txnHash = contractInstance.deployTransaction.hash;
      contractDetail.address = contractInstance.address;
      contractDetail.network = chain;
      saveContract(contractDetail);

      contractInstance.on("Approved", () => {
        console.log("The Event is emitted");
        contractInstance.isApproved = true;
      })

      contractDetail.id = contractDetails.length + 1;
      setConractDetails([...contractDetails, contractDetail]);

      alert.show('Contract Created Succesfully', {
        type: types.SUCCESS
      });
      setLoading(false);
    })
    .catch(error => {
        let message;
        if (error.message.includes("User denied transaction signature")) {
            message = "User Rejected the Transaction" 
            
        } else if (error.message.includes("insufficient funds for intrinsic transaction cost")) {
        // handle the "error" as a rejection
          message = "Please confirm you are connected to the right network"
        } else {
          message = "An Error Occured"
        }
        alert.show(`Error:  ${message}`, {
          type: types.ERROR
        });
      
        setLoading(false);
    });
  }

  return (
    <div className="Container">
     <Nav changeProvider={setProvider} />
     <div className="row">
      <div className="col-2"></div>
      <div className="col">
        <AddContract
            onCreate={createContract}
            loading={loading}
        />
        
        <ContractDetails
          contractDetails={contractDetails}
          onApprove={approve}
        />
      </div>
      <div className="col-2"></div>
    </div>
      
    </div>
  );
}

export default App;
