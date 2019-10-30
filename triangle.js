var makerjs = require("makerjs");

function Triangle(height, length, roundOver, triangleCount) {
  this.units = makerjs.unitType.Inch;

  // Create first triangle.
  var triangle = new makerjs.models.ConnectTheDots(true, [[0,0],[0,height],[length,height]]);

  // Round over edges of triangle.
  var triWithROver = makerjs.model.outline(triangle, roundOver);

  // Clone traingle above horizontally with 1 inch distance between each.
  var rowCloned = makerjs.layout.cloneToRow(triWithROver, triangleCount, 1);

  // Center left most triangle at [0,0]
  makerjs.model.zero(rowCloned);

  this.models = { models: rowCloned };
}

// List of user defined parameters.
Triangle.metaParameters = [
  { title: "Height", type: "range", min: 1, max: 20, step: 1, value: 3 },
  { title: "Length", type: "range", min: 1, max: 20, step: 1, value: 8 },
  { title: "Round Over", type: "range", min: 0.1, max: 1, step: 0.1, value: 0.2 },
  { title: "Number of Triangles", type: "range", min: 1, max: 5, step: 1, value: 3 }
];

module.exports = Triangle;
