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
var TipBagItemUse = (function (_super) {
    __extends(TipBagItemUse, _super);
    function TipBagItemUse() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.childrenCreated();
        return _this;
    }
    TipBagItemUse.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "TipBagItemUse"));
    };
    TipBagItemUse.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "TipBagItemUse").asCom;
        this.contentPane = this.view;
        this.btnMin = (this.view.getChild("btnMin"));
        this.btnReduce = (this.view.getChild("btnReduce"));
        this.btnAdd = (this.view.getChild("btnAdd"));
        this.lbCount = (this.view.getChild("lbCount"));
        this.btnMax = (this.view.getChild("btnMax"));
        this.btnUse = (this.view.getChild("btnUse"));
        this.groupUse = (this.view.getChild("groupUse"));
        this.childTip = (this.view.getChild("childTip"));
        _super.prototype.childrenCreated.call(this);
    };
    TipBagItemUse.prototype.onShown = function () {
        GGlobal.control.listen(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
        this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendUseHandler, this);
        this.btnMin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMinCountHandler, this);
        this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaxCountHandler, this);
        this.btnReduce.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReduceHandler, this);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddHandler, this);
        this.childTip.lbDes.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
        this.childTip.lbSource.addEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITEM_USE, this.update, this);
    };
    TipBagItemUse.prototype.onHide = function () {
        GGlobal.control.remove(Enum_MsgType.COMMON_WINFAIL_CLOSE, this.closeEventHandler, this);
        this.btnUse.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendUseHandler, this);
        this.btnMin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMinCountHandler, this);
        this.btnMax.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaxCountHandler, this);
        this.btnReduce.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReduceHandler, this);
        this.btnAdd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddHandler, this);
        this.childTip.lbDes.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
        this.childTip.lbSource.removeEventListener(fairygui.GObject.SIZE_CHANGED, this.resize, this);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITEM_USE, this.update, this);
        GGlobal.layerMgr.close(UIConst.TIP_BAG_ITEM_USE);
    };
    TipBagItemUse.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.show(arg);
    };
    TipBagItemUse.prototype.update = function () {
        if (this.currentVo.id == 410015) {
            ViewCommonWarn.text("全民BOSS挑战次数+" + this.count);
        }
        else if (this.currentVo.id == 416016) {
            ViewCommonWarn.text("乱世枭雄挑战次数+" + this.count);
        }
        else if (this.currentVo.id == 416017) {
            ViewCommonWarn.text("三国战神挑战次数+" + this.count);
        }
        else if (this.currentVo.id == Model_TigerPass.TZ_LING) {
            ViewCommonWarn.text("虎牢关挑战次数+" + this.count);
        }
        var count = Model_Bag.getItemCount(this.currentVo.id);
        if (count == 0) {
            this.closeEventHandler(null);
        }
        else {
            this.show(this.currentVo);
        }
    };
    TipBagItemUse.prototype.show = function (obj) {
        this.resize();
        this.currentVo = obj;
        var vo = obj;
        this.childTip.vo = vo;
        var count = Model_Bag.getItemCount(vo.id);
        if (count > 0) {
            this.count = count;
        }
        else {
            this.count = 1;
        }
        this.lbCount.text = "" + this.count;
    };
    TipBagItemUse.prototype.resize = function () {
        this.setXY((fairygui.GRoot.inst.width - this.frame.width) / 2, (fairygui.GRoot.inst.height - this.frame.height) / 2);
    };
    TipBagItemUse.prototype.onSendUseHandler = function (event) {
        var self = this;
        var sysid = self.currentVo.cfg.sys;
        var ret = ModuleManager.isOpen(sysid, true);
        if (!ret) {
            return;
        }
        if (self.currentVo.type == 12 || self.currentVo.type == 13) {
            if (Model_Setting.headIdArr.indexOf(parseInt(self.currentVo.cfg.use)) == -1 && Model_Setting.frameIdArr.indexOf(parseInt(self.currentVo.cfg.use)) == -1) {
                GGlobal.modelBag.CG_BAG_ITEM_USE(self.currentVo.id, 1);
            }
            else {
                if (self.currentVo.type == 12) {
                    ViewCommonWarn.text("该头像已激活");
                }
                else {
                    ViewCommonWarn.text("该头像框已激活");
                }
            }
        }
        else {
            if (self.currentVo.type == 42 && GGlobal.modelDengFengZJ.status != 1) {
                ViewCommonWarn.text("本周赛事已结束");
                return;
            }
            GGlobal.modelBag.CG_BAG_ITEM_USE(self.currentVo.id, self.count);
        }
        TipManager.hide();
    };
    TipBagItemUse.prototype.onMinCountHandler = function (event) {
        this.count -= 10;
        if (this.count <= 0) {
            this.count = 1;
        }
        this.lbCount.text = "" + this.count;
    };
    TipBagItemUse.prototype.onMaxCountHandler = function (event) {
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
    TipBagItemUse.prototype.onReduceHandler = function (event) {
        if (this.count > 1) {
            this.count--;
            this.lbCount.text = "" + this.count;
        }
    };
    TipBagItemUse.prototype.onAddHandler = function (event) {
        var maxCount = Model_Bag.getItemCount(this.currentVo.id);
        if (maxCount > Model_Bag.CONST_MAX_MUL_USE_NUM) {
            maxCount = Model_Bag.CONST_MAX_MUL_USE_NUM;
        }
        if (this.count < maxCount) {
            this.count++;
            this.lbCount.text = "" + this.count;
        }
    };
    TipBagItemUse.URL = "ui://jvxpx9em7g6v24";
    return TipBagItemUse;
}(UIModalPanel));
__reflect(TipBagItemUse.prototype, "TipBagItemUse");
