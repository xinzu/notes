const user = {
    namespaced: true,
    state: {
        counter: 0,
        users: [],
    },
    getters: {
        doubleCount(state) {
            return state.counter * 2
        }
        // doubleCount: (state) => state.counter * 2,
        // doubleCountPlusOne() {
        //     return this.doubleCount + 1;
        // },
        // getUserById: (state) => {
        //     return (userId) => state.users.find((user) => user.id === userId);
        // },
        // getOtherStore: () => {
        //     return pointStore.pointId;
        // },
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