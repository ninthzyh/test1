import React, { Component } from 'react'
import CommonContainer from "components/CommonContainer";
import config from './config';

function HOC(WrappedComponent,url) {
    return class extends Component{
        state={
            data:{}
        };
        async componentDidMount() {
            const data = await this.getData();
            this.setState({
                data
            })
        }

        getData = async ()=> {
            // 请求
        };

        render() {
            return <WrappedComponent data={this.state.data} />
        }
    }
}

export default class extends Component {

    render() {
        const {style, OneMap, showVisitor, children} = config[this.props.configName];
        return (
            <CommonContainer Map={OneMap} containerStyle={style} showVisitor={showVisitor}>
                {children.map((item, index)=>{
                    const C = HOC(item.component,item.url);
                    return <div key={index} className={style[item.className]}><C /></div>
                })}
            </CommonContainer>
        );
    }
}
