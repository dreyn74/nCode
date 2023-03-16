/* eslint-disable*/
import { ref, computed } from "vue";
import { useMenu } from "./useMenu";
import Konva from "konva";

const { menu } = useMenu();

const itemSelected = ref(null);

const itemHovered = ref(null);

const itemBackground = ref(null);

let tween;

const background = computed(() => itemBackground.value?.getNode());

const handleMouseDown = (e, menuItem) => {
  // console.log(menuItem);
  menuItem.attrs.items.length
    ? (menuItem.attrs.showChildren = !menuItem.attrs.showChildren)
    : (itemSelected.value = menuItem);
};

const handleMouseOver = (e, menuItem) => {
  itemHovered.value = menuItem;

  /* if (tween) {
    tween.destroy();
  }

  const node = menuItem?.children.find(
    (item) => item.attrs.name === "itemBackground"
  );

  tween = new Konva.Tween({
    node,
    duration: 0.2,
    easing: Konva.Easings.EaseIn,
    opacity: 1,
    onFinish: () => {
      tween.destroy();
    }
  });
  tween.play(); */
};

const handleMouseOut = (e, menuItem) => {
  itemHovered.value = null;

  /* if (tween) {
    tween.destroy();
  }

  const node = menuItem?.children.find(
    (item) => item.attrs.name === "itemBackground"
  );

  tween = new Konva.Tween({
    node,
    duration: 0.2,
    easing: Konva.Easings.EaseOut,
    opacity: 0,
    onFinish: () => {
      tween.destroy();
    }
  });
  tween.play(); */
};

const offSetY = (menuItem, n) => {
  let offsetY = 0;
  for (let i = 1; i < n; i++) {
    menuItem.items[i - 1].showChildren
      ? (offsetY += menuItem.items[i - 1].items.length * 30)
      : "";
  }
  return n * 30 + offsetY;
};

const menuHeight = computed(() => {
  let height = menu.value?.item.length * 30;
  for (let i = 0; i < menu.value?.item.length; i++) {
    menu.value?.item[i].showChildren
      ? (height += menu.value?.item[i].menuItem.items.length * 30)
      : "";
  }
  return height;
});

export const useMenuItem = () => {
  return {
    offSetY,
    menuHeight,
    itemHovered,
    itemSelected,
    itemBackground,
    handleMouseDown,
    handleMouseOut,
    handleMouseOver
  };
};
