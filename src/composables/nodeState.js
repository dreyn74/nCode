/* eslint-disable */
import { ref, reactive } from "vue";

const errors = ref([]);

const history = reactive([]);

const historyStash = reactive([]);
/* const localState = reactive({
    someString: "Initial value",
    someBoolean: false
  }); */

const resetHistory = () => {
  history.length = 0;
  /* LocalStorage.set("history", history.value); */
};

const resetHistoryStash = () => {
  historyStash.length = 0;
  /* LocalStorage.set("historyStash", historyStash.value); */
};

const addEntry = (newState) => {
  history.push(newState);
  /* LocalStorage.set("history", history.value); */
  /* LocalStorage.set("historyStash", historyStash.value); */
  /* setState(); */
};

const undo = () => {
  historyStash.push(history.pop());
  /* setState(); */
};

const redo = () => {
  history.push(historyStash.pop());
  /* setState(); */
};

export const nodeState = () => {
  return {
    undo,
    redo,
    errors,
    history,
    addEntry,
    historyStash,
    resetHistory,
    resetHistoryStash
  };
};
