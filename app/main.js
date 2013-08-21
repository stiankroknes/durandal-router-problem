requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins'
        //'knockout': '../lib/knockout/knockout-2.3.0'
    }
});

define('jquery', function () { return jQuery; });
define('knockout', ko);
define('jqmListView', function () { return jqmListView; });

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'services/antiforgery', 'services/authentication', 'plugins/router', 'plugins/dialog'],  
	function (system, app, viewLocator, antiforgery, authentication, router, dialog) {
    
	//>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Test';

    //specify which plugins to install and their configuration
    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });

	// antiforgery.addAntiForgeryTokenToAjaxRequests();
	// authentication.handleUnauthorizedAjaxRequests(function () {
		// dialog.showMessage('You are not authorized, please login')
			// .then(function () {
				// router.navigate('#/account/login');
			// });
	// });

    app.start().then(function () {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        //viewLocator.useConvention();

        //Show the app by setting the root view model for our application.
        app.setRoot('shell');
    });
});