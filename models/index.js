import { useStaticRendering } from 'mobx-react';
//import Store from './Store';
import AuthStore from "./AuthStore";
import MenuStore from "./MenuStore";

import AccountStore from "../pages/account/models/AccountModel";

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)

let stores = {
    authStore:AuthStore,
    menuStore: new MenuStore(),
    accountStore: new AccountStore(),
}   


function retainStore(storeName){
    return stores[storeName];
}
function composeStores(storeName,initialData){
    if (storeName && initialData){
        store = retainStore(storeName);
        if(initialData){
            store.initialize(initialData);
        }
        stores[storeName] = store;
    }    
    return stores;
}
export function initializeStore (name,initialData) {
    // Always make a new store if server, otherwise state is shared between requests
    if (isServer) {
        return composeStores();
    }else{
        if(name &&  initialData){
            return  composeStores(name, initialData)
        }else{
            return  composeStores();
        }
        
      
    }
}


