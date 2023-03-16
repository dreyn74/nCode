const AVAILABLE_STATUS = {
  LOADING: 0,
  UPDATING: 1,
  READY: 2,
  ERROR: 3
};

const menus = [
  {
    label: "All actions for this blueprint.",
    width: 420,
    height: 400,
    searchBar: {
      x: 5,
      y: 26,
      width: 410,
      height: 20,
      fill: "#101010",
      borderColor: "blue",
      borderSize: 2,
      cornerRadius: [10, 10, 10, 10]
    },
    mainColor: "#404040",
    backgroundColor: "#202020",
    text: { fontSize: 14, color: "lightGray" },
    title: {
      height: 24,
      text: { fontSize: 18, fontFamily: "roboto", color: "lightGray" }
    },
    description: "Select a component to view available events and functions.",
    items: [
      {
        label: "Math",
        description: "Math Operations",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: [
          {
            label: "Add",
            description: "Addition",
            backgroundColor: "#606060",
            text: { fontSize: 14, color: "lightGray" }
          },
          {
            label: "Subtract",
            description: "Subtraction",
            backgroundColor: "#606060",
            text: { fontSize: 14, color: "lightGray" }
          }
        ]
      },
      {
        label: "Variable",
        description: "Variables",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: [
          {
            label: "Number",
            description: "Number Variable",
            backgroundColor: "#606060",
            text: { fontSize: 14, color: "lightGray" }
          },
          {
            label: "String",
            description: "String Variable",
            backgroundColor: "#606060",
            text: { fontSize: 14, color: "lightGray" }
          },
          {
            label: "Object",
            description: "Object Variable",
            backgroundColor: "#606060",
            text: { fontSize: 14, color: "lightGray" }
          },
          {
            label: "Array",
            description: "Array Variable",
            backgroundColor: "#606060",
            text: { fontSize: 14, color: "lightGray" }
          },
          {
            label: "Boolean",
            description: "Boolean Variable",
            backgroundColor: "#606060",
            text: { fontSize: 14, color: "lightGray" },
            items: [
              {
                label: "AND",
                description: "and Boolean",
                backgroundColor: "#606060",
                text: { fontSize: 14, color: "lightGray" },
                items: []
              },
              {
                label: "OR",
                description: "or Boolean",
                backgroundColor: "#606060",
                text: { fontSize: 14, color: "lightGray" },
                items: []
              },
              {
                label: "NOT",
                description: "not Boolean",
                backgroundColor: "#606060",
                text: { fontSize: 14, color: "lightGray" },
                items: []
              },
              {
                label: "XOR",
                description: "xor Boolean",
                backgroundColor: "#606060",
                text: { fontSize: 14, color: "lightGray" },
                items: []
              }
            ]
          }
        ]
      },
      {
        label: "Output",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 1",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 2",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 3",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 4",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 5",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 6",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 7",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 8",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 9",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 10",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 11",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 12",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 13",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 14",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 15",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 16",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 17",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 18",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 19",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      },
      {
        label: "Scroll Test 20",
        description: "Result of an operation.",
        backgroundColor: "#606060",
        text: { fontSize: 14, color: "lightGray" },
        items: []
      }
    ]
  },
  {
    label: "Node Actions.",
    width: 150,
    height: 200,
    searchBar: null,
    description: null,
    mainColor: "#444",
    text: { fontSize: 14, color: "lightGray" },
    title: { height: 10, text: { fontSize: 12, color: "#888" } },
    backgroundColor: "#444",
    items: [
      {
        label: "Edit",
        description: "Edit Node",
        backgroundColor: "#ccc",
        text: { fontSize: 14, color: "white" },
        items: [
          {
            label: "Cut",
            description: "Cut node",
            backgroundColor: "#ccc",
            text: { fontSize: 14, color: "white" }
          },
          {
            label: "Copy",
            description: "Copy node",
            backgroundColor: "#ccc",
            text: { fontSize: 14, color: "white" }
          },
          {
            label: "Paste",
            description: "paste node",
            backgroundColor: "#ccc",
            text: { fontSize: 14, color: "white" }
          },
          {
            label: "Rename",
            description: "rename node",
            backgroundColor: "#ccc",
            text: { fontSize: 14, color: "white" }
          }
        ]
      },
      {
        label: "alignment",
        description: "align to another node",
        backgroundColor: "#ccc",
        text: { fontSize: 14, color: "white" },
        items: [
          {
            label: "Top",
            description: null,
            backgroundColor: "#ccc",
            text: { fontSize: 14, color: "white" }
          },
          {
            label: "Middle",
            description: null,
            backgroundColor: "#ccc",
            text: { fontSize: 14, color: "white" }
          },
          {
            label: "Bottom",
            description: null,
            backgroundColor: "#ccc",
            text: { fontSize: 14, color: "white" }
          },
          {
            label: "Left",
            description: null,
            backgroundColor: "#ccc",
            text: { fontSize: 14, color: "white" }
          }
        ]
      },
      {
        label: "lock",
        description: "Lock node.",
        backgroundColor: "#ccc",
        text: { fontSize: 14, color: "white" },
        items: []
      },
      {
        label: "delete",
        description: "Delete node.",
        backgroundColor: "#ccc",
        text: { fontSize: 14, color: "white" },
        items: []
      }
    ]
  }
];

export const useMenus = () => {
  return {
    menus
    /* foo: toRefs(menus), */
  };
};
