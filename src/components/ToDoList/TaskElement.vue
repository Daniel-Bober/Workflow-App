<template>
  <div :class="classNameToggle">
    <div class="task-head">
      <span class="textarea" role="textbox" contenteditable spellcheck="false" @keydown.enter="inputBlur"
            @blur="saveInputName">{{ nameInput }}</span>
      <div class="menu-buttons">
        <div class="done-icon" @click="taskCompleted"><img src="../../assets/icons/done.svg" alt="done-icon"></div>
        <div class="bin-icon" @click="openDeleteCheck"><img src="../../assets/icons/bin.svg" alt="bin-icon"></div>
      </div>
    </div>

    <div class="delete-check">
      <h1>Delete this task?</h1>
      <div class="check-icons">
        <img @click="deleteTask" src="../../assets/icons/done.svg" alt="accept-icon">
        <img @click="closeDeleteCheck" src="../../assets/icons/delete.svg" alt="cancel-icon">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      nameInput: this.taskName ? this.taskName : '. . .',
      isDeleteModeOn: false
    };
  },
  props: {
    id: Number,
    taskName: String,
  },
  computed: {
    classNameToggle() {
      return this.isDeleteModeOn ? 'task-body edit-mode' : 'task-body'
    }
  },
  methods: {
    saveInputName(e) {
      this.nameInput = e.target.innerHTML
      if (this.nameInput !== this.taskName) {
        this.$emit('change-task-name', this.id, this.nameInput);
      }
    },
    inputBlur(e) {
      this.nameInput = e.target.innerHTML
      e.target.blur();
    },
    openDeleteCheck() {
      this.isDeleteModeOn = true;
      this.$emit('delete-mode-on');
    },
    closeDeleteCheck() {
      this.isDeleteModeOn = false;
      this.$emit('delete-mode-off');
    },
    taskCompleted() {
      this.$emit('task-completed', this.id)
    },
    deleteTask() {
      this.$emit('delete-task', this.id)
    }
  }
}
</script>

<style scoped>
.textarea {
  font-size: 18px;
  text-align: center;
  outline: none;
  min-width: 125px;
  max-width: 220px;
  min-height: 35px;
  margin: 10px 0;
}

h1 {
  font-size: 20px;
  user-select: none;
}

.task-body {
  width: 350px;
  min-height: 70px;
  margin: 15px 0;
  position: relative;
  transition: 200ms;
  background-color: rgba(200, 200, 200, 0.1);
}

.task-head {
  width: 100%;
  height: 100%;
  min-height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}


.task-body.edit-mode {
  margin-bottom: 105px;
  z-index: 2;
}

.task-body.edit-mode .task-head {
  pointer-events: none;
}

.menu-buttons img {
  transition: 200ms;
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

.task-body.edit-mode .delete-check {
  height: 60px;
  opacity: 1;
  pointer-events: auto;
}

.done-icon, .bin-icon {
  position: absolute;
  cursor: pointer;
  transition: 200ms;

  opacity: 0;
  pointer-events: none;
}

.done-icon {
  width: 20px;
  height: 20px;
  right: 20px;
  bottom: 17px;
}

.bin-icon {
  width: 11px;
  height: 11px;
  top: 5px;
  left: 15px;
}

.task-head:hover .done-icon, .task-head:hover .bin-icon {
  opacity: 1;
  pointer-events: auto;
}

.done-icon:hover img, .bin-icon:hover img {
  transform: scale(1.2);
}

.done-icon:active img, .bin-icon img:active img {
  transform: scale(1.1);
  transition: 100ms;
}

</style>