function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<md-toolbar layout="row"><div class="md-toolbar-tools"><h2>HEP Rewards</h2><span flex></span><span ng-controller="NavLoginCtrl"><md-button>Login</md-button></span></div></md-toolbar>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);