import { useState, useEffect} from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";
import { useAlert, types } from 'react-alert';

const override = css` 
  border-color: red; 
  position: fixed;
  z-index: 999;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const AddContract = ({onCreate, loading}) => { 
     const alert = useAlert();
    const [ arbiter, setArbiter ] = useState("");
    const [ beneficiary, setBeneficiary ] = useState("");
    const [ ether, setEther ] = useState(0);

    const onSubmit = (e) => {
        e.preventDefault();
        // Do some form validation here.
         if (!arbiter || arbiter?.length !== 42) {
            alert.show('Please Provide valid arbiter Address', {
                type: types.ERROR 
            });
            return;
        }

        if (!beneficiary || beneficiary?.length !== 42) {
            alert.show('Please Provide valid beneficiary Address', {
                type: types.ERROR
            });
            return;
        }

        if (!ether || ether <= 0) {
            alert.show('Please Provide valid Eth Amount', {
                type: types.ERROR
            });
            return;
        }
        
        onCreate({arbiter, beneficiary, ether});

        setArbiter("");
        setBeneficiary("");
        setEther(0);
    }
  return (
    <form onSubmit={onSubmit}>
        <div className="mb-3">
            <label htmlFor="Arbiter" className="form-label">Arbiter</label>
            <input type="text" className="form-control" id="arbiter" placeholder="Arbiter Address" value={arbiter} onChange={e => setArbiter(e.target.value)}/>
        </div>
        <div className="mb-3">
            <label htmlFor="Beneficiary" className="form-label">Beneficiary</label>
            <input type="text" className="form-control" id="beneficiary" placeholder="Beneficiary Address" value={beneficiary} onChange={e => setBeneficiary(e.target.value)}/>
        </div>
        <label htmlFor="basic-url" className="form-label">Amount</label>
        <div className="input-group mb-3">
            <span className="input-group-text">ETHER</span>
            <input type="text" className="form-control" aria-label="Amount in Wei" value={ether} onChange={e => setEther(e.target.value)}/>        
        </div>
        <button type="submit" className="btn btn-primary">Create Contract</button>
        <div className="d-flex justify-content-center">
            <div className={loading ? `spinner-border` : ``} role="status">
                <PropagateLoader color="green" loading={loading} css={override}   size={15} />
            </div>
        </div> 
       
    </form>
  )
}

export default AddContract
