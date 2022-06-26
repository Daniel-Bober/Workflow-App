<template>
  <div class="done-list-area">

    <DoneHeader
        :is-back-button-active="isBackButtonActive"
        :list-mode="listMode"
        :month="selectedMonth"
        :other-months="otherProjectMonths"
        :project-name="headerName"
        @done-back-button="backToProjectList"
        @change-month="changeMonth"
        @change-month-name="changeMonthName"
        @add-month="addMonth"
        @delete-month="deleteMonth"
        @edit-projects-list="projectsListEditModeToggle"
    ></DoneHeader>

    <div class="list-main-section">
      <TheProjectsList v-if="listMode === 'projectsMode'">
        <ProjectCard
            v-for="project in projectsList"
            :id="project.id"
            :key="project.id"
            :all-project-months="project.months"
            :card-name="project.cardName"
            :is-projects-list-edit-mode-on="projectsListEditMode"
            @project-card-clicked="projectCardClicked"
            @edit-project-name="editProjectName"
            @off-edit-mode="projectsListEditModeToggle"
            @delete-project="deleteProject"
        ></ProjectCard>
        <DummyProjectCard
            @add-new-project="addNewProject"
        ></DummyProjectCard>
      </TheProjectsList>

      <TheDaysList v-else-if="listMode === 'daysMode'">
        <DayCard
            v-for="day in selectedMonth.days"
            :key="day.dayIndex"
            :day-nr="day.dayNr"
            :days-array-length="selectedMonth.days.length"
            :done-tasks="day.doneTasks"
            @add-done-task="addNewTask"
            @delete-done-task="deleteTask"
            @delete-day="deleteDay"
            @open-waiting-tasks-list="openWaitingTasksList"
        ></DayCard>
        <DummyDayCard
            v-if="selectedMonth.days.length < 31"
            @month-add-new-day="addNewDay"
        ></DummyDayCard>
      </TheDaysList>
    </div>

    <TheWaitingTasksList
        :is-list-open="isWaitingTasksListOpen"
        @add-tasks="addTasksFromWaitingList"
        @close-list="closeWaitingTasksList"
    ></TheWaitingTasksList>
  </div>
</template>

<script>
import {computed, ref} from "vue";

import DoneHeader from "@/components/DoneList/DoneHeader";
import TheProjectsList from "@/components/DoneList/TheProjectsList";
import ProjectCard from "@/components/DoneList/ProjectCard";
import TheDaysList from "@/components/DoneList/TheDaysList";
import DayCard from "@/components/DoneList/DayCard";
import DummyDayCard from "@/components/DoneList/DummyDayCard";
import DummyProjectCard from "@/components/DoneList/DummyProjectCard";
import TheWaitingTasksList from "@/components/DoneList/WaitingTasksList/TheWaitingTasksList";
import {useStore} from "vuex";

