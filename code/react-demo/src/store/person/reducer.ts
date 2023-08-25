/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-08-07 14:19:51
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-08-07 14:19:51
 */
const personReducer = (state= {info: null}, action: {type: string, [key: string]: any}) => {
    switch (action.type) {
        case 'login':
            return {
                info: action.info
            };
        default:
            return state;
    }
}

export default personReducer;