<template>
  <div class="container">
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: "TheDaysList"
}
</script>

<style scoped>
.container {
  width: 100%;
  max-height: 80vh;
  overflow: scroll;
}

.body {
  columns: 3;
  column-gap: 20px;
  padding: 10px;
}

div::-webkit-scrollbar {
  display: none;
}

div {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media screen and (max-width: 1600px) {
  .body {
    columns: 2;
  }
}

@media screen and (max-width: 1350px) {
  .body {
    columns: 1;
  }
}
</style>