import React from 'react';
import { Form, Input, Button, Checkbox ,Modal} from 'antd';


import "./styles/index.less";
import {invoke_post} from "../models/NetworkHelper"
React.createRef()

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16,},
};

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.userName = React.createRef();
        this.userPassword = React.createRef();
    }
    inputChange(type){
    }
    async onFinish(){
        try{
            let userName = this?.userName?.current?.value;
            let userPassword = this?.userPassword?.current?.value;
            if(!userName || !userPassword) {
                Modal.info({ content: '信息填写不完整' })
                return
            }
            await invoke_post('userService/userLogin',{ userPassword,userName})
        }catch(error){
            console.error('onFinish-error: ', error);
        }
    }

    render(){
        return (
            <div className="con">  
                <div className="con_left">
                    <img src="http://images.e-healthcare.net/images/2020/09/13/images20091315043184415.png"></img>
                    <div className="con_left_desc_con">
                        <div className="con_left_desc_wrap">
                            <div className="con_left_desc_chinese">E健云运营后台</div>
                            <div className="con_left_desc_english">OPERATION SYSTEM</div>
                        </div>
                    </div>
                </div>
                <div className="con_right">
                    <div className="input_con">
                        <input ref={this.userName} onChange={this.inputChange.bind(this,"NAME")} placeholder="用户名"/>
                        <input ref={this.userPassword} onChange={this.inputChange.bind(this,"PASSWORD")} type="password" placeholder="密码"/>
                        <div className="login_btn" onClick={this.onFinish.bind(this)}>登录</div>
                    </div>
                </div>
            </div>
          );
    }
}

