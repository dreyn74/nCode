import { ref } from "vue";
import { useMenu } from "./useMenu";

const { connections } = useMenu();

const anchorHovered = ref(null);

const anchorDragging = ref(null);

const handleMouseOver = (e, node) => {
  anchorHovered.value = node;
  document.body.style.cursor = "move";
};

const handleMouseOut = (e, node) => {
  anchorHovered.value = null;
  document.body.style.cursor = "default";
};

const handleDragMove = (e, node) => {
  anchorDragging.value = node;

  let connection = node.connection;

  let terminals = [];

  for (const node of connection.nodes) {
    for (const terminal of node.connections) {
      terminals.push({
        node,
        id: terminal.id,
        type: terminal.configType,
        connections: terminal.connections
      });
    }
  }

  for (const terminal of terminals) {
    const p1 = terminal.node;

    const destinations = nodes.filter((item) =>
      item.connections.find((item) => item.id !== terminal.id)
    );

    for (const p2 of destinations) {
      var dp1wp2 = Math.sqrt(
        //the two positions squared and combined
        Math.pow(p2.x, 2) + Math.pow(p2.y, 2)
      );

      // update bezier points
      connection.start = { x: Math.floor(p1.x), y: Math.floor(p1.y) };
      connection.control1 = {
        x: Math.floor(p1.x) + Math.floor(dp1wp2) * 0.5,
        y: Math.floor(p1.y)
      };
      connection.control2 = {
        x: Math.floor(p2.x) - Math.floor(dp1wp2) * 0.5,
        y: Math.floor(p2.y)
      };
      connection.end = { x: Math.floor(p2.x), y: Math.floor(p2.y) };

      // update anchor position
      const anchor1 = node.attrs;
      const anchor2 = a2.value.konvaAnchor.getNode().attrs;
      // console.log(anchor1);
      anchor1.x = Math.floor(connection.control1.x);
      anchor1.y = Math.floor(connection.control1.y);
      anchor2.x = Math.floor(connection.control2.x);
      anchor2.y = Math.floor(connection.control2.y);
    }
  }
};

const handleDragEnd = (e, node) => {
  anchorDragging.value = null;
};

export const useDebug = () => {
  return {
    handleDragEnd,
    handleDragMove,
    handleMouseOut,
    handleMouseOver
  };
};
