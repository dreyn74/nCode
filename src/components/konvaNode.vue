<template>
  <v-group
    ref="nodeRef"
    @mouseup="handleMouseUp(e, nodeRef?.getNode())"
    @mouseout="handleMouseOut(e, nodeRef?.getNode())"
    @mousedown="handleMouseDown(e, nodeRef?.getNode())"
    @mouseover="handleMouseOver(e, nodeRef?.getNode())"
    @dragstart="handleDragStart(e, nodeRef?.getNode())"
    @dragmove="handleDragMove(e, nodeRef?.getNode())"
    @dragend="handleDragEnd(e, nodeRef?.getNode())"
  >
    <v-rect
      :config="{
        width: node?.width,
        height: node?.height,
        cornerRadius: 10,
        shadowBlur: 10,
        stroke: selection.nodes.find((item) => item === node?.id)
          ? 'gold'
          : 'black',
        fill: 'rgba(68, 68, 68, .25)',
        strokeWidth: selection.nodes.find((item) => item === node?.id) ? 4 : 0,
      }"
    />

    <v-rect
      :config="{
        width: node?.width,
        height: node?.height,
        fill: 'black',
        opacity: 0.67,
        cornerRadius: 14,
        shadowColor: 'black',
        shadowOpacity: 0.267,
        shadowOffset: { x: 0, y: 5 },
      }"
    />
    <v-group>
      <v-rect
        :config="{
          width: node?.width,
          height: 30,
          fillPriority: 'radial-gradient',
          fillRadialGradientStartPoint: {
            x: -300,
            y: -400,
          },
          fillRadialGradientStartRadius: 750,
          fillRadialGradientColorStops: [0, 'black', 0.95, 'blue', 1, 'white'],
          cornerRadius: [14, 14, 0, 0],
          opacity: 0.95,
        }"
      />
      <v-text
        :config="{
          x: 8,
          y: 8,
          fontFamily: 'Calibri',
          fontSize: 15,
          text: `Node ${node?.id}  x: ${Math.floor(node?.x)}, y: ${Math.floor(
            node?.y
          )}`,
          fill: 'white',
          align: 'center',
        }"
      />

      <v-group
        :config="{ x: node?.width - 20, y: 5 }"
        @click="handleNodeDelete(node?.id)"
        @mouseover="delMouseover"
        @mouseout="delMouseout"
      >
        <v-rect
          :config="{
            width: 15,
            height: 15,
            fill: overDel ? 'red' : 'rgba(255, 255,255, 0)',
          }"
        />
        <v-path
          :config="{
            data: svg.cancel,
            fill: overDel
              ? 'rgba(255, 255, 255, 1)'
              : 'rgba(255, 255, 255, 0.4)',
          }"
        />
      </v-group>
    </v-group>
    <!-- <v-path
      v-if="node?.isExec"
      :config="{
        x: node?.width,
        y: 35,
        data: svg.exec,
        fill: 'rgba(255, 255, 255, 0.9)',
      }"
    /> -->

    <konva-socket
      ref="socketRef"
      v-for="socket in node?.sockets"
      :key="socket.id"
      :config="{
        ...socket,
        x: socket.configType === 'Input' ? 20 : node?.width - 20,
        y: 65,
      }"
    />
  </v-group>
</template>

<script>
import { ref, computed, defineComponent } from "vue";
import konvaSocket from "./konvaSocket.vue";
import { useNode } from "../composables/useNode";
import { useSVG } from "../composables/useSVG";
export default defineComponent({
  name: "konvaNode",
  components: { konvaSocket },
  setup(props, ctx) {
    const { svg } = useSVG();

    const {
      selection,
      nodeDrawing,
      handleMouseUp,
      handleMouseOut,
      handleMouseOver,
      handleMouseDown,
      handleDragEnd,
      handleDragStart,
      handleDragMove,
      handleNodeDelete,
    } = useNode();

    const nodeRef = ref(null);

    const overDel = ref(false);

    const node = computed(() => nodeRef.value?.getNode().attrs);

    const delMouseover = (e) => {
      overDel.value = true;
      document.body.style.cursor = "pointer";
    };

    const delMouseout = (e) => {
      overDel.value = false;
      document.body.style.cursor = "default";
    };

    return {
      node,
      nodeRef,
      selection,
      nodeDrawing,
      delMouseover,
      delMouseout,
      handleMouseUp,
      handleMouseDown,
      handleMouseOver,
      handleMouseOut,
      handleDragStart,
      handleDragMove,
      handleDragEnd,
      handleNodeDelete,
      overDel,
      svg,
    };
  },
});
</script>
