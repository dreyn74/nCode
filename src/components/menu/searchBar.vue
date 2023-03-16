<template>
  <v-group ref="searchRef" :config="config">
    <v-rect :config="configArea" />
    <v-path
      v-if="query == 'Search...'"
      :config="{
        x: 4,
        y: 2,
        data: svg.cancel,
        fill: 'white',
        opacity: 0.8,
      }"
      @click="handleClearText(e, textNode?.getNode())"
    />
    <v-path
      v-else
      :config="{
        x: 4,
        y: 2,
        data: svg.search,
        fill: 'white',
        opacity: 0.8,
      }"
    />
    <v-text
      ref="textNode"
      :config="{
        x: 24,
        y: 4,
        text: 'Search...',
        fill: 'white',
        opacity: 0.5,
        fontSize: 14,
        draggable: false,
        height: activeMenu?.searchBar.height,
        width: activeMenu?.searchBar.width,
      }"
      @mousedown="
        textNode?.getNode().isVisible
          ? handleOnClick(e, textNode?.getNode())
          : ''
      "
      @mouseout="handleMouseOut(e, textNode?.getNode())"
      @mouseover="handleMouseOver(e, textNode?.getNode())"
    />
  </v-group>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import { useMenu } from "../../composables/useMenu";
import { useSVG } from "../../composables/useSVG";
import { useSearchBar } from "../../composables/useSearchBar";
export default defineComponent({
  setup() {
    const { svg } = useSVG();

    const { activeMenu, searchRef } = useMenu();

    const {
      textNode,
      query,
      handleOnClick,
      handleMouseOut,
      handleMouseOver,
      handleClearText,
      handleTextKeydown,
    } = useSearchBar();

    const config = ref({
      x: 5,
      y: activeMenu.value?.title.height + 6,
      width: activeMenu.value?.searchBar.width,
      height: activeMenu.value?.searchBar.height,
    });

    const configArea = ref({
      width: activeMenu.value?.searchBar.width,
      height: activeMenu.value?.searchBar.height,
      fill: activeMenu.value?.searchBar.fill,
      borderColor: activeMenu.value?.searchBar.borderColor,
      borderSize: activeMenu.value?.searchBar.borderSize,
      cornerRadius: activeMenu.value?.searchBar?.cornerRadius || 0,
      stroke: "#18ff",
      strokeWidth: 1,
    });

    onMounted(() => setTimeout(() => handleOnClick(), 20));

    return {
      searchRef,
      config,
      configArea,
      activeMenu,
      textNode,
      query,
      svg,
      handleOnClick,
      handleMouseOut,
      handleMouseOver,
      handleClearText,
      handleTextKeydown,
    };
  },
});
</script>