<template>
  <div class="body">
    <div class="void-div"></div>
    <div class="plus-icon" @click="plusButton"><img alt="plus-icon" draggable="false" src="../../assets/icons/plus.svg">
    </div>
    <div :class="editIconClassNameToggle" @click="editButton"><img alt="edit-icon" draggable="false"
                                                                   src="../../assets/icons/edit.svg"></div>
  </div>
</template>

<script>
import {computed} from "vue";

export default {
  props: {
    isInProjectPage: Boolean
  },

  setup() {
    const editIconClassNameToggle = computed(function () {
      // return this.isInProjectPage ? 'edit-icon' : 'edit-icon hide'
      return 'edit-icon'
    })

    function plusButton() {
      this.$emit('done-plus-button-click');
    }

    function editButton() {
      this.$emit('done-edit-button-click');
    }

    return {
      editIconClassNameToggle,
      plusButton,
      editButton
    }
  }
};
</script>

<style scoped>
.body {
  width: 120px;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.edit-icon, .plus-icon {
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

.edit-icon:hover, .plus-icon:hover {
  transform: scale(1.17);
}

.edit-icon:active, .plus-icon:active {
  transform: scale(1.05);
  transition: 100ms;
}

.void-div {
  width: 30px;
  height: 30px;
}
</style>