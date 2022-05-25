<template>
  <div class="container-body">
    <div class="header-div">
      <h1>{{ selectedName }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedName: String,
    isBackButtonActive: Boolean
  }
}
</script>

<style scoped>
.container-body {
  width: 100%;
  height: 150px;
  display: grid;
  justify-items: center;
  position: relative;
}

.header-div {
  max-width: 400px;
  height: 150px;
  margin: 0;
  display: grid;
  align-items: center;

}

h1 {
  max-width: 400px;
  max-height: 150px;
  overflow: clip;
  font-size: 50px;
  text-align: center;
  word-wrap: break-word;
  line-height: 75px;
  margin: 0;

  pointer-events: none;
  user-select: none;
}

</style>