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
var TipBagItemUse1 = (function (_super) {
    __extends(TipBagItemUse1, _super);
    function TipBagItemUse1() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.childrenCreated();
        return _this;
    }
    TipBagItemUse1.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "TipBagItemUse1"));
    };
    TipBagItemUse1.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "TipBagItemUse1").asCom;
        this.contentPane = this.view;
        this.btnUse = (this.view.getChild("btnUse"));
        this.groupUse = (this.view.getChild("groupUse"));
        this.childTip = (this.view.getChild("childTip"));
        _super.prototype.childrenCreated.call(this);
    };
    TipBagItemUse1.prototype.onShown = function () {
        GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
        this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendUseHandler, this);
        this.childTip.lbDes.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
        this.childTip.lbSource.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
    };
    TipBagItemUse1.prototype.onHide = function () {
        GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
        this.btnUse.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendUseHandler, this);
        this.childTip.lbDes.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
        this.childTip.lbSource.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
        GGlobal.layerMgr.close(UIConst.TIP_BAG_ITEM_USE1);
    };
    TipBagItemUse1.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.show(arg);
    };
    TipBagItemUse1.prototype.show = function (obj) {
        this.resize();
        this.currentVo = obj;
        var vo = obj;
        this.childTip.vo = vo;
    };
    TipBagItemUse1.prototype.resize = function () {
        this.setXY((fairygui.GRoot.inst.width - this.frame.width) / 2, (fairygui.GRoot.inst.height - this.frame.height) / 2);
    };
    TipBagItemUse1.prototype.onSendUseHandler = function (event) {
        Model_GlobalMsg.selectID = this.currentVo.tzPas;
        GGlobal.layerMgr.open(this.currentVo.tz);
        this.doHideAnimation();
        TipManager.hide();
    };
    TipBagItemUse1.URL = "ui://jvxpx9emz05i3f3";
    return TipBagItemUse1;
}(UIModalPanel));
__reflect(TipBagItemUse1.prototype, "TipBagItemUse1");
