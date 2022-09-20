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
var ViewCommonWin1 = (function (_super) {
    __extends(ViewCommonWin1, _super);
    function ViewCommonWin1() {
        var _this = _super.call(this) || this;
        _this.timer = 0;
        _this.isClosePanel = false;
        _this.loadRes();
        return _this;
    }
    ViewCommonWin1.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("common", "ViewFightWin1").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.itemRenderer = self.renderHander;
        self.list.callbackThisObj = self;
        _super.prototype.childrenCreated.call(this);
        self.resetPosition();
    };
    /**
     * 打开胜利面板
     * @remainTime 倒计时间 (毫秒)
     * @thisObj this引用
     * @exitText 退出按钮LABEL 默认 退出 会显示 退出(X秒)
     * @eCB 退出按钮点击回调
     * @cCb 继续按钮点击回调
     * @eArg 退出回调参数
     * @cArg 继续回调参数
     */
    ViewCommonWin1.show = function (award, remainTime, cCB, cArg, thisObj, eCB, eArg, exitText) {
        if (remainTime === void 0) { remainTime = 5000; }
        if (cArg === void 0) { cArg = null; }
        if (thisObj === void 0) { thisObj = null; }
        if (eCB === void 0) { eCB = null; }
        if (eArg === void 0) { eArg = null; }
        if (exitText === void 0) { exitText = "退出"; }
        GGlobal.layerMgr.open(UIConst.COMMON_WIN1, { award: award, caller: thisObj, eCB: eCB, exitText: exitText, t: remainTime, eArg: eArg, cCB: cCB, cArg: cArg });
    };
    ViewCommonWin1.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        if (!arg)
            return;
        var self = this;
        self.award = arg.award;
        self.timeremain = arg.t;
        self.exitText = arg.exitText;
        self.eArg = arg.eArg;
        self.cArg = arg.cArg;
        self.eCB = arg.eCB;
        self.cCB = arg.cCB;
        self.caller = arg.caller;
        // if ((Model_player.taskId <= Config.xtcs_004[2801].num || Model_player.taskId >= Config.xtcs_004[2806].num)) {
        // 	let cfg = Config.mission_243[Model_player.taskId]
        // 	if (cfg && cfg.type == 7) {
        // 		self.guide_exit(ViewCommonWin1.step);
        // 	}
        // }
        self.showWin();
        self.updateBtnRemain();
        self.addEventListener(egret.Event.ENTER_FRAME, self.onFrame, self);
        self.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onExitT, self);
        self.btnContinue.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onContinue, self);
    };
    ViewCommonWin1.prototype.onHide = function () {
        var self = this;
        self.removeEventListener(egret.Event.ENTER_FRAME, self.onFrame, self);
        self.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onExitT, self);
        GGlobal.layerMgr.close(UIConst.COMMON_WIN1);
        self.list.numItems = 0;
    };
    ViewCommonWin1.prototype.onFrame = function (e) {
        this.timer += GGlobal.mapscene.dt;
        this.timeremain -= GGlobal.mapscene.dt;
        if (this.timer >= 500) {
            this.updateBtnRemain();
            this.timer = 0;
            if (this.timeremain < -500) {
                this.timeremain = 0;
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
                this.continue();
            }
        }
    };
    ViewCommonWin1.prototype.onExitT = function () {
        this.finish();
    };
    ViewCommonWin1.prototype.onContinue = function () {
        this.continue();
    };
    ViewCommonWin1.prototype.showWin = function () {
        var self = this;
        this.list.numItems = this.award ? this.award.length : 0;
        this.btnClose.text = this.exitText;
    };
    ViewCommonWin1.prototype.renderHander = function (index, obj) {
        var item = obj;
        item.vo = this.award[index];
    };
    ViewCommonWin1.prototype.updateBtnRemain = function () {
        this.btnContinue.text = "继续（" + Math.ceil(this.timeremain / 1000) + "）";
    };
    ViewCommonWin1.prototype.finish = function () {
        GGlobal.control.notify(Enum_MsgType.COMMON_WINFAIL_CLOSE);
        if (this.eCB) {
            this.eCB.apply(this.caller, this.eArg);
        }
        else {
            GGlobal.modelScene.returnMainScene(); //自己在回调里写
        }
        GGlobal.layerMgr.close2(UIConst.COMMON_WIN1);
    };
    ViewCommonWin1.prototype.continue = function () {
        GGlobal.control.notify(Enum_MsgType.COMMON_WINFAIL_CLOSE);
        if (this.cCB) {
            this.cCB.apply(this.caller, this.cArg);
        }
        GGlobal.layerMgr.close2(UIConst.COMMON_WIN1);
    };
    ViewCommonWin1.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
    };
    ViewCommonWin1.prototype.guide_exit = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.btnClose, self.btnClose.width / 2, self.btnClose.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.btnClose, self.btnClose.width / 2, self.btnClose.height, 90, -106, 35);
    };
    return ViewCommonWin1;
}(UIModalPanel));
__reflect(ViewCommonWin1.prototype, "ViewCommonWin1");
