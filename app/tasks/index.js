define(['plugins/router'], function (router) {

    var childRouter = router.createChildRouter()
        .makeRelative({
            moduleId: 'tasks',
            fromParent: true
        }).map([
            { route: '', moduleId: 'list', title: 'Tasks' },
            { route: '(:id)', moduleId: 'details', title: 'Details' }
        ]).buildNavigationModel();

    return {
        title: 'Tasks',
        router: childRouter
    };
});