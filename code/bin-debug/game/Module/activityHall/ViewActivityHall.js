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
var ViewActivityHall = (function (_super) {
    __extends(ViewActivityHall, _super);
    function ViewActivityHall() {
        var _this = _super.call(this) || this;
        _this.setSkin("activityHall", "activityHall_atlas0", "ViewActivityHall");
        return _this;
    }
    ViewActivityHall.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(LongZDIt.URL, LongZDIt);
        fairygui.UIObjectFactory.setPackageItemExtension(LZDRankIt.URL, LZDRankIt);
        fairygui.UIObjectFactory.setPackageItemExtension(AcitivityTab.URL, AcitivityTab);
    };
    ViewActivityHall.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var s = this;
        s.lst.callbackThisObj = s;
        s.lst.itemRenderer = s.onRender;
        s.lst.setVirtual();
    };
    ViewActivityHall.prototype.onRender = function (idx, obj) {
        var item = obj;
        item.setIdx(this.dta[this.c1.selectedIndex][idx], idx);
    };
    ViewActivityHall.prototype.update = function () {
        var self = this;
        if (!self.dta) {
            self.dta = [];
            var cfg = Config.hddt_200;
            for (var i in cfg) {
                var tabType = cfg[i].fenlei - 1;
                if (!self.dta[tabType]) {
                    self.dta[tabType] = [];
                }
                self.dta[tabType].push(Number(i));
            }
        }
        self.lst.numItems = self.dta[self.c1.selectedIndex].length;
    };
    ViewActivityHall.prototype.checkRedot = function () {
        var self = this;
        var m = GGlobal.modelActivityHall;
        var dta = self.dta;
        var red1 = 0;
        var red2 = 0;
        self.tab0.checkNotice = false;
        self.tab1.checkNotice = false;
        self.tab2.checkNotice = false;
        for (var i = 0; i < dta.length; i++) {
            var temp = dta[i];
            for (var j = 0; j < temp.length; j++) {
                var red = m.checkNotice(temp[j]);
                if (red) {
                    self["tab" + i].checkNotice = red;
                }
            }
        }
    };
    ViewActivityHall.prototype.onChangerHandler = function (evt) {
        this.update();
    };
    ViewActivityHall.prototype.eventFun = function (b) {
        var self = this;
        EventUtil.register(b, self.c1, fairygui.StateChangeEvent.CHANGED, this.onChangerHandler, this);
    };
    ViewActivityHall.prototype.onShown = function () {
        var self = this;
        if (self._args) {
            self.c1.setSelectedIndex(self._args);
        }
        self.update();
        self.checkRedot();
        self.eventFun(1);
        GGlobal.modelActivityHall.CG_OPEN_ACTIVITYHALL();
        GGlobal.control.listen(UIConst.ACTIVITYHALL, self.update, self);
        GGlobal.reddot.listen(UIConst.SHAOZHU_ESCORT, self.update, self);
    };
    ViewActivityHall.prototype.onHide = function () {
        var self = this;
        self.lst.numItems = 0;
        self.eventFun(0);
        GGlobal.control.remove(UIConst.ACTIVITYHALL, self.update, self);
        GGlobal.layerMgr.close(UIConst.ACTIVITYHALL);
        GGlobal.reddot.remove(UIConst.SHAOZHU_ESCORT, self.update, self);
    };
    ViewActivityHall.URL = "ui://1xydor24n7ie0";
    return ViewActivityHall;
}(UIPanelBase));
__reflect(ViewActivityHall.prototype, "ViewActivityHall");
