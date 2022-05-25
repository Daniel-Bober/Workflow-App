<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  width: 100%;
  height: 80vh;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: repeat(auto-fill, 220px);
  gap: 25px;
  overflow: scroll;
}

div::-webkit-scrollbar {
  display: none;
}

div {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>