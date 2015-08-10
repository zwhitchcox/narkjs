function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular.js"></script><script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular-animate.min.js"></script><script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular-aria.min.js"></script><script src="https://gitcdn.xyz/repo/angular/bower-material/v0.10.1/angular-material.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min.js"></script>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);