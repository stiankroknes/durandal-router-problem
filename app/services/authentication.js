define(function (require) {
    var system = require('durandal/system'),
		app = require('durandal/app'),
		router = require('plugins/router'),
		http = require('plugins/http'),
		settings = require('settings');

    return {
        handleUnauthorizedAjaxRequests: function (callback) {
            if (!callback) {
                return;
            }
            $(document).ajaxError(function (event, request, options) {
                if (request.status === 401) {
                    callback();
                }
            });
        },

        canLogin: function () {

            return true;
        },
        logoff: function (navigateToUrl) {
            // TODD: get new antiforgery token from server and inject to page?
            system.log('logoff, navigateToUrl: ' + navigateToUrl);
            http.get(settings.baseApi() + "/api/account/LogOff");
        }, 
        login: function (userInfo, navigateToUrl) {
            system.log('login , navigateToUrl: ' + navigateToUrl);
            if (!this.canLogin()) {
                return system.defer(function (dfd) {
                    dfd.reject();
                }).promise();
            }
            var jqxhr = $.post(settings.baseApi()+ "/api/account/Post", userInfo)
				.done(function (data) {
				    if (data.success == true) {
				        if (!!navigateToUrl) {
				            router.navigateTo(navigateToUrl);
				        } else {
				            return true;
				        }
				    } else {
				        return data;
				    }
				})
				.fail(function (data) {
				    return data;
				});

            return jqxhr;
        }
    };
});