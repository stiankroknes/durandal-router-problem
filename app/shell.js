define(['plugins/router'], function (router) {
    return {
		title: 'Shell',	
        router: router,
        activate: function () {
            return router.map([
 				{ route: '', moduleId: 'home/index', title: 'Home' },
                { route: 'account/login', moduleId: 'account/login', title: 'Login', nav: false },
                { route: 'account/logoff', moduleId: 'account/logoff', title: 'Logoff', nav: false },
                { route: 'tasks*details', moduleId: 'tasks/index', title: 'Tasks', nav: true, hash: '#tasks' }
            ]).buildNavigationModel()
              .mapUnknownRoutes('home/index', 'not-found')
              .activate();
        }
    };
});