export default {

  components: {DoneHeader, TheProjectsList, ProjectCard, TheDaysList, DayCard, DummyDayCard, DummyProjectCard, TheWaitingTasksList},

  setup() {
    const store = useStore()
    const projectsList = ref(JSON.parse(localStorage.getItem('doneTasksList')) ?? [])

    const selectedProjectIndex = ref(null);
    const selectedMonthIndex = ref(null);
    const listMode = ref('projectsMode');


    /*region project card*/
    function addNewProject() {
      const id = Date.now();
      const newProject = {
        cardName: 'project name',
        id: id,
        months: [{monthName: 'month', id: id + 1, days: []}]
      };
      projectsList.value.push(newProject);

      saveDoneTasksListData()
    }

    function deleteProject(id) {
      const index = projectsList.value.findIndex(el => el.id === id);
      projectsList.value.splice(index, 1)

      saveDoneTasksListData()
    }

    function editProjectName(id, newName) {
      const index = projectsList.value.findIndex(el => el.id === id);
      projectsList.value[index].cardName = newName;

      saveDoneTasksListData()
    }

    function projectCardClicked(id) {
      selectedProjectIndex.value = projectsList.value.findIndex(el => el.id === id);
      selectedMonthIndex.value = projectsList.value[selectedProjectIndex.value].months.length - 1;

      setOtherMonths()

      isBackButtonActive.value = true;
      listMode.value = 'daysMode'
    }

    const projectsListEditMode = ref(false);

    function projectsListEditModeToggle() {
      projectsListEditMode.value = !projectsListEditMode.value;
    }

    /*endregion*/


    /*region day card*/
    function addNewDay() {
      const newDay = {dayNr: (projectsList.value[selectedProjectIndex.value].months[selectedMonthIndex.value].days.length + 1), doneTasks: []};
      projectsList.value[selectedProjectIndex.value].months[selectedMonthIndex.value].days.push(newDay);

      saveDoneTasksListData()
    }

    function deleteDay(dayNr) {
      projectsList.value[selectedProjectIndex.value].months[selectedMonthIndex.value].days.splice(dayNr - 1, 1)

      saveDoneTasksListData()
    }


    function addNewTask(dayNr, task) {
      const selectedDay = projectsList.value[selectedProjectIndex.value].months[selectedMonthIndex.value].days[dayNr - 1];
      selectedDay.doneTasks.push(task)

      saveDoneTasksListData()
    }

    function deleteTask(dayIndex, taskIndex) {
      const selectedTask = projectsList.value[selectedProjectIndex.value].months[selectedMonthIndex.value].days.find(el => el.dayNr === dayIndex);
      selectedTask.doneTasks.splice(taskIndex, 1)

      saveDoneTasksListData()
    }


    const selectedDayNr = ref(null);

    function openWaitingTasksList(dayNr) {
      selectedDayNr.value = dayNr;
      isWaitingTasksListOpen.value = true;
    }

    function closeWaitingTasksList() {
      isWaitingTasksListOpen.value = false;
    }

    /*endregion*/


    /*region header */
    const headerName = computed(function () {
      if (listMode.value === 'projectsMode') {
        return 'Projects';
      } else {
        return projectsList.value[selectedProjectIndex.value].cardName;
      }
    });


    const selectedMonth = computed(function () {
      if (projectsList.value[selectedProjectIndex.value] && projectsList.value[selectedProjectIndex.value].months[selectedMonthIndex.value]) {
        return projectsList.value[selectedProjectIndex.value].months[selectedMonthIndex.value];
      } else return {}
    });

    function addMonth() {
      const id = Date.now();
      const newMonth = {
        monthName: 'month',
        id: id,
        days: []
      };
      projectsList.value[selectedProjectIndex.value].months.push(newMonth);
      setOtherMonths();

      saveDoneTasksListData()
    }

    function deleteMonth(id) {
      const index = projectsList.value[selectedProjectIndex.value].months.findIndex(el => el.id === id)
      projectsList.value[selectedProjectIndex.value].months.splice(index, 1)
      selectedMonthIndex.value = projectsList.value[selectedProjectIndex.value].months.length - 1;
      setOtherMonths()

      saveDoneTasksListData()
    }


    function changeMonthName(newName) {
      projectsList.value[selectedProjectIndex.value].months[selectedMonthIndex.value].monthName = newName;
    }

    function changeMonth(monthID) {
      selectedMonthIndex.value = projectsList.value[selectedProjectIndex.value].months.findIndex(el => el.id.toString() === monthID);
      setOtherMonths()
    }

    const otherProjectMonths = ref(null);

    function setOtherMonths() {
      const monthIndex = projectsList.value[selectedProjectIndex.value].months.indexOf(projectsList.value[selectedProjectIndex.value].months[selectedMonthIndex.value])
      otherProjectMonths.value = [...projectsList.value[selectedProjectIndex.value].months]
      otherProjectMonths.value.splice(monthIndex, 1)
    }

    const isBackButtonActive = ref(false);

    function backToProjectList() {
      isBackButtonActive.value = false;
      listMode.value = 'projectsMode';
    }

    /*endregion*/


    /*region done tasks list*/
    const isWaitingTasksListOpen = ref(false);

    function addTasksFromWaitingList(selectedTasks) {

      selectedTasks.forEach(nr => {
        projectsList.value[selectedProjectIndex.value].months[selectedMonthIndex.value].days[selectedDayNr.value - 1].doneTasks.push(
            store.state.waitingTasksList[nr]
        );
      })

      closeWaitingTasksList();

      store.dispatch('removeWaitingTasks', selectedTasks)
      store.dispatch('saveWaitingTasksListData');
    }

    /*endregion*/

    function saveDoneTasksListData() {
      localStorage.setItem('doneTasksList', JSON.stringify(projectsList.value))
    }

    return {
      projectsList,
      selectedProjectIndex,
      selectedMonthIndex,
      listMode,
      projectsListEditMode,
      projectsListEditModeToggle,

      projectCardClicked,
      editProjectName,
      addNewProject,
      deleteProject,
      addNewDay,
      deleteDay,
      addNewTask,
      deleteTask,
      openWaitingTasksList,
      closeWaitingTasksList,

      headerName,
      selectedMonth,
      otherProjectMonths,
      addMonth,
      deleteMonth,
      changeMonth,
      changeMonthName,
      isBackButtonActive,
      backToProjectList,

      isWaitingTasksListOpen,
      addTasksFromWaitingList
    }
  }
}
</script>

<style scoped>
.done-list-area {
  width: 100%;
  height: 97vh;
  padding-left: 45px;
  position: relative;
}

.list-main-section {
  display: flex;
  align-items: center;
}
</style>
