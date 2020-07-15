import React from 'react';
// import './index.css';
import { Layout, Icon } from 'antd';
import HomeImg from 'img/home/home.svg'
import ManagerStyle from '../Manager.module.scss';
import OneMap from '../mapController';

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
                   {/* <svg id="Capa_1" enableBackground="new 0 0 512.145 512.145" height="512" viewBox="0 0 512.145 512.145" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m406.073 30.073h-60c-8.291 0-15 6.709-15 15v49.75l90 52.5v-102.25c0-8.291-6.709-15-15-15z" fill="#dce1eb"/><g><path d="m452.073 191.572v305.501h-392v-305.501l196-171.7z" fill="#f2f6fc"/></g><path d="m452.073 191.572v305.501h-196v-477.201z" fill="#dce1eb"/><path d="m508.473 235.971c-5.7 6.301-15 6.901-21.301 1.501l-231.099-202.6-231.1 202.601c-6.301 5.4-15.601 4.799-21.301-1.501-5.4-6.299-4.799-15.599 1.5-21.299l241-211c2.701-2.401 6.301-3.6 9.901-3.6s7.2 1.199 9.901 3.6l241 211c6.298 5.7 6.899 14.999 1.499 21.298z" fill="#4793ff"/><path d="m512.073 497.073c0 8.399-6.599 15-15 15h-482c-8.401 0-15-6.601-15-15 0-8.401 6.599-15 15-15h482c8.401 0 15 6.599 15 15z" fill="#77de5b"/><path d="m512.073 497.073c0 8.399-6.599 15-15 15h-241v-30h241c8.401 0 15 6.599 15 15z" fill="#3acf60"/><path d="m487.172 237.473-231.099-202.601v-34.799c3.6 0 7.2 1.199 9.901 3.6l241 211c6.299 5.7 6.899 15 1.5 21.299-5.701 6.3-15.001 6.901-21.302 1.501z" fill="#525cdd"/><g><path d="m196.073 361.073h-60c-8.291 0-15-6.709-15-15s6.709-15 15-15h60c8.291 0 15 6.709 15 15s-6.709 15-15 15z" fill="#dce1eb"/><path d="m286.073 271.073c-8.291 0-15-6.709-15-15v-60c0-8.291 6.709-15 15-15s15 6.709 15 15v60c0 8.291-6.709 15-15 15z" fill="#cdd2e1"/><path d="m376.073 301.073h-60c-8.291 0-15-6.709-15-15s6.709-15 15-15h60c8.291 0 15 6.709 15 15s-6.709 15-15 15z" fill="#cdd2e1"/><path d="m226.073 452.073c-8.291 0-15-6.709-15-15v-61c0-8.291 6.709-15 15-15s15 6.709 15 15v61c0 8.291-6.709 15-15 15z" fill="#dce1eb"/><path d="m286.073 452.073c-8.291 0-15-6.709-15-15v-61c0-8.291 6.709-15 15-15s15 6.709 15 15v61c0 8.291-6.709 15-15 15z" fill="#cdd2e1"/><path d="m376.073 361.073h-60c-8.291 0-15-6.709-15-15s6.709-15 15-15h60c8.291 0 15 6.709 15 15s-6.709 15-15 15z" fill="#cdd2e1"/><path d="m196.073 301.073h-60c-8.291 0-15-6.709-15-15s6.709-15 15-15h60c8.291 0 15 6.709 15 15s-6.709 15-15 15z" fill="#dce1eb"/><path d="m226.073 271.073c-8.291 0-15-6.709-15-15v-60c0-8.291 6.709-15 15-15s15 6.709 15 15v60c0 8.291-6.709 15-15 15z" fill="#dce1eb"/><path d="m316.073 241.073h-120c-8.401 0-15 6.599-15 15v120c0 8.401 6.599 15 15 15h120c8.401 0 15-6.599 15-15v-120c0-8.401-6.599-15-15-15z" fill="#2d4051"/><path d="m331.073 256.073v120c0 8.401-6.599 15-15 15h-60v-150h60c8.401 0 15 6.599 15 15z" fill="#1a252f"/><circle cx="256.073" cy="316.073" fill="#4793ff" r="15"/><path d="m271.073 316.073c0 8.401-6.599 15-15 15v-30c8.401 0 15 6.599 15 15z" fill="#525cdd"/></g></g></svg>
                    <img src={HomeImg} alt="" />
                    <img src='img/home/home.svg' alt="" /> */}
                    {/* <OneMap></OneMap> */}
                </Content>
            </Layout>
        </Layout>
    }
}
export default Manager;