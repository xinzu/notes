/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-07-24 18:30:12
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-07-24 18:30:12
 */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

export default function Test(props: any) {

    const [state, setState] = useState({count: 0})

    useEffect(() => {
        console.log("=========useEffect", state.count)
    })

    const handleClick = () => {
        // flushSync(() => {
        //     setState({
        //         count: 2
        //     });
        // });
        // console.log("=========flushAsync", state.count)
        // setState({
        //     count: 3
        // });
        // setState({
        //     count: 4
        // });

        for (let i = 0; i < 20; i++) {
            setState({count: state.count++});
        }
    }
    return (
        <>
            {props.titleWrap}
            <div onClick={handleClick}>Component Test: {state.count}</div>
            {props.content}
        </>
    )
}

Test.defaultProps = {
    title: 'msg'
}

Test.propTypes = {
    title: PropTypes.string.isRequired,
    titleWrap: PropTypes.node,
    content: PropTypes.node,
    children: PropTypes.node
}