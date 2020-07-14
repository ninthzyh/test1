import React from 'react';
// import './index.css';
import { Layout, Menu, Icon } from 'antd';
import Header from 'components/HeaderTop'
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return <Layout style={{ height: '100%' }}>
            {/* <Header hasMenu={false}></Header> */}
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="global" />
                                    基础地图
                  </span>
                            }
                        >
                            <Menu.Item key="1">在线地图加载</Menu.Item>

                        </SubMenu>
                        <Menu.Item key="6"> <Icon type="laptop" />矢量数据</Menu.Item>

                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                  
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        Content
            </Content>
                </Layout>
            </Layout>
        </Layout>
    }
}
export default Manager;