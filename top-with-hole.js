var makerjs = require("makerjs");

function TopWithHole(diameter, circlesPerRow, numberOfRows, distanceBetween) {
  this.units = makerjs.unitType.Inch;

  // Creates a model from Circle. This is required since cloneToRow and other
  // functions below only work with model and not paths.
  //
  // The bottom left rectangle starts at 0,0 origin.
  function circleModel() {
    var origin = diameter + distanceBetween;
    this.paths = { circle: new makerjs.paths.Circle([origin, origin], diameter) };
  }

  var circle = new circleModel();

  // Clone circle horizontally.
  var rowCloned = makerjs.layout.cloneToRow(circle, circlesPerRow, distanceBetween);

  // Clone the circles above, vertically.
  var columnCloned = makerjs.layout.cloneToColumn(rowCloned, numberOfRows, distanceBetween);

  // Create rectangle wrapper around the circles above.
  var wrapper = new makerjs.models.RoundRectangle(columnCloned, distanceBetween);

  this.models = { a: wrapper, b: columnCloned };
}

// List of user defined parameters.
TopWithHole.metaParameters = [
  { title: "Diameter", type: "range", min: 1, max: 20, step: 1, value: 3 },
  { title: "Number of circles per row", type: "range", min: 1, max: 20, step: 1, value: 5 },
  { title: "Number of columns", type: "range", min: 1, max: 20, step: 1, value: 2 },
  { title: "Distances between circles", type: "range", min: 1, max: 20, step: 0.5, value: 1 }
];

module.exports = TopWithHole;
