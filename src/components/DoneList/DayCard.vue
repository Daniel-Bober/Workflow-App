<template>
  <div class="day-card-body" @click="cardClicked">
    <h1>{{ dayNr }}</h1>

    <div class="list-wrapper">
      <ul>
        <li v-for="task in doneTasks" :key="task">{{ task }}</li>
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
    isDaysListEditModeOn: Boolean
  },
  setup(props, context) {

    function addNewTask(e) {
      context.emit('day-add-task', props.dayNr, e.target.innerHTML);

      e.target.innerHTML = null;
      e.preventDefault();
    }


    return {
      addNewTask

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
  margin-right: 20px;
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

div::-webkit-scrollbar {
  display: none;
}

</style>