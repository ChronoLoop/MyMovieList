import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTop = (props) => {
    const { children } = props;

    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [location]);

    return <main>{children}</main>;
};

export default ScrollTop;
