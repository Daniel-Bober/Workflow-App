<template>
  <div class="body" @click="addDayCard">
    <div class="plus-icon"><img alt="plus-icon" draggable="false" src="../../assets/icons/plus.svg">
    </div>
  </div>
</template>

<script>
export default {
  setup(_, context) {
    function addDayCard() {
      context.emit('month-add-new-day');
    }

    return {
      addDayCard
    }
  }
}
</script>

<style scoped>
.body {
  min-width: 250px;
  max-width: 500px;
  min-height: 240px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed rgb(100, 100, 100);
  break-inside: avoid;
  cursor: pointer;
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