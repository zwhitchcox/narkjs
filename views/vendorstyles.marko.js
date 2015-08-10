function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<link rel="stylesheet" href="https://gitcdn.xyz/repo/angular/bower-material/v0.10.1/angular-material.css">');
  };
}
(module.exports = require("marko").c(__filename)).c(create);