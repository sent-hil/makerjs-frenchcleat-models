var makerjs = require("makerjs");

function Top(length, width, radius) {
  this.models = {
    a: new makerjs.models.RoundRectangle(length, width, radius)
  };
}

// List of user defined parameters.
Top.metaParameters = [
  { title: "Length", type: "range", min: 1, max: 20, step: 1, value: 10 },
  { title: "Width", type: "range", min: 1, max: 20, step: 1, value: 5 },
  { title: "Radius", type: "range", min: 0.1, max: 3, step: 0.1, value: 0.2 }
];

module.exports = Top;
