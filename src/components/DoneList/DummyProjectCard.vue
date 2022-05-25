<template>
  <div class="body">
    <div class="plus-icon" @click="plusButton"><img alt="plus-icon" draggable="false" src="../../assets/icons/plus.svg">
    </div>
  </div>
</template>

<script>
export default {
  setup(_, context) {
    function plusButton() {
      context.emit('add-new-project');
    }

    return {
      plusButton
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
  transition: 150ms;
  border: 2px dashed rgb(100, 100, 100);
}

.plus-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: 200ms;
}

.plus-icon:hover {
  transform: scale(1.17);
}

.plus-icon:active {
  transform: scale(1.05);
  transition: 100ms;
}
</style>