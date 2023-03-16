<template>
  <v-group
    ref="anchorRef"
    :config="config"
    @dragend="handleDragEnd(e, anchorRef?.getNode())"
    @dragmove="handleDragMove(e, anchorRef?.getNode())"
    @mouseover="handleMouseOver(e, anchorRef?.getNode())"
    @mouseout="handleMouseOut(e, anchorRef?.getNode())"
  >
    <v-circle :config="configCircle" />
    <v-text :config="configText" />
  </v-group>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useDebug } from "../composables/useDebug";
export default defineComponent({
  name: "konvaAnchor",
  props: ["anchor"],
  setup(props, ctx) {
    const {
      handleDragEnd,
      handleDragMove,
      handleMouseOut,
      handleMouseOver,
    } = useDebug();

    const anchorRef = ref(null);

    const config = ref({
      x: props.anchor.x,
      y: props.anchor.y,
      draggable: true,
    });

    const configCircle = ref({
      radius: 20,
      stroke: "#666",
      fill: "#ddd",
      strokeWidth: 2,
      shadowBlur: 10,
    });

    const configText = ref({
      x: props.anchor.x - 7,
      y: props.anchor.y - 7,
      text: props.anchor.text,
      fontSize: 15,
      fontFamily: "Calibri",
    });

    return {
      anchorRef,
      configText,
      configCircle,
      config,
      handleDragEnd,
      handleDragMove,
      handleMouseOut,
      handleMouseOver,
    };
  },
});
</script>