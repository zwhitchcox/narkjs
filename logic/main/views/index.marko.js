function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __loadTemplate = __helpers.l,
      __vendorstyles_marko = __loadTemplate(require.resolve("./vendorstyles.marko"), require),
      __header_marko = __loadTemplate(require.resolve("./header.marko"), require),
      __vendorscripts_marko = __loadTemplate(require.resolve("./vendorscripts.marko"), require),
      __templates_marko = __loadTemplate(require.resolve("./templates.marko"), require),
      forEach = __helpers.f,
      attr = __helpers.a;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html ng-app="app" ng-cloak><head><title>App</title>');
    __helpers.i(out, __vendorstyles_marko, {});

    out.w('<meta name="viewport" content="initial-scale=1"></head><body ng-controller="MainCtrl as main" layout="column">');
    __helpers.i(out, __header_marko, {});

    out.w('<div ui-view></div>');
    __helpers.i(out, __vendorscripts_marko, {});
    __helpers.i(out, __templates_marko, {});

    if (notEmpty(data.srcs)) {
      out.w('<span>');

      forEach(data.srcs, function(src) {
        out.w('<script' +
          attr("src", src) +
          '></script>');
      });

      out.w('</span>');
    }

    out.w('<browser-refresh enabled="true"></browser-refresh></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);