import React from 'react';
import router from 'next/router';
import BasePage from '../common/basePage';

export default class DemoPage extends BasePage {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        super.componentDidMount && super.componentDidMount();
        this.showLoading();
    }

    renderPage() {
        return (
            <div style={{display:'flex',flex: 1, justifyContent: 'center', alignItems:'center'}}>页面demo</div>
        );
    }
}
DemoPage.getInitialProps = async function (context) {
    return { query: context.query };
}

