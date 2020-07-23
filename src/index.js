import React from 'react';
import ReactDOM from 'react-dom';
import './assets/fonts/iconfont.css'
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Switch, HashRouter } from 'react-router-dom';
import routes from 'route/routes';
import { renderRoutes } from 'react-router-config';
import "animate.css";


ReactDOM.render(
    <HashRouter>
        <Switch>
            {renderRoutes(routes)}
        </Switch>
    </HashRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// 模块热替换的 API

if (module.hot) {
    module.hot.accept();
}