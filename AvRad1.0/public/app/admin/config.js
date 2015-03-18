(function () {
    'use strict';

    requirejs.config({

        baseUrl: '/',
        paths: {
            'jquery': './lib/js/jquery/jquery-1.11.2.min',
            'knockout': './lib/js/knockout/knockout-3.2.0.min',
            'komapping': './lib/js/knockout/knockout.mapping',
            'bootstrap': './lib/js/bootstrap/bootstrap.min',
            'bootstrap-tour': './lib/js/bootstrap/bootstrap-tour.custom',
            'bootstrap-datepicker': './lib/js/bootstrap/bootstrap-datepicker',
            'bootstrap-touchspin': './lib/js/bootstrap/bootstrap.touchspin',
            'bootstrap-select': './lib/js/bootstrap/select2.min',
            'parsley': './lib/js/parsley/parsley.min',
            'king-common': './lib/js/kingadmin/king-common',
            'king-components': './lib/js/kingadmin/king-components',
            'momentjs': './lib/js/moment/moment.min',
            'toastr': './lib/js/toastr/toastr',
            'text': './lib/js/require/text',

            'custom-bindings': './app/utils/custom-bindings',
            'domain': './app/domain',

            'AjaxUtils': './app/utils/AjaxUtils'
        },
        shim: {
            'jquery': {
                exports: '$'
            },
            'knockout': {
                exports: 'ko'
            },
            'bootstrap': {
                deps: ['jquery'],
                exports: 'jQuery'
            },
            'momentjs': {
                exports: 'moment'
            },
            'domain': {
                exports: 'domain'
            },
            'toastr': {
                exports: 'toastr'
            },
            'komapping': {
                deps: ['knockout'],
                exports: 'komapping'
            },
            'AjaxUtils': {
                exports: 'AjaxUtils'
            }
        }
    });

    requirejs.onError = function (err) {
        console.log(err);
        require(['toastr'], function (toastr) {
            toastr.error(err, 'RequireJS error', {closeButton: true, timeOut: 0, extendedTimeOut: 0});
        });
    };

    var start = new Date();

    requirejs.onResourceLoad = function (context, map, depArray) {
        var duration = new Date() - start;
        console.log("[Resources Loaded]:", map.name, "in " + duration + " ms" + " from " + map.url);
    };
})();