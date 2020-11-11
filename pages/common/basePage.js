import React from 'react';

export default class BasePage extends React.Component {
    constructor(props) {
        super(props);
        this.renderPage = this.renderPage.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.hideLoading = this.hideLoading.bind(this);
        this.isServer = typeof window == 'undefined';
        this.pageWidth = this.isServer ? 0 : window.innerWidth;
        this.pageHeight = this.isServer ? 0 : window.innerHeight;
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

    showLoading() {
        let divEle = document.createElement('div');
        divEle.className = "div_loading_con"
        divEle.innerHTML = `
            <div class="iconfont div_loading">\ue64a</div>
        `
        document.body.appendChild(divEle);
    }

    hideLoading() {
        let divEle = document.querySelector('.div_loading_con');
        if (divEle) document.body.removeChild(divEle);
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染可以显示降级 UI
        // return { hasError: true };
    }

    render() {
        return (
            <div style={{position: 'absolute',top: 0, left: 0, bottom: 0, right: 0, display: 'flex'}}>
                {this.renderPage()}
            </div>
        )
    }
}