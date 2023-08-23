/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-07-24 18:30:12
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-07-24 18:30:12
 */
import PropTypes from 'prop-types';
// import { useState, useEffect, useReducer, useRef, forwardRef } from 'react';
import { useState } from 'react';
// import { flushSync } from 'react-dom';

// const reducer = (state: any, action: any) =>{
//     return {
//         ...state,
//         ...action,
//     }
// }
export default function Test(props: any) {
    console.log("==========render========")
    let [count, setCount] = useState(0)
    // const [state, setState] = useReducer(reducer, {count: 0})

    // useEffect(() => {
    //     console.log(fancyInputRef)
    // })

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
            setCount(count+1);
        }

        // for (let i = 0; i < 20; i++) {
        //     setCount(count => count+1);
        // }
        
        // setState({
        //     count: 2
        // })
    }
    return (
        <>
            {props.titleWrap}
            <div onClick={handleClick} className='list'>Component Test count: {count}</div>
            {/* <div onClick={handleClick}>Component Test state.count:{state.count}</div> */}
            {props.content}
        </>
    )
    // const FancyInput = forwardRef((props: any, ref: any) => (
    //     <div ref={ref}>{props.children}</div>
    // ));
    // const fancyInputRef = useRef();

    // return (
    //     <div>
    //         <FancyInput ref={fancyInputRef}>hhtest</FancyInput>
    //     </div>
    // )
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