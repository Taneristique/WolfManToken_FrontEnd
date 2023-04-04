import React,{useState} from "react";
import wolfManTokenAbi from "./abi/WolfManToken.json" 
const ContractAddress='0x9BDa325B53f493b67b144b79fBc2d04468139e0C';
const {ethers}=require('ethers');

export default function Account(){
    const[state,setState] = React.useState({to : "", amount : 0});
    const getWolfManBalance=async()=>{
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = await signer.getAddress();
        const wolfManTokenContract=new ethers.Contract(ContractAddress,wolfManTokenAbi.abi,signer)
        return ethers.utils.formatEther(await wolfManTokenContract.balanceOf(userAddress));
    }
    const getEtherBalance=async()=>{
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        let userAddress = signer.getAddress();
        return ethers.utils.formatEther(await provider.getBalance(userAddress));
    }
    const sendWolfMAN=async(_to,_amount)=>{
        const provider= new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const wolfManTokenContract=new ethers.Contract(ContractAddress,wolfManTokenAbi.abi,signer);
        await wolfManTokenContract.connect(signer).sendWolfManToken(_to,ethers.utils.parseEther(_amount));
    }
    const saveTokens=async()=>{
        const provider= new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const userAddress= signer.getAddress();
        const wolfManTokenContract=new ethers.Contract(ContractAddress,wolfManTokenAbi.abi,signer);
        await wolfManTokenContract.connect(userAddress).refund();
    }
    let {wolfManBalance, etherBalance}=useState(null)
    etherBalance=()=>getEtherBalance().then((value)=>{document.querySelector(".ethBalance").innerText="Ether Balance : "+value});
    wolfManBalance=()=>getWolfManBalance().then((value)=>{document.querySelector(".wolfManBalance").innerText="WOLFMan Balance :"+value}).catch((err)=>alert(err));
    etherBalance()
    wolfManBalance()
    const refundUser = () => saveTokens().then((value)=>alert("Transaction succeed "+ value)).catch((err)=>alert(err));
    return(
            <div className="grid w-screen h-screen place-items-center">
            <div className="bg-slate-600 text-slate-100 w-1/2 h-3/4 rounded-xl block">
                <div className="inline-block bg-slate-500 w-11/12  h-full ml-8 text-center text-clip overflow-hidden">
                    <h1 className="text-2xl text-slate-200	">{localStorage["User"]==="connect"?"Please Connect To This Application Using Your Web3 Provider":`Hello \n ${localStorage["User"]}`}</h1>
                    <h3 className="ethBalance text-xl mt-3">waiting</h3>
                    <h3 className="wolfManBalance text-xl mt-3">waiting</h3>
                    <h2 className="text-xl  mt-3">Send WolfMAN</h2>
                    <label htmlFor="to">to</label>
                    <input className="bg-slate-400 rounded-xl text-center w-3/4 mt-10" id="to" value={state.to} onChange={(e) => setState({...state, to: e.target.value})}></input>
                    <br/>                    
                    <label htmlFor="amount">amount</label>
                    <input className="bg-slate-400 rounded-xl text-center w-3/4 mt-10" id="amount" value={state.amount} onChange={(e) => setState({...state, amount: e.target.value})} ></input>
                    <button className="bg-green-300 content-none  rounded-xl object-cover w-1/4 inline-block relative top-1 left-2 mt-8 shadow-lg shadow-green-500 md:shadow-xl text-ellipsis overflow-hidden ..." onClick={
                        ()=>{
                            sendWolfMAN(state.to,state.amount);
                        }}
                            >Transfer</button>
                        <h2 className="text-xl mt-12">Refund my lost funds!</h2>
                        <button className="bg-green-300 content-none  rounded-xl object-cover w-1/4 inline-block relative top-1 left-2 mt-8 shadow-lg shadow-green-500 md:shadow-xl text-ellipsis overflow-hidden ..." onClick={refundUser}>refund</button>
                </div>
            </div>
        </div>
        );
     }
