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
var ViewSYZLBCtBuy = (function (_super) {
    __extends(ViewSYZLBCtBuy, _super);
    function ViewSYZLBCtBuy() {
        var _this = _super.call(this) || this;
        _this.maxCount = 0;
        _this.lastCount = 0;
        _this.count = 0;
        _this.childrenCreated();
        return _this;
    }
    ViewSYZLBCtBuy.prototype.childrenCreated = function () {
        this.view = GGlobal.commonpkg.createObject("ViewAlertBuy").asCom;
        this.contentPane = this.view;
        this.lbTitle = (this.view.getChild("lbTitle"));
        this.btnMin = (this.view.getChild("btnMin"));
        this.btnReduce = (this.view.getChild("btnReduce"));
        this.btnAdd = (this.view.getChild("btnAdd"));
        this.lbCount = (this.view.getChild("lbCount"));
        this.btnMax = (this.view.getChild("btnMax"));
        this.groupUse = (this.view.getChild("groupUse"));
        this.lbTotal = (this.view.getChild("lbTotal"));
        this.lbCost = (this.view.getChild("lbCost"));
        this.back = (this.view.getChild("back"));
        this.lb = (this.view.getChild("lb"));
        this.btnCancel = (this.view.getChild("btnCancel"));
        this.btnOk = (this.view.getChild("btnOk"));
        _super.prototype.childrenCreated.call(this);
        this.btnOk.addClickListener(this.onOKT, this);
        this.btnCancel.addClickListener(this.onCancelT, this);
        this.btnMin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMinCountHandler, this);
        this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMaxCountHandler, this);
        this.btnReduce.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReduceHandler, this);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddHandler, this);
    };
    ViewSYZLBCtBuy.prototype.onShown = function () {
        var arg = this._args;
        this.lastCount = arg.last;
        this.cost = arg.cost;
        this.maxCount = arg.max;
        this.count = 1;
        this.onOK = arg.onOK;
        this.onCancel = arg.onCancel;
        this.onCloseFun = arg.onClose;
        this.back.text = arg.title;
        this.btnOk.text = arg.oktext;
        this.btnCancel.text = arg.canceltext;
        if (arg.text) {
            this.lb.text = arg.text;
        }
        else {
            var color = this.lastCount == 0 ? Color.REDSTR : Color.GREENSTR;
            this.lb.text = "今日剩余购买次数：<font color='" + color + "'>" + this.lastCount + "</font>";
        }
        this.onUpCount();
    };
    ViewSYZLBCtBuy.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.SYZLB_CTBUY);
    };
    ViewSYZLBCtBuy.prototype.closeHandler = function () {
        this.doHideAnimation();
        this.onOK = null;
        this.onCancel = null;
    };
    ViewSYZLBCtBuy.prototype.onClose = function () {
        if (this.onCloseFun)
            this.onCloseFun.run();
        this.closeHandler();
    };
    ViewSYZLBCtBuy.prototype.onOKT = function () {
        var cost = this.cost * this.count;
        if (Model_player.voMine.yuanbao < cost) {
            ModelChongZhi.guideToRecharge();
            // return;
        }
        else if (this.count > this.lastCount) {
            ViewCommonWarn.text("购买次数已满");
            return;
        }
        else if (this.count > this.maxCount) {
            ViewCommonWarn.text("购买次数已满");
            return;
        }
        else {
            if (this.onOK)
                this.onOK.runWith(this.count);
        }
        this.closeHandler();
    };
    ViewSYZLBCtBuy.prototype.onCancelT = function () {
        if (this.onCancel)
            this.onCancel.run();
        this.closeHandler();
    };
    /** cost 花费，last剩余购买次数， max最大购买次数*/
    ViewSYZLBCtBuy.show = function (cost, last, max, text, onOK, cancel, oktext, canceltext) {
        if (last === void 0) { last = 1; }
        if (max === void 0) { max = 1; }
        if (text === void 0) { text = ""; }
        if (cancel === void 0) { cancel = null; }
        if (oktext === void 0) { oktext = "确定"; }
        if (canceltext === void 0) { canceltext = "取消"; }
        var arg = { cost: cost, last: last, max: max, text: text, onOK: onOK, onCancel: cancel, oktext: oktext, canceltext: canceltext };
        if (!GGlobal.layerMgr.isOpenView(UIConst.SYZLB_CTBUY)) {
            GGlobal.layerMgr.open(UIConst.SYZLB_CTBUY, arg);
        }
    };
    ViewSYZLBCtBuy.prototype.onMinCountHandler = function (event) {
        this.count -= 10;
        if (this.count <= 0) {
            this.count = 1;
        }
        this.onUpCount();
    };
    ViewSYZLBCtBuy.prototype.onReduceHandler = function (event) {
        this.count--;
        if (this.count <= 0) {
            this.count = 1;
        }
        this.onUpCount();
    };
    ViewSYZLBCtBuy.prototype.onMaxCountHandler = function (event) {
        var c = this.count + 10;
        this.onUpAdd(c);
    };
    ViewSYZLBCtBuy.prototype.onAddHandler = function (event) {
        var c = this.count + 1;
        this.onUpAdd(c);
    };
    ViewSYZLBCtBuy.prototype.onUpAdd = function (c) {
        if (this.maxCount == 0) {
            ViewCommonWarn.text("购买次数已满");
            return;
        }
        if (this.maxCount > this.lastCount) {
            if (c > this.lastCount) {
                c = this.lastCount;
                if (c == this.count) {
                    ViewCommonWarn.text("购买次数已满");
                }
            }
        }
        else {
            if (c > this.maxCount) {
                c = this.maxCount;
                if (c == this.count) {
                    ViewCommonWarn.text("购买次数已满");
                }
            }
        }
        if (c <= 0) {
            c = 1;
        }
        this.count = c;
        this.onUpCount();
    };
    ViewSYZLBCtBuy.prototype.onUpCount = function () {
        this.lbCount.text = "" + this.count;
        var m = GGlobal.model_Syzlb;
        var cost = 0;
        for (var i = 0; i < this.count; i++) {
            var v = Config.sycs_762[m.batBuy + 1 + i];
            if (v) {
                cost += Number(JSON.parse(v.xh)[0][2]);
            }
        }
        this.lbCost.text = "" + cost;
        if (Model_player.voMine.yuanbao < cost) {
            this.lbCost.color = Color.REDINT;
        }
        else {
            this.lbCost.color = Color.GREENINT;
        }
    };
    ViewSYZLBCtBuy.URL = "ui://jvxpx9emqrc53bf";
    return ViewSYZLBCtBuy;
}(UIModalPanel));
__reflect(ViewSYZLBCtBuy.prototype, "ViewSYZLBCtBuy");
