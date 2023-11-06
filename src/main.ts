import { defaultLineWidth } from "./config";
import { drawEyes } from "./face-components/eyes";
import { drawFaceLine } from "./faceline";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d");

if (!context) {
  const errMsg = "Failed to initialize context.";
  alert(`Something is technically wrong. This is probably a bug. Apologies for the inconvenience. Cause: ${errMsg}`);
  throw new Error(errMsg);
}

context.lineWidth = defaultLineWidth;

const { faceCenterX, defaultEyeY, defaultNoseY, defaultMouseY } = drawFaceLine(context);
drawEyes(context);

