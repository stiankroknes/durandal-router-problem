define(['services/authentication', 'durandal/system', 'plugins/router'],
function (authenticationService, system, router) {

    return {
        router: router,
        title: 'Login',
        description: 'Login to RMC',

        userName: ko.observable(),
        password: ko.observable(),
        resourceId: ko.observable(),
        rememberMe: ko.observable(),
        $errors: ko.observableArray(),
        $success: ko.observable(),

        login: function () {
            var that = this;

            console.log('Execute login');
            var userInfo = {
                UserName: that.userName(),
                Password: that.password(),
                ResourceId: that.resourceId(),
                RememberMe: that.rememberMe() || false
            };
            authenticationService.login(userInfo)
            .then(function () {
                //router.replaceLocation('#/home');
                router.navigate('');
            });
        },
        activate: function () {
            system.log('Activated login ');
        },
        attached: function (view) {
            system.log("Attached login module");
            $("div[data-role=page]").page("destroy").page();
            return true;
        }
    };
});