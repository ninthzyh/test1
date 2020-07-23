import React, { Component, cloneElement } from 'react'
import VisitorCount from "components/VisitorCount";

export default class CommonContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
        this.firstInit = true;
    }

    componentDidMount() {
        if(this.props.change){
            this.showChange();
        }
    }

    sliceChildren = () =>{
        const { show } = this.state;
        let { children, size = 3} = this.props;
        let childList = [...children];
        if(!childList || !childList.length)return ;
        const {length} = childList;
        if(length%6 !== 0){
            childList.splice(6,0,...childList.slice(0,3));
        }
        const result = [...new Array(Math.ceil(length/size))].map((item,index) =>{
            const position = index % 2 === 0 ? 'Left' : 'Right';
            // 前一半先展示  后一半隐藏   到达切换时间后反转过来
            const showWrapper = length <= 6 || index < (length/size/2) ? !show : show;
            // 要切换时  第一次进来  切换后才战士的项目  隐藏
            const style = length > 6 && this.firstInit && index >= (length/size/2) ? {display: 'none'} : {};
            return <div key={index} style={style} className={this.getClassName(showWrapper, position)}>{childList.slice(index*size, (index+1)*size)}</div>;
        });
        this.firstInit = false;
        return result;
    };

    showChange = () => {
        setTimeout(()=>{
            this.setState({
                show: !this.state.show
            }, this.showChange)
        },window.interval)
    };

    getClassName = (show,position) => `${this.props.containerStyle[`${position.toLowerCase()}Wrapper`]} ${show ? `animate__animated animate__backOut${position}` : `animate__animated animate__backIn${position}`}`;

    render() {
        const {showVisitor, containerStyle, Map} = this.props;
        return (
            <div className={containerStyle.container}>
                <Map/>
                {this.sliceChildren()}
                {showVisitor && <VisitorCount />}
            </div>);
    }
}
