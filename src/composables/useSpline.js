import { ref, computed } from "vue";
import Konva from "konva";

const curveHovered = ref(null);

const curveSelected = ref(null);

const message = ref(null);

const filters = ref([
  Konva.Filters.Blur,
  Konva.Filters.Sepia,
  Konva.Filters.Invert
]);

let tween;

const messageWidth = computed(() => {
  const msg = message.value.getNode();
  return msg.getTextWidth();
});

const fadeIn = (duration) => {
  return new Konva.Animation((frame) => frame.time / duration);
};

const handleMouseOver = (e, node) => {
  e = e || window.event;
  e.stopPropagation();

  if (tween) {
    tween.destroy();
  }
  tween = new Konva.Tween({
    node,
    duration: 0.5,
    easing: Konva.Easings.EaseIn,
    blurRadius: 12,
    strokeWidth: 5,
    onFinish: () => {
      tween.destroy();
    }
  });
  tween.play();
};

const handleMouseOut = (e, node) => {
  e = e || window.event;
  if (tween) {
    tween.destroy();
  }
  tween = new Konva.Tween({
    node,
    duration: 0.5,
    easing: Konva.Easings.EaseOut,
    blurRadius: 7,
    strokeWidth: 3,
    onFinish: () => {
      tween.destroy();
    }
  });
  tween.play();
};

export const useSpline = () => {
  return {
    fadeIn,
    filters,
    message,
    messageWidth,
    curveHovered,
    curveSelected,
    handleMouseOut,
    handleMouseOver
  };
};
