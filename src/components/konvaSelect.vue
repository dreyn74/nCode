<template>
  <v-shape
    ref="groupRef"
    :config="{
      id: group.id,
      stroke: 'white',
      strokeWidth: 1,
      dash: [8, 4],
      shadowBlur: 7,
      blurRadius: 7,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
      sceneFunc: (ctx, shape) => {
        if (isSelecting) {
          ctx.beginPath();
          ctx.fillStrokeShape(shape);
          ctx.moveTo(group.start.x, group.start.y);
          ctx.lineTo(group.end.x, group.start.y);
          ctx.lineTo(group.end.x, group.end.y);
          ctx.lineTo(group.start.x, group.end.y);
          ctx.lineTo(group.start.x, group.start.y);
          ctx.stroke();
        }
      },
      listening: true,
    }"
  />
</template>

<script>
import { ref, defineComponent } from "vue";
import { useSelection } from "../composables/useSelection";
export default defineComponent({
  name: "konvaSelect",
  props: ["group"],
  setup(props) {
    const { activeGroup, isSelecting } = useSelection();

    const groupRef = ref(null);

    return {
      groupRef,
      activeGroup,
      isSelecting,
    };
  },
});
</script>
