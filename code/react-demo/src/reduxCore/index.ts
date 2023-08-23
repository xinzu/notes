/*
 * @Description  : Redux部分源码
 * @Author       : yanhuan
 * @Date         : 2023-08-04 10:08:46
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-08-04 10:08:46
 */
// isPlainObject 是一个 jQuery 中的方法，用于判断一个对象是否是纯粹的对象，即该对象是通过 {} 或 new Object() 创建的，而非通过构造函数或其他方式创建的
export const createStore = (reducer: any) => {
    if (typeof reducer !== 'function') throw new TypeError('createStore param [reducer] must be a function');
    let state: any = undefined;
    const listeners: any[] = [];

    const getStatus = () => state;
    const subscribe = (listener: any) => {
        if (typeof listener !== 'function') throw new TypeError('Redux function [dispatch] param must be a function');
        if (!listeners.includes(listener)) listeners.push(listener);

        return function unsubscribe() {
            const index = listeners.push(listener);
            listeners.splice(index, 1);
        }
    };
    const dispatch = (action: any) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());

        return action;
    }

    dispatch({type: Symbol()});

    return {
        getStatus,
        dispatch,
        subscribe
    };
}

export const combineReducers: (reducers: {[key: string]: any}) => any = (reducers) => {
    const reducerKeys = Object.keys(reducers)

    // dispatch时调用的方法
    return function combine(state: {[key: string]: any} = {}, action: any) {
        let nextState: any = {};
        // 去执行每个reducer中的逻辑
        reducerKeys.forEach(key =>{
            const reducer = reducers[key];
            if (typeof reducer === 'function') nextState[key] = reducer(state[key], action);
        });
        return nextState;
    }
}