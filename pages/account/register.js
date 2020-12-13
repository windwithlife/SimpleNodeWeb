import React from 'react';
import { Form, Card, Input, Button} from 'antd';
import router from 'next/router';
import RootPage from '../common/pages/rootPage';
import AccountModel from './models/AccountModel'


export default class AddPage extends RootPage {
    formRef = React.createRef();

 
    constructor(props) {
        super(props);
        this.state = {};
        this.setDefaultModel(new AccountModel());
    }

    onFinish = values => {
        var that = this;
        let pathLogin = '/account/login';
    
        console.log(values);
        this.Store().register(values, (res) => { 
            console.log('finished register'); 
            if("SUCCESS" == res.code){
                router.push({ pathname: pathLogin }); 
            }
        });
    }

    
    renderPage() {
        var that = this;

        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
                          < Form.Item name="username" label="用户名：">
                           <Input />
                          </Form.Item>
                          < Form.Item name="password" label="密码">
                           <Input />
                          </Form.Item>

                    <Card type="inner">
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large">注册</Button>
                           
                        </Form.Item>
                    </Card>
                </Form>
            </Card>
        );
    }
}


