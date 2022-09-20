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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var GameLoginBroadcast = (function (_super) {
    __extends(GameLoginBroadcast, _super);
    function GameLoginBroadcast() {
        return _super.call(this) || this;
    }
    GameLoginBroadcast.createInstance = function () {
        return (fairygui.UIPackage.createObject("Login", "GameLoginBroadcast"));
    };
    GameLoginBroadcast.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbContent = (this.getChild("lbContent"));
        this.btnClose = (this.getChild("btnClose"));
        this.bg = (this.getChild("bg"));
        var app = App.stage;
        this.scaleX = this.scaleY = LayerManager.getFullScreenSc();
        this.setXY((app.stageWidth - this.width * this.scaleX) >> 1, (app.stageHeight - this.height * this.scaleY) >> 1);
        this.onListen();
    };
    GameLoginBroadcast.prototype.closeHd = function () {
        this.uidispose();
    };
    GameLoginBroadcast.prototype.getBroadCastContent = function () {
        if (GGlobal.sdk) {
            var request = Model_UserData.getPhpParam(Model_UserData.BROADCAST, GGlobal.loginArg.open_id, GGlobal.loginArg.pfcode);
            request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
        }
        else {
            var loader = new egret.URLLoader();
            loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            var url = GGlobal.resHead + "loginlib/broadcast.php";
            var request = new egret.URLRequest(url);
            //开始加载
            loader.load(request);
        }
    };
    GameLoginBroadcast.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        egret.log("get data : ", request.response);
        this.lbContent.text = request.response;
    };
    GameLoginBroadcast.prototype.onGetIOError = function (event) {
        egret.log("get error broadcast: " + event);
    };
    GameLoginBroadcast.prototype.onGetProgress = function (event) {
        egret.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    GameLoginBroadcast.prototype.onLoadComplete = function (event) {
        egret.log("onLoadComplete");
        var loader = event.target;
        this.lbContent.text = loader.data;
    };
    GameLoginBroadcast.prototype.onLoadError = function () {
        egret.log("onLoadError login broadcast");
    };
    GameLoginBroadcast.prototype.onListen = function () {
        this.getBroadCastContent();
        this.btnClose.addClickListener(this.closeHd, this);
        this.bg.addClickListener(this.closeHd, this);
    };
    GameLoginBroadcast.prototype.onRemove = function () {
        this.btnClose.removeClickListener(this.closeHd, this);
        this.bg.removeClickListener(this.closeHd, this);
    };
    GameLoginBroadcast.prototype.uidispose = function () {
        if (this.displayObject && this.displayObject.parent) {
            this.displayObject.parent.removeChild(this.displayObject);
        }
    };
    GameLoginBroadcast.URL = "ui://a056duzjluu2m";
    return GameLoginBroadcast;
}(fairygui.GComponent));
__reflect(GameLoginBroadcast.prototype, "GameLoginBroadcast");
