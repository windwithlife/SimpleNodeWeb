
//var model = require('./modelBase');
var axios = require('axios');
var config = require('../config/config');
var serverPath = config.SOA_GATE;
console.log(" current env:========" + serverPath);



function get(path, params, cb){
    axios.get(path, {params:params}).then(function (response) {
        if (response.status ==200){
            if(cb){cb(response)};
        }else{
            console.log("Error Message:" + response.data);
            if(cb){ cb(response.data);}
           
        }

    }).catch(function (error) {
        console.log(error);
        if(cb){cb(error);}
            
    });
}
function post(path,params,cb){
    //console.log("params in axios:"+JSON.stringify(params));
    axios.post(path, params).then(function (response) {
            if(cb){cb(response);}
           
        })
        .catch(function (error) {
            console.log(error);
            if(cb){cb(error);}
            
        });
}



function ModelClass(moduleName) {
    if (moduleName) {
        this.moduleName = moduleName;
    }else{
        this.moduleName = "";
    }

    this.apiServerPath = serverPath + "/" + this.moduleName ;
}

ModelClass.prototype.query = function (path, params,cb) {
    get(this.apiServerPath + "/" + path , params, cb);
};

ModelClass.prototype.update = function (params, cb) {
    post(this.apiServerPath + "/update/" + params.id, params, cb);
};

ModelClass.prototype.removeById = function (id, cb) {
    post(this.apiServerPath + "/remove/" + id, {id:id}, cb);
};

ModelClass.prototype.add = function (params, cb) {
    post(this.apiServerPath + "/save", params, cb);
};

ModelClass.prototype.queryAll = function (cb) {
    this.query("/queryAll",{},cb);
};
ModelClass.prototype.queryById = function (id, cb) {
    this.query("/query/" + id, {}, cb);
};


ModelClass.queryRaw = function (path, params,cb) {
    get(serverPath + "/" + path, params, cb);
};
ModelClass.postRaw = function (path, params,cb) {
    post(serverPath + "/" + path, params, cb);
};

ModelClass.queryDictionaryByCategory = function (params, cb) {
    get(serverPath + "/dictionary/queryByCategoryName/", params, cb);
};


module.exports = ModelClass;





// function getRequest(path, params) {
//     console.log("axios request PATH:" + path + "METHOD:[GET]");
//     console.log("axios request PARAM:" + JSON.stringify(params));
//     return axios.get(path, { params: params }).catch(function (error) {
//         console.log(error);
//     });
// }
// function postRequest(path, params) {
//     console.log("axios request PATH:" + path + "METHOD:[POST]");
//     console.log("axios request PARAM:" + JSON.stringify(params));
//     return axios.post(path, params).catch(function (error) {
//         console.log(error);
//     });
// }

