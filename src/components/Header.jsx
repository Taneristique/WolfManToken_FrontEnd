import React,{Component} from "react";
import {Link} from 'react-router-dom'
import {connectWallet} from "../Connect";

export default class Header extends Component{

  constructor(){
    super();
    this.state={check:false, userAddress : 'connect'};
    if(localStorage.getItem("checkConnection")){ 
      /*If any user connected show the latest connected address.
        This condition will use to show user address as independent of
        the page refreshments grace to local storage values.
      */
      if(!localStorage["User"]){/*If check is true User must exist. 
      Set User to a default value if it does not exist*/
        localStorage["User"]="connect";
      }
      this.state=({check:localStorage["checkConnection"],userAddress : localStorage.getItem("User")});
    }
  }  
  
  render(){
        return(
          <>
            <ul className="bg-slate-900 from-cyan-50 text-violet-50 block text-center h-10 ">
                <li className="inline-block rounded-xl  shadow-lg shadow-green-500 w-20 md:shadow-xl relative top-1 right-2"><Link to="/">Store</Link></li>
                <li className="inline-block rounded-xl shadow-lg shadow-green-500 w-20 md:shadow-xl relative top-1"><Link to="/account">Account</Link></li>
                <button className="connectionButton bg-green-300 text-slate-800 content-none  rounded-xl object-cover inline-block relative top-1 left-2  shadow-lg shadow-green-500 md:shadow-xl text-ellipsis overflow-hidden ..." onClick={
                  async()=>{
                    if(this.state.check===false){
                      /*user will connect to metamask if user was not connected 
                        else same connection will be last but in both cases user
                        address will be shown on the button.
                      */
                       localStorage.setItem("checkConnection",true);
                       localStorage.setItem("User", await connectWallet());
                       this.setState({check : true});
                       this.setState({userAddress : localStorage["User"]});
                      }
                    else{
                      /*Button won't show user address.*/
                        localStorage.setItem("User","connect");
                        this.setState({userAddress : localStorage["User"]});
                        localStorage.setItem("checkConnection",false);
                        this.setState({check : false});

                      }}
                  }>{localStorage["checkConnection"]?localStorage["User"]:this.state.userAddress}</button>
            </ul>
          </>
        );
    }}