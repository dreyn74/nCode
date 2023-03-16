import { ref } from "vue";
import { useNode } from "./useNode";
import { useMenu } from "./useMenu";
/* import { useEvent } from "./useEvent"; */
import Konva from "konva";

const { connections } = useMenu();

const { nodes, nodeDrawing, nodeHovered } = useNode();

const socketDrawing = ref(null);

const socketHovered = ref(null);

let tween;

const handleMouseOver = (e, socket) => {
  e = e || window.event;
  e.stopPropagation();
  // e.preventDefault();
  socketHovered.value = socket;

  if (tween) {
    tween.destroy();
  }
  tween = new Konva.Tween({
    node: socket,
    duration: 0.5,
    easing: Konva.Easings.ElasticEaseIn,
    scaleX: 1.1,
    scaleY: 1.1,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    onFinish: () => {
      tween.destroy();
    }
  });
  tween.play();

  document.body.style.cursor = "crosshair";

  if (nodeDrawing.value && connections.length) {
    const connection = connections[connections.length - 1];
    if (nodeDrawing.value && nodeDrawing.value !== nodeHovered.value) {
      const node = nodes.find((item) => item.id === nodeDrawing.value.attrs.id);
      const socketStart = node.sockets.find(
        (item) => item.id === socketDrawing.value.attrs.id
      );
      if (socketStart.configType === socketHovered.value.attrs.configType) {
        connection.message = "Directions are not compatable.";
      } else {
        connection.message = "Connect.";
      }
    }
  }
};

const handleMouseOut = (e, socket) => {
  e = e || window.event;
  // e.stopPropagation();
  // e.preventDefault();
  socketHovered.value = null;

  if (tween) {
    tween.destroy();
  }
  tween = new Konva.Tween({
    node: socket,
    duration: 0.5,
    easing: Konva.Easings.ElasticEaseOut,
    scaleX: 1,
    scaleY: 1,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    onFinish: () => {
      tween.destroy();
    }
  });
  tween.play();

  document.body.style.cursor = "default";
  if (nodeDrawing.value) {
    const connection = connections[connections.length - 1];
    connection.message = "Place a new node.";
  }
};

const handleMouseDown = (e, socket) => {
  e = e || window.event;
  if (e.ctrlKey) {
    const nCode = nodes.find((node) => node.id === nodeHovered.value.attrs.id);
    if (!nodeDrawing.value) {
      e.stopPropagation();
      if (nCode.connections.length) {
        for (const connection of nCode.connections) {
          const cnx = connections.find((item) => item.id === connection);
        }
      }
    }
  } else {
    socketDrawing.value = socket;
    nodeDrawing.value = nodeHovered.value;

    const nodeStart = nodeDrawing.value.attrs;

    const { x, y } = nodeStart;

    const socketStart = socketDrawing.value.attrs;

    connections.push({
      id: Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
        .toString(),
      start: { x: x + socketStart.x, y: y + socketStart.y },
      control1: {},
      control2: {},
      end: { x: x + socketStart.x, y: y + socketStart.y },
      nodeStartId: nodeStart.id,
      nodeFinishId: null,
      socketStartId: socketStart.id,
      socketFinishId: null,
      stroke: "lightBlue",
      strokeWidth: 3,
      isConnected: false,
      message: "Place a new node."
    });
  }
};

const handleMouseUp = (e, socket) => {
  if (nodeDrawing.value && nodeDrawing.value !== nodeHovered.value) {
    const nodeStart = nodes.find(
      (node) => node.id === nodeDrawing.value.attrs.id
    );
    const socketStart = nodeStart.sockets.find(
      (item) => item.id === socketDrawing.value.attrs.id
    );
    if (socketStart.configType !== socketHovered.value.attrs.configType) {
      const connection = connections[connections.length - 1];
      const nodeFinish = nodes.find(
        (node) => node.id === nodeHovered.value.attrs.id
      );

      const socketFinish = nodeFinish.sockets.find(
        (item) => item.id === socketHovered.value.attrs.id
      );

      connection.isConnected = true;
      connection.nodeStartId = nodeStart.id;
      connection.nodeFinishId = nodeFinish.id;
      connection.socketStartID = socketStart.id;
      connection.socketFinishId = socketFinish.id;

      socketStart.connections.push(connection.id);
      socketFinish.connections.push(connection.id);

      nodeStart.connections.push(connection.id);
      nodeFinish.connections.push(connection.id);
    } else {
      connections.pop();
    }
  } else {
    connections.pop();
  }
};

export const useSocket = () => {
  return {
    socketDrawing,
    socketHovered,
    handleMouseUp,
    handleMouseOut,
    handleMouseOver,
    handleMouseDown
  };
};
