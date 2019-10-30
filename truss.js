// Modified from original.
//
// See https://maker.js.org/docs/advanced-drawing/#Wireframe%20technique for
// original.
var makerjs = require("makerjs");

function Truss(length, height) {
  this.models = {
    frame: new makerjs.models.ConnectTheDots(
      true,
      [[0, height], [length, 0], [0, 0]]
    )
  };

  var angled = this.models.frame.paths.ShapeLine1; // hypotenuse

  var bracepoints = [
    [0, 0],
    makerjs.point.middle(angled, 1/3),
    [length/2 , 0],
    makerjs.point.middle(angled, 2/3)
  ];

  this.models.brace = new makerjs.models.ConnectTheDots(false, bracepoints);
}

function Wrapper(length, height, trussCount) {
  this.units = makerjs.unitType.Inch;

  // Create outside triangle.
  var truss = new Truss(length, height);

  // Expand braces inside to make a truss.
  var expansion = makerjs.model.expandPaths(truss, 0.1, 0.1);

  makerjs.model.originate(expansion);
  makerjs.model.simplify(expansion);

  // Clone traingle above horizontally with 1 inch distance between each.
  var cloned = makerjs.layout.cloneToRow(expansion, trussCount, 1);

  makerjs.model.zero(cloned);

  this.models = { cloned: cloned };
}

// List of user defined parameters.
Wrapper.metaParameters = [
  { title: "Length", type: "range", min: 1, max: 20, step: 1, value: 8 },
  { title: "Height", type: "range", min: 1, max: 20, step: 1, value: 3 },
  { title: "Number of Trusses", type: "range", min: 1, max: 5, step: 1, value: 3 }
];

module.exports = Wrapper;
