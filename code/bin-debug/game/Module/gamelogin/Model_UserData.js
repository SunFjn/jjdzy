var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Model_UserData = (function () {
    function Model_UserData() {
    }
    Model_UserData.getMD5 = function (val) {
        var a = new GameMD5().hex_md5(val);
        return a;
    };
    Model_UserData.getServerListPanel = function (cmd, openid, pf, type) {
        if (openid === void 0) { openid = 112; }
        if (pf === void 0) { pf = "wxsgzj01"; }
        if (type === void 0) { type = 2; }
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.open(Model_UserData.PHPURL, egret.HttpMethod.POST);
        var time = new Date().getTime();
        var md5 = Model_UserData.getMD5("cmd=" + cmd + "openid=" + openid + "pf=" + pf + "randnum=" + time + "type=" + type + "clientKey");
        var str = "sign=" + md5 +
            "&cmd=" + cmd +
            "&randnum=" + time +
            "&pf=" + pf +
            "&openid=" + openid +
            "&type=" + type;
        request.send(str);
        egret.log(str);
        return request;
    };
    Model_UserData.getPhpParam = function (cmd, openid, pf) {
        if (openid === void 0) { openid = 112; }
        if (pf === void 0) { pf = "wxsgzj01"; }
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.open(Model_UserData.PHPURL, egret.HttpMethod.POST);
        var time = new Date().getTime();
        var md5 = Model_UserData.getMD5("cmd=" + cmd + "openid=" + openid + "pf=" + pf + "randnum=" + time + "clientKey");
        var str = "sign=" + md5 +
            "&cmd=" + cmd +
            "&randnum=" + time +
            "&pf=" + pf +
            "&openid=" + openid;
        request.send(str);
        egret.log(str);
        return request;
    };
    Model_UserData.getNotice = function (cmd, openid, ip, zoneid, pf) {
        if (openid === void 0) { openid = 112; }
        if (pf === void 0) { pf = "wxsgzj01"; }
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.open(Model_UserData.PHPURL, egret.HttpMethod.POST);
        var time = new Date().getTime();
        var md5 = Model_UserData.getMD5("cmd=" + cmd + "ip=" + ip + "openid=" + openid + "pf=" + pf + "randnum=" + time + "zoneid=" + zoneid + "clientKey");
        var str = "sign=" + md5 + "&cmd=" + cmd + "&pf=" + pf
            + "&zoneid=" + zoneid + "&ip=" + ip + "&openid=" + openid + "&randnum=" + time;
        request.send(str);
        egret.log(str);
        return request;
    };
    Model_UserData.isWhitePlayer = false; //是否是白名单玩家
    Model_UserData.isBlackPlayer = false; //是否是黑名单玩家
    Model_UserData.newPlayer = false; //是否是新玩家 WX直接进入游戏
    Model_UserData.SERVERLIST = 202;
    Model_UserData.BROADCAST = 201;
    Model_UserData.MAINTAIN = 203; /**0白名单 1维护公告*/
    Model_UserData.PHPURL = "http://neice.sgzj.jyouy.com:7002/";
    return Model_UserData;
}());
__reflect(Model_UserData.prototype, "Model_UserData");
