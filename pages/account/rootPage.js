import React from 'react';
import authStore from '../../models/AuthStore';

export default class RootPage extends React.Component {
    constructor(props) {
        super(props);
        if(this.renderPage){
            this.renderPage = this.renderPage.bind(this);
        }
       
        this.authStore = authStore;
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
        console.log(111111);
        console.log('root', authStore.saveAuthInfo)
    }

    componentDidUpdate() {
        
    }

    componentWillUnmount() {

    }

    componentDidCatch(error, info) {
        // 记录子组件抛出的错误
        // log
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染可以显示降级 UI
        // return { hasError: true };
    }

    render() {
        return (
            <div>
                {this.renderPage()}
            </div>
        )
    }
}