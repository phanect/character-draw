export const degreeToRadian = (degree: number): number => degree * Math.PI / 180;

/**
 * 与えられた角度の円周上の点の座標を返す
 * @param {number} centerX - 円の中心点の X 座標
 * @param {number} centerY - 円の中心点の Y 座標
 * @param {number} radius - 円の半径
 * @param {number} angleDegree - 角度 (単位: 度)
 * @returns {object} 与えられた角度の円周上の点の座標
 */
export const getCoodinateOfCircle = (centerX: number, centerY: number, radius: number, angleDegree: number): { x: number, y: number } => ({
  x: centerX + radius * Math.cos(degreeToRadian(angleDegree)),
  y: centerY + radius * Math.sin(degreeToRadian(angleDegree)),
});

export const getBezierControlPoint = (startX: number, startY: number, endX: number, endY: number, distance: number): { x: number, y: number } => {
  const midpointX = (startX + endX) / 2;
  const midpointY = (startY + endY) / 2;
  const slope = (startX - endX) / (endY - startY);
  return {
    x: midpointX + distance * Math.sqrt(1 / (1 + slope**2)),
    y: midpointY + distance * Math.sqrt(1 / (1 + (1 / slope)**2)),
  };
};
