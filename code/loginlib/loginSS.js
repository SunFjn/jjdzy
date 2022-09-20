var gonggaoUrl = "loginlib/brocastServer.php?v12";
var selectServerUrl = "loginlib/selectServer.php";
var serversUrl = "loginlib/servList.php";

var ip = null;
var port;
var zoneid;
var alias;
var state = 1;
var version = "V26";
var whitelist;
var zoneDic = null;  // 格式化的大区数据。{区名:[服务器id列表]}
var recentServers = null; //最近服务器列表
var formalServers = null; //服务器列表{服务器ID:具体数据}
var serverData = null;  // 选服接口返回的服务器列表数据
var isNewRole = 0;
var isClickEnter = false;
var isLoadEgret = false;
var isLoadMain = false;
var versionFn = "gameVer";

var isGetServer = false;//是否获取过服务器列表

$(document).ready(function (e) {
    if (isTest) {
        version = "V26";
    }
    $('.goplay').click(function () {
        if (!loginArg || loginArg.account == "") {
            return;
        }
        if (!ip || !port || !alias) return;
        if (state == 0 && !whitelist) {//不是白名单
            if ($("#alert").length <= 0) {
                createAlert();
                //维护时间
                var url = loginArg.serverHttpUrl;
                var data = {};
                data.randnum = Math.random();
                data.cmd = 110;
                data.pf = loginArg.platform;
                data.zoneid = zoneid;
                loadHttp(url, function (ret) {
                    $('.alertContent').html("维护时间：<br>" + ret);
                }, data);
            }
            showAlert();
            return;
        }
        $("#gg").remove();
        // $('#choose').remove();
        $('#connection').addClass('connection_none');
        $('#connection').remove();
        $('#now').addClass('now_none');
        $('#now').remove();
        $('#goplay').addClass('goplay_none');
        $('#goplay').remove();
        $("#slist").remove();
        $("#popbg").remove();
        $('#loading').addClass('loading loading_webkit');
        $('#loading').removeClass('loading_none');
        isClickEnter = true;
        // sendLoginMsg();
        bodyOnLoad();
    })
    //公告
    $('#ggbtn').click(showgonggao);
    $('#popbg,#gg').click(function (e) {
        hidegg();
        showchoose();
    });

    $('#serversClose').click(function (e) {
        hidegg();
        showchoose();
    });

    //选服页交互
    $('.servername').click(function (e) {
        if (isTest) {
            if (!isGetServer) {
                isGetServer = true;
                var url = serversUrl;
                var data = {};
                loadHttp(url, function (result) {
                    serverData = JSON.parse(result);
                    initServerData();
                }, data);
            }
            showslist();
            return;
        }
        if (loginArg) {
            if (!isGetServer) {
                isGetServer = true;
                var url = loginArg.serverHttpUrl;
                var data = {};
                data.randnum = Math.random();
                data.cmd = 101;
                data.pf = loginArg.platform;
                data.account = loginArg.account;
                data.type = 2;
                if (isTest) {//内测
                    data.testserver = 1;
                }
                loadHttp(url, function (result) {
                    serverData = JSON.parse(result);
                    initServerData();
                }, data);
            }
            showslist();
        }
    });

    //加载默认区
    isGetServer = true;
    var url = serversUrl;
    var data = {};
    loadHttp(url, function (result) {
        serverData = JSON.parse(result);
        initServerData();
        if (formalServers) {
            var serverId = recentServers[0];
            var data = formalServers[serverId];
            ip = data.ip;
            port = data.port;
            zoneid = data.zoneid;
            alias = data.name;
            state = data.state;
            pf = data.pf;
            if (!isTest) {
                version = version;
            }
            $('.servername').html(alias);
        }
    }, data);

    // $('#slist').click(function (e) {
    //     showchoose();
    // });

    // if (isTest) {
    //     initLoginData();
    // } else {
    //     initData();
    // }
});

