import React, { Component } from 'react'
import TrafficStyle from '../Traffic.module.scss'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div className={TrafficStyle.page}>
hello
        </div> );
    }
}
 
export default Index;