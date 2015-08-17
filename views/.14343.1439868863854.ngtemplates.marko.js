function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<script type="text/ng-template" id="templates/login.html">\n<div layout="column" layout-fill style="margin-top:30px">\n\n\n<md-whiteframe layout-padding layout="row" class="md-whiteframe-z3 md-raised md-cornered">\n<form ng-submit="login(credentials)"  flex="33" layout-align="space-around center">\n<div layout="row" layout-align="center center"><h1 class="md-title">Log into HEP Rewards</h1></div>\n<md-divider></md-divider>\n</form>\n</md-whiteframe>\n\n\n</div>\n</script><script type="text/ng-template" id="templates/home.html">\n<md-content class="md-padding">\n    I\'m home jasdkjfas\n</md-content>\n</script>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);