var isGG = false;//是否打开过公告
function showgonggao() {
    if (loginArg) {
        showgg();
        // 请求后台单服公告
        // if (!isGG) {
        //     isGG = true;
        //     var url;
        //     url = loginArg.serverHttpUrl + "?";
        //     var data = {};
        //     data.randnum = Math.random();
        //     data.cmd = 102;
        //     data.pf = loginArg.platform;
        //     if (isTest) {//内测
        //         data.testserver = 1;
        //     }
        //
        //     loadHttp(url, function (result) {
        //         $('#ggcontent').html("" + result);
        //     }, data);
        // }
    }
}

function initData() {
    if (loginArg) {
        var url = loginArg.serverHttpUrl;
        var data = {};
        data.randnum = Math.random();
        data.cmd = 101;
        data.pf = loginArg.platform;
        data.account = loginArg.account;
        data.type = 4;

        loadHttp(url, function (result) {
            var info = JSON.parse(result);
            var last = info.last;
            var max = info.max;

            ip = last.ip;
            port = last.port;
            zoneid = last.zoneid;
            alias = last.alias;
            state = last.state;
            isNewRole = last.newuser;
            version = last.v;
            whitelist = last.whitelist;
            if (state == 0) {
                $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>维护中</font>");
            } else {
                $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>选服></font>");
            }
            // $('.newname').html("最新服&nbsp;&nbsp;<font color='#00FF00'>" + max.alias + "</font>");
        }, data);

        if (getPlatformType() == 1) {//赛博自动弹出公告
            showgonggao();
        }
    } else {
        setTimeout(function () {
            initData();
        }, 50);
    }
}

//平台类型
function getPlatformType() {
    if (!loginArg || !loginArg.platform) {
        return 0;
    }
    if (loginArg.platform.indexOf("cdsb-") >= 0) {//赛博
        return 1;
    }
    if (loginArg.platform.indexOf("shxy-") >= 0) {//深海
        return 2;
    }
    if (loginArg.platform.indexOf("sqxy-") >= 0) {//手趣
        return 3;
    }

    return 999;
}

//初始内测服务器
function initLoginData() {
    if (loginArg) {
        var selectD;

        loadHttp(url, function (data) {
            serverData = JSON.parse(data);
            recentServers = {};
            formalServers = {};
            zoneDic = {};
            for (var i = 0, n = serverData.servers.length; i < n; i++) {
                var data = serverData.servers[i];
                formalServers[data.serverId] = data;
                if (zoneDic[data.zoneName]) {
                    zoneDic[data.zoneName].push(data.serverId);
                } else {
                    zoneDic[data.zoneName] = [data.serverId];
                    zoneSort[data.zoneName] = data.zoneNo;
                }
            }
        }, data)


        if (window.localStorage.selectDate && DEBUGM) {
            selectD = JSON.parse(window.localStorage.selectDate);
            ip = selectD.ip;
            port = selectD.port;
            zoneid = selectD.zoneid;
            alias = selectD.alias
            $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>选服></font>");
            // initNewServer();
        } else {
            var url = "";
            var data = {};
            if (DEBUGM) {
                url = selectServerUrl;
            } else {
                url = loginArg.serverHttpUrl;
                data.randnum = Math.random();
                data.cmd = 101;
                data.pf = loginArg.platform;
                data.account = loginArg.account;
                data.type = 1;
                if (isTest) {//内测
                    data.testserver = 1;
                }
            }

            loadHttp(url, function (result) {
                console.log(result);
                selectD = JSON.parse(result);
                ip = selectD.ip;
                port = selectD.port;
                zoneid = selectD.zoneid;
                alias = selectD.alias;
                state = selectD.state;
                isNewRole = selectD.newuser;
                if (state == 0) {
                    $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>维护中</font>");
                } else {
                    $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>选服></font>");
                }
                // initNewServer();
            }, data);
        }
    } else {
        setTimeout(function () {
            initLoginData();
        }, 100);
    }
}

