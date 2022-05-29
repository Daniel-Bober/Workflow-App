<template>
  <div :class="headerClassNameToggle">

    <h1>{{ projectName }}</h1>

    <div :class="monthButtonClassName" @click="monthButton">
      <input
          v-if="listMode === 'daysMode'"
          ref="monthInput"
          :readonly="isReadOnly"
          :value="month.monthName"
          @blur="changeMonthName"
          @keydown.enter="changeMonthName"
      >

      <img alt="plus-icon" class="add-month-button" src="../../assets/icons/plus.svg" @click="addMonth">
      <img alt="bin-icon" class="delete-month-button" src="../../assets/icons/bin.svg" @click="openDeleteCheck">
    </div>

    <div class="delete-check">
      <h3>Delete this month?</h3>
      <div class="check-icons">
        <img alt="accept-icon" src="../../assets/icons/done.svg" @click="deleteMonth">
        <img alt="cancel-icon" src="../../assets/icons/delete.svg" @click="closeDeleteCheck">
      </div>
    </div>

    <div :class="otherMonthsClassName" v-if="otherMonths">
      <h2 v-for="month in otherMonths" :key="month.id" :data-id="month.id" @click="changeMonth">{{ month.monthName }}</h2>
    </div>


    <div :class="backButtonClassName" @click="backButtonClicked"><img alt="back-button" draggable="false" src="../../assets/icons/backArrow.svg">
    </div>

    <div :class="editIconClassName" @click="editButtonClicked"><img alt="edit-icon" draggable="false" src="../../assets/icons/edit.svg"></div>

    <div v-if="isMonthClicked" class="exit-month-button" @click="exitMonthButton"></div>

    <div :class="deleteModeClickBlockadeClassName" @click="closeDeleteCheck"></div>
  </div>
</template>

<script>
import {computed, ref} from "vue";

export default {
  props: {
    projectName: String,
    month: Object,
    otherMonths: Array,
    listMode: String,
    isBackButtonActive: Boolean,
  },

  setup(props, context) {

    const headerClassNameToggle = computed(function () {
      if (isMonthClicked.value && !isDeleteModeOn.value) {
        return 'body active';
      } else if (isMonthClicked.value && isDeleteModeOn.value) {
        return 'body active delete-mode';
      } else {
        return 'body';
      }

    });


    const isMonthClicked = ref(false);
    const isReadOnly = ref(true);
    const monthInput = ref(null);


    const monthButtonClassName = computed(function () {
      return isMonthClicked.value ? 'month-button clicked' : 'month-button';
    });

    const otherMonthsClassName = computed(function () {
      return isMonthClicked.value ? 'other-months-list active' : 'other-months-list';
    });


    function monthButton() {
      isMonthClicked.value = true;
      isReadOnly.value = false;
    }

    function exitMonthButton() {
      isMonthClicked.value = false;
      isDeleteModeOn.value = false;
      isReadOnly.value = true;
    }

    function changeMonth(e) {
      context.emit('change-month', e.target.dataset.id);
    }

    function changeMonthName() {
      if (monthInput.value !== props.month.monthName) {
        context.emit('change-month-name', monthInput.value.value);
        monthInput.value.blur();
      }
    }

    function addMonth() {
      context.emit('add-month');
    }

    function deleteMonth() {
      context.emit('delete-month', props.month.id);
      closeDeleteCheck()
    }


    const isDeleteModeOn = ref(false);

    const deleteModeClickBlockadeClassName = computed(function () {
      return isDeleteModeOn.value ? 'click-blockade active' : 'click-blockade'
    })

    function openDeleteCheck() {
      isDeleteModeOn.value = true;
    }

    function closeDeleteCheck() {
      isDeleteModeOn.value = false;
    }


    const backButtonClassName = computed(function () {
      return props.isBackButtonActive ? 'back-button active' : 'back-button';
    })

    function backButtonClicked() {
      exitMonthButton();
      context.emit('done-back-button');
    }


    const editIconClassName = computed(function () {
      if (props.listMode === 'projectsMode') {
        return 'edit-icon'
      } else {
        return 'edit-icon hide'
      }
    })

    function editButtonClicked() {
      if (props.listMode === 'projectsMode') {
        context.emit('edit-projects-list');
      }
    }


    return {
      headerClassNameToggle,
      monthButtonClassName,
      otherMonthsClassName,
      monthInput,

      isReadOnly,
      isMonthClicked,

      monthButton,
      exitMonthButton,
      changeMonth,
      changeMonthName,
      deleteMonth,
      addMonth,

      deleteModeClickBlockadeClassName,
      openDeleteCheck,
      closeDeleteCheck,

      backButtonClassName,
      backButtonClicked,
      editButtonClicked,
      editIconClassName
    }
  }
}
</script>

<style scoped>
.body {
  width: 100%;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  transition: 200ms;
}

.body.active {
  min-height: 250px;
}


h1 {
  font-size: 45px;
  margin: 0;
  pointer-events: none;
  webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}


.month-button {
  transition: 100ms;
  z-index: 1;
  position: relative;
  display: grid;
  place-items: center;
}

.month-button.clicked {
  border-bottom: 1px solid var(--offWhite);
}

.month-button:not(.clicked) input {
  cursor: pointer;
}

.month-button:not(.clicked):hover {
  transform: scale(1.05);
}

.month-button input {
  width: 140px;
  font-size: 20px;
  text-align: center;
}

.other-months-list {
  height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  opacity: 0;
  pointer-events: none;
  transition: 150ms;
}

.other-months-list::-webkit-scrollbar {
  display: none;
}

.other-months-list.active {
  min-height: 150px;
  margin-bottom: 70px;
  pointer-events: auto;
  opacity: 1;
  z-index: 1;
}

.other-months-list h2 {
  font-size: 22px;
  margin: 0;
  transition: 150ms;
  cursor: pointer;
  webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

.other-months-list h2:hover {
  transform: scale(1.05);
}

.other-months-list h2:active {
  transform: scale(1);
}

.exit-month-button {
  width: 110%;
  height: 150vh;
  position: absolute;
  bottom: -100vh;

}

.add-month-button, .delete-month-button {
  width: 22px;
  position: absolute;
  top: 10px;
  right: -50px;
  transition: 150ms;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
}

.delete-month-button {
  width: 15px;
  left: -50px;
}

.month-button.clicked .add-month-button,
.month-button.clicked .delete-month-button {
  opacity: 1;
  pointer-events: auto;
}

.add-month-button:hover, .delete-month-button:hover {
  transform: scale(1.12);
}

.add-month-button:active, .delete-month-button:active {
  transform: scale(1.05);
  transition: 100ms;
}

.delete-check {
  width: 350px;
  height: 0;
  opacity: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 100ms;
  z-index: 2;
}

.body.active.delete-mode .delete-check {
  height: 100px;
  opacity: 1;
  pointer-events: auto;
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

.click-blockade {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  opacity: 0;
  pointer-events: none;
  z-index: 1;
}

.click-blockade.active {
  opacity: 1;
  pointer-events: auto;
}


.back-button {
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  left: 10px;
  bottom: 10px;
  opacity: 0;
  pointer-events: none;
  z-index: 1;
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

.edit-icon {
  width: 25px;
  height: 25px;
  position: absolute;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
  transition: 200ms;
}

.edit-icon.hide {
  opacity: 0;
  pointer-events: none;
}

.edit-icon:hover {
  transform: scale(1.15);
}

.edit-icon:active {
  transform: scale(1.05);
  transition: 100ms;
}
</style>