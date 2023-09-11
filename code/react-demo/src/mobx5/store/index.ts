/*
 * @Description  : Mobx store
 * @Author       : yanhuan
 * @Date         : 2023-08-30 15:53:19
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-08-30 15:53:19
 */
import { configure, observable, action, runInAction, flow } from 'mobx';

configure({
    enforceActions: 'observed'
});

const query = (): any => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(100);
        }, 1000);
    })
}

class MobxStore {
    @observable num: number = 0;
    @observable testNum: number = 0;
    @action.bound async increment() {
        let res = 0;
        res = await query();
        runInAction(() => {
            this.num = res;
        })
    }
    @action decrement() {
        this.num -= 1;
    }
    @action flowFunc = flow(function* () {
        // this.num = yield query();
     }).bind(this)
}

export default MobxStore;