// function initNewServer() {
//     if (DEBUGM) {
//     } else {
//         var url = "";
//         url = loginArg.serverHttpUrl;
//         var data = {};
//         data.randnum = Math.random();
//         data.cmd = 101;
//         data.pf = loginArg.platform;
//         data.account = loginArg.account;
//         data.type = 3;
//         if (isTest) {//内测
//             data.testserver = 1;
//         }
//         loadHttp(url, function (result) {
//             var serverData = JSON.parse(result);
//             $('.newname').html("最新服&nbsp;&nbsp;<font color='#00FF00'>" + serverData.alias + "</font>");
//         }, data);
//     }
// }

function showgg() {
    // $('#choose').addClass('choose_none');
    // $('#choose').removeClass('choose choose_webkit');
    $('#gg').addClass('gg gg_webkit');
    $('#gg').removeClass('gg_none');
    $('#popbg').show();
}

function hidegg() {
    // $('#choose').addClass('choose choose_webkit');
    // $('#choose').removeClass('choose_none');
    $('#gg').addClass('gg_none');
    $('#gg').removeClass('gg gg_webkit');
    $('#popbg').hide();
}

function showchoose() {
    $('#choose').addClass('choose choose_webkit');
    $('#choose').removeClass('choose_none');
    $('#slist').addClass('slist_none');
    $('#slist').removeClass('slist');
    $('#popbg').hide();
}

function showslist() {
    $('#choose').addClass('choose_none');
    $('#choose').removeClass('choose choose_webkit');
    $('#slist').addClass('slist');
    $('#slist').removeClass('slist_none');
    $('#popbg').show();
}

function showAlert() {
    $('#choose').addClass('choose_none');
    $('#choose').removeClass('choose choose_webkit');
    $('#alert').addClass('alert alert_webkit');
    $('#alert').removeClass('alert_none');
    $('#popbg').show();
}

function hideAlert() {
    $('#choose').addClass('choose choose_webkit');
    $('#choose').removeClass('choose_none');
    $('#alert').addClass('alert_none');
    $('#alert').removeClass('alert alert_webkit');
    $('#popbg').hide();
}

function createAlert() {
    var str = "<div id='alert' class='alert_none'><div class='alertContent'>维护时间：</div></div>";
    $('#server').append(str);
    $('#alert').click(function (e) {
        hideAlert()
    });
}

//服务器列表
function initServerData() {
    if (!serverData)
        return;
    zoneListData = [];
    formalServers = {};
    recentServers = serverData.loginedServerList;
    var len = serverData.servers.length;
    for (var i = 0; i < len; i++) {
        var data = serverData.servers[i];
        formalServers[data.serverId] = data;
    }
    var zoneGap = 20;
    var count = Math.ceil(len / zoneGap);
    for (var i = 0; i < count; i++) {
        var zoneName = (1 + zoneGap * i) + "-" + ((i + 1) * zoneGap);
        zoneListData.push(zoneName);
    }
    zoneListData = zoneListData.reverse();
    var div = '<div class="between_sel">最近登录</div>';
    var len = zoneListData.length;

    for (var i = 0; i < len; i++) {
        div += '<div class="between_nosel">' + zoneListData[i] + '</div>';
    }
    $('.between').append(div);

    $('.between>div:first').addClass('between_sel');
    $('.between>div').click(function (e) {
        $('.between>div').removeClass('between_sel');
        $('.between>div').addClass('between_nosel');
        $(this).addClass('between_sel');
        $(this).removeClass('between_nosel');
        updateSerList($(this).html());
    });
    var item_div = '<div class="item" style="overflow-y: overlay">';
    item_div += '</div>';
    $('.servers').append(item_div);
    updateSerList("最近登录");

}

