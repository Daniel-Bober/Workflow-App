<template>
  <div class="body">
    <div class="plus-icon" @click="plusButton"><img src="../../assets/icons/plus.svg" alt="plus-icon" draggable="false">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    plusButton() {
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
  z-index: 1;
  border: 2px dashed rgb(100, 100, 100);
}

.plus-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: 150ms;
}

.edit-icon {
  z-index: 2;
}

.plus-icon:hover {
  transform: scale(1.17);
}

.plus-icon:active {
  transform: scale(1.05);
  transition: 100ms;
}
</style>