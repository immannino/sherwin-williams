const colors = require('./data/colors.json');
const fs = require('fs');

let svgParts = [];

for (let i in colors) {
    let { name, hex } = colors[i];

    const fontColor = determineFontColor(hex);
    svgParts.push(`<div style="background-color: ${hex}; color: ${fontColor};" xmlns="http://www.w3.org/1999/xhtml">${name}</div>`);
}

const svg = `<?xml version="1.0" standalone="no"?>
    <svg width="200" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <style>
            .container {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
            }

            .container > div {
                width: calc(100% / 7);
                padding: 0.5rem;
                font-family: monospace;
            }
        </style>
        <foreignObject height="100%" width="100%" style="overflow: scroll">
            <div class="container" xmlns="http://www.w3.org/1999/xhtml">
                ${svgParts.join('\n\t\t\t')}
            </div>
        </foreignObject>
    </svg>`;

fs.writeFileSync('./data/all-colors.svg', svg);

function determineFontColor(bgColor) {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    var uicolors = [r / 255, g / 255, b / 255];
    var c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
    return (L > 0.179) ? '#000000' : '#FFFFFF';
  }