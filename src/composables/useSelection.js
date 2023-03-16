import { ref } from "vue";
import { useMenu } from "./useMenu";

const { isSelecting } = useMenu();

const activeGroup = ref(null);

export const useSelection = () => {
  return {
    activeGroup,
    isSelecting
  };
};
