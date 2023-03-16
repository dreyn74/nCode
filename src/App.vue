<template>
  <div
    ref="main"
    class="main"
    @mousemove="isDraggingMenu ? handleDragmove(e, menu) : ''"
  >
    <konva-stage class="stage" />

    <info-menu />

    <!-- img class="preview" :src="preview" /-->
    <!-- <v-stage
      ref="preview"
      class="preview"
      :config="{
        width: dimensions.width / 4,
        height: dimensions.height / 4,
        scaleX: 1 / 4,
        scaleY: 1 / 4,
      }"
    >
      <v-layer ref="previewLayer" />
    </v-stage> -->

    <konva-menu
      v-if="showMenu"
      class="menu"
      ref="menu"
      :style="{
        left: `${menuPosition.x}px`,
        top: `${menuPosition.y}px`,
      }"
      :isDragging="isDraggingMenu"
      :depth="0"
    />
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { useMenu } from "./composables/useMenu";
import konvaStage from "./components/konvaStage";
import konvaMenu from "./components/menu/konvaMenu";
import infoMenu from "./components/menu/infoMenu";
export default defineComponent({
  components: { konvaStage, konvaMenu, infoMenu },
  setup() {
    const {
      menu,
      preview,
      showMenu,
      dimensions,
      menuPosition,
      isDraggingMenu,
      handleDragStart,
      handleDragmove,
      handleDragend,
      previewLayer,
    } = useMenu();

    const main = ref(null);

    dimensions.value = { width: window.innerWidth, height: window.innerHeight };

    return {
      main,
      menu,
      preview,
      showMenu,
      dimensions,
      menuPosition,
      isDraggingMenu,
      handleDragStart,
      handleDragmove,
      handleDragend,
      previewLayer,
    };
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

.main {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.stage {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.menu {
  position: absolute;
  &.dragging {
    opacity: 0.75;
    border: white 6px;
    box-shadow: 0 0 8px rgb(32, 32, 32);
  }
  border-radius: 3px;
  z-index: 1;
  transition: all 0.2s;
}

.preview {
  position: absolute;
  top: 10vh;
  right: 2px;
  border: 1px solid grey;
  background-color: rgb(104, 118, 119);
}
</style>