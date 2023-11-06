import { getBezierControlPoint, getCoodinateOfCircle } from "../utils";

export const drawEyes = (context: CanvasRenderingContext2D): void => {
  /* ▼▼ Configs ▼▼ */
  const eyeWidth = 80;
  const eyeHeight = 40;
  const eyelashesLeftmost = { x: 0, y: 0 };
  const eyelashesRightmost = { x: eyeWidth, y: eyeHeight / 3 };
  const eyelashesDistanceToControlPoint = 10;
  const leftLineDistanceToControlPoint = 6;
  const rightLineDistanceToControlPoint = 4;
  /** If show iris (虹彩) */
  const showIris = true;
  /** If show the highlights */
  const showHighlights = true;
  const showHighlightBorder = true;

  /* ▼▼ Default values ▼▼ */
  /** Default center coodinate of iris (虹彩): Center of the eye */
  const defaultIrisCenter = { x: eyeWidth / 2, y: eyeHeight / 2 };
  /** Default radius of iris (虹彩) */
  const defaultIrisRadius = { x: defaultIrisCenter.x * 0.4, y: defaultIrisCenter.y * 1.25 };
  const defaultIrisGradient = { top: "#5d5d5d", bottom: "#f0f0f0" };
  /** Default radius of pupil (瞳孔) */
  const defaultPupilRadius = { x: defaultIrisRadius.x * 0.25, y: defaultIrisRadius.y * 0.25 };
  const defaultPupilColor = "#000000";
  /** Default radius of highlights */
  const defaultHighlightRadius = { x: defaultIrisRadius.x * 0.25, y: defaultIrisRadius.y * 0.25 };
  /* ▲▲ Default values ▲▲ */

  const irisCenter = defaultIrisCenter;
  const irisRadius = defaultIrisRadius;
  const irisGradient = defaultIrisGradient;
  const pupilRadius = defaultPupilRadius;
  const pupilColor = defaultPupilColor;
  const highlightRadius = defaultHighlightRadius;
  /* ▲▲ Configs ▲▲ */

  // Top line (Eyelashes)
  const eyelashesBezierControlPoint = getBezierControlPoint(
    eyelashesLeftmost.x,
    eyelashesLeftmost.y,
    eyelashesRightmost.x,
    eyelashesRightmost.y,
    0 < eyelashesDistanceToControlPoint ? -1 * eyelashesDistanceToControlPoint : eyelashesDistanceToControlPoint,
  );

  context.beginPath();
  context.moveTo(eyelashesLeftmost.x, eyelashesLeftmost.y);
  context.quadraticCurveTo(
    eyelashesBezierControlPoint.x,
    eyelashesBezierControlPoint.y,
    eyelashesRightmost.x,
    eyelashesRightmost.y,
  );
  context.stroke();

  // Left line
  const leftBottom = { x: eyelashesLeftmost.x + eyeWidth / 8, y: eyeHeight * 0.95 };

  const leftLineBezierControlPoint = getBezierControlPoint(
    eyelashesLeftmost.x,
    eyelashesLeftmost.y,
    leftBottom.x,
    leftBottom.y,
    0 < leftLineDistanceToControlPoint ? -1 * leftLineDistanceToControlPoint : leftLineDistanceToControlPoint,
  );

  context.beginPath();
  context.moveTo(eyelashesLeftmost.x, eyelashesLeftmost.y);
  context.quadraticCurveTo(
    leftLineBezierControlPoint.x,
    leftLineBezierControlPoint.y,
    leftBottom.x,
    leftBottom.y,
  );
  context.stroke();

  // Right line
  const rightBottom = { x: eyelashesRightmost.x - eyeWidth / 8, y: eyeHeight };

  const rightLineBezierControlPoint = getBezierControlPoint(
    eyelashesRightmost.x,
    eyelashesRightmost.y,
    rightBottom.x,
    rightBottom.y,
    0 < rightLineDistanceToControlPoint ? rightLineDistanceToControlPoint : -1 * rightLineDistanceToControlPoint,
  );

  context.beginPath();
  context.moveTo(eyelashesRightmost.x, eyelashesRightmost.y);
  context.quadraticCurveTo(
    rightLineBezierControlPoint.x,
    rightLineBezierControlPoint.y,
    rightBottom.x,
    rightBottom.y,
  );
  context.stroke();

  // Bottom line
  const bottomLineBezierControlPoint = getBezierControlPoint(
    leftBottom.x,
    leftBottom.y,
    rightBottom.x,
    rightBottom.y,
    0 < rightLineDistanceToControlPoint ? rightLineDistanceToControlPoint : -1 * rightLineDistanceToControlPoint,
  );

  context.beginPath();
  context.moveTo(leftBottom.x, leftBottom.y);
  context.quadraticCurveTo(
    bottomLineBezierControlPoint.x,
    bottomLineBezierControlPoint.y,
    rightBottom.x,
    rightBottom.y,
  );
  context.stroke();

  if (showIris) {
    // Iris (虹彩)
    context.beginPath();
    context.ellipse(irisCenter.x, irisCenter.y, irisRadius.x, irisRadius.y, 0, 0, 2 * Math.PI);

    const gradient = context.createLinearGradient(irisCenter.x, irisCenter.y - irisRadius.y, irisCenter.x, irisCenter.y + irisRadius.y);
    gradient.addColorStop(0, irisGradient.top);
    gradient.addColorStop(0.5, irisGradient.bottom);
    gradient.addColorStop(1, irisGradient.bottom);
    context.fillStyle = gradient;

    context.fill();

    // Pupil (瞳孔)
    context.beginPath();
    context.ellipse(irisCenter.x, irisCenter.y, pupilRadius.x, pupilRadius.y, 0, 0, 2 * Math.PI);
    context.fillStyle = pupilColor;
    context.fill();

    // Highlights
    if (showHighlights) {
      const highlightCenter = getCoodinateOfCircle(irisCenter.x, irisCenter.y, irisRadius.x, -135);

      context.beginPath();
      context.ellipse(highlightCenter.x, highlightCenter.y, highlightRadius.x, highlightRadius.y, 0, 0, 2 * Math.PI);
      context.fillStyle = "#ffffff";
      context.fill();

      if (showHighlightBorder) {
        context.strokeStyle = "#000000";
        context.stroke();
      }
    }
  }
};
