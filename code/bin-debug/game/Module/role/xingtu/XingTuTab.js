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
var XingTuTab = (function (_super) {
    __extends(XingTuTab, _super);
    function XingTuTab() {
        var _this = _super.call(this) || this;
        _this.check = false;
        return _this;
    }
    XingTuTab.createInstance = function () {
        return (fairygui.UIPackage.createObject("Skill", "XingTuTab"));
    };
    XingTuTab.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
    };
    XingTuTab.prototype.setVo = function (value) {
        var a = this;
        a.vo = value;
        if (value) {
            var xingtuID = Model_XingTu.xingtuIDArr[value.type - 1];
            var level = Math.floor(xingtuID % 100000 / 100);
            a.levelLb.text = level + "阶";
            IconUtil.setImg(a._iconObject.asLoader, Enum_Path.IMAGE_URL + "xingtu/icon" + value.type + ".png");
            a.icon = CommonManager.getUrl("Skill", "icon" + value.type);
            a.maskImg.visible = xingtuID % 100 == 0 && level == 0;
        }
    };
    Object.defineProperty(XingTuTab.prototype, "checkNotice", {
        get: function () {
            return this.check;
        },
        set: function (value) {
            this.noticeImg.visible = value;
            this.check = value;
        },
        enumerable: true,
        configurable: true
    });
    XingTuTab.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self._iconObject.asLoader, null);
    };
    XingTuTab.URL = "ui://c7onhgk8t2re11";
    return XingTuTab;
}(fairygui.GButton));
__reflect(XingTuTab.prototype, "XingTuTab");
