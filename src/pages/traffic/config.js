import TrafficStyle from './Traffic.module.scss'
import One from './widget/one/One';
import Two from './widget/Two/Two'
import Three from './widget/Three';
import Four from './widget/Four/Four'
import Five from './widget/Five';
import Six from './widget/Six';
import OneMap from './mapController';

export default {
    style: TrafficStyle,
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