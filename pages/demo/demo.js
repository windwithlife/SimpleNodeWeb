import React from 'react';
import BasePage from '../common/basePage';
import { Button } from 'antd';

export default class DemoPage extends BasePage {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        super.componentDidMount && super.componentDidMount();
        this.showLoading("精彩呈现");
        this.networkHandler.setConfig({
            baseUrl: 'https://www.baidu.com'
        })
        this.networkHandler.post();
        const network = new this.networkHandler({
            baseUrl: 'https://m.ctrip.com'
        })
        network.post();
        setTimeout(() => {
            this.hideLoading();
        }, 2000)
        this.openUrl();
    }

    renderPage() {
        return (
            <div style={{display:'flex',flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <div>demo页面</div>
                <Button type="primary" onClick={()=> { this.openUrl({
                    pathname: '/demo1/demo1',
                    query: {
                        id: 1
                    }
                }) }}>demo1</Button>
            </div>
        );
    }
}
DemoPage.getInitialProps = async function (context) {
    return { query: context.query };
}

