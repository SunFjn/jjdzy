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
var ViewDengFengBuy = (function (_super) {
    __extends(ViewDengFengBuy, _super);
    function ViewDengFengBuy() {
        var _this = _super.call(this) || this;
        _this.maxBuy = 100;
        _this.hasBuy = 0;
        _this.count = 0;
        _this.childrenCreated();
        return _this;
    }
    ViewDengFengBuy.prototype.childrenCreated = function () {
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
    ViewDengFengBuy.prototype.onShown = function () {
        var s = this;
        var arg = this._args;
        s.hasBuy = arg.hasBuy;
        // s.maxBuy = arg.maxBuy;
        s.cfg = arg.cfg;
        s.count = 1;
        s.onOK = arg.onOK;
        s.onCancel = arg.onCancel;
        s.onCloseFun = arg.onClose;
        s.back.text = arg.title;
        s.btnOk.text = arg.oktext;
        s.btnCancel.text = arg.canceltext;
        s.getCfgMax();
        // let lastCt = s.maxBuy - s.hasBuy
        // let color = lastCt == 0 ? Color.REDSTR :
        this.lb.text = "单次购买上限：<font color='" + Color.GREENSTR + "'>" + s.maxBuy + "</font>";
        this.onUpCount();
    };
    ViewDengFengBuy.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.ALERT_BUY);
    };
    ViewDengFengBuy.prototype.closeHandler = function () {
        this.doHideAnimation();
        this.onOK = null;
        this.onCancel = null;
    };
    ViewDengFengBuy.prototype.onClose = function () {
        if (this.onCloseFun)
            this.onCloseFun.run();
        this.closeHandler();
    };
    ViewDengFengBuy.prototype.onOKT = function () {
        var cost = Number(this.lbCost.text);
        if (Model_player.voMine.yuanbao < cost) {
            ModelChongZhi.guideToRecharge(new Handler(this, this.closeHandler));
            return;
        }
        if (this.count > this.maxBuy) {
            ViewCommonWarn.text("购买次数已满");
            return;
        }
        if (this.onOK)
            this.onOK.runWith(this.count);
        this.closeHandler();
    };
    ViewDengFengBuy.prototype.onCancelT = function () {
        if (this.onCancel)
            this.onCancel.run();
        this.closeHandler();
    };
    /** hasBuy已购买次数， max最大购买次数 cfg 海选或决赛的配置*/
    ViewDengFengBuy.show = function (hasBuy, cfg, onOK, cancel, oktext, canceltext) {
        if (hasBuy === void 0) { hasBuy = 1; }
        if (cancel === void 0) { cancel = null; }
        if (oktext === void 0) { oktext = "确定"; }
        if (canceltext === void 0) { canceltext = "取消"; }
        var arg = { hasBuy: hasBuy, cfg: cfg, onOK: onOK, onCancel: cancel, oktext: oktext, canceltext: canceltext };
        if (!GGlobal.layerMgr.isOpenView(UIConst.DENG_FENG_BUY)) {
            GGlobal.layerMgr.open(UIConst.DENG_FENG_BUY, arg);
        }
    };
    ViewDengFengBuy.prototype.onMinCountHandler = function (event) {
        this.count -= 10;
        if (this.count <= 0) {
            this.count = 1;
        }
        this.onUpCount();
    };
    ViewDengFengBuy.prototype.onReduceHandler = function (event) {
        this.count--;
        if (this.count <= 0) {
            this.count = 1;
        }
        this.onUpCount();
    };
    ViewDengFengBuy.prototype.onMaxCountHandler = function (event) {
        var c = this.count + 10;
        this.onUpAdd(c);
    };
    ViewDengFengBuy.prototype.onAddHandler = function (event) {
        var c = this.count + 1;
        this.onUpAdd(c);
    };
    ViewDengFengBuy.prototype.onUpAdd = function (c) {
        if (c > this.maxBuy) {
            c = this.maxBuy;
            ViewCommonWarn.text("购买次数已满");
        }
        if (c <= 0) {
            c = 1;
        }
        this.count = c;
        this.onUpCount();
    };
    ViewDengFengBuy.prototype.onUpCount = function () {
        var s = this;
        s.lbCount.text = "" + s.count;
        var addCost = 0;
        if (s.hasBuy >= s._cfgMaxCt) {
            addCost += s.count * s._cfgMaxCost;
        }
        else {
            var len = s._cfgMaxCt - s.hasBuy;
            var size = len > s.count ? s.count : len;
            for (var i = 0; i < size; i++) {
                var cfg = this.cfg[s.hasBuy + 1 + i];
                if (!cfg) {
                    break;
                }
                addCost += Number(JSON.parse(cfg.consume)[0][2]);
            }
            if (s.count > len) {
                addCost += (s.count - len) * s._cfgMaxCost;
            }
        }
        this.lbCost.text = "" + addCost;
        if (Model_player.voMine.yuanbao < addCost) {
            this.lbCost.color = Color.REDINT;
        }
        else {
            this.lbCost.color = Color.GREENINT;
        }
    };
    ViewDengFengBuy.prototype.getCfgMax = function () {
        var s = this;
        s._cfgMaxCt = 0;
        for (var key in s.cfg) {
            s._cfgMaxCt++;
        }
        s._cfgMaxCost = Number(JSON.parse(s.cfg[s._cfgMaxCt].consume)[0][2]);
    };
    return ViewDengFengBuy;
}(UIModalPanel));
__reflect(ViewDengFengBuy.prototype, "ViewDengFengBuy");
