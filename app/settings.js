define(function (require) {

    var app = require('durandal/app');

    var baseUrl = 'myapiurl';
    var protocol = 'http';
    var prod = true;

    //>>excludeStart("build", true);
    prod = false;
    //>>excludeEnd("build");

    
    return {
        baseApi: function () {
            if (prod) {
                return protocol + '://' + baseUrl;
            } else {
                return "";
            }
        }
    };
});