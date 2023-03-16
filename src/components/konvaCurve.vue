<template>
  <v-shape
    ref="bezRef"
    :config="{
      id: bezier.id,
      filters,
      stroke: bezier.stroke,
      strokeWidth: bezier.strokeWidth,
      shadowBlur: 7,
      blurRadius: 7,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
      sceneFunc: (ctx, shape) => {
        ctx.beginPath();
        ctx.moveTo(bezier.start.x, bezier.start.y);
        ctx.bezierCurveTo(
          bezier.control1.x,
          bezier.control1.y,
          bezier.control2.x,
          bezier.control2.y,
          bezier.end.x,
          bezier.end.y
        );
        ctx.fillStrokeShape(shape);
        ctx.fillStyle = bezier.isConnected
          ? 'rgba(0, 0, 0, 0)'
          : 'rgba(0, 0, 0, 0.67)';
        ctx.fillRect(bezier.end.x + 10, bezier.end.y + 18, 136, 20);
        ctx.font = '16px Calibri';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.67)';
        ctx.fillText(
          bezier.isConnected ? '' : bezier.message,
          bezier.end.x + 18,
          bezier.end.y + 32
        );
      },
      listening: true,
    }"
    @mouseout="handleMouseOut(e, bezRef?.getNode())"
    @mouseover="handleMouseOver(e, bezRef?.getNode())"
  />
</template>

<script>
import { ref, defineComponent } from "vue";
import { useSpline } from "../composables/useSpline";
export default defineComponent({
  props: ["bezier"],
  setup(props, ctx) {
    const {
      fadeIn,
      filters,
      message,
      messageWidth,
      handleMouseOut,
      handleMouseOver,
    } = useSpline();

    const bezRef = ref(null);

    return {
      bezRef,
      fadeIn,
      filters,
      message,
      messageWidth,
      handleMouseOut,
      handleMouseOver,
    };
  },
});
</script>
