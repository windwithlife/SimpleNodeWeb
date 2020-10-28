import App from 'next/app'
import React from 'react'
import { Provider } from 'mobx-react'
import Layout from './common/layout'
import * as Sentry from '@sentry/node'
import {dsn} from "../app.config.json";
import Head from 'next/head'
const ENV = process.env.NODE_ENV;
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
const isProd = ENV == 'production';

if(isProd){
    Sentry.init({ 
        dsn,
        release:process.env.NEXT_PUBLIC_API, 
    });
}

class MyMobxApp extends App {
    static async getInitialProps(appContext) {
        try{
            let appProps = await App.getInitialProps(appContext)
    
            return {
                ...appProps,
            };
        }catch(error){
            console.error('_app > getInitialProps > error: ', error);
            isProd && Sentry.captureException(error);
            return {}
        }
    }

    constructor(props) {
        super(props)
    }
    componentDidMount(){
        window.process = {
            env:{
                NODE_ENV:process.env.NODE_ENV
            }
        }
    }

    render() {
        const { Component, pageProps } = this.props;
        
        let pathName = this.props.router.pathname;

        return (
            <>
                <Head>
                    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0,viewport-fit=cover" />
                    <script src="https://browser.sentry-cdn.com/5.26.0/bundle.min.js" integrity="sha384-VGljl8BTZL6Py4DmlOaYmfkOwp8mD3PrmD2L+fN446PZpsrIHuDhX7mnV/L5KuNR" crossOrigin="anonymous"></script>
                </Head>
                <Provider {...this.mobxStore}>
                    <Layout path={pathName}>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
                <script dangerouslySetInnerHTML={{
                    __html:`
                        window.__sentry_quque__ = [];
                        window.addEventListener('error',function(event){
                            event.stopPropagation();
                            event.stopImmediatePropagation();
                            let netLoadEleWhiteList = ['SCRIPT']
                            let {tagName,src} =  event.srcElement
                            if(netLoadEleWhiteList.includes(tagName)){
                                window.__sentry_quque__.push(()=>{
                                    console.error('******文件加载异常，进行错误上报******');
                                    console.table({ tagName,src })
                                    const error = new Error('静态资源加载失败---' + JSON.stringify({ tagName,src }));
                                    Sentry.withScope(function(scope) {
                                        scope.setLevel('warning');
                                        Sentry.captureException(error);
                                    });
                                })
                            }
                        },true)
                        setTimeout(()=>{
                            if(process.env.NODE_ENV == 'production'){
                                window.__sentry_quque__.forEach((errorFunction)=>{
                                    errorFunction();
                                })   
                            }
                        },3000)
                    `
                }}></script>
            </>
        )


    }
}
export default MyMobxApp
