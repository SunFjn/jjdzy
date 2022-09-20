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
var ServerBtn = (function (_super) {
    __extends(ServerBtn, _super);
    function ServerBtn() {
        return _super.call(this) || this;
    }
    ServerBtn.createInstance = function () {
        return (fairygui.UIPackage.createObject("Login", "ServerBtn"));
    };
    ServerBtn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getController("button");
        this.hot = (this.getChild("hot"));
    };
    //-1预备服 0：维护，1：正常，2：火爆，3：白名单
    ServerBtn.prototype.setSt = function (st, str) {
        this.hot.visible = true;
        this.hot.url = ["ui://a056duzjpc659", "ui://a056duzjpc658", "ui://a056duzjpc657"][st];
        if (st == -1)
            str += "[预备服]";
        this.text = str;
    };
    ServerBtn.URL = "ui://a056duzjpc65l";
    return ServerBtn;
}(fairygui.GButton));
__reflect(ServerBtn.prototype, "ServerBtn");
