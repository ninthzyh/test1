import One from './widget/One';
import Two from './widget/Two/Two';
import Three from './widget/Three';
import Eleven from './widget/Eleven';
import Four from './widget/four/Four'
import FiveChart from './widget/fiveChart/FiveChart';
import Six from "./widget/Six";
import Ten from "./widget/Ten";
import Nine from './widget/nine/Nine';
import Twelve from './widget/twelve/Twelve';
import Seven from './widget/Seven';
import Eight from './widget/Eight/Eight'
import ManagerStyle from './Manager.module.scss';
import OneMap from './mapController';

export default {
    style: ManagerStyle,
    OneMap: OneMap,
    showVisitor: true,
    children: [
        {
            component: One,
            className: 'item',
            url:'',
        },
        {
            component: Two,
            className: 'item',
            url:'',
        },
        {
            component: Three,
            className: 'item',
            url:'',
        },
        {
            component: Four,
            className: 'itemRight',
            url:'',
        },
        {
            component: FiveChart,
            className: 'itemRight',
            url:'',
        },
        {
            component: Six,
            className: 'itemRight',
            url:'',
        },
        {
            component: Seven,
            className: 'item',
            url:'',
        },
        {
            component: Eight,
            className: 'item',
            url:'',
        },
        {
            component: Nine,
            className: 'item',
            url:'',
        },
        {
            component: Ten,
            className: 'itemRight',
            url:'',
        },
        {
            component: Eleven,
            className: 'itemRight',
            url:'',
        },
        {
            component: Twelve,
            className: 'itemRight',
            url:'',
        }
    ]
}