import React, { Component } from 'react'
import AffairsStyle from '../Affairs.module.scss'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<div className={AffairsStyle.page}>
            <div>
                <div className={AffairsStyle.item}>1</div>
                <div className={AffairsStyle.item}>
                   
                </div>
                <div className={AffairsStyle.item}>3</div>
            </div>
            <div>
                <div className={AffairsStyle.item}>1</div>
                <div className={AffairsStyle.item}>2</div>
                <div className={AffairsStyle.item}>3jdslkfjksldkjflsdjflskdjfsldfjl</div>
            </div>
        </div>);
    }
}

export default Index;