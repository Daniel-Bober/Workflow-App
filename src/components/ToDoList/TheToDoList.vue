<template>
  <div class="todo-list-area">
    <ToDoHeader
        :selected-name="todoHeader"
    ></ToDoHeader>

    <MainList>
      <div v-if="selectedComponents === 'Projects'">
        <ElementsContainer
            v-for="el in mainListElements"
            :id="el.id"
            :key="el.id"
            :el-inside="el.insideElements.length"
            :el-name="el.name"
            :is-edit-mode-on="todoEditMode"
            @change-container-name="editContainerName"
            @delete-mode-on="todoOnDeleteMode"
            @delete-mode-off="todoOffDeleteMode"
            @edit-mode-off-enter="containerEditToggle"
            @tasks-container-clicked="todoOpenTasksList"
            @delete-project="deleteProject"
        ></ElementsContainer>

        <ToDoDummy
            @plus-button-click="addButton"
        ></ToDoDummy>
      </div>

      <div v-if="selectedComponents === 'Tasks'">
        <TaskElement
            v-for="task in selectedTasksList"
            :id="task.id"
            :key="task.id"
            :task-name="task.name"
            @change-task-name="editTaskName"
            @delete-mode-on="todoOnDeleteMode"
            @delete-mode-off="todoOffDeleteMode"
            @delete-task="deleteTask"
            @task-completed="sendTaskToWaitingList"
        ></TaskElement>

        <ToDoDummy
            @plus-button-click="addButton"
        ></ToDoDummy>
      </div>


    </MainList>

    <OptionsBar
        :is-in-project-page="isInProjectPage"
        :is-back-button-active="isBackButtonActive"
        @edit-button-click="containerEditToggle"
        @back-button="backToProjectsList"
    ></OptionsBar>
    <div :class="todoOffEditModeClassName" @click="todoOffEditMode"></div>
  </div>
</template>

<script>

import ToDoHeader from "@/components/ToDoList/ToDoHeader";
import MainList from "@/components/ToDoList/TheMainList";
import ElementsContainer from "@/components/ToDoList/TasksContainer";
import OptionsBar from "@/components/ToDoList/OptionsBar";
import TaskElement from "@/components/ToDoList/TaskElement";
import ToDoDummy from "@/components/ToDoList/ToDoDummy";


export default {
  components: {
    ToDoHeader, MainList, ElementsContainer, OptionsBar, TaskElement, ToDoDummy
  },

  data() {
    return {
      // mainListElements: JSON.parse(localStorage.getItem('ToDoListData')) ? JSON.parse(localStorage.getItem('ToDoListData')) : [],
      mainListElements: JSON.parse(localStorage.getItem('ToDoListData')) ?? [],
      todoHeader: 'To Do',
      selectedComponents: 'Projects',
      selectedTasksList: [],
      todoDeleteMode: false,
      todoEditMode: false,
      isBackButtonActive: false,
      actualOpenTaskMenu: null,
      lastSelectedElement: null
    }
  },

  computed: {
    todoOffEditModeClassName() {
      return this.todoDeleteMode ? 'todo-off-delete-mode-btn active' : 'todo-off-delete-mode-btn';
    },

    isInProjectPage() {
      return this.selectedComponents === 'Projects';
    }
  },

  methods: {
    addButton() {
      if (this.selectedComponents === 'Projects') {
        const newID = Date.now();
        const newElement = {
          id: newID,
          name: '',
          insideElements: []
        };
        this.mainListElements.push(newElement)
      } else if (this.selectedComponents === 'Tasks') {
        const newID = Date.now();
        const newTask = {
          id: newID,
          name: ''
        };
        this.selectedTasksList.push(newTask);
      }
      this.saveToDoListData()
    },

    containerEditToggle() {
      this.todoEditMode = !this.todoEditMode;
      if (!this.todoEditMode && this.todoDeleteMode) {
        this.todoOffDeleteMode()
      }
    },

    editContainerName(id, newName) {
      this.findElement(this.mainListElements, id).name = newName;
      this.saveToDoListData();
    },

    editTaskName(id, newName) {
      this.findElement(this.lastSelectedElement.insideElements, id).name = newName;

      this.saveToDoListData();
    },

    todoOnDeleteMode() {
      this.todoDeleteMode = true;
    },
    todoOffDeleteMode() {
      this.todoDeleteMode = false;
    },

    deleteProject(id) {
      const projectIndex = this.mainListElements.findIndex(el => el.id === id);
      this.mainListElements.splice(projectIndex, 1)
      this.todoOffDeleteMode()
      this.saveToDoListData()
    },

    deleteTask(id) {
      const taskIndex = this.selectedTasksList.findIndex(el => el.id === id);
      this.selectedTasksList.splice(taskIndex, 1)
      this.todoOffDeleteMode()
      this.saveToDoListData()
    },
    sendTaskToWaitingList(id) {
      const taskIndex = this.selectedTasksList.findIndex(el => el.id === id);
      const doneTask = this.selectedTasksList[taskIndex];

      const taskWithoutSpaces = doneTask.name.replace(/\s/g, '');
      if (taskWithoutSpaces !== '') {
        this.$store.dispatch('addWaitingTask', doneTask.name);
        this.$store.dispatch('saveWaitingTasksListData');
      }
    },

    todoOpenTasksList(id) {
      if (!this.todoDeleteMode) {
        this.lastSelectedElement = this.findElement(this.mainListElements, id);
        this.selectedComponents = 'Tasks';
        this.selectedTasksList = this.lastSelectedElement.insideElements;
        this.todoHeader = this.lastSelectedElement.name
        this.isBackButtonActive = true;
      }
    },
    backToProjectsList() {
      this.selectedComponents = 'Projects';
      this.todoHeader = 'To Do';
      this.isBackButtonActive = false;
      if (this.todoDeleteMode) {
        this.todoOffDeleteMode();
      }
    },


    saveToDoListData() {
      localStorage.setItem('ToDoListData', JSON.stringify(this.mainListElements))
    },
    findElement(array, id) {
      return array.find(el => el.id === id);
    }
  }
}
</script>

<style scoped>
.todo-list-area {
  width: 100%;
  max-width: 450px;
  height: 95vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-off-delete-mode-btn {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
}

.todo-off-delete-mode-btn.active {
  pointer-events: auto;
}
</style>