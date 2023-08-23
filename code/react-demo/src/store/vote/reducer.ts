/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-08-07 14:17:47
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-08-07 14:17:47
 */

const voteReducer = (state = {count: 0}, action: {type: string, [key: string]: any}) => {
    switch (action.type) {
        case 'add':
            state.count++;
            return state;
        default:
            return state;
    }
}

export default voteReducer;