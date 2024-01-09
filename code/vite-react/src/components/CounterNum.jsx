import { useSnapshot } from 'valtio';
import { derive, watch } from 'valtio/utils';
import { countSate, counerStore } from '../store';
// import { testState } from './../store/test';
import './../store/test'

const oddState = derive({
    doubleCount: (get) => get(countSate).count * 2
})

let test = 0;
watch((get) => {
    get(countSate);
    test = countSate.count + 1;
})

export default function Counter() {
    // const { count } = useSnapshot(countSate, {sync: true});
    // const { testCount } = useSnapshot(testState);
    const {value: {count: count1}, undo, redo} = useSnapshot(counerStore);
    console.log(useSnapshot(counerStore))
    return (
        <>
            {/* <div>count: {count}</div>
            <div>test count from countStore: {testCount}</div>
            <div>subscribe computed doubleCount: {oddState.doubleCount}</div>
            <div>watch test: {test}</div> */}
            {/* <input type="text" value={count} onChange={(e) => countSate.count = e.target.value} /> */}
            <br />
            <div>count1: { count1 }</div>
            <button onClick={() => counerStore.value.count++}>+</button>
            <button onClick={() => undo()}>undo</button>
            <button onClick={() => redo()}>redo</button>
        </>
    )
}
