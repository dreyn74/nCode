<template>
  <v-layer
    ref="scrollLayer"
    :config="{
      x: depth + 5,
      y: itemLayerY,
    }"
  >
    <v-rect
      ref="scrollRef"
      :config="{
        width: 8,
        height: menuHeight * 0.1,
        fill: 'grey',
        opacity: 0.25,
        cornerRadius: [10, 10, 10, 10],
        x: menuWidth - 12,
        y: 0,
        draggable: true,
        dragBoundFunc: (pos) => {
          pos.x = menuWidth - 12;
          pos.y = Math.max(
            Math.min(
              pos.y,
              stage?.getStage().height() - scrollRef?.getNode().height() - 5
            ),
            5
          );
          return pos;
        },
      }"
      @mouseover="handleMouseOver(e, scrollRef?.getNode())"
      @mouseout="handleMouseOut(e, scrollRef?.getNode())"
      @dragmove="handleDragMove(e, scrollRef?.getNode())"
    />
  </v-layer>
</template>

<script>
import { defineComponent } from "vue";
import { useMenu } from "../../composables/useMenu";
import { useScrollBar } from "../../composables/useScrollBar";
export default defineComponent({
  setup(props, ctx) {
    const {
      stage,
      depth,
      scrollRef,
      menuWidth,
      itemLayerY,
      menuHeight,
      activeMenu,
      scrollLayer,
    } = useMenu();

    const { handleMouseOver, handleMouseOut, handleDragMove } = useScrollBar();

    return {
      stage,
      depth,
      scrollRef,
      menuWidth,
      menuHeight,
      activeMenu,
      itemLayerY,
      scrollLayer,
      handleMouseOver,
      handleMouseOut,
      handleDragMove,
    };
  },
});
</script>