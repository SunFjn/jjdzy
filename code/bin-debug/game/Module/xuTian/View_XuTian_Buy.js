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
var View_XuTian_Buy = (function (_super) {
    __extends(View_XuTian_Buy, _super);
    function View_XuTian_Buy() {
        var _this = _super.call(this) || this;
        _this.maxBuy = 0;
        _this.hasBuy = 0;
        _this.count = 0;
        _this.childrenCreated();
        return _this;
    }
    View_XuTian_Buy.prototype.childrenCreated = function () {
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
    View_XuTian_Buy.prototype.onShown = function () {
        var s = this;
        var arg = this._args;
        s.hasBuy = arg.hasBuy;
        s.maxBuy = arg.maxBuy;
        s.count = 1;
        s.onOK = arg.onOK;
        s.onCancel = arg.onCancel;
        s.onCloseFun = arg.onClose;
        s.back.text = arg.title;
        s.btnOk.text = arg.oktext;
        s.btnCancel.text = arg.canceltext;
        var lastCt = s.maxBuy - s.hasBuy;
        var color = lastCt == 0 ? Color.REDSTR : Color.GREENSTR;
        this.lb.text = "今日剩余购买次数：<font color='" + color + "'>" + lastCt + "</font>";
        this.onUpCount();
    };
    View_XuTian_Buy.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.ALERT_BUY);
    };
    View_XuTian_Buy.prototype.closeHandler = function () {
        this.doHideAnimation();
        this.onOK = null;
        this.onCancel = null;
    };
    View_XuTian_Buy.prototype.onClose = function () {
        if (this.onCloseFun)
            this.onCloseFun.run();
        this.closeHandler();
    };
    View_XuTian_Buy.prototype.onOKT = function () {
        var cost = Number(this.lbCost.text);
        if (Model_player.voMine.yuanbao < cost) {
            ModelChongZhi.guideToRecharge(new Handler(this, this.closeHandler));
            return;
        }
        if (this.hasBuy + this.count > this.maxBuy) {
            ViewCommonWarn.text("购买次数已满");
            return;
        }
        if (this.onOK)
            this.onOK.runWith(this.count);
        this.closeHandler();
    };
    View_XuTian_Buy.prototype.onCancelT = function () {
        if (this.onCancel)
            this.onCancel.run();
        this.closeHandler();
    };
    /** cost 花费，hasBuy已购买次数， max最大购买次数*/
    View_XuTian_Buy.show = function (hasBuy, maxBuy, onOK, cancel, oktext, canceltext) {
        if (hasBuy === void 0) { hasBuy = 1; }
        if (maxBuy === void 0) { maxBuy = 1; }
        if (cancel === void 0) { cancel = null; }
        if (oktext === void 0) { oktext = "确定"; }
        if (canceltext === void 0) { canceltext = "取消"; }
        var arg = { hasBuy: hasBuy, maxBuy: maxBuy, onOK: onOK, onCancel: cancel, oktext: oktext, canceltext: canceltext };
        if (!GGlobal.layerMgr.isOpenView(UIConst.XU_TIAN_BUY)) {
            GGlobal.layerMgr.open(UIConst.XU_TIAN_BUY, arg);
        }
    };
    View_XuTian_Buy.prototype.onMinCountHandler = function (event) {
        this.count -= 10;
        if (this.count <= 0) {
            this.count = 1;
        }
        this.onUpCount();
    };
    View_XuTian_Buy.prototype.onReduceHandler = function (event) {
        this.count--;
        if (this.count <= 0) {
            this.count = 1;
        }
        this.onUpCount();
    };
    View_XuTian_Buy.prototype.onMaxCountHandler = function (event) {
        var c = this.count + 10;
        this.onUpAdd(c);
    };
    View_XuTian_Buy.prototype.onAddHandler = function (event) {
        var c = this.count + 1;
        this.onUpAdd(c);
    };
    View_XuTian_Buy.prototype.onUpAdd = function (c) {
        if (this.hasBuy + c > this.maxBuy) {
            c = this.maxBuy - this.hasBuy;
            ViewCommonWarn.text("购买次数已满");
        }
        if (c <= 0) {
            c = 1;
        }
        this.count = c;
        this.onUpCount();
    };
    View_XuTian_Buy.prototype.onUpCount = function () {
        this.lbCount.text = "" + this.count;
        var addCost = 0;
        for (var i = 0; i < this.count; i++) {
            var cfg = Config.xtwlcs_776[this.hasBuy + 1 + i];
            if (!cfg) {
                break;
            }
            addCost += Number(JSON.parse(cfg.xh)[0][2]);
        }
        this.lbCost.text = "" + addCost;
        if (Model_player.voMine.yuanbao < addCost) {
            this.lbCost.color = Color.REDINT;
        }
        else {
            this.lbCost.color = Color.GREENINT;
        }
    };
    return View_XuTian_Buy;
}(UIModalPanel));
__reflect(View_XuTian_Buy.prototype, "View_XuTian_Buy");
