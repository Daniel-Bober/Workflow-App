export default {
    addWaitingTask(state, payload) {
        state.waitingTasksList.push(payload);
    },

    removeWaitingTasks(state, payload) {
        payload.forEach(el => {
            state.waitingTasksList.splice(el, 1)
        });
    },

    saveWaitingTasksListData(state) {
        localStorage.setItem('waitingTasksList', JSON.stringify(state.waitingTasksList));
    }
};