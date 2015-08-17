function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/angular-material/0.10.1/angular-material.min.css">');
  };
}
(module.exports = require("marko").c(__filename)).c(create);