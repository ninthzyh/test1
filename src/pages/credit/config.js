import FiveChart from './widget/fiveChart/FiveChart';
import One from './widget/One/One.js'
import Six from "./widget/Six";
import Four from './widget/four/FourAnimate'
import Three from './widget/Three/Three.js'
import RedAndBlockList from './widget/redAndBlockList/RedAndBlockList.js';
import CreditStyle from './Credit.module.scss';
import OneMap from './mapController';

export default {
    style: CreditStyle,
    OneMap: OneMap,
    showVisitor: true,
    children: [
        {
            component: One,
            className: 'item',
            url:'',
        },
        {
            component: RedAndBlockList,
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
        }
    ]
}