import React from 'react';
// import './index.css';
import { Layout, Icon } from 'antd';
const { Content } = Layout;

class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const style = {
            background: '#fff',
            padding: 0,
            margin: 0,
            minHeight: 280,
        }
        return <Layout style={{ height: '100%' }}>
            {/* <Header hasMenu={false}></Header> */}
            <Layout>
                <Content style={style}>
                    Content
                </Content>
            </Layout>
        </Layout>
    }
}
export default Manager;