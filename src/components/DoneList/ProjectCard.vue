<template>
  <div :class="bodyClassNameToggle" @click="cardClicked">

    <input v-model="projectNameInput" ref="nameInputRef" spellcheck="false"
           @keydown.enter="offEditMode"
           @blur="saveInputName">

    <h1>Days: {{ allDays }}</h1>
    <h1>Tasks: {{ allTasks }}</h1>

    <div class="bin-icon" @click="openDeleteCheck"><img src="../../assets/icons/bin.svg" alt="bin-icon"></div>

    <div :class="deleteCheckClassName">
      <h1>Delete this project?</h1>
      <div class="check-icons">
        <img @click="deleteProject" src="../../assets/icons/done.svg" alt="accept-icon">
        <img @click="closeDeleteCheck" src="../../assets/icons/delete.svg" alt="cancel-icon">
      </div>
    </div>
  </div>
</template>

<script>
import {ref, computed} from "vue";

export default {
  props: {
    cardName: String,
    id: Number,
    allProjectMonths: Array,
    isProjectsListEditModeOn: Boolean
  },
  setup(props, context) {

    const projectNameInput = ref(props.cardName)
    const nameInputRef = ref(null);

    const bodyClassNameToggle = computed(function () {
      return props.isProjectsListEditModeOn ? 'body edit-mode' : 'body'
    })


    const allDays = computed(function () {
      let daysNr = 0;
      if (props.allProjectMonths) {
        props.allProjectMonths.forEach((e) => {
          daysNr += e.days.length
        })
      }
      return daysNr
    })

    const allTasks = computed(function () {
      let tasksNr = 0;

      props.allProjectMonths.map(item => {
        return Object.values(item).flat();
      }).flat().map(el => {
        return el.doneTasks;
      }).forEach((el) => {
        tasksNr += el?.length ?? 0;
      })

      // if (props.allProjectMonths) {
      //   props.allProjectMonths.forEach((e) => {
      //     if (e.days) {
      //       e.days.forEach((e) => {
      //         tasksNr += e.doneTasks.length
      //       })
      //     }
      //   })
      // }
      return tasksNr
    })

    function saveInputName() {
      if (props.cardName !== projectNameInput.value) {
        context.emit('edit-project-name', props.id, projectNameInput.value)
        nameInputRef.value.blur()
      }
      nameInputRef.value.blur()
    }

    function offEditMode() {
      saveInputName()
      context.emit('off-edit-mode');
    }

    const isDeleteCheckOpen = ref(false);

    const deleteCheckClassName = computed(function () {
      return isDeleteCheckOpen.value ? 'delete-check open' : 'delete-check';
    })

    function openDeleteCheck() {
      isDeleteCheckOpen.value = true;
    }

    function closeDeleteCheck() {
      isDeleteCheckOpen.value = false;
    }

    function deleteProject() {
      context.emit('delete-project', props.id)
    }

    function cardClicked() {
      if (bodyClassNameToggle.value !== 'body edit-mode') {
        context.emit('project-card-clicked', props.id)
      }
    }


    return {
      bodyClassNameToggle,

      projectNameInput,
      nameInputRef,

      allDays,
      allTasks,

      saveInputName,
      offEditMode,

      deleteCheckClassName,
      openDeleteCheck,
      closeDeleteCheck,
      deleteProject,

      cardClicked
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  min-width: 300px;
  max-width: 400px;
  height: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 150ms;
  cursor: pointer;
  border: 1px solid transparent;
  background-color: rgba(200, 200, 200, 0.1);;
}

.body:not(.edit-mode):hover {
  transform: scale(1.03);
}

.body.edit-mode {
  border: 1px solid transparent;
  border-image: linear-gradient(-160deg, var(--mainGrdC2), var(--mainGrdC1));
  border-image-slice: 1;
  cursor: auto;

  input {
    pointer-events: auto;
  }

}

h1 {
  font-size: 20px;
  margin: 0;
  webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

input {
  width: 220px;
  font-size: 27px;
  text-align: center;
  border-bottom: 1px solid transparent;
  overflow: hidden;
  text-overflow: ellipsis;

  pointer-events: none;
}

input:focus {
  border-bottom: 1px solid var(--offWhite);
}

.bin-icon {
  width: 13px;
  height: 13px;
  position: absolute;
  left: 15px;
  top: 15px;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: 200ms;

  img {
    transition: 150ms;
  }

}

.body:is(.edit-mode):hover .bin-icon {
  opacity: 1;
  pointer-events: auto;
}

.bin-icon:hover img {
  transform: scale(1.15);

}

.bin-icon:active img {
  transform: scale(1.05);
  transition: 100ms;
}

.delete-check {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);

  opacity: 0;
  pointer-events: none;
  transition: 150ms;
}

.delete-check.open {
  opacity: 1;
  pointer-events: auto;
}

.check-icons {
  width: 85px;
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
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
</style>