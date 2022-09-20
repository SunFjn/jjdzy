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
var TipBagItemUseBySys = (function (_super) {
    __extends(TipBagItemUseBySys, _super);
    function TipBagItemUseBySys() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.childrenCreated();
        return _this;
    }
    TipBagItemUseBySys.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "TipBagItemUseBySys"));
    };
    TipBagItemUseBySys.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("common", "TipBagItemUseBySys").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    TipBagItemUseBySys.prototype.onShown = function () {
        var self = this;
        GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.closeEventHandler, self);
        self.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onSendUseHandler, self);
        self.childTip.lbDes.addEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
        self.childTip.lbSource.addEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
    };
    TipBagItemUseBySys.prototype.onHide = function () {
        var self = this;
        GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.closeEventHandler, self);
        self.btnUse.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onSendUseHandler, self);
        self.childTip.lbDes.removeEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
        self.childTip.lbSource.removeEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
        self.childBySys.clean();
        GGlobal.layerMgr.close(UIConst.TIP_BAG_ITEM_USE_SYS);
    };
    TipBagItemUseBySys.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.show(arg);
    };
    TipBagItemUseBySys.prototype.show = function (obj) {
        var self = this;
        self.resize();
        self.currentVo = obj[0];
        var resource = obj[1];
        self.childTip.vo = self.currentVo;
        self.childBySys.vo = self.currentVo;
        self.c1.selectedIndex = resource == ViewGrid.BAG ? 0 : 1;
    };
    TipBagItemUseBySys.prototype.resize = function () {
        var self = this;
        self.setXY((fairygui.GRoot.inst.width - self.frame.width) / 2, (fairygui.GRoot.inst.height - self.frame.height) / 2);
    };
    TipBagItemUseBySys.prototype.onSendUseHandler = function (event) {
        var self = this;
        Model_GlobalMsg.selectID = self.currentVo.tzPas;
        if (self.currentVo.tz == UIConst.QICE_STAR) {
            GGlobal.layerMgr.open(self.currentVo.tz, Model_GlobalMsg.selectID);
            Model_GlobalMsg.selectID = 0;
        }
        else {
            GGlobal.layerMgr.open(self.currentVo.tz);
        }
        self.doHideAnimation();
    };
    TipBagItemUseBySys.URL = "ui://jvxpx9emq2i93g2";
    return TipBagItemUseBySys;
}(UIModalPanel));
__reflect(TipBagItemUseBySys.prototype, "TipBagItemUseBySys");
