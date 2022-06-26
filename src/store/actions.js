export default {
    addWaitingTask(context, payload) {
        context.commit('addWaitingTask', payload);
    },

    removeWaitingTasks(context, payload) {
        context.commit('removeWaitingTasks', payload);
    },

    saveWaitingTasksListData(context) {
        context.commit('saveWaitingTasksListData');
    }
};