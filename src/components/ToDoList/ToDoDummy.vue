<template>
  <div class="body" @click="addToDoListProject">
    <div class="plus-icon"><img src="../../assets/icons/plus.svg" alt="plus-icon" draggable="false">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addToDoListProject() {
      this.$emit('plus-button-click');
    }
  }
}
</script>

<style scoped>
.body {
  width: 350px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  cursor: pointer;
  z-index: 1;
  border: 2px dashed rgb(100, 100, 100);
}

.plus-icon {
  width: 25px;
  height: 25px;
  transition: 150ms;
}

.edit-icon {
  z-index: 2;
}

.body:hover .plus-icon {
  transform: scale(1.17);
}

.body:active .plus-icon {
  transform: scale(1.05);
  transition: 100ms;
}
</style>