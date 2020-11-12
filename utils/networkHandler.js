let config = {
    baseUrl: 'https://www.googleapis.com/',
    seoUrl: 'https://develop',
};

export default class networkHandler {
    constructor(config_new = {}) {
        this.config = Object.assign({}, config, config_new) ;
    }

    static setConfig(config_new = {}) {
        config = Object.assign({}, config, config_new);
    }

    static post() {
        console.log(config.baseUrl);
    }

    static get() {

    }

    post() {
        console.log(this.config.baseUrl);
    }

    get() {

    }
}