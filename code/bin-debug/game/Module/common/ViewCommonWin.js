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
var ViewCommonWin = (function (_super) {
    __extends(ViewCommonWin, _super);
    function ViewCommonWin() {
        var _this = _super.call(this) || this;
        _this.timer = 0;
        _this.isClosePanel = false;
        _this.loadRes();
        return _this;
    }
    ViewCommonWin.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "ViewFightWin").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.txtXieZhu.visible = false;
        this.list.itemRenderer = this.renderHander;
        this.list.callbackThisObj = this;
        _super.prototype.childrenCreated.call(this);
        this.resetPosition();
    };
    /**
     * 打开胜利面板
     * @remainTime 倒计时间 (毫秒)
     * @thisObj this引用
     * @exitText 退出按钮LABEL 默认 退出 会显示 退出(X秒)
     * @exitClickCB 退出按钮点击回调
     * @arg 自定义参数
     */
    ViewCommonWin.show = function (award, remainTime, thisObj, exitText, exitClickCB, arg, doNothing) {
        if (remainTime === void 0) { remainTime = 5000; }
        if (thisObj === void 0) { thisObj = null; }
        if (exitText === void 0) { exitText = "退出"; }
        if (exitClickCB === void 0) { exitClickCB = null; }
        if (arg === void 0) { arg = null; }
        if (doNothing === void 0) { doNothing = false; }
        GGlobal.layerMgr.open(UIConst.COMMON_WIN, { award: award, caller: thisObj, eCb: exitClickCB, exitText: exitText, t: remainTime, arg: arg, doNothing: doNothing });
    };
    ViewCommonWin.hide = function () {
        if (GGlobal.layerMgr.isOpenView(UIConst.COMMON_WIN)) {
            GGlobal.layerMgr.close2(UIConst.COMMON_WIN);
        }
    };
    ViewCommonWin.prototype.onOpen = function (arg) {
        var t = this;
        _super.prototype.onOpen.call(this, arg);
        t.award = arg.award;
        t.timeremain = arg.t;
        t.exitText = arg.exitText;
        t.arg = arg.arg;
        t.exitClickCB = arg.eCb;
        t.caller = arg.caller;
        t.doNothing = arg.doNothing;
        t.txtXieZhu.visible = false;
        t.txtXieZhu.text = "";
        t.lbTip.visible = false;
        if (GGlobal.sceneType == SceneCtrl.CROSS_SJMJ && t.award.length == 0) {
            t.txtXieZhu.visible = true;
            t.txtXieZhu.text = "今日协助次数已用完";
        }
        else if (GGlobal.sceneType == SceneCtrl.QXZL) {
            t.txtXieZhu.visible = true;
            var t_model = GGlobal.modelQxzl;
            var t_cityVo = t_model.getCityVoById(t_model.curCityId);
            var t_cityName = HtmlUtil.font("【" + t_cityVo.cfg.name + "】", Color.YELLOWSTR);
            var t_str = "";
            if (t_model.battleType == 0 && t_model.battleTempVo) {
                var t_color = FastAPI.getColorByCountry(t_model.battleTempVo.country);
                var t_country = FastAPI.getCountryName(t_model.battleTempVo.country);
                var t_pname = HtmlUtil.font(t_country + "·" + t_model.battleTempVo.name, t_color);
                t_str = ConfigHelp.reTxt("您击败了驻守{0}的{1}", t_cityName, t_pname);
                t_str += ConfigHelp.reTxt("\n您的体力 -{0}", t_model.battleWinStamina);
                t_str += ConfigHelp.reTxt("\n敌方体力 -{0}", t_model.battleFailStamin);
            }
            else {
                t_str = ConfigHelp.reTxt("您击败了驻守{0}的守卫", t_cityName);
                t_str += ConfigHelp.reTxt("\n您的体力 -{0}", t_model.battleWinStamina);
            }
            t.txtXieZhu.text = t_str;
        }
        t.showWin();
        t.updateBtnRemain();
        t.addEventListener(egret.Event.ENTER_FRAME, t.onFrame, t);
        t.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, t.onExitT, t);
        t.btnClose.text = t.exitText;
    };
    ViewCommonWin.prototype.onHide = function () {
        this.list.numItems = 0;
        this.txtXieZhu.visible = false;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitT, this);
        GGlobal.layerMgr.close(UIConst.COMMON_WIN);
    };
    ViewCommonWin.prototype.onFrame = function (e) {
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
    ViewCommonWin.prototype.onExitT = function () {
        this.finish();
    };
    ViewCommonWin.prototype.showWin = function () {
        var self = this;
        this.list.numItems = this.award ? this.award.length : 0;
    };
    ViewCommonWin.prototype.updateBtnRemain = function () {
        var t = this;
        t.btnClose.text = t.exitText + "(" + Math.ceil(t.timeremain / 1000) + ")";
    };
    ViewCommonWin.prototype.finish = function () {
        if (this.doNothing) {
            GGlobal.layerMgr.close2(UIConst.COMMON_WIN);
            return;
        }
        GGlobal.control.notify(Enum_MsgType.COMMON_WINFAIL_CLOSE);
        if (this.exitClickCB) {
            this.exitClickCB.apply(this.caller, this.arg);
        }
        else {
            GGlobal.modelScene.returnMainScene(); //自己在回调里写
        }
        GGlobal.layerMgr.close2(UIConst.COMMON_WIN);
    };
    ViewCommonWin.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
    };
    ViewCommonWin.prototype.renderHander = function (index, obj) {
        var item = obj;
        item.vo = this.award[index];
    };
    //>>>>end
    ViewCommonWin.URL = "ui://jvxpx9emnn9876";
    return ViewCommonWin;
}(UIModalPanel));
__reflect(ViewCommonWin.prototype, "ViewCommonWin");
