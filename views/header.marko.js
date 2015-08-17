function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<md-toolbar layout="row"><div class="md-toolbar-tools"><a ui-sref="home"><h1>HEP Rewards</h1></a><span flex></span><span ng-controller="NavLoginCtrl as nav"><md-button ui-sref="login" ng-if="!nav.state.isLoggedIn">Login</md-button><md-button ui-sref="logout" ng-if="nav.state.isLoggedIn">Logout</md-button></span></div></md-toolbar>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);