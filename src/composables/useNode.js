import { ref, reactive } from "vue";
import { useMenu } from "./useMenu";
import Konva from "konva";

const { connections, selection, debugNodes } = useMenu();

const nodes = reactive([]);

const nodeDrawing = ref(null);

const nodeHovered = ref(null);

const nodeDragging = ref(null);

let tween;

const handleMouseUp = (e, node) => {};

const handleMouseOut = (e, node) => {
  e = e || window.event;
  // e.stopPropagation();
  // e.preventDefault();
  Konva.dragButtons = [2];
  nodeHovered.value = null;
  document.body.style.cursor = "default";
};

const handleMouseDown = (e, node) => {
  e = e || window.event;
  // e.stopPropagation();
  // e.preventDefault();
  const group = selection.value;
  if (e.ctrlKey) {
    if (group.nodes.find((item) => item === node.id())) {
      group.nodes = group.nodes.filter((item) => item !== node.id());
    }
  } else {
    const nCode = nodes.find((item) => item.id === node.id());
    // move current element to the top:
    const index = nodes.indexOf(nCode);
    nodes.splice(index, 1);
    nodes.push(nCode);
    if (e.shiftKey) {
      if (!group.nodes.find((item) => item === nCode.id)) {
        group.nodes.push(nCode.id);
      }
    } else {
      if (!group.nodes.find((item) => item === nCode.id)) {
        group.nodes = [nCode.id];
      }
    }
  }
};

const handleMouseOver = (e, node) => {
  e = e || window.event;
  // e.stopPropagation();
  // e.preventDefault();
  Konva.dragButtons = [0];
  nodeHovered.value = node;

  document.body.style.cursor = "move";
};

const handleDragStart = (e, node) => {
  e = e || window.event;
  // e.stopPropagation();
  e.preventDefault();

  debugNodes.length = 0;

  // node.moveToTop();

  // save drag element:
  nodeDragging.value = node;

  if (tween) {
    tween.pause();
  }
  tween = new Konva.Tween({
    node,
    duration: 0.5,
    easing: Konva.Easings.ElasticEaseIn,
    scaleX: 1.1,
    scaleY: 1.1,
    shadowOffsetX: 15,
    shadowOffsetY: 15,
    onFinish: () => {
      tween.destroy();
    }
  });
  tween.play();
};

const handleDragMove = (e, node) => {
  debugNodes.length = 0;

  const nCode = nodes.find((item) => item.id === nodeDragging.value.id());

  const { x, y } = nodeDragging.value.position();

  const group = selection.value;
  for (const nodeId of group.nodes) {
    const item = nodes.find((i) => i.id === nodeId);
    item.x = item.id === nCode.id ? x : x + (x - item.x);
    item.y = item.id === nCode.id ? y : y + (y - item.y);
  }

  if (nCode.connections.length) {
    if (!debugNodes.includes(nCode)) {
      debugNodes.push(nCode);
    }
    for (const connection of nCode.connections) {
      const cnx = connections.find((item) => item.id === connection);

      const socketDragging = nCode.sockets.find((item) =>
        item.connections.find((i) => i === cnx.id)
      );
      const nodeFixedId =
        cnx.nodeStartId === nCode.id ? cnx.nodeFinishId : cnx.nodeStartId;

      const versa = nodeFixedId !== cnx.nodeStartId;

      const nodeFixed = nodes.find((item) => item.id === nodeFixedId);

      if (!debugNodes.includes(nodeFixed)) {
        debugNodes.push(nodeFixed);
      }

      const socketFixed = nodeFixed.sockets.find((item) =>
        item.connections.find((i) => i === cnx.id)
      );

      // save the position of the square root of
      const dp1wp2 = Math.sqrt(
        versa
          ? Math.pow(x + socketDragging.x - nodeFixed.x, 2) +
              Math.pow(y + socketDragging.y - nodeFixed.y, 2)
          : Math.pow(nodeFixed.x + socketFixed.x - x, 2) +
              Math.pow(nodeFixed.y + socketFixed.y - y, 2)
      );

      cnx.start = {
        x: nodeFixed.x + socketFixed.x,
        y: nodeFixed.y + socketFixed.y
      };
      cnx.control1 = {
        x: versa
          ? nodeFixed.x + socketFixed.x - dp1wp2 * 0.5
          : nodeFixed.x + socketFixed.x + dp1wp2 * 0.5,
        y: nodeFixed.y + socketFixed.y
      };
      cnx.control2 = {
        x: versa
          ? x + socketDragging.x + dp1wp2 * 0.5
          : x + socketDragging.x - dp1wp2 * 0.5,
        y: y + socketDragging.y
      };
      cnx.end = {
        x: x + socketDragging.x,
        y: y + socketDragging.y
      };
    }
  }
};

const handleDragEnd = (e, node) => {
  e = e || window.event;
  // e.stopPropagation();
  // e.preventDefault();

  nodeDragging.value = null;

  if (tween) {
    tween.pause();
  }
  tween = new Konva.Tween({
    node,
    duration: 0.5,
    easing: Konva.Easings.ElasticEaseOut,
    scaleX: 1,
    scaleY: 1,
    shadowOffsetX: 5,
    shadowOffsetY: 5,
    onFinish: () => {
      tween.destroy();
    }
  });
  tween.play();
};

const handleNodeDelete = (nodeId) => {
  const nCode = nodes.find((item) => item.id === nodeId);
  const group = selection.value;
  if (connections.length) {
    const cnxs = connections.filter(
      (cnx) => cnx.nodeStartId === nodeId || cnx.nodeFinishId === nodeId
    );
    for (const cnx of cnxs) {
      const nodeStart = nodes.find((item) => item.id === cnx.nodeStartId);

      nodeStart.connections = nodeStart.connections.filter(
        (item) => item !== cnx.id
      );

      const socketStart = nodeStart.sockets.find((socket) =>
        socket.connections.find((item) => item === cnx.id)
      );

      socketStart.connections = socketStart.connections.filter(
        (item) => item !== cnx.id
      );

      const nodeFinish = nodes.find((item) => item.id === cnx.nodeFinishId);

      nodeFinish.connections = nodeFinish.connections.filter(
        (item) => item !== cnx.id
      );

      const socketFinish = nodeFinish.sockets.find((socket) =>
        socket.connections.find((item) => item === cnx.id)
      );

      socketFinish.connections = socketFinish.connections.filter(
        (item) => item !== cnx.id
      );

      connections.splice(connections.indexOf((item) => item.id === cnx.id));
    }
  }

  group.nodes = group.nodes.filter((item) => item !== nodeId);

  nodes.splice(nodes.indexOf(nCode), 1);
};

export const useNode = () => {
  return {
    nodes,
    selection,
    nodeDrawing,
    nodeHovered,
    nodeDragging,
    handleMouseUp,
    handleMouseOut,
    handleMouseOver,
    handleMouseDown,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleNodeDelete
  };
};
