import { useState } from "react"

const Nav = ({changeProvider}) => {
    const [network, setNetwork] = useState("local");
    const changeNetwork = (e) => {
        console.log("Supposed Selected Value ", e.target.value);
         setNetwork(e.target.value); 
         //window.network = e.target.value; 
         changeProvider(e.target.value);
    }
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Escrow App</a>
                <form className="d-flex">
                    <select className="form-select" 
                        aria-label="Default select example"
                        onChange={(e) => changeNetwork(e)} value={network} 
                        >
                    <option value="local">Ganache</option>
                    <option value="rinkeby">Rinkeby</option> 
                    </select>  
                </form>
            </div>

        </nav>
    )
}

export default Nav
