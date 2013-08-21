define(function (require) {
    var app = require('durandal/app');
	var dialog = require('plugins/dialog');
	
    return {
        /*  this intercepts all ajax requests (with content)
            and adds the MVC AntiForgeryToken value to the data
            so that your controller actions with the [ValidateAntiForgeryToken] attribute won't fail

            original idea came from http://stackoverflow.com/questions/4074199/jquery-ajax-calls-and-the-html-antiforgerytoken

            to use this

            1) ensure that the following is added to your Durandal Index.cshml
            <form id="__AjaxAntiForgeryForm" action="#" method="post">
                @Html.AntiForgeryToken()
            </form>

            2) in  main.js ensure that this module is added as a dependency

            3) in main.js add the following line
            antiforgery.addAntiForgeryTokenToAjaxRequests();

        */
        addAntiForgeryTokenToAjaxRequests: function () {
            //var token = $('#__AjaxAntiForgeryForm     input[name=__RequestVerificationToken]').val();

            // configure to resist CSRF attack
            var token  = $("#antiForgeryToken").val();
            
            if (!token) {
                dialog.showMessage('ERROR: Authentication Service could not find  antiForgeryToken');
            }
            var tokenParam = "__RequestVerificationToken=" + encodeURIComponent(token);

            $(document).ajaxSend(function (event, request, options) {
                //if (options.hasContent) {
                //    options.data = options.data ? [options.data, tokenParam].join("&") : tokenParam;
                //}
                if (options.type == "POST") {
                    request.setRequestHeader('__RequestVerificationToken', token);
                }
            });
        }
    };
});