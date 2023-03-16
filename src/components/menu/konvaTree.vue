<template>
  <!-- @mouseover="handleMouseOver(e, menuItem)"
    @mouseout="handleMouseOut(e, menuItem)" -->
  <v-group
    ref="groupRef"
    @click="
      menuItem.items?.length
        ? handleClick(e, menuItem)
        : handleMouseDown(e, menuItem)
    "
    @mouseover="handleMouseOver(e, menuItem)"
    @mouseout="handleMouseOut(e, menuItem)"
  >
    <v-rect
      v-if="menuItem === itemHovered"
      :config="{
        width,
        height: 30,
        fill: menuItem.backgroundColor,
      }"
      :style="menuItem?.items.length ? 'cursor: pointer' : 'cursor: default'"
    />
    <v-text
      v-if="menuItem?.items.length"
      :config="{
        x: 4,
        y: 6,
        text: showChildren ? 'v' : '>',
        fontSize: 14,
        fontStyle: 'bold',
        fill: 'lightGray',
      }"
    />
    <v-text
      :config="{
        x: 18,
        y: 6,
        opacity: 1,
        width: menuItem.width,
        text: menuItem.label,
        fontSize: menuItem.text.fontSize,
        fill: menuItem.text.color,
      }"
    />
    <v-group v-if="showChildren && menuItem?.items.length">
      <konva-tree
        v-for="(node, c) in menuItem?.items"
        :key="c"
        :items="node.items"
        :index="c"
        :depth="depth + 1"
      />
    </v-group>
  </v-group>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useMenuItem } from "../../composables/useMenuItem";
import Konva from "konva";
let tween;
export default defineComponent({
  name: "konvaTree",
  props: ["menuItem", "width", "depth", "index"],
  setup(props, ctx) {
    const {
      offSetY,
      itemHovered,
      itemSelected,
      showChildren,
      toggleChildren,
      handleMouseDown,
      handleMouseOut,
      handleMouseOver,
      handleClick,
    } = useMenuItem();

    const groupRef = ref(null);

    const item = ref(null);

    return {
      groupRef,
      item,
      offSetY,
      itemHovered,
      itemSelected,
      showChildren,
      handleClick,
      toggleChildren,
      handleMouseDown,
      handleMouseOut,
      handleMouseOver,
    };
  },
});
</script>