import { ref, computed } from "vue";
import { useMenu } from "./useMenu";

const { stage } = useMenu();

const textNode = ref(null);

const searchHovered = ref(false);

const searchSelected = ref(false);

const query = computed(() => textNode.value?.getNode().text);

const handleOnClick = (e) => {
  e = e || window.event;
  /* e.stopPropagation(); */
  const text = textNode.value?.getNode();

  const container = stage.value?.getStage().container();

  // hide text node:
  text.hide();

  // create textarea over canvas with absolute position
  // using textNode position relative to the stage:
  const position = text.absolutePosition();
  // so position of textarea will be the sum of positions above:
  const areaPosition = {
    x: container.offsetLeft + position.x,
    y: container.offsetTop + position.y
  };

  // create and style the textarea
  let textarea = document.createElement("textarea");
  document.body.appendChild(textarea);

  // apply styles to match text on canvas as close as possible
  textarea.placeholder = /* "Search" */ text.text();
  textarea.style.zIndex = 99;
  textarea.style.color = text.fill();
  textarea.style.margin = "0px";
  textarea.style.border = "none";
  textarea.style.padding = "0px";
  textarea.style.resize = "none";
  textarea.style.outline = "none";
  textarea.style.overflow = "hidden";
  textarea.style.background = "none";
  textarea.style.position = "absolute";
  textarea.style.textAlign = text.align();
  textarea.style.top = `${areaPosition.y - 1}px`;
  textarea.style.left = `${areaPosition.x}px`;
  textarea.style.transformOrigin = "left top";
  textarea.style.lineHeight = text.lineHeight();
  textarea.style.fontFamily = text.fontFamily();
  textarea.style.fontSize = `${text.fontSize()}px`;
  textarea.style.width = `${text.width() - text.padding() * 2}px`;
  textarea.style.height = `${text.height() - text.padding() * 2 + 5}px`;

  // reset height
  textarea.style.height = "auto";
  // after browsers resized it we can set actual value
  textarea.style.height = textarea.scrollHeight + 3 + "px";

  textarea.focus();

  const removeTextarea = () => {
    textarea.style.zIndex = -1;
    textarea.parentNode.removeChild(textarea);
    window.removeEventListener("click", handleOutsideClick);
    text.show();
  };

  textarea.addEventListener("keydown", (e) => {
    e = e || window.event;
    // hide on enter
    // but don't hide on shift + enter
    text.text(textarea.value);
    if (e.key === "Enter" && !e.key === "shiftKey") {
      text.text(textarea.value);
      removeTextarea();
    }
    // on esc do not set value back to node
    if (e.key === "Escape") {
      if (text.text() === "") {
        text.text("Search...");
      }
      removeTextarea();
    }
  });

  const handleOutsideClick = (e) => {
    if (e.target !== textarea) {
      text.text(textarea.value);
      removeTextarea();
    }
  };

  setTimeout(() => {
    window.addEventListener("click", handleOutsideClick);
  }, 100);
};

const handleMouseOut = (e, text) => {
  searchHovered.value = false;
  /*   if (textarea !== null) {
    text.text(textarea.value);
    removeTextarea();
  } */
};

const handleMouseOver = (e, text) => {
  searchHovered.value = true;
};

const handleClearText = (e, text) => {
  text.text("");
};

export const useSearchBar = () => {
  return {
    textNode,
    query,
    searchHovered,
    searchSelected,
    handleOnClick,
    handleMouseOut,
    handleMouseOver,
    handleClearText
  };
};
