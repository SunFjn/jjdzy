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
var TownLabel = (function (_super) {
    __extends(TownLabel, _super);
    function TownLabel() {
        return _super.call(this) || this;
    }
    TownLabel.createInstance = function () {
        return (fairygui.UIPackage.createObject("MainTown", "TownLabel"));
    };
    TownLabel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.noticeImg = (this.getChild("noticeImg"));
        this.checkNotice(false);
    };
    TownLabel.prototype.checkNotice = function (value) {
        this.noticeImg.visible = value;
    };
    TownLabel.URL = "ui://p8pwr887idjlw";
    return TownLabel;
}(fairygui.GButton));
__reflect(TownLabel.prototype, "TownLabel");
