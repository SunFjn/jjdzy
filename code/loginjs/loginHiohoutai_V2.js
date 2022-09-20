
//****************************** */
var ip = null;
var pf = "ncsgzj01";
var port;
var zoneid;
var alias;
var state = 1;
var clientversion = "v8";
var whitelist;
var backlist;
var recentServers = null; //最近服务器列表
var formalServers = null; //服务器列表
var serverData = null;  // 选服接口返回的服务器列表数据
var isGetServer = false;
var isNewRole = 0;
var isClickEnter = false;
var isLoadMain = false;

var isGG = false;//是否打开过公告
function showgonggao(e) {
    if (loginArg) {
        showgg()
        if (!isGG) {
            isGG = true;
            var url;
            url = loginArg.serverHttpUrl + "?" + Math.random();
            var data = {};
            let time = Math.random();
            data.sign = md5("cmd=" + 201 + "openid=" + loginArg.account + "pf=" + pf + "randnum=" + time + "clientKey");
            data.cmd = 201;
            data.randnum = time;
            data.pf = pf;
            data.openid = loginArg.account;
            loadHttp(url, function (result) {
                $('#ggcontent').html("" + result);
            }, data);
        }
    }
}

//1登录的新服和历史服务器  2为服务器列表
function createHttpData(cmd, openid, pf = 'ncsgzj01', type = 1) {
    var data = {};
    let time = Math.random();
    data.sign = md5("cmd=" + cmd + "openid=" + openid + "pf=" + pf + "randnum=" + time + "type=" + type + "clientKey");
    data.cmd = cmd;
    data.randnum = time;
    data.pf = pf;
    data.openid = openid;
    data.type = type;
    return data;
}
var autoLogin;
$(document).ready(function (e) {
    autoLogin = function () {
        if (!loginArg.ip || !loginArg) {
            alert("帐号异常");
            return;
        }
        $("#gg").remove();
        $('#choose').remove();
        $("#slist").remove();
        $("#popbg").remove();

        $('#loading').addClass('loading loading_webkit');
        $('#loading').removeClass('loading_none');
        isClickEnter = true;
        bodyOnLoad();
    }
    $("#gg").remove();
    $('#choose').remove();
    $("#slist").remove();
    $("#popbg").remove();

    $('#loading').addClass('loading loading_webkit');
    $('#loading').removeClass('loading_none');
    isClickEnter = true;
    bodyOnLoad();
    //公告
    $('#ggbtn').click(showgonggao);
    $('#ggclose,#ggtopclose').click(function (e) { hidegg() });

    //选服页交互
    $('.servername').click(function (e) {
        if (loginArg) {
            if (!isGetServer) {
                isGetServer = true;
                var url = loginArg.serverHttpUrl;
                var data = createHttpData(202, loginArg.account, pf, 2);
                if (isDebugModel) {//版本服
                    url = "loginjs/servers.php";
                }
                loadHttp(url, function (result) {
                    serverData = JSON.parse(result);
                    initServerData();
                }, data);
            }
            showslist();
        }

    });

    $('#sclosetitle,#sclose').click(function (e) {
        showchoose();
    });

    // if (isTest) {
    //     initLoginData();
    // } else {
    enterGame();
    // }
});

function enterGame() {
    if (loginArg && autoLogin) {
        autoLogin();
    }
}

