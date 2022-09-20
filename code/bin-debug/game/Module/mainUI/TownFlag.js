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
var TownFlag = (function (_super) {
    __extends(TownFlag, _super);
    function TownFlag() {
        var _this = _super.call(this) || this;
        _this._checkNotice = false;
        return _this;
    }
    TownFlag.createInstance = function () {
        return (fairygui.UIPackage.createObject("MainTown", "TownFlag"));
    };
    TownFlag.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.noticeImg = (this.getChild("noticeImg"));
    };
    Object.defineProperty(TownFlag.prototype, "checkNotice", {
        get: function () {
            return this._checkNotice;
        },
        set: function (value) {
            this.noticeImg.visible = value;
            this._checkNotice = value;
        },
        enumerable: true,
        configurable: true
    });
    TownFlag.URL = "ui://p8pwr887qt181c";
    return TownFlag;
}(fairygui.GButton));
__reflect(TownFlag.prototype, "TownFlag");
