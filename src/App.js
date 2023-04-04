import { Component } from "react";
import './index.css';
import WolfManTokenAbi from "./abi/WolfManToken.json";
const ethers = require("ethers")
const ContractAddress='0x9BDa325B53f493b67b144b79fBc2d04468139e0C';

export default class App extends Component{
  constructor(){
    super();
    this.state={ABI : WolfManTokenAbi.abi,
                    amount:0,
                    wolfManContract : "",
                    signer  : null,
                    provider : null};
  }
  inputChange=(e)=>{
    this.setState({[e.target.name]:e.target.value});
  }
  buyToken=async(e)=>{
    e.target.value=this.state.amount;
    const price=0.001*e.target.value;
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const wolfManTokenContract=new ethers.Contract(ContractAddress,this.state.ABI,signer)
   await wolfManTokenContract.buyWolfManToken(e.target.value,{
      value: ethers.utils.parseEther(price.toString())});
      console.log(
        `Requested WolfMen ${e.target.value} to ${userAddress}`
      )
      console.log(typeof e.target.value);
  }
  
 
  render(){
    let {amount}=this.state;
    return (
    localStorage["User"]!=="connect" && localStorage["checkConnection"]?
    <div className="grid w-screen h-screen place-items-center">
      <div className="bg-slate-600 text-slate-100 w-1/2 h-2/4 rounded-xl block">
            <div className="inline-block bg-slate-500 w-11/12  h-full ml-8 text-center">
                <h1 className="WolfManMainColor font-bold text-2xl">WolfMan Store</h1>
                <h3 className="text-xl mt-10">Buy your new wolf men, only for 0.001 ether ⟠</h3>
              <input  className="purchaseAmount bg-slate-400 rounded-xl text-center w-3/4 mt-10" name="amount" id="WolfMenInput" value={this.state.amount} onChange={this.inputChange}/><br/>
              <button value={amount} className="bg-green-300 content-none  rounded-xl object-cover w-1/4 inline-block relative top-1 left-2 mt-8 shadow-lg shadow-green-500 md:shadow-xl text-ellipsis overflow-hidden ..." onClick={this.buyToken}>Buy</button>
            </div>
      </div>
    </div>:
    <div className="grid w-screen h-screen place-items-center">
          <h1 className="text-center text-3xl">
            Please Connect To Your Metamask Account</h1>
    </div>

           
   
  );}
  
}