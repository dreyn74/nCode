/* eslint-disable */
import { ref, reactive, computed } from "vue";

const menu = ref(null);

const stage = ref(null);

const preview = ref(null);

const previewLayer = ref(null);

const isReady = ref(false);

const connections = reactive([]);

const debugNodes = reactive([]);

const stageMenu = ref(null);

const menuItems = ref([]);

const itemLayer = ref(null);

const treeMenu = reactive(null);

const scrollRef = ref(null);

const searchRef = ref(null);

const scrollLayer = ref(null);

const showMenu = ref(false);

const activeMenu = ref(null);

const dimensions = ref(null);

const isDraggingMenu = ref(false);

const isSelecting = ref(false);

const selection = ref({
  start: { x: 0, y: 0 },
  end: { x: 0, y: 0 },
  nodes: [],
  groups: []
});

const menuPosition = ref({ x: 0, y: 0 });

let pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0;

const scale = ref(null);

const depth = computed(() => menu.value?.depth);

/* const preview = computed(() =>
  stage.value?.getStage().toDataURL({ pixelRatio: 0.25 })
); */

/* const scale = computed(() =>
  Math.floor((0.01 / stage.value?.getStage().scaleX()) * 100)
); */

const itemLayerY = computed(() =>
  activeMenu.value?.searchBar
    ? activeMenu.value?.description
      ? activeMenu.value?.title.height + activeMenu.value?.searchBar.height + 34
      : activeMenu.value?.searchBar.height + 34
    : 34
);

const handleDragStart = (event, stage) => {
  event = event || window.event;
  pos3 = event.clientX;
  pos4 = event.clientY;
};

const handleDragmove = (event, element) => {
  event = event || window.event;
  const container = element.stageMenu.getStage().getContainer();

  //clientX property returns the horizontal coordinate of the mouse pointer
  pos1 = pos3 - event.clientX;

  //clientY property returns the vertical coordinate of the mouse pointer
  pos2 = pos4 - event.clientY;

  pos3 = event.clientX;
  pos4 = event.clientY;

  //offsetTop property returns the top position relative to the parent
  menuPosition.value = {
    x: container.offsetLeft - pos1,
    y: container.offsetTop - pos2
  };

  document.body.style.cursor = "grabbing";
};

const handleDragend = (e, stage) => {
  document.body.style.cursor = "default";
};

const handleContextMenu = (e, stage) => {
  e = e || window.event;
  e.stopPropagation();
  e.preventDefault();
  console.log(menu.value /* treeMenu */);
};

const handleMouseOver = (event, stage) => {
  document.body.style.cursor = "move";
};

const handleMouseDown = (event, stage) => {
  event = event || window.event;
  const container = stage.getContainer();

  pos3 = event.clientX;
  pos4 = event.clientY;

  isDraggingMenu.value = true;
  container.classList.add("dragging");
};

const handleMouseUp = (event, stage) => {
  const container = stage.getContainer();

  isDraggingMenu.value = false;
  container.classList.remove("dragging");
};

const handleMouseOut = (event, stage) => {
  const container = stage.getContainer();

  isDraggingMenu.value = false;
  container.classList.remove("dragging");
  document.body.style.cursor = "default";
};

const offSetY = (n) => {
  let offsetY = 0;
  for (let i = 1; i < n + 1; i++) {
    menu.value?.menuItems[i - 1].showChildren
      ? (offsetY += menu.value?.menuItems[i - 1].items.length * 30)
      : "";
  }
  return n * 30 + offsetY;
};

/* const offSetY = (n) => {
  let offsetY = 0;
  for (let i = 1; i < n; i++) {
    menu.value?.item[i - 1].showChildren
      ? (offsetY += menu.value?.item[i - 1].menuItem.items.length * 30)
      : "";
  }
  return n * 30 + offsetY;
}; */

const menuHeight = computed(() => itemLayer.value?.getNode().height());

const menuWidth = computed(() => itemLayer.value?.getNode().width());

const handleScrollWheel = (e, scrollRef) => {
  e = e || window.event;
  e.preventDefault();

  const HEIGHT = menuHeight.value;

  const STAGE = stageMenu.value?.getStage();

  const layer = itemLayer.value?.getNode();

  const dy = e.deltaY;

  const x = depth.value + 5;

  const minY = -(HEIGHT - STAGE.height());
  const maxY = itemLayerY.value;

  const y = Math.max(minY, Math.min(layer.getAttr("y") - dy, maxY));

  layer.x(x);
  layer.y(y);

  const availableHeight = STAGE.height() - itemLayerY.value * 2 - HEIGHT * 0.1;

  const vy =
    (layer.getAttr("y") / (-HEIGHT + STAGE.height())) * availableHeight +
    itemLayerY.value;

  scrollRef.y(vy);
};

export const useMenu = () => {
  return {
    menu,
    stage,
    scale,
    depth,
    isReady,
    preview,
    offSetY,
    showMenu,
    treeMenu,
    stageMenu,
    selection,
    itemLayer,
    menuItems,
    scrollRef,
    searchRef,
    menuWidth,
    menuHeight,
    itemLayerY,
    previewLayer,
    activeMenu,
    dimensions,
    connections,
    scrollLayer,
    menuPosition,
    handleMouseUp,
    handleMouseOut,
    handleMouseOver,
    handleMouseDown,
    handleContextMenu,
    handleScrollWheel,
    handleDragStart,
    handleDragmove,
    handleDragend,
    isDraggingMenu,
    isSelecting,
    debugNodes
  };
};
