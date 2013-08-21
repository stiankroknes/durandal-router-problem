define(['plugins/http', 'durandal/app', 'durandal/system', 'settings', 'plugins/router'], function (http, app, system, settings, router) {
	
    // Methods used for knockout-jqmListView 
    // NOTE : husk at jqmListview trenger en fix for å trigge listview
    var taskDividerSort = function (divider1, divider2) {
        var weights = {};
        weights["10"] = 1;
        weights["20"] = 2;
        weights["30"] = 3;
        return weights[divider1] - weights[divider2];
    };
    var sortTasks = function (item1, item2) {
        return item1.Id.localeCompare(item2.Id);
    };
    var generateDivider = function (data) {
        return data.Status;
    };
    // End knockout-jqmListview

    return {
        title: 'Tasks',
        http: http,
        tasks: ko.observableArray([]),
        generateDivider: generateDivider,
        taskDividerSort: taskDividerSort,
        sortTasks: sortTasks,
        activate: function () {
            system.log('Activated taskList');
            var that = this;

            if (this.tasks().length > 0) {
                return;
            }

			return; 
            // return http.get(settings.baseApi() + '/api/task/').then(function (response) {
                // system.log('Response: ' + response);
                // that.tasks.push.apply(that.tasks, response);
            // });
        },
        attached: function (view) {
            system.log('Activated tasks index ');
            $("div[data-role=page]").page("destroy").page();
            $(document).scrollTop(0);
            return true;
        }
    };
});