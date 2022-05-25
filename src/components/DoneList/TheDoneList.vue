<template>
  <div class="done-list-area">

    <DoneHeader
        :is-back-button-active="isBackButtonActive"
        :list-mode="listMode"
        :month="headerMonth"
        :other-months="otherProjectMonths"
        :project-name="headerName"
        @done-back-button="backToProjectList"
        @change-month="changeMonth"
        @change-month-name="changeMonthName"
        @edit-projects-list="projectsListEditModeToggle"
        @edit-days-list="daysListEditModeToggle"
    ></DoneHeader>

    <div class="listMainSection">
      <ProjectsList v-if="listMode === 'projectsMode'">
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
      </ProjectsList>

      <TheDaysList v-else-if="listMode === 'daysMode'">
        <DayCard
            v-for="day in selectedMonth.days"
            :key="day.dayIndex"
            :day-nr="day.dayNr"
            :done-tasks="day.doneTasks"
            :is-days-list-edit-mode-on="daysListEditMode"
            @day-add-task="addNewTask"
        ></DayCard>
        <DummyDayCard
            v-if="selectedMonth.days.length < 31"
            @month-add-new-day="addNewDay"
        ></DummyDayCard>
      </TheDaysList>
    </div>

  </div>
</template>

<script>
import {computed, ref} from "vue";

import DoneHeader from "@/components/DoneList/DoneHeader";
import ProjectsList from "@/components/DoneList/TheProjectsList";
import ProjectCard from "@/components/DoneList/ProjectCard";
import TheDaysList from "@/components/DoneList/TheDaysList";
import DayCard from "@/components/DoneList/DayCard";
import DummyDayCard from "@/components/DoneList/DummyDayCard";
import DummyProjectCard from "@/components/DoneList/DummyProjectCard";

export default {

  components: {DoneHeader, ProjectsList, ProjectCard, TheDaysList, DayCard, DummyDayCard, DummyProjectCard},

  setup() {
    // const doneListData = ref(JSON.parse(localStorage.getItem("doneListData")))
    const projectsList = ref([])

    const selectedProject = ref({cardName: 'new', id: 0, months: [{monthName: 'Month', days: []}]});
    const listMode = ref('projectsMode');

    function projectCardClicked(id) {
      const clickedElIndex = projectsList.value.findIndex(el => el.id === id);
      selectedProject.value = projectsList.value[clickedElIndex];
      if (selectedProject.value.months) {
        selectedMonth.value = selectedProject.value.months[(selectedProject.value.months.length - 1)];
      } else {
        selectedMonth.value = {monthName: 'Add month', days: []}
      }

      setOtherMonths()

      isBackButtonActive.value = true;
      listMode.value = 'daysMode'
    }

    function editProjectName(id, newName) {
      const index = projectsList.value.findIndex(el => el.id === id);
      projectsList.value[index].cardName = newName;
    }


    function addNewProject() {
      const id = Date.now();
      const newProject = {
        cardName: 'new',
        id: id,
        months: [{monthName: 'maj', days: []}, {monthName: 'czerwiec', days: []}, {
          monthName: 'lipiec',
          days: []
        }, {monthName: 'cos', days: []}, {monthName: 'sierpeiń', days: []}, {monthName: 'wrzesień', days: []}, {
          monthName: 'paź',
          days: []
        }, {monthName: 'listopad', days: []}, {monthName: 'grudzień', days: []},]
      };
      projectsList.value.push(newProject);
    }

    function deleteProject(id) {
      const index = projectsList.value.findIndex(el => el.id === id);
      projectsList.value.splice(index, 1)
    }


    function addNewDay() {
      const newDay = {dayNr: (selectedMonth.value.days.length + 1), doneTasks: []}
      selectedMonth.value.days.push(newDay)
    }

    function addNewTask(dayIndex, task) {
      const selectedDay = selectedMonth.value.days.find(el => el.dayIndex === dayIndex);
      selectedDay.doneTasks.push(task)
    }


    const isBackButtonActive = ref(false);

    function backToProjectList() {
      isBackButtonActive.value = false;
      listMode.value = 'projectsMode';
      selectedProject.value = {cardName: '--', id: 0, months: [{monthName: '--', days: []}]};
      selectedMonth.value = {monthName: '--', days: []};
    }

    const projectsListEditMode = ref(false);
    const daysListEditMode = ref(false);

    function projectsListEditModeToggle() {
      projectsListEditMode.value = !projectsListEditMode.value;
    }

    function daysListEditModeToggle() {
      daysListEditMode.value = !daysListEditMode.value
    }


    const selectedMonth = ref({monthName: 'Month', days: []});
    const otherProjectMonths = ref(null);

    const headerName = computed(function () {
      if (listMode.value === 'projectsMode') {
        return 'Projects';
      } else {
        return selectedProject.value.cardName;
      }
    })

    const headerMonth = computed(function () {
      return selectedMonth.value.monthName;
    })

    function changeMonth(newMonthName) {
      selectedMonth.value = selectedProject.value.months.find(el => el.monthName === newMonthName);
      setOtherMonths()
    }

    function changeMonthName(newName) {
      selectedMonth.value.monthName = newName;
    }

    function setOtherMonths() {
      const selectedMonthIndex = selectedProject.value.months.indexOf(selectedMonth.value)
      otherProjectMonths.value = [...selectedProject.value.months]
      otherProjectMonths.value.splice(selectedMonthIndex, 1)
    }


    return {
      projectsList,

      listMode,
      selectedProject,
      selectedMonth,
      projectCardClicked,
      editProjectName,

      addNewProject,
      deleteProject,

      addNewDay,
      addNewTask,

      isBackButtonActive,
      backToProjectList,

      projectsListEditMode,
      projectsListEditModeToggle,
      daysListEditMode,
      daysListEditModeToggle,

      headerName,
      headerMonth,
      otherProjectMonths,
      changeMonth,
      changeMonthName
    }
  }
}
</script>

