/* eslint-disable*/
import { ref, computed } from "vue";
import { useMenu } from "./useMenu";
import Konva from "konva";

const { treeMenu } = useMenu();

const itemSelected = ref(null);

const itemHovered = ref(null);

const itemBackground = ref(null);

let tween;

const background = computed(() => itemBackground.value?.getNode());

const handleMouseDown = (e, menuItem) => {
  console.log(menuItem);
  const item = treeMenu?.items.find((item) => item === menuItem);
  // console.log(item /* menuItem */);
  if (item?.items.length) {
    /* item.setAttrs({
      // showChildren: showChildren
      showChildren: !menuItem.showChildren
    }); */
    item.showChildren = !item.showChildren;
  } else {
    itemSelected.value = menuItem;
  }
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

const offSetY = (n) => {
  let offsetY = 30;
  for (let i = 1; i < n + 1; i++) {
    treeMenu.value?.items[i - 1]?.showChildren
      ? (offsetY += treeMenu.value?.items[i - 1]?.items.length * 30)
      : "";
  }
  return n * 30 + offsetY;
};

const menuHeight = computed(() => {
  let height = treeMenu.value?.items?.length * 30;
  for (let i = 0; i < treeMenu.value?.items?.length; i++) {
    treeMenu.value?.items[i].showChildren
      ? (height += treeMenu.value?.items[i]?.items.length * 30)
      : "";
  }
  return height;
});

export const useTreeMenu = () => {
  return {
    offSetY,
    treeMenu,
    menuHeight,
    itemHovered,
    itemSelected,
    itemBackground,
    handleMouseDown,
    handleMouseOut,
    handleMouseOver
  };
};
