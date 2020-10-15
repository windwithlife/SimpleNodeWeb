//import Head from 'next/head'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
import {

  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import router from 'next/router';
import { inject, observer } from 'mobx-react';
import "../../styles/wrap.less";



function Head(props){
  return (
    <div className="head_con">
      <div className="head_con_left">
      E健云运营后台
      </div>
      <div className="head_con_right">
        {/* <div>18621085656</div> */}
        {/* <div className="exit">退出</div> */}
      </div>
    </div>
  )
}


@inject("menuStore")
@observer
export default class MyLayout extends React.Component {

  state = {
    current: this.props.path
  }
  Store = () => {
    return this.props.menuStore;
  }
  handleClick = (e) => {
    event.stopPropagation();
   
    let menuId = e.key;
    let menuObj = this.Store().findPagePathById(menuId);
    router.push(menuObj.url);
  }
  buildHeaderMenu(dataSource) {
    return (
      dataSource.map((menu, index) => {
        return (<Menu.Item key={menu.id}>{menu.name}</Menu.Item>)
      }));
  }
  buildSidebarMenu = (dataSource) => {
    return (
      dataSource.map((menu, index) => {
        if (menu.childrenList) {
          return (
            <SubMenu key={menu.id} title={
              <span>
                <MailOutlined />
                <span>{menu.name}</span>
              </span>
            }>
              {this.buildSidebarMenu(menu.childrenList)}
            </SubMenu>
          )
        } else {
          return (<Menu.Item key={menu.id} icon={<SettingOutlined />} >{menu.name}</Menu.Item>)
        }
      })
    );
  }
  renderSidebarMenus = (path) => {
    let menus = this.Store().findSiderMenuItemsByPath(path).childrenList;
    let sideMenuUI = null;
    if (menus.length <= 0) {
      sideMenuUI = (<div></div>);
    } else {
      sideMenuUI = (<Sider width={200} style={{ background: '#fff' }}>
        <Menu
          onClick={this.handleClick}
          style={{ height: '100%' }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
        >
          {/*调用上面的递归方法*/}
          {this.buildSidebarMenu(menus)}
        </Menu>
      </Sider>);
    }
    return sideMenuUI;
  }
  componentDidMount() {

  }

  render() {
    let that = this;
    let channelNmae = "config";
    let path = this.props.path;
    let pathArray = path.split('/');
    let homePath = "/home";
    let moduleName = pathArray[1]; let modulePath = "/" + moduleName + "/home";
    let currentPageName = pathArray[2];
    let headerMenus = this.Store().findHeadrMenuItems("default").childrenList;
    let sidebarMenus = this.Store().findSiderMenuItemsByPath(path).childrenList;


    return (
      <div>
        {/* <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
        </Head> */}


        <Layout>
          {/* <style jsx>{`
        #components-layout-demo-top-side-2 .logo {
          width: 120px;
          height: 31px;
          background: #333;
          border-radius: 6px;
          margin: 16px 28px 16px 0;
          float: left;
        }
      `}</style> */}

          {/* <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
              onClick={this.handleClick}
            >
              {that.buildHeaderMenu(headerMenus)}
            </Menu>
          </Header> */}
          <Head></Head>
          <Content >
            <Layout>
  
              {that.renderSidebarMenus(path)}

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
