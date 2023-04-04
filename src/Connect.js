let userAccount=0;
const {ethers}=require("ethers");
let provider;
export async function connectWallet(){
     provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    userAccount=await signer.getAddress();
    console.log("Account:", await signer.getAddress());
    return userAccount;
}



