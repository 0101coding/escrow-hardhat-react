

const ContractDetail = ({contractDetail, onApprove, idx}) => {
  return (
    <tbody>
      <tr>
        <th scope="row">{idx + 1}</th>
        <td>{contractDetail.arbiter}</td>
        <td>{contractDetail.beneficiary}</td>
        <td>{contractDetail.ether} ETHER</td>
        <td> { contractDetail.isApproved 
                ?  <span>Contract Approved</span>      
                :  <input type="button" className="btn btn-primary" value="Approve Contract" onClick={() => onApprove(contractDetail)}/> 
            }
        </td>
        <td>
          {
            contractDetail.network === "local"
            ? <span>Check Ganache GUI for hash </span>
            : <a target="_blank" rel="noreferrer" href={`https://rinkeby.etherscan.io/tx/${contractDetail.txnHash}`}>Check Etherscan </a>
          }
        </td>
      </tr>  
    </tbody>
  )
}

export default ContractDetail
