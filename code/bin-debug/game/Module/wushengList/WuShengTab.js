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
var WuShengTab = (function (_super) {
    __extends(WuShengTab, _super);
    function WuShengTab() {
        return _super.call(this) || this;
    }
    WuShengTab.createInstance = function () {
        return (fairygui.UIPackage.createObject("wushengList", "WuShengTab"));
    };
    WuShengTab.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    WuShengTab.prototype.show = function (vo) {
        var self = this;
        self.vo = vo;
        IconUtil.setImg(self._iconObject.asLoader, Enum_Path.MAINUI_URL + UIConst.WUSHENGLIST + "0" + vo.id + ".png");
        self.stateImg.visible = true;
        if (Model_GlobalMsg.kaifuDay > vo.id) {
            self.stateImg.url = "ui://a8l39nm98hxb4"; //已结束
            self.checkNotice(GGlobal.reddot.checkCondition(UIConst.WUSHENGLIST, vo.id - 1));
        }
        else if (Model_GlobalMsg.kaifuDay == vo.id) {
            self.stateImg.url = "ui://a8l39nm98hxb5"; //进行中
            self.checkNotice(GGlobal.reddot.checkCondition(UIConst.WUSHENGLIST, vo.id - 1));
        }
        else {
            self.stateImg.visible = false;
            self.checkNotice(false);
        }
    };
    WuShengTab.prototype.checkNotice = function (value) {
        this.noticeImg.visible = value;
    };
    WuShengTab.prototype.clean = function () {
        var self = this;
        IconUtil.setImg(self._iconObject.asLoader, null);
    };
    WuShengTab.URL = "ui://a8l39nm98hxb2";
    return WuShengTab;
}(fairygui.GButton));
__reflect(WuShengTab.prototype, "WuShengTab");
