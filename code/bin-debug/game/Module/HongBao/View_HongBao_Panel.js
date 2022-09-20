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
var View_HongBao_Panel = (function (_super) {
    __extends(View_HongBao_Panel, _super);
    function View_HongBao_Panel() {
        var _this = _super.call(this) || this;
        _this.setSkin("HongBao", "HongBao_atlas0", "View_HongBao_Panel");
        return _this;
    }
    View_HongBao_Panel.createInstance = function () {
        return (fairygui.UIPackage.createObject("HongBao", "View_HongBao_Panel"));
    };
    View_HongBao_Panel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(HongBaoItem.URL, HongBaoItem);
        f(ItemHongBaoRecord.URL, ItemHongBaoRecord);
    };
    View_HongBao_Panel.prototype.initView = function () {
        var self = this;
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.list.setVirtual();
    };
    View_HongBao_Panel.prototype.renderHandler = function (index, item) {
        var model = GGlobal.modelHB;
        item.setVo(model.hbArr[index]);
    };
    View_HongBao_Panel.prototype.updateShow = function () {
        var self = this;
        var model = GGlobal.modelHB;
        var moneyVo = Vo_Currency.create(28);
        self.nameLb.text = moneyVo.name;
        self.itemRes.setImgUrl(moneyVo.icon);
        self.itemRes.setCount(model.moneyNum);
        self.numLb.text = "今日发红包剩余次数：" + model.surNum;
        model.hbArr.sort(self.sortHB);
        self.list.numItems = model.hbArr.length;
    };
    View_HongBao_Panel.prototype.sortHB = function (a, b) {
        var aState = 0;
        var bState = 0;
        if (a.drawNum < Model_HongBao.max && a.robNum == 0) {
            aState = 0;
        }
        else if (a.robNum > 0) {
            aState = 1;
        }
        else if (a.drawNum >= Model_HongBao.max) {
            aState = 2;
        }
        if (b.drawNum < Model_HongBao.max && b.robNum == 0) {
            bState = 0;
        }
        else if (b.robNum > 0) {
            bState = 1;
        }
        else if (b.drawNum >= Model_HongBao.max) {
            bState = 2;
        }
        if (aState == bState) {
            return b.id - a.id;
        }
        else {
            return aState - bState;
        }
    };
    View_HongBao_Panel.prototype.onShown = function () {
        var self = this;
        self.updateShow();
        self.register(true);
        IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "7821.jpg");
        GGlobal.modelHB.CG_OPEN_HONGBAO_11769();
    };
    View_HongBao_Panel.prototype.onHide = function () {
        var self = this;
        self.register(false);
        self.list.numItems = 0;
        IconUtil.setImg(self.backImg, null);
    };
    View_HongBao_Panel.prototype.register = function (pFlag) {
        var self = this;
        GGlobal.control.register(pFlag, UIConst.HONGBAO, self.updateShow, self);
        EventUtil.register(pFlag, self.smLb, egret.TouchEvent.TOUCH_TAP, self.OnSM, self);
        EventUtil.register(pFlag, self.sendBt, egret.TouchEvent.TOUCH_TAP, self.OnSend, self);
    };
    View_HongBao_Panel.prototype.OnSend = function () {
        GGlobal.layerMgr.open(UIConst.HONGBAO_SEND);
    };
    View_HongBao_Panel.prototype.OnSM = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.HONGBAO);
    };
    View_HongBao_Panel.URL = "ui://s01exr8xqz020";
    return View_HongBao_Panel;
}(UIPanelBase));
__reflect(View_HongBao_Panel.prototype, "View_HongBao_Panel");
