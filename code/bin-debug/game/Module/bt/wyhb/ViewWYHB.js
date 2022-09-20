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
var ViewWYHB = (function (_super) {
    __extends(ViewWYHB, _super);
    function ViewWYHB() {
        var _this = _super.call(this) || this;
        _this.eventFun = function (b) {
            var self = _this;
            var fun = EventUtil.register;
            EventUtil.register(b, self.c1, fairygui.StateChangeEvent.CHANGED, _this.onChangerHandler, _this);
            GGlobal.control.register(b, UIConst.WYHB_BT, self.update, self);
        };
        _this.itemRender = function (idx, obj) {
            obj.setdata(idx);
        };
        _this.lastQs = -1;
        _this.update = function () {
            var self = _this;
            var model = GGlobal.modelBT;
            if (ViewWYHB.selectIndex == 0) {
                self.list.numItems = model.wyhb_lib_lvl.length;
                self.lbPro0.text = BroadCastManager.reTxt("已领:<font color='#15f234'>{0}元</font>", model.hasGetLvMoney);
                self.lbPro1.text = BroadCastManager.reTxt("剩余可领:<font color='#15f234'>{0}元</font>", model.totalLvReMoney - model.hasGetLvMoney);
                self.lbPro2.text = BroadCastManager.reTxt("当前等级:<font color='#15f234'>{0}级</font>", Model_player.voMine.level);
            }
            else {
                self.list.numItems = model.wyhb_lib_yb.length;
                self.lbPro0.text = BroadCastManager.reTxt("已领:<font color='#15f234'>{0}元</font>", model.hasGetMoney);
                self.lbPro1.text = BroadCastManager.reTxt("剩余可领:<font color='#15f234'>{0}元</font>", model.totalReMoney - model.hasGetMoney);
                self.lbPro2.text = BroadCastManager.reTxt("当前充值:<font color='#15f234'>{0}元</font>", ModelBT.realRechargeValue);
            }
            self.btnlv.checkNotice = GGlobal.reddot.checkCondition(UIConst.WYHB_BT, 1);
            self.btncz.checkNotice = GGlobal.reddot.checkCondition(UIConst.WYHB_BT, 2);
        };
        _this.onChangerHandler = function () {
            var self = _this;
            var index = self.c1.selectedIndex;
            ViewWYHB.selectIndex = index;
            GGlobal.modelBT.CG_open_20011(index + 1);
        };
        _this.isShowOpenAnimation = false;
        _this.setSkin("wyhb", "wyhb_atlas0", "ViewWYHB");
        return _this;
    }
    ViewWYHB.createInstance = function () {
        return (fairygui.UIPackage.createObject("wyhb", "ViewWYHB"));
    };
    ViewWYHB.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ItemWyhb.URL, ItemWyhb);
    };
    ViewWYHB.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var self = this;
        self.list.callbackThisObj = self;
        self.list.setVirtual();
        self.list.itemRenderer = self.itemRender;
    };
    ViewWYHB.prototype.onShown = function () {
        var self = this;
        self.eventFun(1);
        GGlobal.modelBT.CG_open_20011(1);
        GGlobal.modelBT.CG_open_20011(2);
        GGlobal.modelBT.initHB();
        GGlobal.mainUICtr.setIconNotice(UIConst.WYHB_BT, GGlobal.reddot.checkCondition(UIConst.WYHB_BT));
    };
    ViewWYHB.prototype.onHide = function () {
        var self = this;
        self.eventFun(0);
        GGlobal.layerMgr.close(UIConst.WYHB_BT);
    };
    ViewWYHB.URL = "ui://27qy37vtk7mb0";
    ViewWYHB.selectIndex = 0;
    return ViewWYHB;
}(UIPanelBase));
__reflect(ViewWYHB.prototype, "ViewWYHB");
