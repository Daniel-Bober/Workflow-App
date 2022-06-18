<template>
  <div :class="classNameToggle">
    <div class="container-head" @click="clickElement">

      <input v-model="nameInput" placeholder="Project Name" spellcheck="false" type="text" @blur="saveInputName"
             @keydown.enter="inputBlur">
      <div><h1>{{ elInside }}</h1></div>
      <div class="bin-icon" @click="openDeleteCheck"><img alt="bin-icon" src="../../assets/icons/bin.svg"></div>

    </div>

    <div class="delete-check">
      <h2>Delete this project?</h2>
      <div class="check-icons">
        <img alt="accept-icon" src="../../assets/icons/done.svg" @click="deleteProject">
        <img alt="cancel-icon" src="../../assets/icons/delete.svg" @click="closeDeleteCheck">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      nameInput: this.elName,
      isDeleteModeOn: false
    };
  },
  props: {
    id: Number,
    elName: String,
    elInside: Number,
    isEditModeOn: Boolean
  },
  computed: {
    classNameToggle() {
      if (!this.isEditModeOn && !this.isDeleteModeOn) {
        return 'container-body';
      } else if (this.isEditModeOn && !this.isDeleteModeOn) {
        return 'container-body edit-mode';
      } else if (this.isEditModeOn && this.isDeleteModeOn) {
        return 'container-body edit-mode delete-mode';
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isDeleteModeOn = false;
        return 'container-body';
      }
    }
  },
  methods: {
    saveInputName() {
      if (this.nameInput !== this.elName) {
        this.$emit('change-container-name', this.id, this.nameInput)
      }
    },
    inputBlur(e) {
      e.target.blur();
      this.$emit('edit-mode-off-enter');
    },
    clickElement() {
      if (!this.isEditModeOn) {
        this.$emit('tasks-container-clicked', this.id)
      }
    },
    openDeleteCheck() {
      this.isDeleteModeOn = true;
      this.$emit('delete-mode-on');
    },
    closeDeleteCheck() {
      this.isDeleteModeOn = false;
      this.$emit('delete-mode-off');
    },
    deleteProject() {
      this.$emit('delete-project', this.id)
    }
  }
}
</script>

<style scoped>
.container-body {
  width: 350px;
  min-height: 75px;
  max-height: 150px;
  margin: 15px 0;
  position: relative;
  z-index: 1;
  transition: 150ms;
  cursor: pointer;
  border: 1px solid transparent;
  background-color: rgba(200, 200, 200, 0.1);
}

.container-body.edit-mode {
  border: 1px solid transparent;
  border-image: linear-gradient(-160deg, var(--mainGrdC2), var(--mainGrdC1));
  border-image-slice: 1;
}

.container-body.edit-mode.delete-mode {
  margin-bottom: 105px;
  z-index: 2;
}

.container-body.edit-mode input {
  pointer-events: auto;
}

.container-body.edit-mode:hover .bin-icon {
  display: block;
}

.container-body:hover:not(.edit-mode) {
  transform: scale(1.05);
}

.container-head {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  transition: 200ms;
}

.container-body.edit-mode.delete-mode .container-head {
  pointer-events: none;
}

h1 {
  font-size: 22px;
  margin-left: 20px;
  pointer-events: none;
}

h2 {
  font-size: 21px;
  pointer-events: none;
  margin-bottom: 25px;
}

.delete-check {
  width: 350px;
  opacity: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -70px;
  transition: 100ms;
}

.check-icons {
  width: 85px;
  display: flex;
  justify-content: space-between;
}

.check-icons img {
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: 150ms;
}

.check-icons img:hover {
  transform: scale(1.15);
}

.check-icons img:active {
  transform: scale(1.05);
}

.container-body.edit-mode.delete-mode .delete-check {
  height: 60px;
  opacity: 1;
  pointer-events: auto;
}

.bin-icon {
  width: 11px;
  height: 11px;
  position: absolute;
  top: 5px;
  left: 15px;
  display: none;
}

input {
  max-width: 200px;
  min-width: 100px;
  font-size: 24px;
  outline: 0;
  border-bottom: 1px solid transparent;
  pointer-events: none;
  transition: 100ms;
}

input:focus {
  border-bottom: 1px solid var(--offWhite);
}
</style>