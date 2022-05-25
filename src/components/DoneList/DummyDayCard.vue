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
      context.emit('month-add-new-day');
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
  max-width: 500px;
  min-height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed rgb(100, 100, 100);
  break-inside: avoid;
  margin-bottom: 20px;
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