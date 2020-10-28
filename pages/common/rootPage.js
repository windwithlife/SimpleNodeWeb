import React from 'react';

export default class RootPage extends React.Component {
    constructor(props) {
        super(props);
        this.renderPage = this.renderPage.bind(this);
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