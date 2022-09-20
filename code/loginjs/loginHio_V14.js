
var ip = null;
var port;
var zoneid;
var clientversion = 'v8';
var alias;//区服名字
var state = 1;//服务器状态: 0维护 1新区 2火爆
var newPlayer;//是否是新玩家
var whitelist;//是否是白名单玩家
var blacklist;//是否是黑名单
var recentServers = null; //最近服务器列表
var zoneListData;//区服数据 分成每20个区的二维数组
var formalServers = null; //服务器列表
var serverData = null; // 选服接口返回的服务器列表数据
var isGetServer = false;//是否已经申请过区服列表数据
var isClickEnter = false;
var isLoadMain = false;
var isGG = ""; //是否打开过公告

function showgonggao(e) {
  if (loginArg) {
    showgg();
	$('.pop_title').html("公 告")
    if (!isGG) {
      isGG = true;
      var url = loginArg.serverHttpUrl + "?" + Math.random();
      var data = {};
      var time = Math.random();
      data.sign = md5("cmd=" + 201 + "openid=" + loginArg.account + "pf=" + pf + "randnum=" + time + "clientKey");
      data.cmd = 201;
      data.randnum = time;
      data.pf = pf;
      data.openid = loginArg.account;
      loadHttp(url, function (result) {
		  isGG = result;
        $('#ggcontent').html("" + isGG);
      }, data);
    }else{
		$('#ggcontent').html("" + isGG);
	}
  }
}

function showxieyi(e) {//打开用户协议
  if (loginArg) {
    showgg();
	$('.pop_title').html("用户协议");
	$('#ggcontent').html('<iframe scrolling="auto" frameborder="0" src="loginjs/xieyi.htm" style="width:100%;height:99%;"></iframe>');
  }
}

//注销
function zuxiao(e) {
   whalePbSDK.logout(function (status) {console.log(status);});
} 


//1登录的新服和历史服务器  2为服务器列表
function createHttpData(cmd, openid) {
  var pf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'jysgzj01';
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var data = {};
  var time = Math.random();
  data.sign = md5("cmd=" + cmd + "openid=" + openid + "pf=" + pf + "randnum=" + time + "type=" + type + "clientKey");
  data.cmd = cmd;
  data.randnum = time;
  data.pf = pf;
  data.openid = openid;
  data.type = type;
  return data;
}

