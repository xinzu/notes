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
            return {
                count: state.count + 1
            };
        default:
            return state;
    }
}

export default voteReducer;