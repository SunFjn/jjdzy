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
var ViewYiShouBossBuy = (function (_super) {
    __extends(ViewYiShouBossBuy, _super);
    function ViewYiShouBossBuy() {
        var _this = _super.call(this) || this;
        _this.count = 0;
        _this.maxCount = 0;
        _this.getTotalCost = function () {
            var cfg = Config.yscs_759;
            var start = GGlobal.modelYiShouBOSS.hasBuyCount + 1;
            var max = ModelYiShouBOSS.geMax_buy();
            var end = _this.count + GGlobal.modelYiShouBOSS.hasBuyCount;
            end = end >= max ? max : end;
            var yb = 0;
            for (var i = start; i <= end; i++) {
                yb += JSON.parse(cfg[i].xh)[0][2];
            }
            return yb;
        };
        _this.onOKT = function () {
            var cost = _this.getTotalCost();
            if (Model_player.voMine.yuanbao < cost) {
                ModelChongZhi.guideToRecharge();
                GGlobal.layerMgr.close2(UIConst.YSBOSSBUY);
                return;
            }
            else if (_this.count > _this.maxCount) {
                ViewCommonWarn.text("购买次数已满");
                return;
            }
            else {
                GGlobal.modelYiShouBOSS.CG_SpecialAnimalBoss_BUY_9445(_this.count);
            }
            _this.closeHandler();
        };
        _this.childrenCreated();
        return _this;
    }
    ViewYiShouBossBuy.prototype.childrenCreated = function () {
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
    ViewYiShouBossBuy.prototype.onShown = function () {
        var self = this;
        self.count = 1;
        self.maxCount = ModelYiShouBOSS.geMax_buy() - GGlobal.modelYiShouBOSS.hasBuyCount;
        self.lb.text = "今日剩余购买次数：<font color='" + Color.GREENSTR + "'>" + self.maxCount + "</font>";
        self.onUpCount();
    };
    ViewYiShouBossBuy.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.YSBOSSBUY);
    };
    ViewYiShouBossBuy.prototype.closeHandler = function () {
        this.doHideAnimation();
    };
    ViewYiShouBossBuy.prototype.onClose = function () {
        this.closeHandler();
    };
    ViewYiShouBossBuy.prototype.onCancelT = function () {
        this.closeHandler();
    };
    ViewYiShouBossBuy.prototype.onMinCountHandler = function (event) {
        this.count -= 10;
        if (this.count <= 0) {
            this.count = 1;
        }
        this.onUpCount();
    };
    ViewYiShouBossBuy.prototype.onReduceHandler = function (event) {
        this.count--;
        if (this.count <= 0) {
            this.count = 1;
        }
        this.onUpCount();
    };
    ViewYiShouBossBuy.prototype.onMaxCountHandler = function (event) {
        var c = this.count + 10;
        this.onUpAdd(c);
    };
    ViewYiShouBossBuy.prototype.onAddHandler = function (event) {
        var c = this.count + 1;
        this.onUpAdd(c);
    };
    ViewYiShouBossBuy.prototype.onUpAdd = function (c) {
        if (c > this.maxCount) {
            c = this.maxCount;
            if (c == this.count) {
                ViewCommonWarn.text("购买次数已满");
            }
        }
        if (c <= 0) {
            c = 1;
        }
        this.count = c;
        this.onUpCount();
    };
    ViewYiShouBossBuy.prototype.onUpCount = function () {
        this.lbCount.text = "" + this.count;
        var cost = this.getTotalCost();
        this.lbCost.text = "" + cost;
        if (Model_player.voMine.yuanbao < cost) {
            this.lbCost.color = Color.REDINT;
        }
        else {
            this.lbCost.color = Color.GREENINT;
        }
    };
    ViewYiShouBossBuy.URL = "ui://jvxpx9emqrc53bf";
    return ViewYiShouBossBuy;
}(UIModalPanel));
__reflect(ViewYiShouBossBuy.prototype, "ViewYiShouBossBuy");
