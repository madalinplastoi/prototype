/**
 * Created by madalin on 1/23/2015.
 */
/// <reference path="../typings/jquery.d.ts" />
/// <reference path="../typings/knockout.d.ts" />
// / <reference path="../typings/sammy.d.ts" />
/// <reference path="models/AppModels.ts" />
/// <reference path="AppUtils.ts" />

module  LawTemplate20152301 {

    declare var ko:KnockoutStatic;

    export class NavigationItem {
        public id:string;
        private templateName:string;
        private model:any;
        private url:string;
        private urlText:string;
        private tabIndex:number;

        constructor(id:string, templateName:string, model:any, url:string, urlText:string, tabIndex:number) {
            this.id = id;
            this.templateName = templateName;
            this.model = model;
            this.url = url;
            this.urlText = urlText;
            this.tabIndex = tabIndex;
        }
    }

    export class Navigation {
        private Items:KnockoutObservableArray<NavigationItem>;
        private Selected:KnockoutObservable<NavigationItem>;
        private static _self:Navigation;

        constructor() {
            this.Items = ko.observableArray([]);
            this.Selected = ko.observable(null);

            this.Items.push(
                new NavigationItem("home-section",
                    "home-section-template",
                    new LawTemplate20152301.HomeModel(),
                    LawTemplate20152301.Constants.SECTION_1_URL,
                    LawTemplate20152301.Constants.SECTION_1_URL_TEXT,
                    1));

            this.Items.push(
                new NavigationItem("about-section",
                    "about-section-template",
                    new LawTemplate20152301.AboutModel(),
                    LawTemplate20152301.Constants.SECTION_2_URL,
                    LawTemplate20152301.Constants.SECTION_2_URL_TEXT,
                    2));

            this.Items.push(
                new NavigationItem("services-section",
                    "services-section-template",
                    new LawTemplate20152301.ServicesModel(),
                    LawTemplate20152301.Constants.SECTION_3_URL,
                    LawTemplate20152301.Constants.SECTION_3_URL_TEXT,
                    3));

            this.Items.push(
                new NavigationItem("contact-section",
                    "contact-section-template",
                    new LawTemplate20152301.ContactModel(),
                    LawTemplate20152301.Constants.SECTION_4_URL,
                    LawTemplate20152301.Constants.SECTION_4_URL_TEXT,
                    4));

            Navigation._self = this;

            this.Selected(this.Items()[0]);
        }

        setSammy():void {

            var app = Sammy('#content-wrapper', function () {
                this.get(LawTemplate20152301.Constants.SECTION_1_URL, function () {
                    Navigation._self.navigateToItem('home-section');
                });
                this.get(LawTemplate20152301.Constants.SECTION_2_URL, function () {
                    Navigation._self.navigateToItem('about-section');
                });
                this.get(LawTemplate20152301.Constants.SECTION_3_URL, function () {
                    Navigation._self.navigateToItem('services-section');
                });
                this.get(LawTemplate20152301.Constants.SECTION_4_URL, function () {
                    Navigation._self.navigateToItem('contact-section');
                });
            });
            app.run(LawTemplate20152301.Constants.SECTION_1_URL);
        }

        navigateToItem(itemId:string):void {
            if ($('#' + itemId).length > 0) {
                for (var i in this.Items()) {
                    if (this.Items()[i].id == itemId) {
                        $('#' + this.Items()[i].id).addClass('active');
                        this.Selected(this.Items()[i]);
                    }
                    else {
                        $('#' + this.Items()[i].id).removeClass('active');
                    }
                }
            }
        }

        templateLoaded(element):void {
        }
    }
}
