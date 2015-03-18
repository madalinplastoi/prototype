(function() {
    var ko = window.ko;
    ko.bindingHandlers.enterKey = {
        init: function (element, valueAccessor, allBindings, vm) {
            ko.utils.registerEventHandler(element, "keydown", function (event) {
                if (event.keyCode === 13) {
                    ko.utils.triggerEvent(element, "change");
                    valueAccessor().call(vm, vm);
                }
                return true;
            });
        }
    };

    ko.bindingHandlers.select2 = {
        init: function (element, valueAccessor) {
            $(element).select2(valueAccessor());
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).select2('destroy');
            });
        },
        update: function (element) {
            $(element).trigger('change');
        }
    };

    // Custom binding to display formatted date values with momentjs
    // Date formats: http://momentjs.com/docs/#/displaying/format/
    ko.bindingHandlers.moment = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var val = valueAccessor();
            var date = moment(ko.utils.unwrapObservable(val));

            var format = allBindingsAccessor().format || 'MM/DD/YYYY';

            if ($(element).is("input") === true) {
                $(element).val(date.format(format));
            } else {
                $(element).text(date.format(format));
            }
        }
    };

    /**
     * Custom binding provider used instead of the default one; will catch, log and show to the screen (via toastr) KO binding exceptions
     * DO NOT USE IN PRODUCTION
     * */
    var ErrorHandlingBindingProvider = function () {
        var original = new ko.bindingProvider();
        var toastr_error_options = {closeButton: true, timeOut: 0, extendedTimeOut: 0};

        //determine if an element has any bindings
        this.nodeHasBindings = original.nodeHasBindings;

        //return the bindings given a node and the bindingContext
        this.getBindingAccessors = function (node, bindingContext) {
            var result = {};

            //catch general errors parsing binding syntax
            try {
                result = original.getBindingAccessors(node, bindingContext);
            }
            catch (e) {
                if (console && console.log) {
                    console.info("Error in binding syntax: " + e.message, node);
                    toastr.error(e.message, 'KO Binding syntax error', toastr_error_options);
                }
            }

            //catch errors when actually evaluating the value of a binding
            ko.utils.objectForEach(result, function (key, value) {
                result[key] = function () {
                    var result = null;

                    try {
                        result = value();
                    }
                    catch (e) {
                        if (console && console.log) {
                            console.info("Error in \"" + key + "\" binding: " + e.message, node);
                            toastr.error(e.message, "KO " + key + ' binding error', toastr_error_options);
                        }
                    }

                    return result;
                };
            });

            return result;
        };
    };

    /**
     * override default binding provider
     * */
    ko.bindingProvider.instance = new ErrorHandlingBindingProvider();

})();

    /**
     * This should catch all general JavaScript errors (not KO, handled separately)
     * It will not work as expected in all browsers (different method signature in IE, for example); at least for development it should be enough for us;
     * Please consider https://danlimerick.wordpress.com/2014/01/18/how-to-catch-javascript-errors-with-window-onerror-even-on-chrome-and-firefox/
     * */
    window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
        debugger;
        console.info(errorMsg, " In: " + url + " Line: " + lineNumber + ' StackTrace: ' + errorObj);
        toastr.error(errorMsg, 'JavaScript error, check log', {closeButton: true, timeOut: 0, extendedTimeOut: 0});
    };

    /**
     * endregion
     * */