//显示服务器列表
function updateSerList(str) {
    var server_div = '';
    $('.item').empty();
    if (str == "最近登录") {
        if (recentServers) {
            for (var i = recentServers.length - 1; i >= 0; i--) {
                var serverId = recentServers[i];
                var data = formalServers[serverId];
                // var str = JSON.stringify(data);
                server_div += GetServerSelDiv(data.name, data.state, data.ip, data.port, data.zoneid, data.serverId);
            }
        }
    } else {
        var sp = str.split('-');
        var first = sp[0];
        var last = sp[1];
        if (formalServers) {
            for (var i = first - 1; i <= (last - 1); i++) {
                var data = formalServers[i];
                if (!data) {
                    continue;
                }
                // var str = JSON.stringify(data);
                server_div += GetServerSelDiv(data.name, data.state, data.ip, data.port, data.zoneid, data.serverId);
            }
        }
    }
    $('.item').append(server_div);

    $('.item>div').click(function (e) {
        // 单个服不需要选中调样式
        // $('.item>div').addClass('servernoselect');
        // $('.item>div').removeClass('serverselect');
        // $(this).removeClass('servernoselect');
        // $(this).addClass('serverselect');
        // 选服
        showchoose();
        // 记录选择信息
        ip = $(this).attr('ip');
        port = $(this).attr('port');
        zoneid = $(this).attr('zoneid');
        alias = $(this).attr('alias');
        state = $(this).attr('state');
        if (!isTest) {
            version = $(this).attr('version');
        }
        $('.servername').html(alias);
    });
}

//http请求数据
function loadHttp(url, callback, data) {
    $.ajax(
        {
            type: "get",
            url: url,
            data: data,
            success: function (result) {
                callback && callback(result);
            },
            error: function () {
                callback && callback(null);
            }
        }
    );
}

//{"zoneid":1,"alias":"版本服","state":2,"port":8001,"ip":"192.168.34.55"}
function GetServerSelDiv(servername, status, ip, port, zoneid, serverId) {
    var tag = "";
    switch (status) {

        case 1:
            tag = '<span class="tag_new">';
            break;
        case 2:
            tag = '<span class="tag_hot">';
            break;
        case 3:
            tag = '<span class="tag_rest">';
            break;
    }
    return '<div ip=' + ip + ' port=' + port + ' alias=' + servername + ' zoneid=' + zoneid + ' state=' + status + '>' + tag + '&nbsp;&nbsp;' + serverId + '.' + servername + '</span>' + '</div>'
}

var pro1;
var songshu;
var songzi;
var proInter;

//进度条
function showLoadProgress(text, pro, st) {
    if (!isClickEnter) {
        return;
    }
    if (!document.getElementById("server")) return;
    if (!proInter) {
        proInter = 1;
        pro1 = document.getElementById("pro_line1");
        songshu = document.getElementById("songshu");
        songzi = document.getElementById("songzi");
        $('#proalert1').html("首次加载时间稍长，请耐心等待");
    }
    if (st > 0) {
        proInter = 0;
        pro2.style.width = 0 + "rem";
        $('#proalert1').html(text + "  <font color='#FF0000'>点击刷新</font>");
        $('#server').click(reLoginWeb);
    } else {
        $('#proalert2').html(text);
    }
    var w = (pro / 100) * 9;
    pro1.style.width = w + "rem";
    if (pro >= 95) {
        proInter = 0;
    }
}

function sendLoginMsg() {
    var st = isNewUser();
    if (st != 1) return;

    var url = "";
    url = "https://" + ip + ":" + (parseInt(port) + 1000) + "?";
    url += "&cmd=108";
    url += "&zoneid=" + zoneid;
    url += "&account=" + loginArg.account;
    url += "&pf=" + loginArg.platform;
    loadHttp(url, function (data) {
    });
}

//是否新用户
function isNewUser() {
    if (recentServers) {//是否在最近登录列表中
        for (var i = recentServers.length - 1; i >= 0; i--) {
            var data = recentServers[i];
            if (parseInt(zoneid) == parseInt(data.zoneid)) {
                return 0;
            }
        }
        return 1;
    } else {
        return isNewRole;
    }
}

