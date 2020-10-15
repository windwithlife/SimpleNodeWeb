import App, {Container} from 'next/app'
import React from 'react'
import { initializeStore } from '../models/index';
import { Provider } from 'mobx-react'
import Layout from './common/pages/layout.js'

class MyMobxApp extends App {
    static async getInitialProps(appContext) {
        // Get or Create the store with `undefined` as initialState
        // This allows you to set a custom default initialState
        const mobxStore = initializeStore()
        // Provide the store to getInitialProps of pages
        appContext.ctx.mobxStore = mobxStore

        let appProps = await App.getInitialProps(appContext)

        return {
            ...appProps,
            //initialMobxState: appProps
        };
    }

    constructor(props) {
        super(props)
        if (props._STORENAME){
           this.mobxStore = initializeStore(props._STORENAME,_STOREVALUE);
        }else{
            this.mobxStore = initializeStore();
        }
        //this.mobxStore = initializeStore(props.initialMobxState)
        //this.context = this.props.con
    }
    componentDidMount(){
    }
    componentWillUnmount

    render() {

        const { Component, pageProps } = this.props;
        
        let pathName = this.props.router.pathname;
        console.log(this.props.router.pathname);
        return (
            <Provider {...this.mobxStore}>
                <Layout path={pathName}>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        )


    }
}
export default MyMobxApp
