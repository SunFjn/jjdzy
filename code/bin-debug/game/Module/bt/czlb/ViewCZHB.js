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
var ViewCZHB = (function (_super) {
    __extends(ViewCZHB, _super);
    function ViewCZHB() {
        var _this = _super.call(this) || this;
        _this.itemRender = function (idx, obj) {
            obj.setdata(idx);
        };
        _this.eventFun = function (b) {
            var self = _this;
            var fun = EventUtil.register;
            EventUtil.register(b, self.c1, fairygui.StateChangeEvent.CHANGED, self.onChangerHandler, _this);
            GGlobal.control.register(b, UIConst.CZLB_BT, self.update, self);
        };
        _this.onChangerHandler = function () {
            var self = _this;
            var index = self.c1.selectedIndex;
            ViewCZHB.selectIndex = index;
            GGlobal.modelBT.CG_open_20001(index + 1);
        };
        _this.update = function () {
            var self = _this;
            var model = GGlobal.modelBT;
            if (ViewCZHB.selectIndex == 0) {
                self.list.numItems = model.czhb_lib_week.length;
            }
            else {
                self.list.numItems = model.czhb_lib_mouth.length;
            }
        };
        _this.setSkin("czlb", "czlb_atlas0", "ViewCZHB");
        return _this;
    }
    ViewCZHB.createInstance = function () {
        return (fairygui.UIPackage.createObject("czlb", "ViewCZHB"));
    };
    ViewCZHB.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ItemCZHB.URL, ItemCZHB);
    };
    ViewCZHB.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var self = this;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        self.list.itemRenderer = self.itemRender;
    };
    ViewCZHB.prototype.onUpdate = function () {
        var self = this;
        var end = 0;
        var t = Model_GlobalMsg.getServerTime();
        var zero = TimeUitl.getZeroTime(t);
        var t1 = zero + 86400000;
        var str = TimeUitl.getRemainingTime(t1, t, { hour: "小时", minute: "分", second: "秒" });
        var weekRefreshDay = ConfigHelp.getSystemNum(9911);
        var monthRefreshDay = ConfigHelp.getSystemNum(9912);
        self.lbt0.text = "<font color='#15f234'>" + (weekRefreshDay - (Model_GlobalMsg.kaifuDay % weekRefreshDay || weekRefreshDay)) + "天 " + str + "后刷新</font>";
        self.lbt1.text = "<font color='#15f234'>" + (monthRefreshDay - (Model_GlobalMsg.kaifuDay % monthRefreshDay || monthRefreshDay)) + "天 " + str + "后刷新</font>";
    };
    ViewCZHB.prototype.onShown = function () {
        var self = this;
        self.eventFun(1);
        var index = self.c1.selectedIndex;
        ViewCZHB.selectIndex = index;
        Timer.instance.listen(self.onUpdate, self, 1000);
        GGlobal.modelBT.CG_open_20001(1);
        GGlobal.modelBT.CG_open_20001(2);
        GGlobal.mainUICtr.setIconNotice(UIConst.CZLB_BT, false);
    };
    ViewCZHB.prototype.onHide = function () {
        var self = this;
        Timer.instance.remove(self.onUpdate, self);
        self.eventFun(0);
        GGlobal.layerMgr.close2(UIConst.CZLB_BT);
    };
    ViewCZHB.URL = "ui://2o8uvlozk7mb3";
    ViewCZHB.selectIndex = 0;
    return ViewCZHB;
}(UIPanelBase));
__reflect(ViewCZHB.prototype, "ViewCZHB");
