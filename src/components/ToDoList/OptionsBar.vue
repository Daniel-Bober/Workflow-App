<template>
  <div class="container-body">
    <div :class="backButtonClassName" @click="backButtonClicked"><img src="../../assets/icons/backArrow.svg"
                                                                      alt="backButton" draggable="false">
    </div>
    <div class="void-div"></div>
    <div :class="editIconClassNameToggle" @click="editButton"><img src="../../assets/icons/edit.svg" alt="edit-icon"
                                                                   draggable="false"></div>
  </div>
</template>

<script>
export default {
  props: {
    isInProjectPage: Boolean,
    isBackButtonActive: Boolean
  },

  computed: {
    editIconClassNameToggle() {
      return this.isInProjectPage ? 'edit-icon' : 'edit-icon hide'
    },
    backButtonClassName() {
      return this.isBackButtonActive ? 'backButton active' : 'backButton';
    }
  },

  methods: {
    plusButton() {
      this.$emit('plus-button-click');
    },
    editButton() {
      this.$emit('edit-button-click');
    },
    backButtonClicked() {
      this.$emit('back-button');
    }
  }
};
</script>

<style scoped>
.container-body {
  width: 90%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}

.edit-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: 200ms;
}

.edit-icon {
  z-index: 2;
}

.edit-icon.hide {
  transition: none;
  pointer-events: none;
  opacity: 0;
}

.edit-icon:hover {
  transform: scale(1.17);
}

.edit-icon:active {
  transform: scale(1.05);
  transition: 100ms;
}

.back-button {
  width: 28px;
  height: 28px;
  cursor: pointer;
  position: absolute;
  left: 30px;
  opacity: 0;
  pointer-events: none;
}

.back-button.active {
  opacity: 1;
  pointer-events: auto;
}

.back-button img {
  transition: 200ms;
}

.back-button:hover img {
  transform: scale(1.02) translateX(-5px);
}

.back-button:active img {
  transform: scale(1.035) translateX(-8px);
  transition: 100ms;
}

.void-div {
  width: 30px;
  height: 30px;
}
</style>