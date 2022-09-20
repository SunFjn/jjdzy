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
var HomeTGLUse = (function (_super) {
    __extends(HomeTGLUse, _super);
    function HomeTGLUse() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.childrenCreated();
        return _this;
    }
    HomeTGLUse.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "HomeTGLUse"));
    };
    HomeTGLUse.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("home", "HomeTGLUse").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        _super.prototype.childrenCreated.call(this);
    };
    HomeTGLUse.prototype.onShown = function () {
        this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendUseHandler, this);
        this.btnMin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMinCountHandler, this);
        this.btnM100.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMin100CountHandler, this);
        this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaxCountHandler, this);
        this.btnMax100.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMax100CountHandler, this);
        this.btnReduce.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReduceHandler, this);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddHandler, this);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, this.update, this);
        this.show(this._args);
    };
    HomeTGLUse.prototype.onHide = function () {
        this.grid.showEff(false);
        this.btnUse.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendUseHandler, this);
        this.btnMin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMinCountHandler, this);
        this.btnMax.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaxCountHandler, this);
        this.btnM100.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMin100CountHandler, this);
        this.btnMax100.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMax100CountHandler, this);
        this.btnReduce.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReduceHandler, this);
        this.btnAdd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddHandler, this);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, this.update, this);
        GGlobal.layerMgr.close(UIConst.HOME_TGL_ADD);
    };
    HomeTGLUse.prototype.update = function () {
        var count = Model_Bag.getItemCount(this.currentVo.id);
        if (count == 0) {
            this.closeEventHandler(null);
        }
        else {
            this.show(this.currentVo);
        }
    };
    HomeTGLUse.prototype.show = function (obj) {
        var self = this;
        self.resize();
        self.currentVo = obj;
        var vo = obj;
        var count = Model_Bag.getItemCount(vo.id);
        if (count > 0) {
            self.lbNum.text = "拥有数量：" + count;
        }
        else {
            self.lbNum.text = "";
        }
        self.grid.vo = vo;
        self.grid.showEff(true);
        self.grid.tipEnabled = false;
        if (count > 0) {
            this.count = count;
        }
        else {
            this.count = 1;
        }
        this.lbCount.text = "" + this.count;
        this.lbName.text = ConfigHelp.getItemColorName(vo.id);
    };
    HomeTGLUse.prototype.resize = function () {
        this.setXY((fairygui.GRoot.inst.width - this.frame.width) / 2, (fairygui.GRoot.inst.height - this.frame.height) / 2);
    };
    HomeTGLUse.prototype.onSendUseHandler = function (event) {
        var self = this;
        GGlobal.homemodel.selectItemInTianGong(self.currentVo.id, self.count, 1);
        GGlobal.layerMgr.close2(UIConst.HOME_TGL_ADD);
    };
    HomeTGLUse.prototype.onMinCountHandler = function (event) {
        this.count -= 10;
        if (this.count <= 0) {
            this.count = 1;
        }
        this.lbCount.text = "" + this.count;
    };
    HomeTGLUse.prototype.onMin100CountHandler = function (event) {
        this.count -= 100;
        if (this.count <= 0) {
            this.count = 1;
        }
        this.lbCount.text = "" + this.count;
    };
    HomeTGLUse.prototype.onMaxCountHandler = function (event) {
        this.count += 10;
        var bagCount = Model_Bag.getItemCount(this.currentVo.id);
        if (this.count > bagCount) {
            this.count = bagCount;
        }
        this.lbCount.text = "" + this.count;
    };
    HomeTGLUse.prototype.onMax100CountHandler = function (event) {
        this.count += 100;
        var bagCount = Model_Bag.getItemCount(this.currentVo.id);
        if (this.count > bagCount) {
            this.count = bagCount;
        }
        this.lbCount.text = "" + this.count;
    };
    HomeTGLUse.prototype.onReduceHandler = function (event) {
        if (this.count > 1) {
            this.count--;
            this.lbCount.text = "" + this.count;
        }
    };
    HomeTGLUse.prototype.onAddHandler = function (event) {
        var maxCount = Model_Bag.getItemCount(this.currentVo.id);
        if (this.count < maxCount) {
            this.count++;
            this.lbCount.text = "" + this.count;
        }
    };
    HomeTGLUse.URL = "ui://y0plc878c16028";
    return HomeTGLUse;
}(UIModalPanel));
__reflect(HomeTGLUse.prototype, "HomeTGLUse");
