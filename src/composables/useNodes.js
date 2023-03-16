import { ref } from "vue";

const configRect = ref({
  width: 196,
  height: 105,
  fill: "black", // "rgba(55, 44, 44, .67)",
  cornerRadius: 10,
  shadowBlur: 10,
  opacity: 0.62
});

const configHeader = ref({
  width: 196,
  height: 35,
  fillPriority: "radial-gradient",
  fillRadialGradientStartPoint: {
    x: -300,
    y: -400
  },
  fillRadialGradientStartRadius: 750,
  fillRadialGradientColorStops: [0, "black", 0.95, "blue", 1, "white"],
  cornerRadius: [10, 10, 0, 0],
  opacity: 0.95
});

export const useNodes = () => {
  return {
    configRect,
    configHeader
  };
};