function initData() {
    if (loginArg && autoLogin) {
        autoLogin();
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


function initLoginData() {
    if (loginArg) {
        var selectD;
        if (window.localStorage.selectDate && isDebugModel) {
            selectD = JSON.parse(window.localStorage.selectDate);
            ip = selectD.ip;
            port = selectD.port;
            zoneid = selectD.zoneid;
            alias = selectD.alias;
            if (window.localStorage.account) {
                $("#zhanghaoTxt.newInput").val(window.localStorage.account);
            }
            $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>选服></font>");
            $('.newname').html("最新服&nbsp;&nbsp;<font color='#00FF00'>" + alias + "</font>");
        } else {
            var url = "";
            var data = {};
            if (isDebugModel) {
                url = "loginjs/servers.php";
            } else {
                url = loginArg.serverHttpUrl;
                data = createHttpData(202, loginArg.account, pf, 1);
            }

            loadHttp(url, function (result) {
                console.log(result);
                let info = JSON.parse(result);
                let newSever;
                if (info && info.recent && info.recent[0]) {
                    selectD = info.recent[0];
                } else {
                    newSever = selectD = info.formal[0];
                }
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
                $('.newname').html("最新服&nbsp;&nbsp;<font color='#00FF00'>" + newSever.alias + "</font>");
            }, data);
        }
    } else {
        setTimeout(function () {
            initLoginData();
        }, 100);
    }
}

function showgg() {
    $('#choose').addClass('choose_none');
    $('#choose').removeClass('choose choose_webkit');
    $('#gg').addClass('gg gg_webkit');
    $('#gg').removeClass('gg_none');
    $('#popbg').show();
}

function hidegg() {
    $('#choose').addClass('choose choose_webkit');
    $('#choose').removeClass('choose_none');
    $('#gg').addClass('gg_none');
    $('#gg').removeClass('gg gg_webkit');
    $('#popbg').hide();
}

function showchoose() {
    $('#choose').addClass('choose choose_webkit');
    $('#choose').removeClass('choose_none');
    $('#slist').addClass('slist_none');
    $('#slist').removeClass('slist slist_webkit');
    $('#popbg').hide();
}
function showslist() {
    $('#choose').addClass('choose_none');
    $('#choose').removeClass('choose choose_webkit');
    $('#slist').addClass('slist slist_webkit');
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
    $('#server').click(function (e) { $("#server").unbind("click"); hideAlert() });
}
//服务器列表
function initServerData() {
    if (!serverData)
        return;
    zoneListData = [];

    recentServers = serverData.recent;
    formalServers = serverData.formal;

    var zoneGap = 20;
    var len = formalServers.length;
    var count = Math.ceil(len / zoneGap);
    for (var i = 0; i < count; i++) {
        var zoneName = (1 + zoneGap * i) + "-" + ((i + 1) * zoneGap) + "区";
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

    var server_div = '<div class="serversel serverindex" style="overflow-y:overlay;">';
    server_div += '</div>';
    $('.slist').append(server_div);

    $('.serversel>div').addClass('servernoselect');

    updateSerList("最近登录");
}
//显示服务器列表
function updateSerList(str) {
    var server_div = '';
    $('.serversel').empty();
    if (str == "最近登录") {
        if (recentServers) {
            for (var i = recentServers.length - 1; i >= 0; i--) {
                var data = recentServers[i];
                var str = JSON.stringify(data);
                server_div += GetServerSelDiv(data.alias, data.state, data.ip, data.port, data.zoneid);
            }
        }
    } else {
        var sp = str.split('-');
        var first = sp[0];
        var last = sp[1];
        last = Number(last.substring(0, last.length - 1));
        if (formalServers) {
            for (var i = last - 1; i >= (first - 1); i--) {
                var data = formalServers[i];
                if (!data) {
                    continue;
                }
                var str = JSON.stringify(data);
                server_div += GetServerSelDiv(data.alias, data.state, data.ip, data.port, data.zoneid);
            }
        }
    }
    $('.serversel').append(server_div);

    $('.serversel>div').click(function (e) {
        // 调样式
        $('.serversel>div').addClass('servernoselect');
        $('.serversel>div').removeClass('serverselect');
        $(this).removeClass('servernoselect');
        $(this).addClass('serverselect');
        // 选服
        showchoose();
        // 记录选择信息
        ip = $(this).attr('ip');
        port = $(this).attr('port');
        zoneid = $(this).attr('zoneid');
        alias = $(this).attr('alias');
        state = $(this).attr('state');
        if (state == 0) {
            $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>维护中</font>");
        } else {
            $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>选服></font>");
        }
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
function GetServerSelDiv(servername, status, ip, port, zoneid) {
    var tag = "<span ></span>"
    if (status == 1 || status == 3) {
        tag = '<span class="new-tag"></span>'
    } else if (status == 2 || status == 4) {
        tag = '<span class="hot-tag"></span>'
    } else if (status == 0) {
        tag = '<span class="rest-tag"></span>'
        servername += " 维护中";
    }
    return '<div ip=' + ip + ' port=' + port + ' alias=' + servername + ' zoneid=' + zoneid + ' state=' + status + ' class="servernoselect">' + servername + tag + '</div>'
}

var pro1;
var star1;
var pro2;
var star2;
var proInter;
//进度条
function showLoadProgress(text, pro, st) {
    if (!isClickEnter) {
        return;
    }
    if (!proInter) {
        proInter = setInterval(runProgress, 40);
        pro1 = document.getElementById("pro_line1");
        star1 = document.getElementById("star1");
        pro2 = document.getElementById("pro_line2");
        star2 = document.getElementById("star2");

        $('#proalert1').html("首次加载会比较慢，请耐心等待");
    }
    if (st > 0) {
        clearTimeout(proInter);
        proInter = 0;
        pro2.style.width = 0 + "rem";
        $('#proalert2').html(text + "  <font color='#FF0000'>点击刷新</font>");
        $('#server').click(reLoginWeb);
    } else {
        $('#proalert2').html(text);
    }


    var w = (pro / 100) * proWidth;
    // var w = 5;
    pro1.style.width = w + "rem";
    if (pro >= 95) {
        pro2.style.width = proWidth + "rem";
        clearTimeout(proInter);
        proInter = 0;
    }

}

var proWidth = 8.4;
var pro2num = 0;
function runProgress() {
    if (pro2num == proWidth) {
        pro2num = 0;
    }
    pro2num += 0.5;
    if (pro2num > proWidth) {
        pro2num = proWidth;
    }
    pro2.style.width = pro2num + "rem";
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

//加载引擎和主文件
function bodyOnLoad() {
    if(!loginArg)return;
  var scriptLoadIndex = 0;

  var loadScript = function loadScript(list, callback) {
    var loaded = 0;
    var maxLoadnum = 10;
    var len = 0;

    var loadNext = function loadNext() {
      if (list.length - loaded - maxLoadnum > 0) {
        len = maxLoadnum;
      } else {
        len = list.length - loaded;
      }

      var starLoad = loaded;

      for (var i = 0; i < len; i++) {
        loadSingleScript(list[loaded + i], function () {
          if (isClickEnter && isLoadMain) {
            return;
          }

          loaded++;

          if (loaded >= list.length) {
            callback();
          }

          scriptLoadIndex++;
          var per = scriptLoadIndex % 100;
          showLoadProgress("加载主程序", 20, 0);

          if (loaded >= starLoad + len) {
            loadNext();
          }
        });
      }
    };

    loadNext();
  };

  var loadSingleScript = function loadSingleScript(src, callback) {
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
  var gamejs = "js/main.min" + loginArg.clientversion + ".js";
  var list = ["js/egretlibv1.js",gamejs];
  loadScript(list, function () {
    isLoadMain = true;
    runEgretMain();
  });
}


function loadJsComplete() {
    isLoadMain = true;
    runEgretMain();
}

function runEgretMain() {
    if (isClickEnter && isLoadMain) {
        showLoadProgress("(加载游戏资源)", 30, 0);
        var isMobile = egret.Capabilities.isMobile;
        egret.runEgret({
            renderMode: "webgl", audioType: 0, calculateCanvasScaleFactor: function (context) {
                if (!isMobile) {
                    return 2;
                }
                var backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;
                return (window.devicePixelRatio || 1) / backingStore;
            }
        });
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

function diposeLoadView() {
    $("#server").remove();
    $("#gameBg").remove();
    if (proInter > 0) {
        clearTimeout(proInter);
        proInter = 0;
    }
}
function hideServerBg() {
    var oDiv = document.getElementById('gameBg');
    $("#gameBg").css({ 'background': '#000' })
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

const rotateLeft = (lValue, iShiftBits) => { return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits)) }; var addUnsigned = function (lX, lY) { var lX4, lY4, lX8, lY8, lResult; lX8 = (lX & 2147483648); lY8 = (lY & 2147483648); lX4 = (lX & 1073741824); lY4 = (lY & 1073741824); lResult = (lX & 1073741823) + (lY & 1073741823); if (lX4 & lY4) { return (lResult ^ 2147483648 ^ lX8 ^ lY8) } if (lX4 | lY4) { if (lResult & 1073741824) { return (lResult ^ 3221225472 ^ lX8 ^ lY8) } else { return (lResult ^ 1073741824 ^ lX8 ^ lY8) } } else { return (lResult ^ lX8 ^ lY8) } }; var F = function (x, y, z) { return (x & y) | ((~x) & z) }; var G = function (x, y, z) { return (x & z) | (y & (~z)) }; var H = function (x, y, z) { return (x ^ y ^ z) }; var I = function (x, y, z) { return (y ^ (x | (~z))) }; var FF = function (a, b, c, d, x, s, ac) { a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac)); return addUnsigned(rotateLeft(a, s), b) }; var GG = function (a, b, c, d, x, s, ac) { a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac)); return addUnsigned(rotateLeft(a, s), b) }; var HH = function (a, b, c, d, x, s, ac) { a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac)); return addUnsigned(rotateLeft(a, s), b) }; var II = function (a, b, c, d, x, s, ac) { a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac)); return addUnsigned(rotateLeft(a, s), b) }; var convertToWordArray = function (string) { var lWordCount; var lMessageLength = string.length; var lNumberOfWordsTempOne = lMessageLength + 8; var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64; var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16; var lWordArray = Array(lNumberOfWords - 1); var lBytePosition = 0; var lByteCount = 0; while (lByteCount < lMessageLength) { lWordCount = (lByteCount - (lByteCount % 4)) / 4; lBytePosition = (lByteCount % 4) * 8; lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition)); lByteCount++ } lWordCount = (lByteCount - (lByteCount % 4)) / 4; lBytePosition = (lByteCount % 4) * 8; lWordArray[lWordCount] = lWordArray[lWordCount] | (128 << lBytePosition); lWordArray[lNumberOfWords - 2] = lMessageLength << 3; lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29; return lWordArray }; var wordToHex = function (lValue) { var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount; for (lCount = 0; lCount <= 3; lCount++) { lByte = (lValue >>> (lCount * 8)) & 255; WordToHexValueTemp = "0" + lByte.toString(16); WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2) } return WordToHexValue }; var uTF8Encode = function (string) { string = string.replace(/\x0d\x0a/g, "\x0a"); var output = ""; for (var n = 0; n < string.length; n++) { var c = string.charCodeAt(n); if (c < 128) { output += String.fromCharCode(c) } else { if ((c > 127) && (c < 2048)) { output += String.fromCharCode((c >> 6) | 192); output += String.fromCharCode((c & 63) | 128) } else { output += String.fromCharCode((c >> 12) | 224); output += String.fromCharCode(((c >> 6) & 63) | 128); output += String.fromCharCode((c & 63) | 128) } } } return output }; function md5(string) { var x = Array(); var k, AA, BB, CC, DD, a, b, c, d; var S11 = 7, S12 = 12, S13 = 17, S14 = 22; var S21 = 5, S22 = 9, S23 = 14, S24 = 20; var S31 = 4, S32 = 11, S33 = 16, S34 = 23; var S41 = 6, S42 = 10, S43 = 15, S44 = 21; string = uTF8Encode(string); x = convertToWordArray(string); a = 1732584193; b = 4023233417; c = 2562383102; d = 271733878; for (k = 0; k < x.length; k += 16) { AA = a; BB = b; CC = c; DD = d; a = FF(a, b, c, d, x[k + 0], S11, 3614090360); d = FF(d, a, b, c, x[k + 1], S12, 3905402710); c = FF(c, d, a, b, x[k + 2], S13, 606105819); b = FF(b, c, d, a, x[k + 3], S14, 3250441966); a = FF(a, b, c, d, x[k + 4], S11, 4118548399); d = FF(d, a, b, c, x[k + 5], S12, 1200080426); c = FF(c, d, a, b, x[k + 6], S13, 2821735955); b = FF(b, c, d, a, x[k + 7], S14, 4249261313); a = FF(a, b, c, d, x[k + 8], S11, 1770035416); d = FF(d, a, b, c, x[k + 9], S12, 2336552879); c = FF(c, d, a, b, x[k + 10], S13, 4294925233); b = FF(b, c, d, a, x[k + 11], S14, 2304563134); a = FF(a, b, c, d, x[k + 12], S11, 1804603682); d = FF(d, a, b, c, x[k + 13], S12, 4254626195); c = FF(c, d, a, b, x[k + 14], S13, 2792965006); b = FF(b, c, d, a, x[k + 15], S14, 1236535329); a = GG(a, b, c, d, x[k + 1], S21, 4129170786); d = GG(d, a, b, c, x[k + 6], S22, 3225465664); c = GG(c, d, a, b, x[k + 11], S23, 643717713); b = GG(b, c, d, a, x[k + 0], S24, 3921069994); a = GG(a, b, c, d, x[k + 5], S21, 3593408605); d = GG(d, a, b, c, x[k + 10], S22, 38016083); c = GG(c, d, a, b, x[k + 15], S23, 3634488961); b = GG(b, c, d, a, x[k + 4], S24, 3889429448); a = GG(a, b, c, d, x[k + 9], S21, 568446438); d = GG(d, a, b, c, x[k + 14], S22, 3275163606); c = GG(c, d, a, b, x[k + 3], S23, 4107603335); b = GG(b, c, d, a, x[k + 8], S24, 1163531501); a = GG(a, b, c, d, x[k + 13], S21, 2850285829); d = GG(d, a, b, c, x[k + 2], S22, 4243563512); c = GG(c, d, a, b, x[k + 7], S23, 1735328473); b = GG(b, c, d, a, x[k + 12], S24, 2368359562); a = HH(a, b, c, d, x[k + 5], S31, 4294588738); d = HH(d, a, b, c, x[k + 8], S32, 2272392833); c = HH(c, d, a, b, x[k + 11], S33, 1839030562); b = HH(b, c, d, a, x[k + 14], S34, 4259657740); a = HH(a, b, c, d, x[k + 1], S31, 2763975236); d = HH(d, a, b, c, x[k + 4], S32, 1272893353); c = HH(c, d, a, b, x[k + 7], S33, 4139469664); b = HH(b, c, d, a, x[k + 10], S34, 3200236656); a = HH(a, b, c, d, x[k + 13], S31, 681279174); d = HH(d, a, b, c, x[k + 0], S32, 3936430074); c = HH(c, d, a, b, x[k + 3], S33, 3572445317); b = HH(b, c, d, a, x[k + 6], S34, 76029189); a = HH(a, b, c, d, x[k + 9], S31, 3654602809); d = HH(d, a, b, c, x[k + 12], S32, 3873151461); c = HH(c, d, a, b, x[k + 15], S33, 530742520); b = HH(b, c, d, a, x[k + 2], S34, 3299628645); a = II(a, b, c, d, x[k + 0], S41, 4096336452); d = II(d, a, b, c, x[k + 7], S42, 1126891415); c = II(c, d, a, b, x[k + 14], S43, 2878612391); b = II(b, c, d, a, x[k + 5], S44, 4237533241); a = II(a, b, c, d, x[k + 12], S41, 1700485571); d = II(d, a, b, c, x[k + 3], S42, 2399980690); c = II(c, d, a, b, x[k + 10], S43, 4293915773); b = II(b, c, d, a, x[k + 1], S44, 2240044497); a = II(a, b, c, d, x[k + 8], S41, 1873313359); d = II(d, a, b, c, x[k + 15], S42, 4264355552); c = II(c, d, a, b, x[k + 6], S43, 2734768916); b = II(b, c, d, a, x[k + 13], S44, 1309151649); a = II(a, b, c, d, x[k + 4], S41, 4149444226); d = II(d, a, b, c, x[k + 11], S42, 3174756917); c = II(c, d, a, b, x[k + 2], S43, 718787259); b = II(b, c, d, a, x[k + 9], S44, 3951481745); a = addUnsigned(a, AA); b = addUnsigned(b, BB); c = addUnsigned(c, CC); d = addUnsigned(d, DD) } var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d); return tempValue.toLowerCase() };