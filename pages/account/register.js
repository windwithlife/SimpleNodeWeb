import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../common/components/select';
const { TextArea } = Input;
import Upload from '../common/components/FileUpload';

@inject('accountStore')
@observer
export default class AddPage extends React.Component {
    formRef = React.createRef();

    Store = () => {
        return this.props.accountStore;
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    onFinish = values => {
        var that = this;
        let pathLogin = '/account/login';
        //console.log(path);
       
        console.log(values);
        this.Store().register(values, (res) => { 
            console.log('finished register'); 
            if("SUCCESS" == res.code){
                router.push({ pathname: pathLogin }); 
            }
        });
    }

    
    render() {
        var that = this;

        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>

   
   
                          < Form.Item name="name" label="用户名：">
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
AddPage.getInitialProps = async function (context) {
    return { query: context.query };
}

