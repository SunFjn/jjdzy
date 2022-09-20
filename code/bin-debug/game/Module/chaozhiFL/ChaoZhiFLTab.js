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
var ChaoZhiFLTab = (function (_super) {
    __extends(ChaoZhiFLTab, _super);
    function ChaoZhiFLTab() {
        return _super.call(this) || this;
    }
    ChaoZhiFLTab.createInstance = function () {
        return (fairygui.UIPackage.createObject("chaozhifanli", "ChaoZhiFLTab"));
    };
    ChaoZhiFLTab.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.noticeImg = (this.getChild("noticeImg"));
    };
    Object.defineProperty(ChaoZhiFLTab.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.setIcon();
            this.checkNotice();
        },
        enumerable: true,
        configurable: true
    });
    ChaoZhiFLTab.prototype.setIcon = function () {
        var id = this._data.id;
        var icon = Config.xitong_001[id].icon;
        if (id == UIConst.DISCOUNT_SHOP || id == UIConst.DISCOUNT_SHOP1) {
            icon = "4605_1";
        }
        IconUtil.setImg(this._iconObject.asLoader, Enum_Path.MAINUI_URL + icon + ".png");
    };
    ChaoZhiFLTab.prototype.checkNotice = function (value) {
        if (value === void 0) { value = undefined; }
        var self = this;
        if (value === undefined) {
            var notice = GGlobal.reddot.checkCondition(self._data.id);
            this.noticeImg.visible = notice;
        }
        else {
            this.noticeImg.visible = value;
        }
    };
    ChaoZhiFLTab.URL = "ui://qzsojhcru5imc";
    return ChaoZhiFLTab;
}(fairygui.GButton));
__reflect(ChaoZhiFLTab.prototype, "ChaoZhiFLTab");
