import { ref } from "vue";
import { useMenu } from "./useMenu";
import Konva from "konva";

const { stage, dimensions } = useMenu();

const gridLayer = ref(null);

const backgroundColor = ref(`#226699`);

const gridColor = ref(`rgba(255, 255, 255, 0.3)`);

const stepSize = 16; // set a value for the grid step gap.

const drawGrid = () => {
  const STAGE = stage.value?.getStage();
  const { width, height } = dimensions.value;
  gridLayer.value.getNode().clear();
  gridLayer.value.getNode().destroyChildren();
  gridLayer.value.getNode().clipWidth(null); // clear any clipping

  const unScale = (val) => val / STAGE.scaleX();

  /* Configure the rects for the grid line drawing process */
  const stageRect = {
    x1: 0,
    y1: 0,
    x2: STAGE.width(),
    y2: STAGE.height(),
    offset: {
      x: unScale(STAGE.getX()),
      y: unScale(STAGE.getY())
    }
  };

  const viewRect = {
    x1: -stageRect.offset.x,
    y1: -stageRect.offset.y,
    x2: unScale(width) - stageRect.offset.x,
    y2: unScale(height) - stageRect.offset.y
  };

  // and find the largest rectangle that bounds both the stage and view rect.
  // This is the rect we will draw on.
  const fullRect = {
    x1: Math.min(stageRect.x1, viewRect.x1),
    y1: Math.min(stageRect.y1, viewRect.y1),
    x2: Math.max(stageRect.x2, viewRect.x2),
    y2: Math.max(stageRect.y2, viewRect.y2)
  };

  // set clip function to stop leaking lines into non-viewable space.
  gridLayer.value.getNode().clip({
    x: viewRect.x1,
    y: viewRect.y1,
    width: viewRect.x2 - viewRect.x1,
    height: viewRect.y2 - viewRect.y1
  });

  const // find the x & y size of the grid
    xSize = fullRect.x2 - fullRect.x1,
    ySize = fullRect.y2 - fullRect.y1,
    // compute the number of steps required on each axis.
    xSteps = Math.round(xSize / stepSize),
    ySteps = Math.round(ySize / stepSize);

  // console.log(xSteps, ySteps);
  // vertical lines
  for (let i = 0; i <= xSteps; i++) {
    gridLayer.value.getNode().add(
      new Konva.Line({
        x: fullRect.x1 + i * stepSize,
        y: fullRect.y1,
        points: [0, 0, 0, ySize],
        stroke:
          i % 10 === 0 ? "rgba(25, 25, 25, 0.25)" : "rgba(255, 255, 255, 0.2)",
        strokeWidth: i % 10 === 0 ? 2 : 1
      })
    );
  }
  // horizontal lines
  for (let i = 0; i <= ySteps; i++) {
    gridLayer.value.getNode().add(
      new Konva.Line({
        x: fullRect.x1,
        y: fullRect.y1 + i * stepSize,
        points: [0, 0, xSize, 0],
        stroke:
          i % 10 === 0 ? "rgba(25, 25, 25, 0.25)" : "rgba(255, 255, 255, 0.2)",
        strokeWidth: i % 10 === 0 ? 2 : 1
      })
    );
  }

  var viewPort = new Konva.Rect({
    x: viewRect.x1,
    y: viewRect.y1,
    width: unScale(width) - 4,
    height: unScale(height) - 4,
    strokeWidth: 4,
    stroke: "blue"
  });

  gridLayer.value.getNode().add(
    new Konva.Line({
      x: 0,
      y: 0,
      points: [fullRect.x1, 0, fullRect.x2, 0],
      stroke: "rgba(25, 25, 25, 0.67)",
      strokeWidth: 2
    })
  );
  gridLayer.value.getNode().add(
    new Konva.Line({
      x: 0,
      y: 0,
      points: [0, fullRect.y1, 0, fullRect.y2],
      stroke: "rgba(25, 25, 25, 0.67)",
      strokeWidth: 2
    })
  );

  gridLayer.value.getNode().add(viewPort);
  gridLayer.value.getNode().batchDraw();
};

export const useGrid = () => {
  return { gridLayer, backgroundColor, gridColor, drawGrid };
};
