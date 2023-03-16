<template>
  <v-stage
    ref="stageMenu"
    class="menu"
    :config="config"
    @wheel="handleScrollWheel(e, scrollRef?.getNode())"
    @contextmenu="handleContextMenu(e, stageMenu?.getStage())"
  >
    <v-layer ref="mainLayer">
      <v-rect
        :config="{
          width: activeMenu?.width,
          height: activeMenu?.height,
          fill: activeMenu?.mainColor,
          cornerRadius: activeMenu?.searchBar?.cornerRadius || 0,
        }"
      />
      <v-group
        @mouseup="handleMouseUp(e, stageMenu?.getStage())"
        @mouseout="handleMouseOut(e, stageMenu?.getStage())"
        @mouseover="handleMouseOver(e, stageMenu?.getStage())"
        @mousedown="handleMouseDown(e, stageMenu?.getStage())"
      >
        <v-rect
          :config="{
            height: activeMenu?.title.height,
            width: activeMenu?.width - 10,
          }"
        />
        <v-text
          :config="{
            x: 10,
            y: 8,
            text: activeMenu?.label,
            fill: activeMenu?.title.text.color,
            fontSize: activeMenu?.title.text.fontSize,
          }"
        />
      </v-group>
      <search-bar v-if="activeMenu?.searchBar" />
      <v-rect
        :config="{
          x: 5,
          y: activeMenu?.searchBar ? activeMenu?.searchBar.height + 32 : 32,
          width: activeMenu?.width - 10,
          height: activeMenu?.searchBar
            ? activeMenu?.height - activeMenu?.searchBar.height - 38
            : activeMenu?.height - 38,
          fill: activeMenu?.backgroundColor,
          cornerRadius: activeMenu?.searchBar?.cornerRadius || 0,
          shadowBlur: 10,
          shadowOpacity: 0.6,
          shadowColor: '#777',
        }"
      />
      <v-text
        :config="{
          x: 24,
          y: activeMenu?.searchBar ? activeMenu?.searchBar.height + 40 : 40,
          width: activeMenu?.width - 10,
          height: activeMenu?.searchBar
            ? activeMenu?.searchBar.height + 20
            : 20,
          fill: activeMenu?.text.color,
          fontSize: activeMenu?.text.fontSize,
          fontFamily: activeMenu?.text.fontFamily,
          text: activeMenu?.description || '',
        }"
      />
      <!--tree-menu
        ref="treeMenu"
        :config="{
          x: depth > 0 ? depth * 10 : 10,
          y: itemLayerY + 8,
          width: activeMenu?.width - 10,
          clipFunc: (ctx) => {
            ctx.rect(
              0,
              -treeMenu?.itemRef.getNode().y() + itemLayerY,
              activeMenu?.width,
              activeMenu?.height - itemLayerY - 6
            );
          },
          showChildren: true,
        }"
        :items="
          activeMenu?.items.length
            ? activeMenu?.items.map((item, index) => ({
                index,
                ...item,
                showChildren: false,
              }))
            : []
        "
        :depth="0"
        :label="activeMenu?.label"
      /-->
      <!-- <v-group
        ref="menuItems"
        :config="{
          x: depth + 5,
          y: itemLayerY,
          width: activeMenu?.width - 10,
          clipFunc: (ctx) => {
            ctx.rect(
              0,
              -menuItems?.getNode().y() + itemLayerY,
              activeMenu?.width,
              activeMenu?.height - itemLayerY - 6
            );
          },
        }"
      > -->
      <!-- ref="item" -->
      <!-- </v-group> -->
      <!-- -menuItems?.getNode().y() + itemLayerY, -->
    </v-layer>
    <v-layer
      ref="itemLayer"
      :config="{
        x: depth > 0 ? depth * 10 : 10,
        y: itemLayerY + 8,
        clipFunc: (ctx) => {
          ctx.rect(
            0,
            -itemLayer?.getNode().getAttr('y') + itemLayerY,
            activeMenu?.width,
            activeMenu?.height - itemLayerY - 6
          );
        },
      }"
    >
      <menu-item
        v-for="(menuItem, index) in activeMenu?.items"
        :key="index"
        ref="menuItems"
        :config="{
          index,
          ...menuItem,
          items: menuItem.items.length
            ? menuItem.items.map((item) => ({
                ...item,
                showChildren: false,
              }))
            : [],
          x: depth * 5,
          y: index > 0 ? offSetY(index) : 0,
          showChildren: false,
        }"
        :width="activeMenu?.width - 30"
        :depth="depth + 1"
      />
    </v-layer>
    <scroll-bar />
  </v-stage>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useMenu } from "../../composables/useMenu";
import menuItem from "./menuItem";
import treeMenu from "./treeMenu";
import scrollBar from "./scrollBar";
import searchBar from "./searchBar";
export default defineComponent({
  name: "konvaMenu",
  props: ["depth", "isDragging"],
  components: { menuItem, scrollBar, searchBar, treeMenu },
  setup(props, ctx) {
    const {
      stageMenu,
      treeMenu,
      offSetY,
      itemLayer,
      menuItems,
      scrollRef,
      activeMenu,
      itemLayerY,
      scrollLayer,
      handleMouseUp,
      handleMouseOut,
      handleMouseOver,
      handleMouseDown,
      handleContextMenu,
      handleScrollWheel,
    } = useMenu();

    const item = ref(null);

    const mainLayer = ref(null);

    const config = ref({
      width: activeMenu.value?.width,
      height: activeMenu.value?.height,
      opacity: 1,
    });

    return {
      stageMenu,
      config,
      item,
      offSetY,
      scrollRef,
      treeMenu,
      itemLayer,
      menuItems,
      mainLayer,
      activeMenu,
      itemLayerY,
      scrollLayer,
      handleMouseUp,
      handleMouseOver,
      handleMouseOut,
      handleMouseDown,
      handleContextMenu,
      handleScrollWheel,
    };
  },
});
</script>