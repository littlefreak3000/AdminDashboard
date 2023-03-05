const PROCCESS_TYPE = ['SBS Data', 'Delivery', 'SAT', 'Radar Data', 'RBAT', 'Dashboard'];
const FILTER_TYPE = ['SV', 'PORT', 'ICAO', 'Altitude', 'FlightID', 'OutputType', 'Region'];

$(() => {
    uid = sessionStorage.getItem('UID');
    secret = userSecret = sessionStorage.getItem('Key');
});

function GETPage(path, done, fail) {
    jQuery.ajax({
        "async": true,
        "crossDomain": true,
        "datatype": "json",
        "url": path,
        "method": "GET"
    }).done(done).fail(fail);
}

function GetTasks(orderBy, desc, pageSize, pageCount, done, fail) {
    var path = "task";
    var query = [];

    if (orderBy) query.push("orderby=" + orderBy);
    if (desc) query.push("desc");
    //if(pageSize) query.push("pagesize=" + pageSize);
    //if(pageCount) query.push("pagecount=" + pageCount);

    if (query.length > 0)
        path += "?" + query.join('&');

    GET(path, null, done, fail);
}

function GetTask(id, done, fail) {
    var path = "task/" + id;

    GET(path, null, userID, hmacSecret, done, fail);
}

function loadTemplate(selector) {

    const template = document.querySelector(selector);
    return template.content.children[0].cloneNode(true);
}

function randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const MS_PER_DAY = 86400000;
const MS_PER_WEEK = MS_PER_DAY * 7;
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function FormatTime(t) {
    
    var ft;
    var d = new Date(t);
    var dt = Date.now() - d;

    if (dt < MS_PER_DAY) {
        ft = d.toLocaleTimeString('en-US');
    }
    else if (dt < MS_PER_WEEK) {
        ft = DAYS[d.getDay()] + ' ' + (d.getMonth() + 1) + '/' + d.getDate();
    }
    else if (d.getUTCFullYear() == 1) {
        ft = "N/A";
    }
    else {
        ft = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    }

    return ft;
}

function DTStr(s)
{
    return new Date(s).toUTCString();
}