//import Head from 'next/head'
import { Layout, } from 'antd';
const { Content, Footer } = Layout;

function Head(props){
  return (
    <div className="head_con">
      <div className="head_con_left">
      E健云运营后台
      </div>
      <div className="head_con_right">

      </div>
    </div>
  )
}

export default class MyLayout extends React.Component {
  
  state = {
    current: this.props.path
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Layout>
          <Head></Head>
          <Content >
            <Layout>
              <Content >
                {this.props.children}
              </Content>
            </Layout>
          </Content >
          <Footer theme="dark" style={{ textAlign: 'center', background: '#eee' }}>XCODER ©2020 Created by X Team</Footer>
        </Layout>
      </div>
    )
  }
}
