 <template>
  <v-group ref="itemRef" :class="showChildren ? 'open' : 'closed'">
    <!-- @click="
        items.length
          ? (showChildren = !showChildren)
          : handleMouseDown(e, item?.getNode())
      " -->
    <v-group
      v-if="items"
      @mouseover="handleMouseOver(e, itemRef?.getNode())"
      @click="handleMouseDown(e, itemRef?.getNode(), menuItem.index)"
    >
      <v-rect
        ref="itemBackground"
        :config="{
          x: depth > 0 ? depth + 1 * 15 : 15,
          y: -8,
          width: depth > 0 ? 400 - depth * 30 : 400 - depth - 19,
          height: 30,
          fill: menuItem?.y === itemHovered?.attrs.y ? 'gray' : '',
        }"
        :style="items?.length ? 'cursor: pointer' : 'cursor: default'"
      />
      <v-text
        v-if="items?.length"
        :config="{
          x: depth * 5,
          fontSize: 14,
          fill: 'white',
          text: menuItem?.showChildren ? 'v' : '>',
        }"
      />
      <v-text
        :config="{
          x: depth + 1 * 15,
          fontSize: 14,
          fill: menuItem?.y === itemHovered?.attrs.y ? 'black' : 'white',
          text: label,
        }"
      />
      <!-- 
          y: i > 0 ? offSetY(i) : 30,
          y: items[].y(),-->
    </v-group>
    <v-group v-if="menuItem?.showChildren">
      <tree-menu
        v-for="(item, i) in items"
        :config="{
          index: i,
          x: depth > 0 ? depth * 10 : 10,
          y: i > 0 ? i * 30 + 30 : 30,
          items: item.items?.length
            ? item.items.map((item, index) => ({
                index,
                ...item,
                showChildren: false,
              }))
            : [],
        }"
        :key="i"
        :items="
          item.items?.length
            ? item.items.map((item, index) => ({
                index,
                ...item,
                showChildren: false,
              }))
            : []
        "
        :label="item.label"
        :depth="depth + 1"
      />
    </v-group>
  </v-group>
</template>

<script>
import { ref, computed, defineComponent } from "vue";
import { useTreeMenu } from "../../composables/useTreeMenu";
export default defineComponent({
  props: ["items", "label", "depth"],
  name: "treeMenu",
  setup(props, ctx) {
    const {
      offSetY,
      menuHeight,
      itemHovered,
      itemSelected,
      itemBackground,
      toggleChildren,
      handleMouseDown,
      handleMouseOut,
      handleMouseOver,
    } = useTreeMenu();

    const itemRef = ref(null);

    const menuItem = computed(() => itemRef.value?.getNode().attrs);

    const showChildren = ref(false);

    return {
      offSetY,
      menuItem,
      itemRef,
      showChildren,
      menuHeight,
      itemHovered,
      itemSelected,
      itemBackground,
      toggleChildren,
      handleMouseDown,
      handleMouseOut,
      handleMouseOver,
    };
  },
});
</script>