(function () {
    ko.bindingHandlers.jqmListView = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            // Support anonymous templates
            var bindingValue = ko.utils.unwrapObservable(convertToBindingValue(valueAccessor));

            if ((element.nodeType == 1 || element.nodeType == 8)) {
                // It's an anonymous template - store the element contents, then clear the element
                var templateNodes = element.nodeType == 1 ? element.childNodes : ko.virtualElements.childNodes(element),
                    container = ko.utils.moveCleanedNodesToContainerElement(templateNodes); // This also removes the nodes from their current parent
                new ko.templateSources.anonymousTemplate(element)['nodes'](container);
            }
            return { 'controlsDescendantBindings': true };
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var bindingValue = ko.utils.unwrapObservable(convertToBindingValue(valueAccessor));

            // Clean the current children
            $(element).empty();

            var dataArray = (bindingValue['data']) || [];
            var dividerFor = bindingValue['divider'];

            var dividerDictionary = {};
            for (var i = 0; i < dataArray.length; i++) {
                var dividierName = dividerFor(dataArray[i]);

                dividerDictionary[dividierName] = (dividerDictionary[dividierName]) || [];
                dividerDictionary[dividierName].push(dataArray[i]);
            }

            $.each(sortKeys(dividerDictionary, bindingValue.dividerCompareFunction), function (index, key) {
                if (key !== "") {
                    $(element).append('<li data-role="list-divider">' + key + '</li>');
                }

                var tempElement = document.createElement("div"); // Create temp DOM element to render templating
                ko.renderTemplateForEach(element, dividerDictionary[key].sort(bindingValue.itemCompareFunction), /* options: */bindingValue, tempElement, bindingContext);
                $(element).append($(tempElement).children()); // Add data to listview
            });

            if ($(element).hasClass('ui-listview')) {
                $(element).listview('refresh');
            } else {
                $(element).trigger('create');
            }
        }
    };

    function convertToBindingValue(valueAccessor) {
        /// <summary>Standardizes the properties of the of the valueAccessor object.</summary>
        /// <returns>An object containing standardized binding properties.</returns>

        var bindingValue = ko.utils.unwrapObservable(valueAccessor());

        // If bindingValue is the array, just pass it on its own
        if ((!bindingValue) || typeof bindingValue.length == 'number')
            return {
                'data': bindingValue,
                'divider': function () { return ""; },
                'templateEngine': ko.nativeTemplateEngine.instance
            };

        // If bindingValue.data is the array, preserve all relevant options
        return {
            'data': ko.utils.unwrapObservable(bindingValue['data']),
            'divider': bindingValue['divider'] || function () { return ''; },
            'dividerCompareFunction': bindingValue['dividerCompareFunction'],
            'itemCompareFunction': bindingValue['itemCompareFunction'],
            'includeDestroyed': bindingValue['includeDestroyed'],
            'afterAdd': bindingValue['afterAdd'],
            'beforeRemove': bindingValue['beforeRemove'],
            'afterRender': bindingValue['afterRender'],
            'templateEngine': ko.nativeTemplateEngine.instance
        };
    };

    function sortKeys(data, compareFunction) {
        /// <summary>Convert the properties of a given object to an array and return them in sorted order.</summary>
        /// <param name="data">The object who's properties must be sorted.</param>
        /// <param name="compareFunction">The compare function that must be used during sorting.</param>
        /// <returns type="Array">The sorted properties of the object.</returns>

        var keys = Array();

        for (var key in data) {
            keys.push(key);
        }

        return keys.sort(compareFunction);
    }
})();