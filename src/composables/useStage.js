import { ref } from "vue";
import { useMenus } from "./useMenus";
import { useGrid } from "./useGrid";
import { useSelection } from "./useSelection";
import { useSocket } from "./useSocket";
import { useNode } from "./useNode";
import { useMenu } from "./useMenu";
import Konva from "konva";

const { menus } = useMenus();

const { drawGrid } = useGrid();

const { isSelecting, activeGroup } = useSelection();

const { socketDrawing, socketHovered } = useSocket();

const { nodes, nodeDrawing, nodeHovered } = useNode();

const {
  grid,
  stage,
  scale,
  preview,
  isReady,
  showMenu,
  selection,
  dimensions,
  connections,
  activeMenu,
  menuPosition,
  previewLayer
} = useMenu();

let zoom = 8;

const scales = [
  5,
  4.5,
  4,
  3.5,
  3,
  2.5,
  2,
  1.5,
  1,
  0.85,
  0.7,
  0.55,
  0.4,
  0.35,
  0.2,
  0.1
];

let preShowMenu = false;

const layer = ref(null);

const handleMouseOver = (e, stage) => {
  e = e || window.event;
  e.stopPropagation();
};

const handleDragStart = (e, stage) => {
  preShowMenu = false;
  drawGrid();
};

const handleDragmove = (e, stage) => {
  preShowMenu = false;
  drawGrid();
  /* layer.value.getNode().children.forEach((shape) => {
    // find cloned node
    const clone = previewLayer.value.getNode().findOne("." + shape.id());
    // update its position from the original
    clone.position(shape.position());
  }); */
  document.body.style.cursor = "grabbing";
};

const handleDragend = (e, stage) => {
  preShowMenu = false;
  drawGrid();
  document.body.style.cursor = "default";
};

const handleMouseDown = (e, stage) => {
  e = e || window.event;
  e.stopPropagation();
  const { x, y } = stage.getPointerPosition();
  if (!nodeHovered.value && e.button === 0) {
    const group = selection.value;
    if (!e.shiftKey) {
      group.nodes.length = 0;
    }
    selection.value = {
      ...group,
      start: { x, y },
      end: { x, y }
    };
    isSelecting.value = true;
  }
  if (showMenu.value) {
    showMenu.value = false;
    preShowMenu = false;
  }
  preShowMenu = true;
};

const handleMouseMove = (e, stage) => {
  e = e || window.event;
  e.preventDefault();
  const { x, y } = stage.getRelativePointerPosition();
  if (isSelecting.value) {
    const haveIntersection = (r1, r2) => {
      return !(
        r2.x > r1.x + r1.width ||
        r2.x + r2.width < r1.x ||
        r2.y > r1.y + r1.height ||
        r2.y + r2.height < r1.y
      );
    };
    const group = selection.value;
    group.end = { x, y };
    const box = {
      x: group.end.x < group.start.x ? group.end.x : group.start.x,
      y: group.end.y < group.start.y ? group.end.y : group.start.y,
      width: Math.abs(group.start.x - group.end.x),
      height: Math.abs(group.start.y - group.end.y)
    };

    nodes.forEach((node) => {
      if (haveIntersection(node, box)) {
        if (!group.nodes.find((item) => item === node.id)) {
          group.nodes.push(node.id);
        }
      } else if (!e.shiftKey) {
        if (group.nodes.find((item) => item === node.id)) {
          group.nodes.splice(group.nodes.indexOf(node.id), 1);
        }
      }
    });
  }
  if (nodeDrawing.value && connections.length) {
    const connection = connections[connections.length - 1];
    const pos = connection.start;
    const flip = socketDrawing.value.attrs.configType === "Input";
    // get the square root of the sum of the squares of each position
    var dp1wp2 = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
    // bezier control points
    connection.control1 = {
      x: flip ? pos.x - dp1wp2 * 0.5 : pos.x + dp1wp2 * 0.5,
      y: pos.y
    };
    connection.control2 = {
      x: flip ? x + dp1wp2 * 0.5 : x - dp1wp2 * 0.5,
      y: y
    };
    connection.end = { x, y };
    connection.isConnected = false;
    connection.filters = Konva.Filters.Invert;
  }
  stage.batchDraw();
};

const handleMouseUp = (e, stage) => {
  e = e || window.event;
  isSelecting.value = false;
  if (socketDrawing.value) {
    if (!socketHovered.value) {
      connections.pop();
    }
    socketDrawing.value = null;
    nodeDrawing.value = null;
  }
  if (showMenu.value) {
    showMenu.value = false;
    preShowMenu = false;
  }
  preShowMenu = true;
};

const handleContext = (e, stage) => {
  e = e || window.event;
  e.preventDefault();
  const { x, y } = stage.getPointerPosition();
  isSelecting.value = false;
  if (!stage.isDragging() && preShowMenu) {
    if (nodeHovered.value) {
      activeMenu.value = menus[1];
    } else {
      activeMenu.value = menus[0];
    }
    showMenu.value = true;
    menuPosition.value = { x: x - 20, y: y - 20 };
  } else {
    preShowMenu = false;
  }
};

const handleOnWheel = (e, stage) => {
  e = e || window.event;
  e.preventDefault();

  const oldScale = stage.scaleX();

  const { x, y } = stage.getPointerPosition();

  const mousePointTo = {
    x: (x - stage.x()) / oldScale,
    y: (y - stage.y()) / oldScale
  };

  zoom = // (note) direction on trackpad is reversed
    e.deltaY < 0 // zoom in
      ? zoom === 8 // limit zoom in to 1:1
        ? e.ctrlKey // unless e.ctrlKey is pressed
          ? zoom > 0
            ? zoom - 1
            : zoom
          : zoom
        : zoom > 0
        ? zoom - 1
        : zoom
      : zoom < scales.length - 1 // zoom out
      ? zoom + 1
      : zoom;

  const newScale = scales[zoom];
  scale.value = Math.floor(1.25 / newScale);

  const newPos = {
    x: -(mousePointTo.x - x / newScale) * newScale,
    y: -(mousePointTo.y - y / newScale) * newScale
  };

  stage.scale({ x: newScale, y: newScale });

  stage.position(newPos);
  drawGrid();
  stage.batchDraw();
};

const initialize = () => {
  const { width, height } = dimensions.value;
  Konva.dragButtons = [2];
  for (var i = 0; i < 5; i++) {
    nodes.push({
      x: width * Math.random(),
      y: height * Math.random(),
      width: 220,
      height: 100,
      id: Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
        .toString(),
      isLocked: false,
      draggable: true,
      connections: [],
      sockets: [
        {
          id: Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
            .toString(),
          x: 20,
          y: 65,
          configType: "Input",
          connections: []
        },
        {
          id: Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
            .toString(),
          x: 178,
          y: 65,
          configType: Math.random() < 0.5 ? "Execution" : "Output",
          connections: []
        }
      ]
    });
  }
  isReady.value = true;
};

export const useStage = () => {
  return {
    stage,
    grid,
    layer,
    nodes,
    preview,
    selection,
    dimensions,
    connections,
    nodeDrawing,
    activeGroup,
    isSelecting,
    handleContext,
    handleOnWheel,
    handleMouseUp,
    handleMouseMove,
    handleMouseDown,
    handleMouseOver,
    handleDragStart,
    handleDragmove,
    handleDragend,
    initialize,
    isReady
  };
};
