<template>
  <v-group
    ref="socketRef"
    @mouseup="handleMouseUp(e, socketRef?.getNode())"
    @mouseout="handleMouseOut(e, socketRef?.getNode())"
    @mousedown="handleMouseDown(e, socketRef?.getNode())"
    @mouseover="handleMouseOver(e, socketRef?.getNode())"
  >
    <v-text
      :config="{
        x:
          socket?.configType === 'Input'
            ? 20
            : -socket?.configType.length * 8.5,
        y: -5,
        fontFamily: 'Calibri',
        fontSize: 14,
        text: socket?.configType,
        fill: 'white',
      }"
    />

    <v-path
      v-if="socket?.configType === 'Execution'"
      :config="{
        y: -6,
        data: socket?.connections.length ? svg.execFill : svg.exec,
        fill: 'rgba(255, 255, 255, 0.9)',
      }"
    />
    <v-group v-else>
      <v-circle
        :config="{
          radius: 7,
          stroke: 'black',
          fill: 'green',
          strokeWidth: 1,
          shadowColor: 'black',
          shadowBlur: 5,
          shadowOffset: { x: 2, y: 2 },
          shadowOpacity: 0.35,
        }"
      />
      <v-circle
        v-if="!socket?.connections.length"
        :config="{ radius: 3, stroke: 'black', fill: 'black', strokeWidth: 3 }"
      />
      <v-tag
        :config="{
          x: 8,
          fill: 'green',
          pointerDirection: 'right',
          pointerWidth: 3,
          pointerHeight: 6,
          lineJoin: 'round',
          shadowColor: 'black',
          shadowBlur: 5,
          shadowOffset: { x: 2, y: 2 },
          shadowOpacity: 0.5,
        }"
      />
    </v-group>
  </v-group>
</template>

<script>
import { ref, computed, defineComponent } from "vue";
import { useSocket } from "../composables/useSocket";
import { useSVG } from "../composables/useSVG";
export default defineComponent({
  setup(props, ctx) {
    const { svg } = useSVG();
    const {
      handleMouseUp,
      handleMouseOut,
      handleMouseOver,
      handleMouseDown,
    } = useSocket();

    const socketRef = ref(null);

    const socket = computed(() => socketRef.value?.getNode().attrs);

    /* const textWidth = computed(() => {
      return props.socket.configType.getTextWidth();
    }); */

    return {
      socket,
      socketRef,
      /* textWidth, */
      handleMouseUp,
      handleMouseOut,
      handleMouseOver,
      handleMouseDown,
      svg,
    };
  },
});
</script>
