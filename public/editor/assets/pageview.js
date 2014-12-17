common.analytics = {
    getPermanentCookie: function () {
        var permanentCookie = common.cookie.get("permanent_cookie");
        // If it is undefined, set a new one.
        if(permanentCookie === undefined){
            common.cookie.set("permanent_cookie", common.guid.create(), {
                lifetime: 3650, //10 year expiration date
                path: "/" //Makes this cookie readable from all pages
            });
            permanentCookie = common.cookie.get("permanent_cookie");
        }

        return permanentCookie;
    },

    createEventProperties: function () {
        //Add a pageview event in Keen IO
        var url = new common.URL(window.location.href);
        //var parser = new UAParser();

        var eventProperties = {
            permanent_tracker: common.analytics.getPermanentCookie(),
            referrer: document.referrer,
            url: {
                protocol: url.protocol,
                domain: url.domain,
                port: url.port,
                path: url.path,
                query_params: url.params(),
                fragment: url.fragment
            },
            // user_agent: {
            //     browser: parser.getBrowser(),
            //     engine: parser.getEngine(),
            //     os: parser.getOS()
            // },
        };

        return eventProperties;
    },

    trackPageview: function () {
        var eventProperties = common.analytics.createEventProperties();
        Keen.addEvent("pageviews", eventProperties);
    }
};
