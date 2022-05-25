<template>
  <section>
    <DoneList></DoneList>
    <ToDoList></ToDoList>
  </section>
</template>

<script>
import DoneList from "@/components/DoneList/TheDoneList";
import ToDoList from "@/components/ToDoList/TheToDoList";


export default {
  components: {
    DoneList, ToDoList
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  --darkOrange: rgb(185, 96, 41);
  --offWhite: rgb(185, 185, 185);
  --mainGrdC1: rgb(47, 90, 218);
  --mainGrdC2: rgb(211, 105, 105);
}

body {
  background: rgb(26, 26, 26);
  font-family: Palanquin, serif;
  color: var(--offWhite);
  margin: 0;
  overflow: hidden;
}

section {
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: right;
  align-items: center;
}

input, textarea {
  border: none;
  outline: none;
  background: none;
  font-family: Palanquin, serif;
  color: var(--offWhite);;
}

.flex {
  display: flex;
}
</style>
