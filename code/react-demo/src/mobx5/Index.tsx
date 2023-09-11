import MobxStore from "./store"
import { Provider } from 'mobx-react';
import Child from './Child';

const store = new MobxStore();

function MobxTest() {
    return (
        <Provider store={store}>
            <p>用这个demo需要安装mobx5和mobx-react6</p>
            <Child />
        </Provider>
    )
}
export default MobxTest;