$(document).ready(function (e) {
  $('.goplay').click(function () {
    if (!ip || !loginArg) {
      return;
    }
    if (isTest) {
      loginArg.account = $("#zhanghaoTxt.newInput").val();
    }
    if (state == 0 && !whitelist) {
      //不是白名单
      if ($("#alert").length <= 0) {
        createAlert();
        var url = loginArg.serverHttpUrl;
        var data = {};
        var time = Math.random();
        data.sign = md5("cmd=" + 203 + "ip=" + ip + "openid=" + loginArg.account + "pf=" + pf + "randnum=" + time + "zoneid=" + zoneid + "clientKey");
        data.cmd = 203;
        data.pf = pf;
        data.zoneid = zoneid;
        data.ip = ip;
        data.openid = loginArg.account;
        data.randnum = time;
        loadHttp(url, function (ret) {
          console.log("维护信息：" + ret);
          var obj = JSON.parse(ret);
          if (obj.result == 1) {
            $('.alertContent').html("" + obj.content);
          } else {
            bodyOnLoad();
          }
        }, data);
      }
      showAlert();
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
  });

  $('#ggbtn').click(showgonggao);//公告
  $('#xieyibtn').click(showxieyi);
  $('#zuxiaobtn').click(zuxiao);
  $('#ggclose,#ggtopclose').click(function (e) {
    hidegg();
  }); //选服页交互

  $('.servername').click(function (e) {
    if (loginArg) {
      if (!isGetServer) {
        isGetServer = true;
        var url = loginArg.serverHttpUrl;
        var data = createHttpData(202, loginArg.account, pf, 2);
        loadHttp(url, function (result) {
          serverData = JSON.parse(result);
          initServerData();
        }, data);
      }
	  $('.pop_title').html("选择区服")
      showslist();
    }
  });
  $('#sclosetitle,#sclose').click(function (e) {
    showchoose();
  });
  if (isTest) {
    testInitData();
  } else {
    initData();
  }
});

function initData() {
  if (loginArg) {
    var url = loginArg.serverHttpUrl;
    var data = createHttpData(202, loginArg.account, pf, 1);
    loadHttp(url, function (result) {
      var info = JSON.parse(result);
      console.log("新服和历史服务器：" + info);
      whitelist = info.white && info.white == 1;
      blacklist = info.black && info.black == 1;
      newPlayer = info.newPlayer && info.newPlayer == 1;
      var last;
      if (info && info.recent && info.recent[0]) {
        last = info.recent[0];
      } else {
        last = info.formal[0];
      }

      ip = last.ip;
      port = last.port;
      zoneid = last.zoneid;
      alias = last.alias;
      state = last.state;
      clientversion = last.clientversion;
      loginArg.clientversion = clientversion;

      setServerSt(state);
      if (blacklist) {
        createfenhaoAlert();
        showfenhaoAlert();
        $('.fenhaoalertContent').html("您的账号处于异常状态<br/>请联系游戏客服");
        return;
      }

      if (!isTest && newPlayer && state != 0) {
        autoEnterNewServer();
      }
    }, data);
  } else {
    setTimeout(function () {
      initData();
    }, 50);
  }
}

function showFenHaoByServer() {
  createfenhaoAlert();
  showfenhaoAlert();
  $('.fenhaoalertContent').html("您的账号处于异常状态<br/>请联系游戏客服");
}

function setServerSt(val) {
  if (val == 0) {//维护中
    $("#imgst").attr('src', "../loginres/flag3.png");
    $('.servername').html(alias);
  } else {//火爆
    $("#imgst").attr('src', "../loginres/flag2.png");
    $('.servername').html(alias);
  }
  if (isTest) {
    $('.version').html("&nbsp;&nbsp;&nbsp;<font color='#00FF00'>version:</font>" + clientversion);
    $("#zhanghaoTxt.newInput").val(loginArg.account);
  }
}

function testInitData() {//内测服走此处。
  if (loginArg) {
    var selectD;
    var url = "";
    var data = {};
    url = loginArg.serverHttpUrl;
    data = createHttpData(202, loginArg.account, pf, 1);
    loadHttp(url, function (result) {
      console.log(result);
      var info = JSON.parse(result);
      var newSever;
      if (info && info.recent && info.recent[0]) {
       newSever =  selectD = info.recent[0];
      } else {
        newSever = selectD = info.formal[0];
      }
      ip = selectD.ip;
      port = selectD.port;
      zoneid = selectD.zoneid;
      alias = selectD.alias;
      state = selectD.state;
      clientversion = selectD.clientversion;
      loginArg.clientversion = clientversion;
      setServerSt(state);
      $('.newname').html("最新服&nbsp;&nbsp;<font color='#00FF00'>" + newSever.alias + "</font>");
    }, data);
  } else {
    setTimeout(function () {
      testInitData();
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

function showfenhaoAlert() {
  $('#choose').addClass('choose_none');
  $('#choose').removeClass('choose choose_webkit');
  $('#fenhaoalert').addClass('fenhaoalert fenhaoalert_webkit');
  $('#fenhaoalert').removeClass('fenhaoalert_none');
  $('#popbg').show();
  $('#popbg').click(function (e) {
    reLoginWeb();
  });
}

function hidefenhaoAlert() {
  $('#choose').addClass('choose choose_webkit');
  $('#choose').removeClass('choose_none');
  $('#fenhaoalert').addClass('fenhaoalert_none');
  $('#fenhaoalert').removeClass('fenhaoalert fenhaoalert_webkit');
  $('#popbg').unbind("click");
  $('#popbg').hide();
}

function createfenhaoAlert() {
  var str = "<div id='fenhaoalert' class='fenhaoalert_none'><div class='fenhaoalertContent'>提示</div></div>";
  $('#server').prepend(str);
  $('#fenhaoalert').click(function (e) {
    hidefenhaoAlert();
    reLoginWeb();
  });
}

function showAlert() {
  $('#choose').addClass('choose_none');
  $('#choose').removeClass('choose choose_webkit');
  $('#alert').addClass('alert alert_webkit');
  $('#alert').removeClass('alert_none');
  $('#popbg').show();
  $('#popbg').click(function (e) {
    reLoginWeb();
  });
}

function hideAlert() {
  $('#choose').addClass('choose choose_webkit');
  $('#choose').removeClass('choose_none');
  $('#alert').addClass('alert_none');
  $('#alert').removeClass('alert alert_webkit');
  $('#popbg').unbind("click");
  $('#popbg').hide();
}

function createAlert() {
  var str = "<div id='alert' class='alert_none'><div class='alertContent'>维护时间：</div></div>";
  $('#server').append(str);
  $('#alert').click(function (e) {
    $("#server").unbind("click");
    hideAlert();
  });
}

function initServerData() {//服务器列表
  if (!serverData) return;
  zoneListData = [];
  recentServers = serverData.recent;
  formalServers = serverData.formal;
  if(typeof servCutLenv5 != "undefined"){
	  formalServers = formalServers.slice(servCutLenv5)
  }
  var zoneGap = 20;
  var len = formalServers.length;
  var count = Math.ceil(len / zoneGap);

  for (var i = 0; i < count; i++) {
    var zoneName = 1 + zoneGap * i + "-" + (i + 1) * zoneGap + "区";
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

function updateSerList(str) {//显示服务器列表
  var server_div = '';
  $('.serversel').empty();
  if (str == "最近登录") {
    if (recentServers) {
      for (var i = recentServers.length - 1; i >= 0; i--) {
        var data = recentServers[i];
        var str = JSON.stringify(data);
        server_div += GetServerSelDiv(data.alias, data.state, data.ip, data.port, data.zoneid, data.clientversion);
      }
    }
  } else {
    var sp = str.split('-');
    var first = sp[0];
    var last = sp[1];
    last = Number(last.substring(0, last.length - 1));
    if (formalServers) {
      for (var i = last - 1; i >= first - 1; i--) {
        var data = formalServers[i];
        if (!data) {
          continue;
        }
        var str = JSON.stringify(data);
        server_div += GetServerSelDiv(data.alias, data.state, data.ip, data.port, data.zoneid, data.clientversion);
      }
    }
  }

  $('.serversel').append(server_div);
  $('.serversel>div').click(function (e) {
    $('.serversel>div').addClass('servernoselect');
    $('.serversel>div').removeClass('serverselect');
    $(this).removeClass('servernoselect');
    $(this).addClass('serverselect'); // 选服
    showchoose(); // 记录选择信息
    ip = $(this).attr('ip');
    port = $(this).attr('port');
    zoneid = $(this).attr('zoneid');
    alias = $(this).attr('alias');
    state = $(this).attr('state');
    clientversion = $(this).attr('clientversion');
    loginArg.clientversion = clientversion;
    if (state == 0) {
      $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>维护中</font>");
    } else {
      $('.servername').html(alias + "&nbsp;&nbsp;&nbsp;<font color='#00FF00'>选服></font>");
    }
  });
}

function loadHttp(url, callback, data) {//http请求数据
  $.ajax({
    type: "get",
    url: url,
    data: data,
    success: function success(result) {
      callback && callback(result);
    },
    error: function error() {
      callback && callback(null);
    }
  });
}


function GetServerSelDiv(servername, status, ip, port, zoneid, clientversion) {
  var tag = "<span ></span>";
  if (status == 1 || status == 3) {
    tag = '<span class="new-tag"></span>';
  } else if (status == 2 || status == 4) {
    tag = '<span class="hot-tag"></span>';
  } else if (status == -1) {
    tag = '<span class="beiyong-tag"></span>';
  } else if (status == 0) {
    tag = '<span class="rest-tag"></span>';
    servername += " 维护中";
  }
  return '<div ip=' + ip + ' port=' + port + ' alias=' + servername + ' zoneid=' + zoneid + ' state=' + status + ' clientversion=' + clientversion + ' class="servernoselect">' + servername + tag + '</div>';
}

var pro1;
var star1;
var pro2;
var star2;
var proInter; //进度条
var proWidth = 8.4;
var pro2num = 0;
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
  var w = pro / 100 * proWidth; // var w = 5;
  pro1.style.width = w + "rem";
  if (pro >= 95) {
    pro2.style.width = proWidth + "rem";
    clearTimeout(proInter);
    proInter = 0;
  }
}

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

function bodyOnLoad() {
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
  var list = ["js/egrelib.js", gamejs];
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
    var serverData = {};
    loginArg.ip = serverData.ip = ip;
    loginArg.port = serverData.port = port;
    loginArg.zoneid = serverData.zoneid = "" + zoneid;
    loginArg.serverName = serverData.alias = alias;
    loginArg.state = serverData.state = state;

    showLoadProgress("(加载游戏资源)", 30, 0);
    var isMobile = egret.Capabilities.isMobile;
    egret.runEgret({
      renderMode: "webgl",
      audioType: 0,
      calculateCanvasScaleFactor: function calculateCanvasScaleFactor(context) {
        if (!isMobile) {
          return 2;
        }
        var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
      }
    });
  }
}

function autoEnterNewServer() {
  $('.goplay').click();
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
  $("#gameBg").css({
    'background': '#000'
  });
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

var rotateLeft = function rotateLeft(lValue, iShiftBits) {
  return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
};

var addUnsigned = function addUnsigned(lX, lY) {
  var lX4, lY4, lX8, lY8, lResult;
  lX8 = lX & 2147483648;
  lY8 = lY & 2147483648;
  lX4 = lX & 1073741824;
  lY4 = lY & 1073741824;
  lResult = (lX & 1073741823) + (lY & 1073741823);

  if (lX4 & lY4) {
    return lResult ^ 2147483648 ^ lX8 ^ lY8;
  }

  if (lX4 | lY4) {
    if (lResult & 1073741824) {
      return lResult ^ 3221225472 ^ lX8 ^ lY8;
    } else {
      return lResult ^ 1073741824 ^ lX8 ^ lY8;
    }
  } else {
    return lResult ^ lX8 ^ lY8;
  }
};

var F = function F(x, y, z) {
  return x & y | ~x & z;
};

var G = function G(x, y, z) {
  return x & z | y & ~z;
};

var H = function H(x, y, z) {
  return x ^ y ^ z;
};

var I = function I(x, y, z) {
  return y ^ (x | ~z);
};

var FF = function FF(a, b, c, d, x, s, ac) {
  a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
  return addUnsigned(rotateLeft(a, s), b);
};

var GG = function GG(a, b, c, d, x, s, ac) {
  a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
  return addUnsigned(rotateLeft(a, s), b);
};

var HH = function HH(a, b, c, d, x, s, ac) {
  a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
  return addUnsigned(rotateLeft(a, s), b);
};

var II = function II(a, b, c, d, x, s, ac) {
  a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
  return addUnsigned(rotateLeft(a, s), b);
};

var convertToWordArray = function convertToWordArray(string) {
  var lWordCount;
  var lMessageLength = string.length;
  var lNumberOfWordsTempOne = lMessageLength + 8;
  var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - lNumberOfWordsTempOne % 64) / 64;
  var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
  var lWordArray = Array(lNumberOfWords - 1);
  var lBytePosition = 0;
  var lByteCount = 0;

  while (lByteCount < lMessageLength) {
    lWordCount = (lByteCount - lByteCount % 4) / 4;
    lBytePosition = lByteCount % 4 * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | string.charCodeAt(lByteCount) << lBytePosition;
    lByteCount++;
  }

  lWordCount = (lByteCount - lByteCount % 4) / 4;
  lBytePosition = lByteCount % 4 * 8;
  lWordArray[lWordCount] = lWordArray[lWordCount] | 128 << lBytePosition;
  lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
  lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
  return lWordArray;
};

var wordToHex = function wordToHex(lValue) {
  var WordToHexValue = "",
    WordToHexValueTemp = "",
    lByte,
    lCount;

  for (lCount = 0; lCount <= 3; lCount++) {
    lByte = lValue >>> lCount * 8 & 255;
    WordToHexValueTemp = "0" + lByte.toString(16);
    WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
  }

  return WordToHexValue;
};

var uTF8Encode = function uTF8Encode(string) {
  string = string.replace(/\x0d\x0a/g, "\x0a");
  var output = "";

  for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n);

    if (c < 128) {
      output += String.fromCharCode(c);
    } else {
      if (c > 127 && c < 2048) {
        output += String.fromCharCode(c >> 6 | 192);
        output += String.fromCharCode(c & 63 | 128);
      } else {
        output += String.fromCharCode(c >> 12 | 224);
        output += String.fromCharCode(c >> 6 & 63 | 128);
        output += String.fromCharCode(c & 63 | 128);
      }
    }
  }

  return output;
};

function md5(string) {
  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22;
  var S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20;
  var S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23;
  var S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;
  string = uTF8Encode(string);
  x = convertToWordArray(string);
  a = 1732584193;
  b = 4023233417;
  c = 2562383102;
  d = 271733878;

  for (k = 0; k < x.length; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = FF(a, b, c, d, x[k + 0], S11, 3614090360);
    d = FF(d, a, b, c, x[k + 1], S12, 3905402710);
    c = FF(c, d, a, b, x[k + 2], S13, 606105819);
    b = FF(b, c, d, a, x[k + 3], S14, 3250441966);
    a = FF(a, b, c, d, x[k + 4], S11, 4118548399);
    d = FF(d, a, b, c, x[k + 5], S12, 1200080426);
    c = FF(c, d, a, b, x[k + 6], S13, 2821735955);
    b = FF(b, c, d, a, x[k + 7], S14, 4249261313);
    a = FF(a, b, c, d, x[k + 8], S11, 1770035416);
    d = FF(d, a, b, c, x[k + 9], S12, 2336552879);
    c = FF(c, d, a, b, x[k + 10], S13, 4294925233);
    b = FF(b, c, d, a, x[k + 11], S14, 2304563134);
    a = FF(a, b, c, d, x[k + 12], S11, 1804603682);
    d = FF(d, a, b, c, x[k + 13], S12, 4254626195);
    c = FF(c, d, a, b, x[k + 14], S13, 2792965006);
    b = FF(b, c, d, a, x[k + 15], S14, 1236535329);
    a = GG(a, b, c, d, x[k + 1], S21, 4129170786);
    d = GG(d, a, b, c, x[k + 6], S22, 3225465664);
    c = GG(c, d, a, b, x[k + 11], S23, 643717713);
    b = GG(b, c, d, a, x[k + 0], S24, 3921069994);
    a = GG(a, b, c, d, x[k + 5], S21, 3593408605);
    d = GG(d, a, b, c, x[k + 10], S22, 38016083);
    c = GG(c, d, a, b, x[k + 15], S23, 3634488961);
    b = GG(b, c, d, a, x[k + 4], S24, 3889429448);
    a = GG(a, b, c, d, x[k + 9], S21, 568446438);
    d = GG(d, a, b, c, x[k + 14], S22, 3275163606);
    c = GG(c, d, a, b, x[k + 3], S23, 4107603335);
    b = GG(b, c, d, a, x[k + 8], S24, 1163531501);
    a = GG(a, b, c, d, x[k + 13], S21, 2850285829);
    d = GG(d, a, b, c, x[k + 2], S22, 4243563512);
    c = GG(c, d, a, b, x[k + 7], S23, 1735328473);
    b = GG(b, c, d, a, x[k + 12], S24, 2368359562);
    a = HH(a, b, c, d, x[k + 5], S31, 4294588738);
    d = HH(d, a, b, c, x[k + 8], S32, 2272392833);
    c = HH(c, d, a, b, x[k + 11], S33, 1839030562);
    b = HH(b, c, d, a, x[k + 14], S34, 4259657740);
    a = HH(a, b, c, d, x[k + 1], S31, 2763975236);
    d = HH(d, a, b, c, x[k + 4], S32, 1272893353);
    c = HH(c, d, a, b, x[k + 7], S33, 4139469664);
    b = HH(b, c, d, a, x[k + 10], S34, 3200236656);
    a = HH(a, b, c, d, x[k + 13], S31, 681279174);
    d = HH(d, a, b, c, x[k + 0], S32, 3936430074);
    c = HH(c, d, a, b, x[k + 3], S33, 3572445317);
    b = HH(b, c, d, a, x[k + 6], S34, 76029189);
    a = HH(a, b, c, d, x[k + 9], S31, 3654602809);
    d = HH(d, a, b, c, x[k + 12], S32, 3873151461);
    c = HH(c, d, a, b, x[k + 15], S33, 530742520);
    b = HH(b, c, d, a, x[k + 2], S34, 3299628645);
    a = II(a, b, c, d, x[k + 0], S41, 4096336452);
    d = II(d, a, b, c, x[k + 7], S42, 1126891415);
    c = II(c, d, a, b, x[k + 14], S43, 2878612391);
    b = II(b, c, d, a, x[k + 5], S44, 4237533241);
    a = II(a, b, c, d, x[k + 12], S41, 1700485571);
    d = II(d, a, b, c, x[k + 3], S42, 2399980690);
    c = II(c, d, a, b, x[k + 10], S43, 4293915773);
    b = II(b, c, d, a, x[k + 1], S44, 2240044497);
    a = II(a, b, c, d, x[k + 8], S41, 1873313359);
    d = II(d, a, b, c, x[k + 15], S42, 4264355552);
    c = II(c, d, a, b, x[k + 6], S43, 2734768916);
    b = II(b, c, d, a, x[k + 13], S44, 1309151649);
    a = II(a, b, c, d, x[k + 4], S41, 4149444226);
    d = II(d, a, b, c, x[k + 11], S42, 3174756917);
    c = II(c, d, a, b, x[k + 2], S43, 718787259);
    b = II(b, c, d, a, x[k + 9], S44, 3951481745);
    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
  return tempValue.toLowerCase();
}

;