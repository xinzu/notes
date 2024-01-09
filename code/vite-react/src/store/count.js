import { proxy } from 'valtio';
import { proxyWithHistory } from 'valtio/utils'

export const countSate = proxy({
    count: 0,
});

export const countActions = {
    increase: (addNumber) => {
        countSate.count += Number(addNumber);
    },
    decrease: (deNumber) => {
        countSate.count -= Number(deNumber);
    }
}
export const counerStore = proxyWithHistory({ count: 0, increase: () => { counerStore.value.count++ }, decrease: () => { counerStore.value.count-- } })