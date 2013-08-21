define(['plugins/router', 'durandal/app', 'durandal/system'], function (router, app, system) {

    return {
        title: 'Details',
        router: router,
        backVisible: true,
        activate: function (taskId) {
            system.log('Activate details with task id ' + taskId);
        },
        attached: function (view) {
            system.log("View attached taskdetails module");
            $("div[data-role=page]").page("destroy").page();
//            $(document).scrollTop(0);
            return true;
        }
    };
});