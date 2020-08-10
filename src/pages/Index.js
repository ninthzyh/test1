import React from 'react'
import { Layout } from 'antd';
import { renderRoutes } from 'react-router-config'
import Header from 'src/components/HeaderTop'
import Footer from 'src/components/Footer'

const { Content } = Layout;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: props.route,
      isShow: true
    }
  }

  render() {
    const route = this.state.route;
    return <Layout className="layout" style={{ height: '100%',backgroundColor:'#3F5F6D'}}>
      <Header className='animate__animated animate__backInDown' hasMenu={true} />
      <Content style={{ height: '100%' }} id="Content">
        {renderRoutes(route.children)}
      </Content>
      <Footer className='animate__animated animate__backInUp' history={this.props.history} />
    </Layout>
  }
}
