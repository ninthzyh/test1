import React from 'react';
import ReactDOM from 'react-dom';
import './assets/fonts/iconfont.css'
import './index.css';
//全局配置对象
import 'public/config';
import * as serviceWorker from './serviceWorker';
import { Switch, HashRouter } from 'react-router-dom';
// import {hashHistory} from 'react-router'
import routes from 'route/routes';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import store from 'store/index'
import ScaleBox from 'react-scale-box';


ReactDOM.render(
    <Provider store={store}>
        {/* <ScaleBox width={1920} height={1200}> */}
            <HashRouter>
                <Switch>
                    {renderRoutes(routes)}
                </Switch>
            </HashRouter>
        {/* </ScaleBox> */}
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// 模块热替换的 API

if (module.hot) {
    module.hot.accept();
}