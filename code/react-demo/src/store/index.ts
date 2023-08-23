/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-08-07 14:17:53
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-08-07 14:17:53
 */
import {combineReducers, createStore} from '@/reduxCore';
import voteReducer from './vote/reducer';
import personReducer from './person/reducer';

const reducer = combineReducers({
    vote: voteReducer,
    person: personReducer
})
console.log(reducer)

export default createStore(reducer)