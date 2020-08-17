import SocietyStyle from './Society.module.scss';
import One from './widget/One/One';
import Two from './widget/Two/Two.js';
import Three from './widget/Three/Three.js';
import Four from './widget/four/Four';
import Five from './widget/Five';
import Six from './widget/Six.js';
import Seven from './widget/Seven.js';
import Eight from './widget/Eight/Eight';
import Nine from './widget/nine/Nine';
import OneMap from './mapController';

export default {
    style: SocietyStyle,
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
        },
        {
            component: Seven,
            className: 'itemRight',
            url:'',
        },
        {
            component: Eight,
            className: 'itemRight',
            url:'',
        },
        {
            component: Nine,
            className: 'itemRight',
            url:'',
        }
    ]
}