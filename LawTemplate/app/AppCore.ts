/**
 * Created by madalin on 1/23/2015.
 */

/// <reference path="../typings/knockout.d.ts" />
/// <reference path="AppNavigation.ts" />
/// <reference path="AppUtils.ts" />

module  LawTemplate20152301 {

    declare var ko:KnockoutStatic;

    export class AppCore {
        private static _instance:AppCore = null;

        constructor() {
            if (AppCore._instance) {
                throw new Error("Error: Instantiation failed: Use AppCore.getInstance() instead of new.");
            }

            AppCore._instance = this;
        }

        static getInstance():AppCore {
            if (AppCore._instance === null) {
                AppCore._instance = new AppCore();
            }
            return AppCore._instance;
        }

        start():void {
            console.log("Application is starting...");
            var navigationObject = new LawTemplate20152301.Navigation();
            navigationObject.setSammy();
            ko.applyBindings(navigationObject, document.getElementById('content-wrapper'));
        }
    }
}
