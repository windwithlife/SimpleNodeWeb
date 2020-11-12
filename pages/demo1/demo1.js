import React from 'react';
import BasePage from '../common/basePage';
import { Button } from 'antd';


export default class DemoPage1 extends BasePage {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        super.componentDidMount && super.componentDidMount();
        console.log(this.urlQuery());
    }

    renderPage() {
        return (
            <div style={{display:'flex',flex: 1, justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
                <div>demo1页面</div>
                <Button type="primary" onClick={()=> { this.back() }}>back</Button>
                <Button type="primary" onClick={()=> { this.openUrl('https://www.baidu.com/') }}>百度</Button>
            </div>
        );
    }
}
DemoPage1.getInitialProps = async function (context) {
    return { query: context.query };
}

