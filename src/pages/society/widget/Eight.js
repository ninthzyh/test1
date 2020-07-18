import React, { Component } from 'react';
import SocietyStyle from '../Society.module.scss';
import ChartHeader from 'components/ChartHeader/ChartHeader';
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        }
    }

    render() {
        return (
            <div className={SocietyStyle.eight}>
                <ChartHeader title='走进濮阳' />
                <div className={SocietyStyle.eightContainer}>
                    <div>
                        <img src={require("img/credit/news.png")} width='120px' height='81px' alt=""/>
                        <div>
                            <p className={SocietyStyle.title}>荣誉</p>
                            <p>国家紧密型医共体建设试点县国
                                家紧密型医共体建设试点县国家
                                紧密型医共体建设试点县国家紧</p>
                        </div>
                    </div>
                    <div>
                        <img src={require("img/credit/news.png")} width='120px' height='81px' alt=""/>
                        <div>
                            <p className={SocietyStyle.title}>荣誉</p>
                            <p>国家紧密型医共体建设试点县国
                                家紧密型医共体建设试点县国家
                                紧密型医共体建设试点县国家紧</p>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default Index
