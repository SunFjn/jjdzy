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
var ViewBattleFault = (function (_super) {
    __extends(ViewBattleFault, _super);
    function ViewBattleFault() {
        var _this = _super.call(this) || this;
        _this.icons = [];
        _this.remainTime = 1;
        _this.interv = 0;
        _this.isClosePanel = false;
        _this.loadRes();
        return _this;
    }
    ViewBattleFault.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "ViewBattleFault"));
    };
    ViewBattleFault.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "ViewBattleFault").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.btnClose.addClickListener(this.onExitT, this);
        ImageLoader.instance.loader(Enum_Path.MAINUI_URL + UIConst.WU_JIANG + ".png", this.btn0);
        this.btn0.addClickListener(this.openWJ, this);
        ImageLoader.instance.loader(Enum_Path.MAINUI_URL + UIConst.SHEN_JIAN + ".png", this.btn1);
        this.btn1.addClickListener(this.openSJ, this);
        this.btn2.addClickListener(this.openBW, this);
        ImageLoader.instance.loader(Enum_Path.MAINUI_URL + UIConst.BAOWU + ".png", this.btn2);
        ImageLoader.instance.loader(Enum_Path.MAINUI_URL + UIConst.TIANSHU + ".png", this.btn4);
        this.btn4.addClickListener(this.openTS, this);
        _super.prototype.childrenCreated.call(this);
    };
    ViewBattleFault.prototype.openWJ = function () {
        this.onExitT();
        GGlobal.layerMgr.open(UIConst.WU_JIANG);
    };
    ViewBattleFault.prototype.openBW = function () {
        GGlobal.layerMgr.open(UIConst.BAOWU);
        this.onExitT();
    };
    ViewBattleFault.prototype.openSJ = function () {
        GGlobal.layerMgr.open(UIConst.SHEN_JIAN);
        this.onExitT();
    };
    ViewBattleFault.prototype.openTS = function () {
        GGlobal.layerMgr.open(UIConst.TIANSHU);
        this.onExitT();
    };
    ViewBattleFault.prototype.addBtn = function (sid) {
        var s = this;
    };
    /**
     * 默认退出回掉
     * 什么也没干- -！
     */
    ViewBattleFault.DEFCLOSECB = function (self, ui) {
    };
    /**
     * 默认退出回掉
     * 直接切回到关卡场景
     */
    ViewBattleFault.DEFEXITCB = function (sel, ui) {
        GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        GGlobal.modelScene.returnMainScene();
    };
    ViewBattleFault.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
        this.remainTime = arg.t;
        this.exitText = arg.exitText;
        this.frameCB = arg.fCb;
        this.timeoutCB = arg.tCb;
        this.closeCB = arg.cCb;
        this.arg = arg.arg;
        this.exitClickCB = arg.eCb;
        this.caller = arg.caller;
        this.udTimeView();
    };
    ViewBattleFault.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.BATTLEFAULT);
        GGlobal.control.notify(Enum_MsgType.COMMON_WINFAIL_CLOSE);
    };
    ViewBattleFault.prototype.onClose = function () {
        _super.prototype.onClose.call(this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
        if (this.closeCB) {
            this.closeCB(this.caller, this);
        }
    };
    /**
     * 打开失败面板
     * @remainTime 倒计时间 (毫秒)
     * @thisObj this引用
     * @exitText 退出按钮LABEL 默认 退出 会显示 退出(X秒)
     * @exitClickCB 退出按钮点击回调
     * @closeCB 面板关闭面板回调
     * @timeoutCb 倒计时到期回调
     * @frameCB 帧回掉
     * @arg 自定义参数
     */
    ViewBattleFault.show = function (remainTime, thisObj, exitText, exitClickCB, closeCB, timeoutCB, frameCB, arg) {
        if (remainTime === void 0) { remainTime = 5000; }
        if (thisObj === void 0) { thisObj = null; }
        if (exitText === void 0) { exitText = "退出"; }
        if (exitClickCB === void 0) { exitClickCB = null; }
        if (closeCB === void 0) { closeCB = null; }
        if (timeoutCB === void 0) { timeoutCB = null; }
        if (frameCB === void 0) { frameCB = null; }
        if (arg === void 0) { arg = null; }
        if (GGlobal.layerMgr.isOpenView(UIConst.BATTLEFAULT))
            return;
        GGlobal.layerMgr.open(UIConst.BATTLEFAULT, { caller: thisObj, eCb: exitClickCB, cCb: closeCB, tCb: timeoutCB, fCb: frameCB, arg: arg, exitText: exitText, t: remainTime });
    };
    ViewBattleFault.hide = function () {
        if (GGlobal.layerMgr.isOpenView(UIConst.BATTLEFAULT)) {
            GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        }
    };
    ViewBattleFault.prototype.onframe = function (e) {
        var newt = this.remainTime - GGlobal.mapscene.dt;
        if (newt < 0) {
            newt = 0;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
            GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
        }
        if (newt <= 0 && this.remainTime > 0) {
            this.remainTime = 0;
            if (this.timeoutCB) {
                this.timeoutCB(this.caller, this);
            }
            else {
                ViewBattleFault.DEFEXITCB(null, null);
            }
        }
        this.remainTime = newt;
        if (this.frameCB) {
            this.frameCB(this.caller, this);
        }
        this.interv += GGlobal.mapscene.dt;
        if (this.interv >= 500) {
            this.interv = 0;
            this.udTimeView();
        }
    };
    ViewBattleFault.prototype.udTimeView = function () {
        var remainSec = Math.ceil(this.remainTime / 1000);
        this.btnClose.text = this.exitText + "(" + remainSec + ")";
    };
    ViewBattleFault.prototype.onExitT = function (e) {
        if (e === void 0) { e = null; }
        if (this.exitClickCB) {
            this.exitClickCB(this.caller, this);
        }
        else {
            ViewBattleFault.DEFEXITCB(null, null);
        }
        // GGlobal.layerMgr.close(UIConst.ALERT);
        GGlobal.layerMgr.close2(UIConst.BATTLEFAULT);
    };
    ViewBattleFault.prototype.onItemClick = function (e) {
        var obj = e.currentTarget;
        this.onExitT(e);
        GGlobal.layerMgr.open2(obj.funcarg[0], obj.funcarg[1]);
    };
    //>>>>end
    ViewBattleFault.URL = "ui://jvxpx9emnn9875";
    return ViewBattleFault;
}(UIModalPanel));
__reflect(ViewBattleFault.prototype, "ViewBattleFault");
