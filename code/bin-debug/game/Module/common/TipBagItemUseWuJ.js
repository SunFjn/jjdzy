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
var TipBagItemUseWuJ = (function (_super) {
    __extends(TipBagItemUseWuJ, _super);
    function TipBagItemUseWuJ() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.childrenCreated();
        return _this;
    }
    TipBagItemUseWuJ.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "TipBagItemUseWuJ"));
    };
    TipBagItemUseWuJ.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("common", "TipBagItemUseWuJ").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    TipBagItemUseWuJ.prototype.onShown = function () {
        var self = this;
        GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.closeEventHandler, self);
        self.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onSendUseHandler, self);
        self.childTip.lbDes.addEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
        self.childTip.lbSource.addEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
    };
    TipBagItemUseWuJ.prototype.onHide = function () {
        var self = this;
        GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, self.closeEventHandler, self);
        self.btnUse.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onSendUseHandler, self);
        self.childTip.lbDes.removeEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
        self.childTip.lbSource.removeEventListener(fairygui.GObject.SIZE_CHANGED, self.resize, self);
        self.childWuJ.clean();
        GGlobal.layerMgr.close(UIConst.TIP_BAG_ITEM_USE_WUJ);
    };
    TipBagItemUseWuJ.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.show(arg);
    };
    TipBagItemUseWuJ.prototype.show = function (obj) {
        var self = this;
        self.resize();
        self.currentVo = obj[0];
        var resource = obj[1];
        self.childTip.vo = self.currentVo;
        self.childWuJ.vo = self.currentVo;
        self.c1.selectedIndex = resource == ViewGrid.BAG ? 0 : 1;
    };
    TipBagItemUseWuJ.prototype.resize = function () {
        var self = this;
        self.setXY((fairygui.GRoot.inst.width - self.frame.width) / 2, (fairygui.GRoot.inst.height - self.frame.height) / 2);
    };
    TipBagItemUseWuJ.prototype.onSendUseHandler = function (event) {
        var self = this;
        if (self.currentVo.tz == UIConst.SHAOZHU_FASHION) {
            Model_GlobalMsg.selectID = Config.sonshow_267[self.currentVo.tzPas].son;
            GGlobal.layerMgr.open(UIConst.SHAOZHU);
        }
        else if (self.currentVo.tz == UIConst.SHAOZHU) {
            Model_GlobalMsg.selectID = self.currentVo.tzPas;
            GGlobal.layerMgr.open(self.currentVo.tz);
        }
        else if (self.currentVo.tz == UIConst.WU_JIANG) {
            Model_WuJiang.selectJob = self.currentVo.tzPas;
            GGlobal.layerMgr.open(self.currentVo.tz);
        }
        else {
            GGlobal.layerMgr.open(self.currentVo.tz, Math.floor(self.currentVo.tzPas / 1000));
        }
        self.doHideAnimation();
    };
    TipBagItemUseWuJ.URL = "ui://jvxpx9emq2i93g0";
    return TipBagItemUseWuJ;
}(UIModalPanel));
__reflect(TipBagItemUseWuJ.prototype, "TipBagItemUseWuJ");
