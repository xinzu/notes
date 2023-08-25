/*
 * @Description  : redux-toolkit 创建store
 * @Author       : yanhuan
 * @Date         : 2023-08-25 17:02:49
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-08-25 17:02:49
 */
import {configureStore} from '@reduxjs/toolkit';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import vote from './vote';

const store = configureStore({
    reducer: {
        vote
    },
    // 使用中间件，如果不指定任何中间件，默认集成redux-thunk
    // middleware: [],
    // 但是一旦设置，会整体替换默认值
    middleware: [reduxThunk, reduxLogger]
})

export default store;