<template>
  <div class="header">
    <div>
      Background:
      <input type="color" v-model="backgroundColor" />
    </div>
    <div>
      <!-- Grid:
      <input type="color" v-model="gridColor" /> -->
      Selection: {{ selection.nodes.length }}, Connections:
      {{ connections.length }}
    </div>
    <div>Zoom: {{ scale ? scale : 1 }}:1</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useMenu } from "../../composables/useMenu";
export default defineComponent({
  name: "infoMenu",
  setup() {
    const {
      scale,
      connections,
      selection,
      backgroundColor,
      gridColor,
    } = useMenu();

    return { scale, connections, selection, backgroundColor, gridColor };
  },
});
</script>

<style scoped>
.header {
  margin: 0;
  z-index: 99;
  width: 100vw;
  height: 50px;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-evenly;
  font-size: 20px;
  font-family: "Lato", sans-serif;
  text-align: center;
  vertical-align: middle;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(14, 14, 14, 0.75);
  border: 2px solid rgba(14, 14, 14, 0.1);
}
</style>