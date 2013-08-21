define(['plugins/router', 'durandal/system', 'services/authentication'], function (router, system, authentication) {

    // var model = function () {
        // var self = this;

        // self.router = router;
        // self.title = 'Home';
        // self.attached = function (view) {
            // system.log('Lifecycle : attached');
            // $("div[data-role=page]").page("destroy").page();
        // };

        // self.logoff = function () {
            // console.log('logoff');
            // authentication.logoff();
            // router.navigate('#/account/login');
        // };
    // };

    // return model;

    return {
       router: router,
       title: 'Home',
       logoff: function () {
           console.log('logoff');
           authentication.logoff();
           router.navigate('#/account/login');
       },
       activate: function () {
           system.log('lifecycle : activate');
       },
       binding: function () {
           system.log('lifecycle : binding');
           return { cacheviews: false }; //cancels view caching for this module, allowing the triggering of the detached callback
       },
       bindingcomplete: function () {
           system.log('lifecycle : bindingcomplete');
       },
       attached: function (view) {
           system.log('lifecycle : attached');
           $("div[data-role=page]").page("destroy").page();
       },
       compositioncomplete: function (view) {
           system.log('lifecycle : compositioncomplete');
       },
       detached: function (view) {
           system.log('lifecycle : detached');
       }
    };
});