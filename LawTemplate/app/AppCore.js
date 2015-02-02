/**
 * Created by madalin on 1/23/2015.
 */
/// <reference path="../typings/knockout.d.ts" />
/// <reference path="AppNavigation.ts" />
/// <reference path="AppUtils.ts" />
var LawTemplate20152301;
(function (LawTemplate20152301) {
    var AppCore = (function () {
        function AppCore() {
            if (AppCore._instance) {
                throw new Error("Error: Instantiation failed: Use AppCore.getInstance() instead of new.");
            }
            AppCore._instance = this;
        }
        AppCore.getInstance = function () {
            if (AppCore._instance === null) {
                AppCore._instance = new AppCore();
            }
            return AppCore._instance;
        };
        AppCore.prototype.start = function () {
            console.log("Application is starting...");
            var navigationObject = new LawTemplate20152301.Navigation();
            navigationObject.setSammy();
            ko.applyBindings(navigationObject, document.getElementById('content-wrapper'));
        };
        AppCore._instance = null;
        return AppCore;
    })();
    LawTemplate20152301.AppCore = AppCore;
})(LawTemplate20152301 || (LawTemplate20152301 = {}));
//# sourceMappingURL=AppCore.js.map