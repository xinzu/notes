/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-08-24 16:35:24
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-08-24 16:35:24
 */
import ThemeContext from '@/ThemeContext'
import { useContext, useEffect, useState } from 'react'
import { add } from '@/store/vote/action';
import { prociseAction } from '@/store/person/action';

export default function Context() {
    /*return (
        <ThemeContext.Consumer>
            {value => (
                <div>{value.name}</div>
            )}
        </ThemeContext.Consumer>
    )*/
    const store = useContext(ThemeContext);
    const {vote: {count}, person: {info}} = store.getState();
    
    const [, forceUpdate] = useState(0);

    useEffect(() => {
        const unsubscribe = store.subscribe(() =>   {
            forceUpdate(+new Date());
        });
        return unsubscribe();
    }, [])
  	return (
        <>
            <div>=================redux============</div>
            <div>{count}</div>
            <div>{info ? info.name : 'info为null'}</div>
            <div onClick={() => {
                store.dispatch(add());
                store.dispatch(prociseAction({name: 'hh-hh'}));
            }}>change store state</div>
        </>
  	);
}
