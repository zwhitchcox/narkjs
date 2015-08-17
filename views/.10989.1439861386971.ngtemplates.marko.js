function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<script type="text/ng-template" id="templates/login.html">\n<div layout="column" layout-fill style="margin-top:30px">\n<form ng-submit="login(credentials)" layout="row" layout-align="space-around center">\n\n<md-whiteframe layout-padding class="md-whiteframe-z3 md-raised md-cornered" flex="33">\n<h1 class="md-title" layout-align="center center">Login</h1>\n<md-divider></md-divider>\n</md-whiteframe>\n</form>\n\n</div>\n</script><script type="text/ng-template" id="templates/home.html">\n<md-content class="md-padding">\n    I\'m home jasdkjfas\n</md-content>\n</script>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);