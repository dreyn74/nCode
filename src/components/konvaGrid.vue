<template>
  <v-layer ref="gridLayer" class="grid" />
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useGrid } from "../composables/useGrid";
export default defineComponent({
  name: "konvaGrid",
  setup() {
    const { gridLayer, drawGrid } = useGrid();

    onMounted(() => drawGrid());

    return {
      gridLayer,
    };
  },
});
</script>

<style scoped lang="scss">
.grid {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-shadow: inset 0 0 3em 1em rgba(0, 0, 0, 0.33);
  background-color: rgb(96, 124, 156);
}
</style>