<style scoped>
.done-list-area {
  width: 100%;
  height: 97vh;
  margin-left: 45px;
}

.listMainSection {
  display: flex;
  align-items: center;
}
</style>

<!--[{cardName: 'Squared', id: 1,}, {cardName: 'Portfolio', id: 2}, {-->
<!--cardName: 'Portfolio',-->
<!--id: 3-->
<!--}, {-->
<!--cardName: 'Portfolio',-->
<!--id: 4,-->
<!--months: [{-->
<!--monthName: 'Maj', days: []-->
<!--}, {-->
<!--monthName: 'Czerwiec', days: [-->
<!--{dayIndex: 1, doneTasks: ['coś', 'coś innego', 'jeszcze jedno', 'nic']},-->
<!--{dayIndex: 2, doneTasks: ['coś', 'coś innego', 'jeszcze jedno', 'nic']},-->
<!--{dayIndex: 3, doneTasks: ['coś', 'coś innego', 'jeszcze jedno', 'nic']},-->
<!--{dayIndex: 4, doneTasks: ['coś', 'coś innego', 'jeszcze jedno', 'nic']},-->
<!--{dayIndex: 5, doneTasks: ['coś', 'coś innego', 'jeszcze jedno', 'nic']},-->
<!--{dayIndex: 6, doneTasks: ['coś', 'coś innego', 'jeszcze jedno', 'nic']},-->
<!--{dayIndex: 7, doneTasks: ['coś', 'coś innego', 'jeszcze jedno', 'nic']},-->
<!--{dayIndex: 8, doneTasks: ['coś', 'coś innego', 'jeszcze jedno', 'nic']},-->
<!--{dayIndex: 9, doneTasks: ['coś', 'coś innego', 'jeszcze jedno', 'nic']},-->
<!--]-->
<!--}]-->
<!--}, {cardName: 'Portfolio', id: 5}, {-->
<!--cardName: 'Kolejny projekt',-->
<!--id: 6-->
<!--}, {cardName: 'jeszcze jeden', id: 7}, {cardName: 'Nazwa', id: 8}, {-->
<!--cardName: 'Squared',-->
<!--id: 9-->
<!--},-->
<!--{cardName: 'Jeszcze jeden', id: 10}, {cardName: 'Burgir', id: 11}, {cardName: 'Burgir', id: 12}-->
<!--, {cardName: 'Burgir', id: 13}, {cardName: 'Burgir', id: 14}, {cardName: 'Burgir', id: 15}-->
<!--, {cardName: 'Burgir', id: 16}, {cardName: 'Burgir', id: 17}]-->