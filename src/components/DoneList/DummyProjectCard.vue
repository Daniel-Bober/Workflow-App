<template>
  <div class="body" @click="addProjectCard">
    <div class="plus-icon"><img alt="plus-icon" draggable="false" src="../../assets/icons/plus.svg">
    </div>
  </div>
</template>

<script>
export default {
  setup(_, context) {
    function addProjectCard() {
      context.emit('add-new-project');
    }

    return {
      addProjectCard
    }
  }
}
</script>

<style scoped>
.body {
  min-width: 300px;
  max-width: 400px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px dashed rgb(100, 100, 100);
}

.plus-icon {
  width: 30px;
  height: 30px;
  transition: 150ms;
}

.body:hover .plus-icon {
  transform: scale(1.17);
}

.body:active .plus-icon {
  transform: scale(1.05);
  transition: 100ms;
}
</style>