import axios from "axios";
import config from "../config/config";

const isServer = typeof window == 'undefined';

const baseUrl = config.RESOURCE_PATH;
const webProfix = config.WEB_GATE;
const soaPrefix = config.SOA_GATE + "/" + config.PROJECT_NAME;

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
    static async fetch_post(url, params = {}) {
        console.log(soaPrefix)
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
    static async fetch_get(url, params = {}) {
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

export function doHref(path=''){
    location.href = `${location.origin}${baseUrl}/${path}` //首页登录成功处理
}