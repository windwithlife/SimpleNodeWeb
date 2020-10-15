import { observable, action } from "mobx";
import BaseStore from "./BaseStore";

class AuthStore extends BaseStore{
 
  @observable token = sessionStorage.getItem("token");
 

  constructor() {
    super('auth');
  }
  saveAuthInfo =(token) =>{
    //sessionStorage.setItem("userOpenId",authInfo.userOpenId);
    sessionStorage.setItem("token",token);
  }
  getAuthInfo=()=>{
    return sessionStorage.getItem("token");
  }

}

const authSelf = new AuthStore();

export default authSelf

