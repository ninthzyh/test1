import React from 'react';
import { Icon } from 'antd';

const Loading = ({ pastDelay, timedOut, error }) => {
    if (pastDelay) {
        return <div><Icon type="loading" /></div>;
    } else if (timedOut) {
        return <div>Taking a long time...</div>;
    } else if (error) {
        return <div>Error!</div>;
    }
    return null;
};
export default Loading;