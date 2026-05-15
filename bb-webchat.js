// BotBonnie WebChat — replace with your page id from the console if it changes.
(function () {
    var APP_ID = "page-d938608a885142158f6d1525";

    window.BBAsyncInit = function () {
        BB.init({ appId: APP_ID });
    };

    var s = document.createElement("script");
    s.async = true;
    s.type = "text/javascript";
    s.src = "https://asset.botbonnie.com/sdk/sdk.js";
    document.body.appendChild(s);
})();
