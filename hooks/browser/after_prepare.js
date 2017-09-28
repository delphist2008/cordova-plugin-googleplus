#!/usr/bin/env node
'use strict';

var fs = require('fs');

var getPreferenceValue = function (config, name) {
    var value = config.match(new RegExp('name="' + name + '" value="(.*?)"', "i"));
    if (value && value[1]) {
        return value[1]
    } else {
        return null
    }
};

var WEB_CLIENT_ID = '';
var config = fs.readFileSync("config.xml").toString();
WEB_CLIENT_ID = getPreferenceValue(config, "WEB_CLIENT_ID");


var files = [
    "platforms/browser/www/plugins/cordova-plugin-googleplus/src/browser/GooglePlusProxy.js",
    "platforms/browser/platform_www/plugins/cordova-plugin-googleplus/src/browser/GooglePlusProxy.js"
];

for (var i = 0; i < files.length; i++) {
    try {
        var contents = fs.readFileSync(files[i]).toString();
        fs.writeFileSync(files[i], contents.replace(/CLIENT_ID/g, '"' + WEB_CLIENT_ID + '"'));
    } catch (err) { }
}
