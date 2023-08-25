import {createSlice} from '@reduxjs/toolkit';

const vote = createSlice({
     // 命名空间，在调用action的时候会默认的设置为action的前缀
    name: 'vote',
    // 初始值
    initialState: {
        count: 0,
    },
    // 这里的属性会自动的导出为actions，在组件中可以直接通过dispatch进行触发
    reducers: {
        // 传递的数据都存在action.payload中
        increment(state, action) {
            const { payload } = action;
            state.count = state.count + payload; // 内置了immutable
        },
        decrement(state) {
            state.count -= 1;
        },
    },
})

// 导出actions
export const { increment, decrement } = vote.actions;

// 处理异步请求
export const asyncIncrement: any = (payload: any) => (dispatch: any) => {
    setTimeout(() => {
        dispatch(increment(payload));
    }, 2000);
};

export default vote.reducer; // 导出reducer，在创建store时使用到