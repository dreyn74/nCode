<template>
  <v-stage
    v-if="isReady"
    ref="stage"
    class="stage"
    :config="{
      width: dimensions.width,
      height: dimensions.height,
      draggable: true,
    }"
    @keydown="handleKeyDown(e, stage?.getStage())"
    @wheel="handleOnWheel(e, stage?.getStage())"
    @dragend="handleDragend(e, stage?.getStage())"
    @mouseup="handleMouseUp(e, stage?.getStage())"
    @dragmove="handleDragmove(e, stage?.getStage())"
    @mousedown="handleMouseDown(e, stage?.getStage())"
    @mousemove="handleMouseMove(e, stage?.getStage())"
    @dragstart="handleDragStart(e, stage?.getStage())"
    @contextmenu="handleContext(e, stage?.getStage())"
  >
    <konva-grid />
    <v-layer ref="layer">
      <konva-select :group="selection" />
      <konva-curve
        v-for="connection in connections"
        :key="connection.id"
        :bezier="connection"
      />
      <konva-node
        ref="nodeRef"
        v-for="node in nodes"
        :key="node.id"
        :config="{
          ...node,
          draggable: node.id !== nodeDrawing?.id(),
        }"
      />
    </v-layer>
  </v-stage>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useStage } from "../composables/useStage";
import konvaNode from "./konvaNode";
import konvaGrid from "./konvaGrid";
import konvaSelect from "./konvaSelect";
import konvaCurve from "./konvaCurve";
import konvaAnchor from "./konvaAnchor";
export default defineComponent({
  name: "konvaStage",
  components: {
    konvaCurve,
    konvaNode,
    konvaSelect,
    konvaGrid /* konvaAnchor */,
  },
  setup() {
    const {
      stage,
      grid,
      layer,
      nodes,
      selection,
      dimensions,
      connections,
      nodeDrawing,
      handleOnWheel,
      handleMouseUp,
      handleMouseMove,
      handleMouseDown,
      handleMouseOver,
      handleContext,
      handleDragStart,
      handleDragmove,
      handleDragend,
      isReady,
      initialize,
    } = useStage();

    const nodeRef = ref(null);

    const handleKeyDown = (e) => {
      e.preventDefault();
      console.log("keyDown");
      /*   if (e.keyCode === 37) {
        const rect1 = r1.value.getNode();
        rect1.x(rect1.x() - 4);
      } else if (e.keyCode === 38) {
        const rect1 = r1.value.getNode();
        rect1.y(rect1.y() - 4);
      } else if (e.keyCode === 39) {
        const rect1 = r1.value.getNode();
        rect1.x(rect1.x() + 4);
      } else if (e.keyCode === 40) {
        const rect1 = r1.value.getNode();
        rect1.y(rect1.y() + 4);
      } else {
        return;
      } */
    };

    onMounted(() => {
      if (!isReady.value) {
        initialize();
      }
    });

    return {
      stage,
      grid,
      layer,
      nodes,
      nodeRef,
      selection,
      dimensions,
      connections,
      nodeDrawing,
      handleOnWheel,
      handleKeyDown,
      handleMouseUp,
      handleContext,
      handleMouseDown,
      handleMouseOver,
      handleMouseMove,
      handleDragStart,
      handleDragmove,
      handleDragend,
      isReady,
    };
  },
});
</script>

<style scoped lang="scss">
.stage {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-shadow: inset 0 0 3em 1em rgba(0, 0, 0, 0.33);
  background-color: #226699;
}
</style>