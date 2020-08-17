import One from './widget/One.js';
import Two from './widget/Two';
import Seven from './widget/Seven';
import Three from './widget/Three';
import Fives from './widget/Fives/Fives.js'
import SixChart from './widget/sixChart/SixChart';
import Eight from './widget/Eight';
import Four from './widget/Four/Four.js'
import FourChart from './widget/Four/FourChart/FourChart.js'
import Eleven from './widget/Eleven';
import Twelve from './widget/Twelve.js';
import Nine from './widget/Nine';
import AffairsStyle from './Affairs.module.scss';
import OneMap from './mapController';

export default {
    style: AffairsStyle,
    OneMap: OneMap,
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
            component: Fives,
            className: 'itemRight',
            url:'',
        },
        {
            component: SixChart,
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
            component: FourChart,
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