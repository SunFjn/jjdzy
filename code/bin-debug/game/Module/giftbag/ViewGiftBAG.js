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
/** s is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewGiftBAG = (function (_super) {
    __extends(ViewGiftBAG, _super);
    function ViewGiftBAG() {
        var _this = _super.call(this) || this;
        fairygui.UIObjectFactory.setPackageItemExtension(ItemGiftBag.URL, ItemGiftBag);
        _this.loadRes("giftBag", "giftBag_atlas0");
        return _this;
    }
    ViewGiftBAG.createInstance = function () {
        return (fairygui.UIPackage.createObject("giftBag", "ViewGiftBAG"));
    };
    ViewGiftBAG.prototype.childrenCreated = function () {
        GGlobal.createPack("giftBag");
        var s = this;
        s.view = fairygui.UIPackage.createObject("giftBag", "ViewGiftBAG").asCom;
        s.contentPane = s.view;
        s.n3 = (s.view.getChild("n3"));
        s.btnMin = (s.view.getChild("btnMin"));
        s.btnReduce = (s.view.getChild("btnReduce"));
        s.n6 = (s.view.getChild("n6"));
        s.btnAdd = (s.view.getChild("btnAdd"));
        s.lbCount = (s.view.getChild("lbCount"));
        s.btnMax = (s.view.getChild("btnMax"));
        s.btnUse = (s.view.getChild("btnUse"));
        s.n14 = (s.view.getChild("n14"));
        s.n16 = (s.view.getChild("n16"));
        s.n16.callbackThisObj = s;
        s.n16.itemRenderer = s.itemRender;
        s.n16.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    ViewGiftBAG.prototype.onSendUseHandler = function (event) {
        var s = this;
        if (s.index < 0) {
            ViewCommonWarn.text("请选择一种奖励");
            return;
        }
        GGlobal.modelBag.CG_BAG_ITEM_SELECT_USE(s.currentVo.id, s.count, s.index);
        // TipManager.hide();
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_VO_UPDATE, s.update, s);
    };
    ViewGiftBAG.prototype.onMinCountHandler = function (event) {
        this.count -= 10;
        if (this.count <= 0) {
            this.count = 1;
        }
        this.lbCount.text = "" + this.count;
    };
    ViewGiftBAG.prototype.onMaxCountHandler = function (event) {
        this.count += 10;
        var bagCount = Model_Bag.getItemCount(this.currentVo.id);
        if (this.count > bagCount) {
            this.count = bagCount;
        }
        if (this.count > Model_Bag.CONST_MAX_MUL_USE_NUM) {
            this.count = Model_Bag.CONST_MAX_MUL_USE_NUM;
        }
        this.lbCount.text = "" + this.count;
    };
    ViewGiftBAG.prototype.onReduceHandler = function (event) {
        if (this.count > 1) {
            this.count--;
            this.lbCount.text = "" + this.count;
        }
    };
    ViewGiftBAG.prototype.onAddHandler = function (event) {
        var maxCount = Model_Bag.getItemCount(this.currentVo.id);
        if (maxCount > Model_Bag.CONST_MAX_MUL_USE_NUM) {
            maxCount = Model_Bag.CONST_MAX_MUL_USE_NUM;
        }
        if (this.count < maxCount) {
            this.count++;
            this.lbCount.text = "" + this.count;
        }
    };
    ViewGiftBAG.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.setDta(this.listDta[idx]);
    };
    ViewGiftBAG.prototype.itemClickHandle = function (event) {
        var self = this;
        var item = event.itemObject;
        this.index = item.index;
        if (self.curItem)
            self.curItem.setChoose(false);
        self.curItem = item;
        self.curItem.setChoose(true);
    };
    ViewGiftBAG.prototype.show = function (obj) {
        this.currentVo = obj;
        var vo = obj;
        this.frame.text = vo.name;
        var count = Model_Bag.getItemCount(vo.id);
        this.listDta = JSON.parse(vo.cfg.reward);
        this.n16.numItems = this.listDta.length;
        if (count > 0) {
            this.count = count;
        }
        else {
            this.count = 1;
        }
        this.lbCount.text = "" + this.count;
    };
    ViewGiftBAG.prototype.update = function () {
        var s = this;
        var count = Model_Bag.getItemCount(s.currentVo.id);
        if (count == 0) {
            s.closeEventHandler(null);
        }
        else {
            s.show(this.currentVo);
        }
        // GGlobal.control.remove(Enum_MsgType.MSG_BAG_VO_UPDATE, s.update, s);
    };
    ViewGiftBAG.prototype.onShown = function () {
        var s = this;
        GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, s.closeEventHandler, s);
        s.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onSendUseHandler, s);
        s.btnMin.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onMinCountHandler, s);
        s.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onMaxCountHandler, s);
        s.btnReduce.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onReduceHandler, s);
        s.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onAddHandler, s);
        // GGlobal.control.listen(Enum_MsgType.MSG_BAG_VO_UPDATE, s.update, s);
        s.n16.addEventListener(fairygui.ItemEvent.CLICK, s.itemClickHandle, s);
        this.show(this._args);
    };
    ViewGiftBAG.prototype.onHide = function () {
        var s = this;
        GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, s.closeEventHandler, s);
        s.btnUse.removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onSendUseHandler, s);
        s.btnMin.removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onMinCountHandler, s);
        s.btnMax.removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onMaxCountHandler, s);
        s.btnReduce.removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onReduceHandler, s);
        s.btnAdd.removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onAddHandler, s);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_VO_UPDATE, s.update, s);
        s.n16.removeEventListener(fairygui.ItemEvent.CLICK, s.itemClickHandle, s);
        GGlobal.layerMgr.close(UIConst.GIFTBAG_USE);
        s.n16.numItems = 0;
        s.index = -1;
    };
    ViewGiftBAG.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        if (this.isInit) {
            this.show(this._args);
        }
    };
    ViewGiftBAG.URL = "ui://0z9qzd94y1c10";
    return ViewGiftBAG;
}(UIModalPanel));
__reflect(ViewGiftBAG.prototype, "ViewGiftBAG");
