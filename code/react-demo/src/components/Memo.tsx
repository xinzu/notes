/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-08-03 15:42:32
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-08-03 15:42:32
 */

import { memo, useState } from "react";

// 每次点击按钮都会执行渲染
const Child = () => {
    console.log("=====RENDER Child");
    const [count, setCount] = useState(0);
    const handleClick = () => {
        setCount(count+1);
    }
    return (
        <button onClick={handleClick}>Child{count}</button>
    )
}

// 只有msg变化的时候才会执行渲染
const MemoChild = memo((props: any) => {
    console.log("=====RENDER MemoChild");
    return (
        <div>MemoChild{props.msg}</div>
    )
});

export default function Memo() {
    console.log("=====RENDER Memo");
    const [count, setCount] = useState(0);
    const [msg, setMsg] = useState('hello');
    const handleClick = (type: string) => {
        type === 'count' && setCount(count+1);
        type === 'msg' && setMsg(msg + 'hh');
    }
  return (
    <>
        <button onClick={() => handleClick('count')}>{count}</button>
        <button onClick={() => handleClick('msg')}>{msg}</button>
        <Child />
        <MemoChild msg={msg} />
    </>
  )
}