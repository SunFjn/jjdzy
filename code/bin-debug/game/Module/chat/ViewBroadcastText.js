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
var ViewBroadcastText = (function (_super) {
    __extends(ViewBroadcastText, _super);
    function ViewBroadcastText() {
        var _this = _super.call(this) || this;
        _this.listStr = [];
        _this.isTween = false;
        return _this;
    }
    ViewBroadcastText.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.btxt = (this.getChild("btxt"));
        this.btxt.callBack = Handler.create(this, this.run);
        this.btxt.touchable = false;
        this.touchable = false;
        this.resetPosition();
        GGlobal.control.listen(Enum_MsgType.GAMEACTIVE_EVT, this.clearList, this);
    };
    ViewBroadcastText.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, 230);
    };
    ViewBroadcastText.prototype.clearList = function () {
        if (this.listStr.length > 2) {
            this.listStr.length = 2;
        }
    };
    ViewBroadcastText.prototype.showText = function (str) {
        this.listStr.push(str);
        if (this.listStr.length > 20) {
            this.listStr.shift();
        }
        if (!this.isTween && this.listStr.length > 0) {
            this.run();
        }
    };
    ViewBroadcastText.prototype.run = function () {
        if (!this.btxt) {
            return;
        }
        this.btxt.clear();
        if (this.listStr.length > 0) {
            this.isTween = true;
            var str = this.listStr.shift();
            this.btxt.setdata(str);
        }
        else {
            this.isTween = false;
            ViewBroadcastText.createInstance().removeFromParent();
        }
    };
    ViewBroadcastText.prototype.uidispose = function () {
        this.btxt.clear();
        ViewBroadcastText.createInstance().removeFromParent();
    };
    ViewBroadcastText.createInstance = function () {
        if (!this._instance) {
            this._instance = (fairygui.UIPackage.createObject("MainUI", "ViewBroadcastText"));
        }
        return this._instance;
    };
    ViewBroadcastText.showMsg = function (str) {
        var ins = ViewBroadcastText.createInstance();
        if (!ins.parent) {
            GGlobal.layerMgr.UI_Popup.addChild(ins);
        }
        ins.showText(str);
    };
    ViewBroadcastText.URL = "ui://7gxkx46we2bn4a";
    return ViewBroadcastText;
}(fairygui.GComponent));
__reflect(ViewBroadcastText.prototype, "ViewBroadcastText");
