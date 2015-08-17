function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<script type="text/ng-template" id="templates/login.html">\n<div layout="row" style="margin-top:30px" layout-align="space-around center" >\n\n\n<md-whiteframe flex="33" layout-padding class="md-whiteframe-z3">\n    <form ng-submit="login(credentials)">\n    <div layout="row" layout-align="center center"><h1 class="md-title">Log into HEP Rewards</h1></div>\n    <md-divider></md-divider>\n    <div layout-padding layout="column">\n        <md-input-container flex>\n            <label>Username</label>\n            <input ng-model="credentials.username">\n        </md-input-container>\n        <md-input-container flex>\n            <label>Password</label>\n            <input ng-model="credentials.password">\n        </md-input-container>\n    </div>\n    </form>\n</md-whiteframe>\n\n\n</div>\n</script><script type="text/ng-template" id="templates/home.html">\n<md-content class="md-padding">\n    I\'m home jasdkjfas\n</md-content>\n</script>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);