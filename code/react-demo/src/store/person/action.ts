/*
 * @Description  : 
 * @Author       : yanhuan
 * @Date         : 2023-08-07 14:21:44
 * @LastEditors  : yanhuan
 * @LastEditTime : 2023-08-07 14:21:44
 */
export const login = (info: any) => ({
    type: 'login',
    info
});


const delay = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null)
        }, 1000);
    });
}

// redux-thunk
export const thunkAction = (info: any) => {
    return async(dispatch: any) => {
        await delay();
        dispatch(login(info))
    }
}

// redux-promise
export const prociseAction = async (info: any) => {
    await delay();
    return login(info);
}