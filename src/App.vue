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
@font-face {
  font-family: 'Popins';
  src: url(fonts/Poppins-Light.ttf);
}

* {
  box-sizing: border-box;
  --offWhite: rgb(203, 201, 201);
  --gray: rgb(41, 41, 41);
  --mainGrdC1: rgb(47, 90, 218);
  --mainGrdC2: rgb(211, 105, 105);
}

body {
  background: rgb(20, 20, 20);
  font-family: 'Poppins', serif;
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
