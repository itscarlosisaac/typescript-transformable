// Import stylesheets
import './style.css';
import './_utils';
import { transpose } from './_utils';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;

const box1 = document.querySelector('.box-1');
const box3 = document.querySelector('.box-3');
const box4 = document.querySelector('.box-4');

const degrees = 21;
const radians = (degrees * Math.PI) / 180;
const scalex = 1;
const scaley = 1;

const matrix = [
  [Math.cos(radians) * scalex, -Math.sin(radians) * scaley, 0],
  [Math.sin(radians) * scalex, Math.cos(radians) * scaley, 0],
  [0, 0, 1],
];

// console.log('MATRIX', matrix);

// console.log('MATRIX 2', transpose(matrix.flat(2), 3));

const transformation = `
  ${matrix[0][0]}, ${matrix[1][0]},
  ${matrix[0][1]}, ${matrix[1][1]},
  ${matrix[0][2]}, ${matrix[1][2]}
`;

box1.style.transform = `matrix(${transformation})`;

const translation = `
  translate(
    ${matrix[0][2]}px,
    ${matrix[1][2]}px)`;

const scale = `
    scale(
      ${Math.sqrt(Math.pow(matrix[0][0], 2) + Math.pow(matrix[1][0], 2))},
      ${Math.sqrt(Math.pow(matrix[0][1], 2) + Math.pow(matrix[1][1], 2))}
    )
`;

const calculatedradians = Math.atan2(matrix[1][0], matrix[0][0]);
const rotation = `
      rotate(${(calculatedradians * 180) / Math.PI}deg)
`;

box3.style.transform = `${translation} ${rotation} ${scale} `;
const box3Rect = box3.getBoundingClientRect();

// Box 3
const box3W = parseInt(getComputedStyle(box3).width.replace('px', ''));
const box3H = parseInt(getComputedStyle(box3).height.replace('px', ''));

let centerX = box3.offsetLeft + box3W / 2;
let centerY = box3.offsetTop + box3H / 2;
const rotationInRadians = degrees * (Math.PI / 180);

///  Calculations to get top left rotated corner position

let topLeftRotatedX =
  centerX +
  (box3.offsetLeft - centerX) * Math.cos(rotationInRadians) -
  (box3.offsetTop - centerY) * Math.sin(rotationInRadians);

let topLeftRotatedY =
  centerY +
  (box3.offsetLeft - centerX) * Math.sin(rotationInRadians) +
  (box3.offsetTop - centerY) * Math.cos(rotationInRadians);

const p1 = document.querySelector('.p1');
p1.style.top = topLeftRotatedY + 'px';
p1.style.left = topLeftRotatedX + 'px';

///  Calculations to get top right rotated corner position

let topRightRotatedX =
  centerX +
  (box3.offsetLeft + box3W - centerX) * Math.cos(rotationInRadians) -
  (box3.offsetTop - centerY) * Math.sin(rotationInRadians);

let topRightRotatedY =
  centerY +
  (box3.offsetLeft + box3W - centerX) * Math.sin(rotationInRadians) +
  (box3.offsetTop - centerY) * Math.cos(rotationInRadians);

const p2 = document.querySelector('.p2');
p2.style.top = topRightRotatedY + 'px';
p2.style.left = topRightRotatedX + 'px';

///  Calculations to get bottom left rotated corner position

let bottomLeftRotatedX =
  centerX +
  (box3.offsetLeft - centerX) * Math.cos(rotationInRadians) -
  (box3.offsetTop + box3H - centerY) * Math.sin(rotationInRadians);

let bottomLeftRotatedY =
  centerY +
  (box3.offsetLeft - centerX) * Math.sin(rotationInRadians) +
  (box3.offsetTop + box3H - centerY) * Math.cos(rotationInRadians);

const p3 = document.querySelector('.p3');
p3.style.top = bottomLeftRotatedY + 'px';
p3.style.left = bottomLeftRotatedX + 'px';

///  Calculations to get bottom right rotated corner position

let bottomRightRotatedX =
  centerX +
  (box3.offsetLeft + box3W - centerX) * Math.cos(rotationInRadians) -
  (box3.offsetTop + box3H - centerY) * Math.sin(rotationInRadians);

let bottomRightRotatedY =
  centerY +
  (box3.offsetLeft + box3W - centerX) * Math.sin(rotationInRadians) +
  (box3.offsetTop + box3H - centerY) * Math.cos(rotationInRadians);

const p4 = document.querySelector('.p4');
p4.style.top = bottomRightRotatedY + 'px';
p4.style.left = bottomRightRotatedX + 'px';

//////
//// The code below is to resize the box from top right corner
//// to the bottom left corner
//////

/*
1- Calculate the Original Center:
2- Calculate the Position of the Bottom Left Corner:
3- New Top Left Corner After Downsizing:
4- Calculate the New Center:
5- Apply Rotation to the New Rectangle:

*/
// 1

const posX = box3.offsetLeft;
const posY = box3.offsetTop;
const originalWidth = parseInt(getComputedStyle(box3).width.replace('px', ''));
const originalHeight = parseInt(
  getComputedStyle(box3).height.replace('px', '')
);

const CX = posX + originalWidth / 2;
const CY = posY + originalHeight / 2;
const AngleCos = Math.cos(rotationInRadians);
const AngleSin = Math.sin(rotationInRadians);

const TopRight = {
  x: posX + originalWidth,
  y: posY,
};

const RotatedTopRight = {
  x: CX + (posX + originalWidth - CX) * AngleCos - (posY - CY) * AngleSin,
  y: CY + (posX + originalWidth - CX) * AngleSin + (posY - CY) * AngleCos,
};

console.log('Width Height before rotation', originalWidth, originalHeight);
console.log('Top left before rotation', posX, posY);
console.log('Center of rect', CX, CY);
console.log('RotatedTopRight', RotatedTopRight);

// Positioning r1 center to the center.
const r1center = document.querySelector('.r1center');
r1center.style.left = CX + 'px';
r1center.style.top = CY + 'px';

function ScaleFromPointToPoint(element) {
  element.style.transform = 'rotate(0)';
  element.style.top = element.offsetHeight + (element.offsetTop - 89) + 'px';
  element.style.width = '89px';
  element.style.height = '62px';
  element.style.transform = 'rotate(21deg)';
}
ScaleFromPointToPoint(box3);
