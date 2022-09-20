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
var ViewYiShowBossRank = (function (_super) {
    __extends(ViewYiShowBossRank, _super);
    function ViewYiShowBossRank() {
        var _this = _super.call(this) || this;
        _this.update = function () {
            var self = _this;
            var m = GGlobal.modelYiShouBOSS;
            self.__data = m.rankdata;
            self.n14.numItems = self.__data.length;
            var rank = m.myRank;
            if (rank > 0) {
                self.lbRank.text = "我的排名：<font color=\"#15f234\">" + rank + "</font>";
            }
            else {
                self.lbRank.text = "我的排名：未上榜";
            }
            self.lbLayer.text = "通关数：" + m.crossLayer;
        };
        _this.eventFun = function (v) {
            var self = _this;
            var control = GGlobal.control;
            control.register(v, UIConst.YSBOSS, self.update, self);
        };
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ItemYSBOSS.URL, ItemYSBOSS);
        _this.loadRes("Boss", "Boss_atlas0");
        return _this;
    }
    ViewYiShowBossRank.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("Boss", "ViewYiShowBossRank").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.n14.callbackThisObj = self;
        self.n14.itemRenderer = self.renderHd;
        _super.prototype.childrenCreated.call(this);
    };
    ViewYiShowBossRank.prototype.renderHd = function (idx, obj) {
        var item = obj;
        item.setdate(this.__data[idx]);
    };
    ViewYiShowBossRank.prototype.onShown = function () {
        var self = this;
        GGlobal.modelYiShouBOSS.CG_SpecialAnimalBoss_getRank_9441();
        self.eventFun(1);
    };
    ViewYiShowBossRank.prototype.onHide = function () {
        var self = this;
        self.n14.numItems = 0;
        self.eventFun(0);
        GGlobal.layerMgr.close(UIConst.YSBOSSRANK);
    };
    ViewYiShowBossRank.URL = "ui://47jfyc6ehul73k";
    return ViewYiShowBossRank;
}(UIModalPanel));
__reflect(ViewYiShowBossRank.prototype, "ViewYiShowBossRank");
