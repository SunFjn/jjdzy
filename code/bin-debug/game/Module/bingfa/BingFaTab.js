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
var BingFaTab = (function (_super) {
    __extends(BingFaTab, _super);
    function BingFaTab() {
        var _this = _super.call(this) || this;
        _this._sf = false;
        _this.sindex = 0;
        return _this;
    }
    BingFaTab.createInstance = function () {
        return (fairygui.UIPackage.createObject("bingfa", "BingFaTab"));
    };
    BingFaTab.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.btn = (this.getChild("btn"));
    };
    BingFaTab.prototype.setChose = function (val) {
        this._sf = val;
        this.btn.selected = val;
    };
    BingFaTab.prototype.setSuit = function (val, idx) {
        this._suit = val;
        var m = GGlobal.modelBingFa;
        this.btn.text = val.name;
        this.btn.checkNotice = val.isNotice();
        this.setChose(idx == this.sindex);
    };
    Object.defineProperty(BingFaTab.prototype, "suit", {
        get: function () {
            return this._suit;
        },
        enumerable: true,
        configurable: true
    });
    BingFaTab.URL = "ui://n52wd4d0fgxb6";
    return BingFaTab;
}(fairygui.GComponent));
__reflect(BingFaTab.prototype, "BingFaTab");
