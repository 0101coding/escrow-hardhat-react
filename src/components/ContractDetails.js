import ContractDetail  from "./ContractDetail"
const ContractDetails = ({contractDetails, onApprove}) => {
  return (
    <>
     
        <table className="table">
           <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Arbiter</th>
              <th scope="col">Beneficiary</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
         {
          contractDetails.map( (contract, idx) => 
              <ContractDetail
                idx={idx}
                key={contract.id}
                onApprove={onApprove}
                contractDetail={contract}
              ></ContractDetail>
          )
      }
       </table>
    </>
  )
}

export default ContractDetails
