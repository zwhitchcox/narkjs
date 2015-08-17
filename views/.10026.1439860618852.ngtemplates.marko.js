function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<script type="text/ng-template" id="templates/login.html">\n<div layout="column" layout-fill>\n<form ng-submit="login(credentials)" layout="row" layout-align="center center">\n\n<md-whiteframe class="md-whiteframe-z3" flex="33">asdf</md-whiteframe>\n</form>\n\n</div>\n</script><script type="text/ng-template" id="templates/home.html">\n<md-content class="md-padding">\n    I\'m home jasdkjfas\n</md-content>\n</script>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);