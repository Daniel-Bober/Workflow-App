<template>
  <div class="day-card-body" @click="cardClicked">
    <h1>{{ dayNr }}</h1>

    <div class="list-wrapper">
      <ul>
        <div class="task" v-for="(task, index) in doneTasks" :key="task">
          <li>{{ task }}</li>
          <div class="delete-icon" @click="deleteTask(index)"><img src="../../assets/icons/delete.svg" alt="delete-icon"></div>
        </div>
      </ul>
    </div>


    <span class="textarea" role="textbox" contenteditable spellcheck="false" @keydown.enter="addNewTask"></span>

  </div>
</template>

<script>
export default {
  props: {
    dayNr: Number,
    doneTasks: Array,
  },
  setup(props, context) {

    function addNewTask(e) {
      context.emit('add-done-task', props.dayNr, e.target.innerText);

      e.target.innerHTML = null;
      e.preventDefault();
    }

    function deleteTask(index) {
      context.emit("delete-done-task", props.dayNr, index)
    }

    return {
      addNewTask,
      deleteTask

    }
  }
}
</script>

<style scoped>
.day-card-body {
  min-width: 250px;
  max-width: 500px;
  min-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(200, 200, 200, 0.1);;
  break-inside: avoid;
  margin-bottom: 20px;
}

h1 {
  font-size: 28px;
  margin: 15px 0 0;
  webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

li {
  margin-right: 40px;
  margin-bottom: 10px;
}

.textarea {
  font-size: 17px;
  text-align: center;
  outline: none;
  min-width: 125px;
  max-width: 70%;
  min-height: 35px;
  margin: 10px 0;
  border-bottom: 1px solid var(--offWhite);
  opacity: 0;
  transition: 150ms;
}

.day-card-body:hover .textarea {
  opacity: 1;
}


.list-wrapper {
  width: 100%;
}

.task {
  width: 100%;
  position: relative;
  border-bottom: 2px solid transparent;
  transition: 100ms;
}

.task:hover {
  border-bottom: 2px solid rgba(100, 100, 100, 0.1);
}

.task:hover .delete-icon {
  opacity: 1;
}

.delete-icon {
  width: 15px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
  opacity: 0;
}

.delete-icon:hover img {
  transform: scale(1.15);
  transition: 150ms;
}

.delete-icon:active img {
  transform: scale(1.05);
  transition: 100ms;
}

div::-webkit-scrollbar {
  display: none;
}

</style>