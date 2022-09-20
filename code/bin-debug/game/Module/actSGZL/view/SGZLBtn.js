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
var SGZLBtn = (function (_super) {
    __extends(SGZLBtn, _super);
    function SGZLBtn() {
        return _super.call(this) || this;
    }
    SGZLBtn.createInstance = function () {
        return (fairygui.UIPackage.createObject("actHolyBeast", "SGZLBtn"));
    };
    SGZLBtn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    //>>>>end
    SGZLBtn.URL = "ui://d5y9ngt6jt4v1o";
    return SGZLBtn;
}(fairygui.GButton));
__reflect(SGZLBtn.prototype, "SGZLBtn");
