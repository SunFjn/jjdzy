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
var ViewCommonWin2 = (function (_super) {
    __extends(ViewCommonWin2, _super);
    function ViewCommonWin2() {
        var _this = _super.call(this) || this;
        _this.timer = 0;
        _this.isClosePanel = false;
        _this.childrenCreated();
        return _this;
    }
    ViewCommonWin2.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "ViewFightWin2").asCom;
        this.contentPane = this.view;
        this.btnClose = (this.view.getChild("btnClose"));
        this.bg1 = (this.view.getChild("bg1"));
        this.lbName = (this.view.getChild("lbName"));
        this.lbGuanxian = (this.view.getChild("lbGuanxian"));
        this.lbPower = (this.view.getChild("lbPower"));
        this.viewHead = (this.view.getChild("viewHead"));
        _super.prototype.childrenCreated.call(this);
        this.resetPosition();
    };
    /**
     * 打开胜利面板
     * @v 玩家数据
     * @remainTime 倒计时间 (毫秒)
     * @thisObj this引用
     * @exitText 退出按钮LABEL 默认 退出 会显示 退出(X秒)
     * @exitClickCB 退出按钮点击回调
     * @arg 自定义参数
     */
    ViewCommonWin2.show = function (v, remainTime, thisObj, exitText, exitClickCB, arg) {
        if (remainTime === void 0) { remainTime = 5000; }
        if (thisObj === void 0) { thisObj = null; }
        if (exitText === void 0) { exitText = "退出"; }
        if (exitClickCB === void 0) { exitClickCB = null; }
        if (arg === void 0) { arg = null; }
        GGlobal.layerMgr.open(UIConst.COMMON_WIN2, { v: v, caller: thisObj, eCb: exitClickCB, exitText: exitText, t: remainTime, arg: arg });
    };
    ViewCommonWin2.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        this.vo = arg.v;
        this.timeremain = arg.t;
        this.exitText = arg.exitText;
        this.arg = arg.arg;
        this.exitClickCB = arg.eCb;
        this.caller = arg.caller;
        this.showWin();
        this.updateBtnRemain();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitT, this);
    };
    ViewCommonWin2.prototype.onHide = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitT, this);
        GGlobal.layerMgr.close(UIConst.COMMON_WIN2);
    };
    ViewCommonWin2.prototype.onFrame = function (e) {
        this.timer += GGlobal.mapscene.dt;
        this.timeremain -= GGlobal.mapscene.dt;
        if (this.timer >= 500) {
            this.updateBtnRemain();
            this.timer = 0;
        }
        if (this.timeremain <= 0) {
            this.timeremain = 0;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
            this.finish();
        }
    };
    ViewCommonWin2.prototype.onExitT = function () {
        this.finish();
    };
    ViewCommonWin2.prototype.showWin = function () {
        var self = this;
        this.lbName.text = this.vo.name;
        this.lbPower.text = "战力：" + this.vo.str;
        this.lbGuanxian.text = Model_GuanXian.getJiangXianStr1(this.vo.jiangXian);
        this.viewHead.setdata(this.vo.head, -1, null, -1, false, this.vo.frame);
        this.btnClose.text = this.exitText;
    };
    ViewCommonWin2.prototype.updateBtnRemain = function () {
        this.btnClose.text = this.exitText + "(" + Math.ceil(this.timeremain / 1000) + ")";
    };
    ViewCommonWin2.prototype.finish = function () {
        GGlobal.control.notify(Enum_MsgType.COMMON_WINFAIL_CLOSE);
        if (this.exitClickCB) {
            this.exitClickCB.apply(this.caller, this.arg);
        }
        else {
            GGlobal.modelScene.returnMainScene();
        }
        GGlobal.layerMgr.close2(UIConst.COMMON_WIN2);
    };
    ViewCommonWin2.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
    };
    return ViewCommonWin2;
}(UIModalPanel));
__reflect(ViewCommonWin2.prototype, "ViewCommonWin2");
