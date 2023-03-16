<template>
  <v-group
    ref="groupRef"
    @mouseover="handleMouseOver(e, groupRef?.getNode())"
    @mouseout="handleMouseOut(e, groupRef?.getNode())"
    @click="handleMouseDown(e, groupRef?.getNode())"
  >
    <v-rect
      v-if="menuItem?.label === itemHovered?.attrs.label"
      ref="itemBackground"
      :config="{
        width,
        height: 30,
        fill: menuItem?.backgroundColor,
        name: 'itemBackground',
      }"
      :style="menuItem?.items?.length ? 'cursor: pointer' : 'cursor: default'"
    />
    <v-text
      v-if="menuItem?.items?.length"
      :config="{
        x: 4,
        y: 6,
        text: menuItem?.showChildren ? 'v' : '>',
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
        width: menuItem?.width,
        text: menuItem?.label,
        fontSize: menuItem?.text.fontSize,
        fill: menuItem?.text.color,
      }"
    />
    <v-group v-if="menuItem?.showChildren && menuItem?.items?.length">
      <menu-item
        v-for="(item, index) in menuItem.items"
        ref="itemRef"
        :key="index"
        :config="{
          index,
          ...item,
          x: depth * 5,
          y: index > 0 ? offSetY(menuItem, index) : 30,
          showChildren: false,
          items: item.items?.length
            ? item.items.map((i) => ({
                ...i,
                showChildren: false,
              }))
            : [],
        }"
        :depth="depth + 1"
      />
    </v-group>
  </v-group>
</template>

<script>
import { ref, computed, defineComponent } from "vue";
import { useMenuItem } from "../../composables/useMenuItem";
export default defineComponent({
  name: "menuItem",
  props: ["width", "depth"],
  setup(props, ctx) {
    const {
      offSetY,
      menuHeight,
      itemHovered,
      itemSelected,
      itemBackground,
      handleMouseDown,
      handleMouseOut,
      handleMouseOver,
    } = useMenuItem();

    const groupRef = ref(null);

    const itemRef = ref(null);

    const showChildren = ref(false);

    const menuItem = computed(() => groupRef.value?.getNode().attrs);

    return {
      groupRef,
      itemRef,
      menuItem,
      offSetY,
      showChildren,
      menuHeight,
      itemHovered,
      itemSelected,
      itemBackground,
      handleMouseDown,
      handleMouseOut,
      handleMouseOver,
    };
  },
});
</script>