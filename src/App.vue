<template>
  <section>
    <TheDoneList></TheDoneList>
    <TheToDoList></TheToDoList>
  </section>
</template>

<script>
import TheDoneList from "@/components/DoneList/TheDoneList";
import TheToDoList from "@/components/ToDoList/TheToDoList";


export default {
  components: {
    TheDoneList, TheToDoList
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  --offWhite: rgb(185, 185, 185);
  --mainGrdC1: rgb(47, 90, 218);
  --mainGrdC2: rgb(211, 105, 105);
}

body {
  background: rgb(18, 18, 18);
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
