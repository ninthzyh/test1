import EmergencyStyle from './Emergency.module.scss';
import One from './widget/One/One';
import Two from "./widget/Two";
import Three from './widget/Three/Three.js';
import Four from './widget/Four';
import Five from "./widget/Five";
import Six from "./widget/six/Six";
import OneMap from './mapController';

export default {
    style: EmergencyStyle,
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
            component: Five,
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