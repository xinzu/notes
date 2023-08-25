/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-08-07 14:17:53
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-08-07 14:17:53
 */
import {applyMiddleware, combineReducers, legacy_createStore  as createStore} from 'redux';
import voteReducer from './vote/reducer';
import personReducer from './person/reducer';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';

const reducer = combineReducers({
    vote: voteReducer,
    person: personReducer
})

export default createStore(reducer, applyMiddleware(reduxLogger, reduxThunk, reduxPromise))