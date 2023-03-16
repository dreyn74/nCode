import { useMenu } from "./useMenu";
import Konva from "konva";
let tween;

const { stage, menuItems, menuHeight, itemLayerY } = useMenu();

const handleMouseOver = (e, node) => {
  if (tween) {
    tween.destroy();
  }

  tween = new Konva.Tween({
    node,
    duration: 0.2,
    easing: Konva.Easings.EaseIn,
    opacity: 0.8,
    onFinish: function () {
      tween.destroy();
    }
  });
  tween.play();
};

const handleMouseOut = (e, node) => {
  if (tween) {
    tween.destroy();
  }

  tween = new Konva.Tween({
    node,
    duration: 0.2,
    easing: Konva.Easings.EaseOut,
    opacity: 0.25,
    onFinish: function () {
      tween.destroy();
    }
  });
  tween.play();
};

const handleDragMove = (e, scrollRef) => {
  const HEIGHT = menuItems?.getNode().height(); // menuHeight();

  const STAGE = stage.value?.getStage();

  const layer = menuItems.value?.getNode();

  // delta in %
  const availableHeight =
    STAGE.height() - itemLayerY.value - scrollRef.height();

  const delta = (scrollRef.y() - 5) / availableHeight;

  layer.y(-(HEIGHT - STAGE.height()) * delta);
};

export const useScrollBar = () => {
  return {
    handleMouseOut,
    handleDragMove,
    handleMouseOver
  };
};
