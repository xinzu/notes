const web = {
    namespaced: true,
    state: {
        counter: 0,
        users: [],
    },
    getters: {
        webDoubleCounter: (state) => {
            return state.counter * 2;
        }
    },
    mutations: {
        increment(state) {
            console.log("======web increment");
            state.counter += 1;
        }
    },
    actions: {
        increment(context) {
            context.commit('increment')
        }
    },
};

export default web;