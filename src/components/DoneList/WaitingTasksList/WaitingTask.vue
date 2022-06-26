<template>
  <div :class=taskClassName @click="selectToggle">
    <h1>{{ taskName }}</h1>
  </div>
</template>

<script>
import {ref, computed} from "vue";

export default {
  props: {
    taskName: String,
    index: Number,
  },

  setup(props, context) {

    const isSelected = ref(false);

    const taskClassName = computed(function () {
      return isSelected.value ? "waiting-task-body selected" : "waiting-task-body"
    })

    function selectToggle() {
      isSelected.value = !isSelected.value
      context.emit('task-clicked', props.index, isSelected.value)

    }

    return {
      taskClassName,
      selectToggle
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
  text-align: center;
  user-select: none;
  color: rgb(130, 130, 130);
  margin: 0;
  pointer-events: none;
}

.waiting-task-body {
  margin: 5px 0;
  cursor: pointer;
}

.waiting-task-body.selected h1 {
  color: var(--offWhite);
}


</style>