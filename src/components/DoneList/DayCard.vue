<template>
  <div :class="dayCardClassName" @click="cardClicked">
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

    <img alt="bin-icon" class="bin-icon" src="../../assets/icons/bin.svg" @click="openDeleteCheck">

    <div :class="deleteCheckClassName">
      <h2>Delete this day?</h2>
      <div class="check-icons">
        <img alt="accept-icon" src="../../assets/icons/done.svg" @click="deleteDay">
        <img alt="cancel-icon" src="../../assets/icons/delete.svg" @click="closeDeleteCheck">
      </div>
    </div>

  </div>
</template>

<script>
import {computed, ref} from "vue";

export default {
  props: {
    dayNr: Number,
    daysArrayLength: Number,
    doneTasks: Array,
  },
  setup(props, context) {

    const isLast = computed(function () {
      return props.daysArrayLength - props.dayNr === 0;
    });

    const dayCardClassName = computed(function () {
      return isLast.value ? 'day-card-body last' : 'day-card-body'
    })


    function deleteDay() {
      context.emit('delete-day', props.dayNr)
    }

    function addNewTask(e) {
      context.emit('add-done-task', props.dayNr, e.target.innerText);

      e.target.innerHTML = null;
      e.preventDefault();
    }

    function deleteTask(index) {
      context.emit('delete-done-task', props.dayNr, index)
    }


    const isDeleteModeOn = ref(false);

    const deleteCheckClassName = computed(function () {
      return isDeleteModeOn.value ? 'delete-check active' : 'delete-check';
    });


    function openDeleteCheck() {
      isDeleteModeOn.value = true;
    }

    function closeDeleteCheck() {
      isDeleteModeOn.value = false;
    }

    return {
      dayCardClassName,

      deleteDay,

      addNewTask,
      deleteTask,

      deleteCheckClassName,
      openDeleteCheck,
      closeDeleteCheck

    }
  }
}
</script>

<style scoped>
.day-card-body {
  min-width: 250px;
  max-width: 500px;
  min-height: 240px;
  position: relative;
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

.bin-icon {
  width: 15px;
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: 150ms;

}

.bin-icon:hover {
  transform: scale(1.12);
}

.bin-icon:active {
  transform: scale(1.05);
  transition: 100ms;
}

.day-card-body.last:hover .bin-icon {
  opacity: 1;
  pointer-events: auto;
}

.delete-check {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);

  opacity: 0;
  pointer-events: none;
}

.delete-check.active {
  opacity: 1;
  pointer-events: auto;
}

.check-icons {
  width: 85px;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
}

.check-icons img {
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: 150ms;
}

.check-icons img:hover {
  transform: scale(1.15);
}

.check-icons img:active {
  transform: scale(1.05);
}

div::-webkit-scrollbar {
  display: none;
}

</style>