import { useSelector, useDispatch } from 'react-redux';
import {increment, decrement, asyncIncrement} from '../vote';

export default function Child() {
    const voteState = useSelector((state: any) => state.vote);
    const dispatch = useDispatch();
    return (
        <>
            <div>{voteState.count}</div>
            <button onClick={() => dispatch(increment(2))}>增加2</button>
            <button onClick={() => dispatch(asyncIncrement(1))}>异步增加1</button>
            <button onClick={() => dispatch(decrement())}>减少</button>
        </>
    )
}
