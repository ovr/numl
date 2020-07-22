export function h(tag) {
  return document.createElement(tag);
}

const dim = h('div');
const dimStyle = dim.style;

export function extractColor(color, ignoreAlpha = false) {
  if (typeof color !== 'string') return null;

  dimStyle.color = '';
  dimStyle.color = color;

  const arr = !dimStyle.color
    ? null // incorrect color
    : dimStyle.color
      .slice(dimStyle.color.indexOf('(') + 1, -1)
      .split(', ')
      .map(Number);

  if (!arr) return arr;

  if (ignoreAlpha) {
    return arr.slice(0, 3);
  }

  arr[3] = arr[3] || 1;

  return arr;
}

export function strToHsl(color, ignoreAlpha = false) {
  if (!color) return color;

  const rgba = extractColor(color, ignoreAlpha);

  if (!rgba) return;

  return rgbToHsl(rgba);
}
