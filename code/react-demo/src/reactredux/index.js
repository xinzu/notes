import React, { useContext, useState, useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';

// 定义一个全局上下文
const Context = React.createContext({});

// Provider组件
export function Provider(props) {
    const { store, children } = props;
    return (<Context.Provider value={{ store }}>
        {children}
    </Context.Provider>)
}

// connect()(Component)
export function connect(mapStateToPros, mapDispatchToProps) {
    if (!mapStateToPros) mapStateToPros = () => ({});
    if (!mapDispatchToProps) mapDispatchToProps = (dispatch) => ({ dispatch });

    // Component 最终要渲染的组件
    return function currying(Component) {
        // HOC connect()(Component)执行后返回的组件
        return function HOC(props) {
            // 获取上下文中的store
            const { store } = useContext(Context);
            const { getState, dispatch, subscribe } = store;

            // 组件更新
            const [, forceUpdate] = useState(0);
            useEffect(() => {
                const unsubscribe = subscribe(() => {
                    forceUpdate(+new Date());
                });
                return unsubscribe;
            }, [])

            const state = getState();
            // useMomo做优化，只有state变化时更新stateProps
            const stateProps = useMemo(() => mapStateToPros(state), [state]);

            const dispatchProps =
                typeof mapDispatchToProps === 'function' ?
                    mapDispatchToProps(dispatch) :
                    bindActionCreators(mapDispatchToProps, dispatch);
            /*
                bindActionCreators方法将传入的对象 {add, login} 
                转为
                {
                    add: (count) => dispatch(add(count)),
                    login: (info) => dispatch(login(info))
                }
            */

            return <Component
                {...props}
                {...stateProps}
                {...dispatchProps}
            ></Component >
        }
    }
}