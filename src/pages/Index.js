import React from 'react'
import { Layout } from 'antd';
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux';
import Header from 'src/components/HeaderTop'
import Footer from 'src/components/Footer'
import OneMap from './mapController';

const { Content } = Layout;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: props.route,
      isShow: true
    }
  }
  componentWillUnmount() {
  }

  render() {
    const route = this.state.route;
    return <Layout className="layout" style={{ height: '100%' }}>
      <Header hasMenu={true} />

      <Content style={{ height: '100%' }} id="Content">
        <OneMap></OneMap>
        {renderRoutes(route.children)}
      </Content>
      <Footer />
    </Layout>
  }
}
// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
  return {

  };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
  return {

  };
}
// export default Home;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