var loadList = [
    { "src": "egretLib.min.js", "label": "引擎", "total": 15, "skip": false, "next": 1, "callback": onEngineLoaded },
    { "src": "main.min.js", "label": "游戏主程序", "total": 20, "skip": false, "next": 0, "callback": loadJsComplete }
];
var scriptLoading = false;

//加载引擎和主文件
function bodyOnLoad() {
    // if (loginArg) {
    //     showLoadProgress("加载游戏引擎", 15, 0);
    //     loadNextRes();
    // } else {
    //     setTimeout(bodyOnLoad(), 50);
    // }

    var scriptLoadIndex = 0;
    var loadScript = function (list, callback) {
        var loaded = 0;
        var maxLoadnum = 10;
        var len = 0;
        var loadNext = function () {
            if (list.length - loaded - maxLoadnum > 0) {
                len = maxLoadnum;
            } else {
                len = list.length - loaded;
            }
            var starLoad = loaded;
            for (var i = 0; i < len; i++) {
                loadSingleScript(list[loaded + i], function () {
                    if (isClickEnter && scriptLoading) {
                        return;
                    }
                    loaded++;
                    if (loaded >= list.length) {
                        callback();
                    }
                    scriptLoadIndex++;
                    var per = scriptLoadIndex % 100;
                    showLoadProgress("加载游戏代码中", per);
                    if (loaded >= starLoad + len) {
                        loadNext();
                    }
                })
            }
        };
        loadNext();
    };

    var loadSingleScript = function (src, callback) {
        var s = document.createElement('script');
        s.async = false;
        s.src = src;
        s.addEventListener('load', function () {
            s.parentNode.removeChild(s);
            s.removeEventListener('load', arguments.callee, false);
            callback();
        }, false);
        document.body.appendChild(s);
    };

    var xhr = new XMLHttpRequest();
    xhr.open('GET', './manifest.json?v=' + Math.random(), true);
    xhr.addEventListener("load", function () {
        var manifest = JSON.parse(xhr.response);
        var list = manifest.initial.concat(manifest.game);
        loadScript(list, function () {
            scriptLoading = true;
            //isClickEnter && isLoadEgret && isLoadMain
            runEgretMain();
            //  egret.runEgret({ renderMode: "webgl", audioType: 0 });
        });
    });
    xhr.send(null);
    // if (loginArg) {
    //     showLoadProgress("加载游戏引擎", 15, 0);
    //     loadNextRes();
    // } else {
    //     setTimeout(bodyOnLoad, 50);
    // }
}

//加版本号
function getResVersion(url) {
    if (url == "egretLib.min.js") {
        return "egretLib.min.js";
    } else if (url == "main.min.js") {
        return "main.min_" + version + ".js";
    } else {
        return url;
    }
}

var loadIndex = 0;

function loadNextRes() {
    if (loadIndex >= loadList.length)
        return;
    var data = loadList[loadIndex++];
    if (data.skip) {
        var skip = !!data.skip;
        if ((typeof data.skip) == 'string') {
            skip = eval(data.skip);
        }
        if (skip) {
            if (data.next) {
                loadNextRes();
            }
        }
    }
    if (!data.src) {
        data.callback && data.callback();
        if (data.next) {
            loadNextRes();
            return;
        }
    }
    var url = data.src.match(/\.js$/i) ? data.src : window[data.src];
    // if (version) {
    //     url = getResVersion(url);
    //     url = versionFn + "/" + url;
    // }

    if (loginArg.zipcdn) {
        url = loginArg.zipcdn + url;
    }
    if (data.useRandom) {
        url += "?v=" + Math.random();
    }
    loadScriptRes(url, function () {
        if (data.callback != null) {
            data.callback();
        }
        if (data.next) {
            loadNextRes();
        }
    }, data.label, data.total);
}

