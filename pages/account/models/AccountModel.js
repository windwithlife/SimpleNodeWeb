import BaseModel from '../../../models/BaseModel';



export default class ApplicationModel extends BaseModel{
    constructor() {  
        super("/simple/account/pc/userService")
        this.dataObject ={};
        
    }
    
    
    queryByProjectId(id,callback){
        return this.get("/getByProjectId",{id:id}, callback);

    }
    login(username, password, callback){
        let params ={username,password}
        return this.post("/login", params, callback);
    }

    register(values, callback){
        return this.post("/signup", values, callback);
    }

}



