const web = {
    namespaced: true,
    state: {
        counter: 0,
        users: [],
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