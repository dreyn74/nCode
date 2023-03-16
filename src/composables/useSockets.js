import { ref } from "vue";

const tag = ref(null);
const topper = ref(null);

const configTarget = ref({
  radius: 7,
  stroke: "black",
  fill: "green",
  strokeWidth: 1,
  shadowColor: "black",
  shadowBlur: 5,
  shadowOffset: { x: 2, y: 2 },
  shadowOpacity: 0.35
});

const configTopper = ref({
  radius: 3,
  stroke: "black",
  fill: "black",
  strokeWidth: 3
});

export const useSockets = () => {
  return {
    tag,
    topper,
    configTarget,
    configTopper
  };
};
