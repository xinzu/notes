const user = {
    state: {
        counter: 3123,
        users: [{
            id: '1',
            name: 'name1'
        }, {
            id: '2',
            name: 'name2'
        }],
    },
    getters: {
        doubleCount(state) {
            return state.counter * 2
        },
        doubleCountPlusOne(state, getters) {
            return getters.doubleCount + 1;
        },
        getUserById: (state) => (userId) => state.users.find((user) => user.id === userId).name,
    },
    mutations: {
        increment(state) {
            console.log("======user increment");
            state.counter += 1;
        }
    },
    actions: {
        increment(context) {
            context.commit('increment')
        }
    },
};

export default user;