function onEngineLoaded() {
    isLoadEgret = true;
    showLoadProgress("加载主程序", 20, 0);
    runEgretMain();
}

function loadJsComplete() {
    isLoadMain = true;
    runEgretMain();
}

function runEgretMain() {
    if (isClickEnter && scriptLoading) {

        var serverData = {};

        loginArg.ip = serverData.ip = ip;
        loginArg.port = serverData.port = port;
        loginArg.zoneid = serverData.zoneid = "" + zoneid;
        loginArg.serverName = serverData.alias = alias;
        loginArg.state = serverData.state = state;
        loginArg.versionFn = versionFn;
        loginArg.binVersion = version;
        loginArg.openGM = true;

        //serverData.newuser = 0; //这里设置为旧玩家
        //window.localStorage.selectDate = JSON.stringify(serverData);
        //window.localStorage.account = loginArg.account;
        // if (DEBUGM) {
        //     loginArg.cdn = loginArg.zipcdn = loginArg.binVersion;
        //     loginArg.binVersion = "";
        //     // loginArg.account = "xxl01";
        //     loginArg.uid = loginArg.account;
        //     loginArg.pf = "aiwan";
        //     loginArg.platform = "bansu";
        // }

        showLoadProgress("(加载游戏资源)", 50, 0);
        /**
         * {
		* "renderMode":, //Engine rendering mode, "canvas" or "webgl"
		* "audioType": 0 //Use the audio type, 0: default, 2: web audio, 3: audio
		* "antialias": //Whether the anti-aliasing is enabled in WebGL mode, true: on, false: off, defaults to false
		* "retina": //Whether the canvas is based on the devicePixelRatio
		* }
         **/
        egret.runEgret({ renderMode: "webgl", audioType: 0 });
        // var mb = myBrowser();
        // if (mb == "IE") {
        // } else {
        // 	egret.runEgret({ renderMode: "webgl", audioType: 0 });
        // }
        //egret.ImageLoader.crossOrigin = 'anonymous';
        // setTimeout(initInputEvent, 1000);
    }
}

function myBrowser() {
    try {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Presto") > -1;
        if (isOpera) {//判断是否Opera内核
            return "Opera"
        }
        if (userAgent.indexOf("Firefox") > -1) {//判断是否Firefox内核
            return "FF";
        }
        if (userAgent.indexOf("AppleWebKit") > -1) {//判断是否谷歌内核
            return "Chrome";
        }
        if (userAgent.indexOf("Safari") > -1) {//判断是否Safari内核
            return "Safari";
        }
        if (userAgent.indexOf("Trident") > -1) {//判断是否IE内核
            return "IE";
        }
        if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
            return "Android";
        }
        if (userAgent.indexOf('iPhone') > -1) {
            return "iPhone";
        }
        if (userAgent.indexOf('iPad') > -1) {
            return "iPad";
        }
    } catch (err) {
    }
    return "Other";
}

function showGame() {
    diposeLoadView();
}

//进入canvus游戏界面
function diposeLoadView() {
    $("#server").remove();
    if (proInter > 0) {
        proInter = 0;
    }
}

function setLoadVis(v) {
    if (v) {
        $('#server').removeClass('server_none');
        $('#server').addClass('server server_webkit');
    } else {
        $('#server').removeClass('server server_webkit');
        $('#server').addClass('server_none');
    }
}

function reLoginWeb() {
    window.location.reload();
}

function getLoginArg() {
    return loginArg;
}

//打开登录
function func_login() {
    whalePbSDK.login();
}

//调起支付页面
function func_paypay(orderInfo) {
    whalePbSDK.pay(orderInfo, function (payStatusObject) {
        //游戏业务页面UI显示
        console.log('支付结果通知' + payStatusObject);
    });
}

//退登
function func_logout() {
    whalePbSDK.logout();
}