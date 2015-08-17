function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<script type="text/ng-template" id="templates/login.html">\nasdfasdfasdfasd\n<form ng-submit="login(credentials)">\n    \n</form>\n</script><script type="text/ng-template" id="templates/home.html">\n    I\'m home jasdkjfas\n</script>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);