/*
 * @Description  : react-redux-demo
 * @Author       : yanhuan
 * @Date         : 2023-08-24 17:28:44
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-08-24 17:28:44
 */
import React from "react";

import { Provider } from "react-redux"
import store from '@/store';
import Child from './Child'

export default function ReactRedux() {
  return (
    <Provider store={store}>
        <Child />
    </Provider>
  )
}
