import { proxy } from 'valtio'
import { countSate } from './count'
import { watch } from 'valtio/utils';

export const testState = proxy({
    testCount: countSate.count
})

// 监听 counterStore 的更新 
watch((get) => {
    get(countSate);
    testState.testCount = countSate.count
});