<template>
  <div :class="listWrapperClassName">
    <div class="list-body">
      <h1>Done tasks</h1>

      <div class="main-list-section" v-if="waitingTasksList.length !== 0">
        <div class="waiting-tasks-list" v-for="(task, index) in waitingTasksList" :key="task">
          <WaitingTask
              :task-name="task"
              :index="index"
              @task-clicked="selectTaskToggle"
          ></WaitingTask>
        </div>
      </div>
      <div class="empty-info" v-else>
        <h2>Empty</h2>
      </div>

      <div class="add-tasks-section">
        <h3>{{ selectedTasks.length }}</h3>
        <button :class="addTasksClassName" @click="addTasks">Add Tasks</button>
      </div>
    </div>

    <div class="close-list-button" @click="closeWaitingTasksList"></div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {ref, computed} from "vue";

import WaitingTask from "@/components/DoneList/WaitingTasksList/WaitingTask";

export default {
  components: {WaitingTask},

  props: {
    isListOpen: Boolean
  },

  setup(props, context) {
    const store = useStore()

    const selectedTasks = ref([])

    const listWrapperClassName = computed(function () {
      return props.isListOpen ? 'list-wrapper active' : 'list-wrapper';
    })

    const waitingTasksList = computed(function () {
      return store.state.waitingTasksList
    });

    function selectTaskToggle(index, isSelected) {
      if (isSelected) {
        selectedTasks.value.push(index);
      } else {
        const taskIndex = selectedTasks.value.findIndex(el => el === index)
        selectedTasks.value.splice(taskIndex, 1)
      }
    }


    const isAddButtonActive = computed(function () {
      return selectedTasks.value.length > 0;
    });

    const addTasksClassName = computed(function () {
      return isAddButtonActive.value ? "add-button active" : "add-button"
    });

    function addTasks() {
      context.emit('add-tasks', selectedTasks.value);
      selectedTasks.value = [];
    }


    function closeWaitingTasksList() {
      context.emit('close-list')
    }

    return {
      selectedTasks,
      listWrapperClassName,

      waitingTasksList,
      selectTaskToggle,

      addTasks,
      addTasksClassName,

      closeWaitingTasksList
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 42px;
  user-select: none;
  color: rgb(70, 70, 70);
  margin-bottom: 0;
}

h2 {
  font-size: 40px;
  user-select: none;
  color: rgb(52, 52, 52);
  margin: 0;
}

h3 {
  font-size: 35px;
  user-select: none;
  color: rgb(120, 120, 120);
  margin: 0;
}

.list-wrapper {
  width: 102%;
  height: 100%;
  position: absolute;
  top: -40px;
  left: 0;
  display: grid;
  place-content: center;
  pointer-events: none;
  opacity: 0;
  transition: 200ms;
  z-index: 2;
}

.list-wrapper.active {
  top: 0;
  pointer-events: auto;
  opacity: 1;
}

.list-body {
  width: 500px;
  height: 800px;
  padding: 25px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--gray);
  box-shadow: 0 0 15px 8px rgb(15, 15, 15);
}

.list-body::-webkit-scrollbar {
  display: none;
}

.main-list-section {
  width: 80%;
  height: 100%;
  margin-bottom: 15px;
  overflow: scroll;
}

.main-list-section::-webkit-scrollbar {
  display: none;
}

.waiting-tasks-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.waiting-tasks-list p {
  font-size: 20px;
  cursor: pointer;
}

.empty-info {
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
}

.add-tasks-section {
  width: 100%;
  min-height: 100px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.add-button {
  outline: none;
  background: none;
  border: none;
  color: rgb(140, 140, 140);
  cursor: pointer;
  font-size: 18px;
  user-select: none;
  transition: 150ms;
  pointer-events: none;
}

.add-button.active {
  color: var(--offWhite);
  pointer-events: auto;
}

.add-button.active:hover {
  transform: scale(1.1);
}

.add-button.active:active {
  transform: scale(1.05);
}

.close-list-button {
  width: 102%;
  height: 100%;
  position: absolute;
}
</style>