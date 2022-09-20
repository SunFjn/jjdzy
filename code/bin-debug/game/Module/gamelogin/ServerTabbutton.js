/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
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
var ServerTabbutton = (function (_super) {
    __extends(ServerTabbutton, _super);
    function ServerTabbutton() {
        return _super.call(this) || this;
    }
    ServerTabbutton.createInstance = function () {
        return (fairygui.UIPackage.createObject("Login", "ServerTabbutton"));
    };
    ServerTabbutton.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        if (this._titleObject)
            this._titleObject.stroke = 0.8;
    };
    ServerTabbutton.URL = "ui://a056duzjpc65h";
    return ServerTabbutton;
}(fairygui.GButton));
__reflect(ServerTabbutton.prototype, "ServerTabbutton");
