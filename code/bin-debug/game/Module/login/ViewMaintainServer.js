var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ViewMaintainServer = (function (_super) {
    __extends(ViewMaintainServer, _super);
    function ViewMaintainServer() {
        var _this = _super.call(this) || this;
        _this.needExite = true;
        _this.imgCompHandle();
        return _this;
    }
    ViewMaintainServer.getInst = function () {
        return this._inst || (this._inst = new ViewMaintainServer());
    };
    ViewMaintainServer.prototype.imgCompHandle = function () {
        var s = this;
        s.panel = fairygui.UIPackage.createObject("Login", "ViewMaintainServer").asCom;
        s.addChild(s.panel);
        this.backImg = s.panel.getChild("n0").asLoader;
        IconUtil.setImg(s.backImg, Enum_Path.BACK_URL + "Maintain.png");
        var n0 = s.panel.getChild("n0").asLoader;
        s.lb = s.panel.getChild("lb").asRichTextField;
        var shape = s.panel.getChild("n3").asGraph;
        var scaleNum = LayerManager.getFullScreenSc();
        n0.setSize(631 * scaleNum, 375 * scaleNum);
        s.lb.setSize(479 * scaleNum, 82 * scaleNum);
        shape.setSize(App.stage.stageWidth, App.stage.stageHeight);
    };
    ViewMaintainServer.prototype.reqPHP = function () {
        var loginArg = GGlobal.loginArg;
        var request = Model_UserData.getNotice(Model_UserData.MAINTAIN, loginArg.open_id, loginArg.loginIP, loginArg.zoneid);
        this.request = request;
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    ViewMaintainServer.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        egret.log("get data : ", request.response);
        var requestData = JSON.parse(request.response);
        if (requestData.result == 1) {
            this.lb.text = "维护时间：" + requestData.content;
        }
        else {
            egret.callLater(this.delayEnterGame, this);
        }
        this.removeList();
    };
    ViewMaintainServer.prototype.delayEnterGame = function () {
        this.needExite = false;
        this.closeHandle();
        GameLoginView1.getInst().directEnterGame();
    };
    ViewMaintainServer.prototype.removeList = function () {
        var s = this;
        s.request.removeEventListener(egret.Event.COMPLETE, s.onGetComplete, s);
        s.request.removeEventListener(egret.IOErrorEvent.IO_ERROR, s.onGetIOError, s);
        s.request.removeEventListener(egret.ProgressEvent.PROGRESS, s.onGetProgress, s);
        s.request = null;
    };
    ViewMaintainServer.prototype.onGetIOError = function (event) {
    };
    ViewMaintainServer.prototype.onGetProgress = function (event) {
    };
    ViewMaintainServer.prototype.onShown = function () {
        var s = this;
        this.addClickListener(this.closeHandle, this);
        s.reqPHP();
    };
    ViewMaintainServer.prototype.onHide = function () {
        var s = this;
        if (GGlobal.sdk && this.needExite) {
            GGlobal.sdk.exitApp();
        }
        else if (HLSDK.whalePbSDK && this.needExite) {
            HLSDK.logout();
        }
        this.removeClickListener(s.closeHandle, s);
        if (s.displayObject.stage) {
            GGlobal.main.removeChild(s.displayObject);
        }
        IconUtil.setImg(s.backImg, null);
    };
    ViewMaintainServer.prototype.closeHandle = function () {
        this.onHide();
    };
    ViewMaintainServer.prototype.show = function () {
        GGlobal.main.addChild(this.displayObject);
        return this;
    };
    ViewMaintainServer.URL = "ui://a056duzj10veut";
    return ViewMaintainServer;
}(fairygui.GComponent));
__reflect(ViewMaintainServer.prototype, "ViewMaintainServer");
