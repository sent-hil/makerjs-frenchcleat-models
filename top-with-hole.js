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

function TopWithHole(diameter, circlesPerRow, noOfRows, distBtwn, noOfSupports, triHeight) {
  this.units = makerjs.unitType.Inch;

  // Creates a model from Circle. This is required since cloneToRow and other
  // functions below only work with model and not paths.
  //
  // The bottom left rectangle starts at 0,0 origin.
  function circleModel() {
    var origin = diameter + distBtwn;
    this.paths = { circle: new makerjs.paths.Circle([origin, origin], diameter) };
  }

  var circle = new circleModel();

  // Clone circle horizontally.
  var rowCloned = makerjs.layout.cloneToRow(circle, circlesPerRow, distBtwn);

  // Clone the circles above, vertically.
  var columnCloned = makerjs.layout.cloneToColumn(rowCloned, noOfRows, distBtwn);

  // Create rectangle wrapper around the circles above.
  var wrapper = new makerjs.models.RoundRectangle(columnCloned, distBtwn);

  var triangle = new Triangle(triHeight, 0, 0.1, noOfSupports)
  triangle.origin = [1,1]

  this.models = { a: wrapper, b: columnCloned, c: triangle };
}

// List of user defined parameters.
TopWithHole.metaParameters = [
  { title: "Diameter", type: "range", min: 1, max: 20, step: 1, value: 3 },
  { title: "Number of circles per row", type: "range", min: 1, max: 20, step: 1, value: 5 },
  { title: "Number of columns", type: "range", min: 1, max: 20, step: 1, value: 2 },
  { title: "Distances between circles", type: "range", min: 1, max: 20, step: 0.5, value: 1 },
  { title: "Number of supports", type: "range", min: 0, max: 4, step: 1, value: 2 },
  { title: "Triangle height", type: "range", min: 1, max: 5, step: 0.5, value: 1 },
];

module.exports = TopWithHole;
