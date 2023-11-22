// Get Original coordinates

function getOriginalCoordinates(element: HTMLElement) {
  return {
    topLeft: {
      x: element.offsetLeft,
      y: element.offsetTop,
    },
    topRight: {
      x: element.offsetLeft + element.offsetWidth,
      y: element.offsetTop,
    },
    bottomRight: {
      x: element.offsetLeft + element.offsetWidth,
      y: element.offsetTop + element.offsetWidth,
    },
    bottomLeft: {
      x: element.offsetLeft,
      y: element.offsetTop + element.offsetWidth,
    },
    center: {
      x: element.offsetLeft + element.offsetWidth / 2,
      y: element.offsetTop + element.offsetHeight / 2,
    },
  };
}
