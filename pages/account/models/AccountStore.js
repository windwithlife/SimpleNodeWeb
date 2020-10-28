import { observable, action, computed,toJS,runInAction } from "mobx";
import BaseStore from '../../../models/BaseStore';
import authStore from '../../../models/AuthStore';
import { Network } from '../../../models/NetworkHelper'

let  DataItem = {
    
        id:'',
        name:'',   
        password:'',
        
}
let Data = {
    currentItem :DataItem,
    list:[]
}
export default class ProjectStore extends BaseStore {
    //@observable dataObject = Data;
    constructor() {
        super('/account/');
        this.dataObject = Data;
        let a = new Network
        console.log(Network)
    }
   
    @action.bound
    register(values,callback){
        let that = this;
        this.model.postRaw("/v1/account/signup",values,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.list= response.data.items;
                if (callback){
                    callback(response.data);
                }
            }
        });

    }

    @action.bound
    login(values,callback){
        let that = this;
        Network.fetch_post("/mobile/exampleService/test1",values,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.list= response.data.items;
                authStore.saveAuthInfo(response.data.token);
                if (callback){
                    callback(response.data);
                }
            }
        });

    }
    @action.bound
    queryById(id, callback){
        let that = this;
        this.model.queryRaw("/generic/info/query/"+id,{},function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.currentItem= response.data;
                if (callback){
                    callback(response.data);
                }
            }
        });

    }

    @action.bound
    add(values, callback){
        let that = this;
        this.model.postRaw("/generic/info/save",values,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.currentItem= response.data;
                if (callback){
                    callback(response.data);
                }
            }
        });

    }

    @action.bound
    update(values, callback){
        let that = this;
        this.model.postRaw("/generic/info/update/" + values.id,values,function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.currentItem= response.data;
                if (callback){
                    callback(response.data);
                }
            }
        });

    }
    @action.bound
    removeById(id, callback){
        let that = this;
        this.model.postRaw("/generic/info/romve" + id,{},function (response) {
            if (response && response.data) {
                console.log(response.data);
                that.dataObject.currentItem= response.data;
                if (callback){
                    callback(response.data);
                }
            }
        });

    }
    

    
}



