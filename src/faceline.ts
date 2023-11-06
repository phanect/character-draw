import { canvasHeight, canvasWidth } from "./config";
import { degreeToRadian, getCoodinateOfCircle, getBezierControlPoint } from "./utils";

type DrawFaceLineReturn = {
  faceCenterX: number,
  defaultEyeY: number,
  defaultNoseY: number,
};

export const drawFaceLine = (context: CanvasRenderingContext2D): DrawFaceLineReturn => {
  const faceCenter = { x: canvasWidth / 2, y: canvasHeight / 2 };
  const headRadius = canvasHeight / 2 - 20;

  //
  // 頭の描画
  //
  context.beginPath();
  context.arc(faceCenter.x, faceCenter.y, headRadius, degreeToRadian(225), degreeToRadian(315));
  context.stroke();

  //
  // 頬の描画
  //

  /** 補助線の正方形の一辺の長さ */
  const auxiliarySquareSideLength = Math.sqrt(headRadius**2 / 2) * 2; // Pythagorean theorem (三平方の定理)
  /** 顔の左部の輪郭の開始座標 */
  const headLeftStart = getCoodinateOfCircle(faceCenter.x, faceCenter.y, headRadius, 225);
  /** 顔の右部の輪郭の開始座標 */
  const headRightStart = getCoodinateOfCircle(faceCenter.x, faceCenter.y, headRadius, 315);
  /** 頭の左部の膨らみの部分のX座標 */
  const headBulgeLeftX = faceCenter.x - auxiliarySquareSideLength * 7 / 12;
  /** 頭の右部の膨らみの部分のX座標 */
  const headBulgeRightX = faceCenter.x + auxiliarySquareSideLength * 7 / 12;
  /** 頭の膨らみの部分のY座標 */
  const headBulgeY = faceCenter.y;
  /** 開始座標と頭の左部の膨らみの間のベジエ曲線のコントロールポイント */
  const controlPointBetweenStartAndBulgeLeft = getBezierControlPoint(headLeftStart.x, headLeftStart.y, headBulgeLeftX, headBulgeY, -10);
  /** 開始座標と頭の右部の膨らみの間のベジエ曲線のコントロールポイント */
  const controlPointBetweenStartAndBulgeRight = getBezierControlPoint(headRightStart.x, headRightStart.y, headBulgeRightX, headBulgeY, 10);
  /** 顔のエラのX座標 (こちらから見て左) */
  const squareJawlineLeftX = faceCenter.x - auxiliarySquareSideLength * 3 / 8;
  /** 顔のエラのX座標 (こちらから見て右) */
  const squareJawlineRightX = faceCenter.x + auxiliarySquareSideLength * 3 / 8;
  /** 顔のエラのY座標 */
  const squareJawlineY = faceCenter.y + auxiliarySquareSideLength / 2;
  /** 頭の膨らみと顔のエラの間のベジエ曲線のコントロールポイント (こちらから見て左) */
  const controlPointBetweenBulgeAndSquareJawlineLeft = getBezierControlPoint(headBulgeLeftX, headBulgeY, squareJawlineLeftX, squareJawlineY, -10);
  /** 頭の膨らみと顔のエラの間のベジエ曲線のコントロールポイント (こちらから見て右) */
  const controlPointBetweenBulgeAndSquareJawlineRight = getBezierControlPoint(headBulgeRightX, headBulgeY, squareJawlineRightX, squareJawlineY, 10);

  context.beginPath();
  context.moveTo(headLeftStart.x, headLeftStart.y);
  context.quadraticCurveTo(
    controlPointBetweenStartAndBulgeLeft.x,
    controlPointBetweenStartAndBulgeLeft.y,
    headBulgeLeftX,
    headBulgeY,
  );
  context.moveTo(headBulgeLeftX, headBulgeY);
  context.quadraticCurveTo(
    controlPointBetweenBulgeAndSquareJawlineLeft.x,
    controlPointBetweenBulgeAndSquareJawlineLeft.y,
    squareJawlineLeftX,
    squareJawlineY,
  );
  context.stroke();

  context.beginPath();
  context.moveTo(headRightStart.x, headRightStart.y);
  context.quadraticCurveTo(
    controlPointBetweenStartAndBulgeRight.x,
    controlPointBetweenStartAndBulgeRight.y,
    headBulgeRightX,
    headBulgeY,
  );
  context.moveTo(headBulgeRightX, headBulgeY);
  context.quadraticCurveTo(
    controlPointBetweenBulgeAndSquareJawlineRight.x,
    controlPointBetweenBulgeAndSquareJawlineRight.y,
    squareJawlineRightX,
    squareJawlineY,
  );
  context.stroke();

  //
  // 顎の描画
  //
  /** 顎の座標 */
  const jaw = { x: faceCenter.x, y: faceCenter.y + auxiliarySquareSideLength * 3 / 4 };
  const controlPointBetweenSquareJawlineAndJawLeft = getBezierControlPoint(squareJawlineLeftX, squareJawlineY, jaw.x, jaw.y, 10);
  const controlPointBetweenSquareJawlineAndJawRight = getBezierControlPoint(squareJawlineRightX, squareJawlineY, jaw.x, jaw.y, 10);

  context.beginPath();
  context.moveTo(squareJawlineLeftX, squareJawlineY);
  context.quadraticCurveTo(
    controlPointBetweenSquareJawlineAndJawLeft.x,
    controlPointBetweenSquareJawlineAndJawLeft.y,
    jaw.x,
    jaw.y,
  );
  context.stroke();

  context.beginPath();
  context.moveTo(squareJawlineRightX, squareJawlineY);
  context.quadraticCurveTo(
    controlPointBetweenSquareJawlineAndJawRight.x,
    controlPointBetweenSquareJawlineAndJawRight.y,
    jaw.x,
    jaw.y,
  );
  context.stroke();

  context.closePath();

  return {
    faceCenterX: faceCenter.x,
    defaultEyeY: faceCenter.y + auxiliarySquareSideLength / 8,
    defaultNoseY: faceCenter.y + auxiliarySquareSideLength * 3 / 8,
    // defaultMouseY: (headRadius - auxiliarySquareSideLength / 2) / 2 + auxiliarySquareSideLength / 2,
  };
};
