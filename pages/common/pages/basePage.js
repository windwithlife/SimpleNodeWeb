import React from 'react';
import ReactDOM from 'react-dom';
import './styles/basePage.less';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Head } from 'flow_sakura_ui';
import Router from 'next/router'

export default class BasePage extends React.Component {
    constructor(props) {
        super(props);
        this.renderPage = this.renderPage.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.hideLoading = this.hideLoading.bind(this);
        this.openUrl = this.openUrl.bind(this);
        this.back = this.back.bind(this);
        this.urlQuery = this.urlQuery.bind(this);
        this.networkHandler = networkHandler;

        this.isServer = typeof window == 'undefined';
        this.pageWidth = this.isServer ? 0 : window.innerWidth;
        this.pageHeight = this.isServer ? 0 : window.innerHeight;

        this.defaultModel = {};
    }
    setDefaultModel(model){
        if(model){
            this.defaultModel = model;
        }
    }
    Store=()=>{
        return this.defaultModel;
    }
    params=()=>{
        const queryParams = this.props.router.query;
        return queryParams;
    }

    componentDidMount() {
       
    }

    componentDidUpdate() {
        
    }

    componentWillUnmount() {

    }

    componentDidCatch(error, info) {
        // 记录子组件抛出的错误
        // log
    }

    showLoading(text) {
        let divEle = document.createElement('div');
        divEle.className = "div_loading_con";
        document.body.appendChild(divEle);
        ReactDOM.render((
            <div>
                <span className="div_loading_text">{text ? text : '精彩内容马上呈现'}</span>
                <Loading3QuartersOutlined spin="true" className="div_loading_circle" />
            </div>
        ), document.querySelector('.div_loading_con'));
    }

    hideLoading() {
        let divEle = document.querySelector('.div_loading_con');
        if (divEle) document.body.removeChild(divEle);
    }

    openUrl(url) {
        if (typeof url == 'object') {
            if (!!url.pathname) {
                Router.push(url);
            }
        } else if (typeof url == 'string') {
            window.open(url);
        }
    }

    back() {
        Router.back();
    }

    urlQuery() {
        return Router.router.query
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染可以显示降级 UI
        // return { hasError: true };
    }

    render() {
        return (
            <div style={{position: 'absolute',top: 0, left: 0, bottom: 0, right: 0, display: 'flex', flexDirection: 'column'}}>
                <Head></Head>
                {this.renderPage()}
            </div>
        )
    }
}