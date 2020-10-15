import axios from "axios";
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import config from "../config/config";
import { doHref, Loading } from "../utils/PageHelper";
//import model from "./modelBase";

const isServer = typeof window == 'undefined';

const baseUrl = config.RESOURCE_PATH;
const webProfix = config.WEB_GATE;
const soaPrefix = config.SOA_GATE + "/" + config.PROJECT_NAME + '/';

function get(path, params, cb) {
    axios.get(path, { params: params }).then(function (response) {
        if (response.status == 200) {
            if (cb) { cb(response) };
        } else {
            console.log("Error Message:" + response.data);
            if (cb) { cb(response.data); }

        }

    }).catch(function (error) {
        console.log(error);
        if (cb) { cb(error); }

    });
}
function post(path, params, cb) {
    //console.log("params in axios:"+JSON.stringify(params));
    axios.post(path, params).then(function (response) {
        if (cb) { cb(response); }

    })
        .catch(function (error) {
            console.log(error);
            if (cb) { cb(error); }

        });
}



const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else if (response.status == 401 || response.status == 403) {
        return response
    } else {
        var error = new Error((response && response.statusText) || 'text')
        error.response = response
        throw error
    }
}
function dealToken(result) {
    console.log(result);
    
    let statusCode = result.status;
    if (statusCode == 401 || statusCode == 403) {
        if (!isServer) doHref();
        return result.data;
    }
    if ((statusCode) && (statusCode == 200)) {
        if (!isServer) {
            //let token = result.headers.token;
            let token = result.data.token;
            localStorage.setItem('token', token);
        }
        //if (location.pathname == `${baseUrl}/index`) doHref('lecture_setting'); //首页登录成功处理
        return result.data;

    }

    return result.data;

}

export async function invoke_post(url, params = {}) {
    try {
        Loading.show();
        let urlPrefix = 'https://soagateway.e-healthcare.net/meeting-server/pc/'
        axios.defaults.withCredentials = true;
        axios.defaults.crossDomain = true;
        let token = localStorage.getItem('token');
        let result = await axios({
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            url: `${urlPrefix}${url}`,
            data: { platType: 4, category: 1, version: 1, platForm: "web", token, data: params }
        }).then(checkStatus).then(dealToken)
        Loading.hide();
        return result;
    } catch (error) {
        Loading.hide();
        console.error('---invoke_post_error---: ', error);
        throw error;
    }
}

export async function uploadFile(file) {
    try {
        Loading.show();
        let formData = new FormData();
        let token = localStorage.getItem('token');
        let json = { token, platType: 4, category: 1, version: 1, platForm: "web" };
        formData.append('json', JSON.stringify(json))
        formData.append('file', file);
        let result = await axios.post('http://images.e-healthcare.net/meeting-server/uploadService/uploadImage', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(checkStatus).then(dealToken)
        Loading.hide();
        return result;
    } catch (error) {
        Loading.hide();
        console.error('---invoke_uploadFile_error---: ', error);
        throw error;
    }
}



export class Network {
    constructor(moduleName) {
        if (moduleName) {
            this.moduleName = moduleName;
        } else {
            this.moduleName = "";
        }
        this.soaBaseUrl = soaPrefix + "/" + this.moduleName + '/';
        this.webBaseUrl = webProfix;

    }
    switchWebServerHost(newHost) {
        this.webBaseUrl = newHost;
    }
    async fetch_post(url, params = {}) {
        try {
            Loading.show();

            axios.defaults.withCredentials = true;
            axios.defaults.crossDomain = true;
            let token = localStorage.getItem('token');
            let result = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                method: 'post',
                url: `${soaPrefix}${url}`,
                data: { head: { version: 1, systemCode: "1", deviceType: "1" }, params: params }
            }).then(checkStatus).then(dealToken)
            Loading.hide();
            return result;
        } catch (error) {
            Loading.hide();
            console.error('---invoke_post_error---: ', error);
            throw error;
        }
    }
    async fetch_get(url, params = {}) {
        try {
            Loading.show();
            axios.defaults.withCredentials = true;
            axios.defaults.crossDomain = true;
            let token = localStorage.getItem('token');
            params.version = 1;
            params.systemCode = "1";
            params.deviceType = "1";
            let result = await axios({
                headers: {
                    'token': token
                },
                method: 'get',
                url: `${soaPrefix}${url}`,
                params: params,
            }).then(checkStatus).then(dealToken)
            Loading.hide();
            return result;
        } catch (error) {
            Loading.hide();
            console.error('---invoke_post_error---: ', error);
            throw error;
        }
    }

    webGet(path, params, cb) {
        get(this.webBaseUrl + "/" + path, params, cb);
    }
    webPost(path, params, cb) {
        post(this.webBaseUrl + "/" + path, params, cb);
    }

    query(path, params, cb) {
        get(this.soaBaseUrl + "/" + path, params, cb);
    };

}





// export function doHref(path=''){
//     location.href = `${location.origin}${baseUrl}/${path}` //首页登录成功处理
// }


// export const Loading = {
//     show() {
//         if (!isServer) {
//             let divEle = document.createElement('div');
//             divEle.className = "div_loading_con"
//             divEle.innerHTML = `
//                 <div class="iconfont div_loading">\ue64a</div>
//             `
//             document.body.appendChild(divEle);
//         }
//     },
//     hide() {
//         if (!isServer) {
//             let divEle = document.querySelector('.div_loading_con');
//             if (divEle) document.body.removeChild(divEle);
//         }
//     }
// }


// export function getQuery() {
//     const url = decodeURI(location.search); // 获取url中"?"符后的字串(包括问号)
//     let query = {};
//     if (url.indexOf("?") != -1) {
//         const str = url.substr(1);
//         const pairs = str.split("&");
//         for(let i = 0; i < pairs.length; i ++) {
//              const pair = pairs[i].split("=");
//             query[pair[0]] = pair[1];
//         }
//     }
//     return query ;  // 返回对象
// }