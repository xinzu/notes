import {countActions} from '../store';
import { useRef } from 'react';

export default function Counter() {
    const inputRef = useRef();
    return (
        <>
            <input type="text" ref={ inputRef } />
            <button className="increase" onClick={() => {countActions.increase(inputRef.current.value)}}>+</button>
            <button className="decrease" onClick={() => {countActions.decrease(inputRef.current.value)}}>-</button>
        </>
    )
}
