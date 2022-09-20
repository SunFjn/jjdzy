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
var ViewCommonFail = (function (_super) {
    __extends(ViewCommonFail, _super);
    function ViewCommonFail() {
        var _this = _super.call(this) || this;
        _this.remainTime = 1;
        _this.interv = 0;
        _this.grids = [];
        _this.isClosePanel = false;
        _this.loadRes();
        return _this;
    }
    ViewCommonFail.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("common", "ViewBattleFault").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
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
    ViewCommonFail.prototype.openWJ = function () {
        this.onExitT();
        GGlobal.layerMgr.open(UIConst.WU_JIANG);
    };
    ViewCommonFail.prototype.openBW = function () {
        this.onExitT();
        GGlobal.layerMgr.open(UIConst.BAOWU);
    };
    ViewCommonFail.prototype.openSJ = function () {
        this.onExitT();
        GGlobal.layerMgr.open(UIConst.SHEN_JIAN);
    };
    ViewCommonFail.prototype.openTS = function () {
        this.onExitT();
        GGlobal.layerMgr.open(UIConst.TIANSHU);
    };
    ViewCommonFail.prototype.onOpen = function (arg) {
        var t = this;
        _super.prototype.onOpen.call(this, arg);
        t.addEventListener(egret.Event.ENTER_FRAME, t.onframe, t);
        t.btnClose.addClickListener(t.onExitT, t);
        t.award = arg.award;
        t.remainTime = arg.t;
        t.exitText = arg.exitText;
        t.arg = arg.arg;
        t.exitClickCB = arg.eCb;
        t.caller = arg.caller;
        t.doNothing = arg.doNothing;
        t.txtXieZhu.visible = false;
        t.txtXieZhu.text = "";
        if (GGlobal.sceneType == SceneCtrl.QXZL) {
            //群雄逐鹿
            t.txtXieZhu.visible = true;
            var t_model = GGlobal.modelQxzl;
            var t_cityVo = t_model.getCityVoById(t_model.curCityId);
            var t_cityName = HtmlUtil.font("【" + t_cityVo.cfg.name + "】", Color.YELLOWSTR);
            var t_str = "";
            if (t_model.battleType == 0 && t_model.battleTempVo) {
                var t_color = FastAPI.getColorByCountry(t_model.battleTempVo.country);
                var t_country = FastAPI.getCountryName(t_model.battleTempVo.country);
                var t_pname = HtmlUtil.font(t_country + "·" + t_model.battleTempVo.name, t_color);
                t_str = ConfigHelp.reTxt("您被驻守{0}的{1}击败了", t_cityName, t_pname);
                t_str += ConfigHelp.reTxt("\n您的体力 -{0}", t_model.battleFailStamin);
                t_str += ConfigHelp.reTxt("\n敌方体力 -{0}", t_model.battleWinStamina);
            }
            else {
                t_str = ConfigHelp.reTxt("您被驻守{0}的守卫击败了", t_cityName);
                t_str += ConfigHelp.reTxt("\n您的体力 -{0}", t_model.battleFailStamin);
            }
            t.txtXieZhu.text = t_str;
        }
        t.showWin();
        t.udTimeView();
    };
    ViewCommonFail.prototype.onHide = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
        this.btnClose.removeClickListener(this.onExitT, this);
        GGlobal.layerMgr.close(UIConst.COMMON_FAIL);
    };
    /**
     * 打开失败面板
     * @remainTime 倒计时间 (毫秒)
     * @thisObj this引用
     * @exitText 退出按钮Lable 默认 退出 会显示 退出(X秒)
     * @exitClickCB 退出按钮点击回调
     * @arg 自定义参数
     */
    ViewCommonFail.show = function (remainTime, thisObj, exitText, exitClickCB, arg, award, doNothing) {
        if (remainTime === void 0) { remainTime = 5000; }
        if (thisObj === void 0) { thisObj = null; }
        if (exitText === void 0) { exitText = "退出"; }
        if (exitClickCB === void 0) { exitClickCB = null; }
        if (arg === void 0) { arg = null; }
        if (award === void 0) { award = null; }
        if (doNothing === void 0) { doNothing = false; }
        GGlobal.layerMgr.open(UIConst.COMMON_FAIL, { award: award, caller: thisObj, eCb: exitClickCB, arg: arg, exitText: exitText, t: remainTime, doNothing: doNothing });
    };
    ViewCommonFail.prototype.onframe = function (e) {
        var newt = this.remainTime - GGlobal.mapscene.dt;
        if (newt < 0) {
            newt = 0;
            this.onExitT();
        }
        if (newt <= 0 && this.remainTime > 0) {
            this.remainTime = 0;
        }
        this.remainTime = newt;
        this.interv += GGlobal.mapscene.dt;
        if (this.interv >= 500) {
            this.interv = 0;
            this.udTimeView();
        }
    };
    ViewCommonFail.prototype.udTimeView = function () {
        var remainSec = Math.ceil(this.remainTime / 1000);
        this.btnClose.text = this.exitText + "(" + remainSec + ")";
    };
    ViewCommonFail.prototype.onExitT = function () {
        if (this.doNothing) {
            GGlobal.layerMgr.close2(UIConst.COMMON_FAIL);
            return;
        }
        if (this.exitClickCB) {
            this.exitClickCB.call(this.caller, this);
        }
        GGlobal.layerMgr.close2(UIConst.COMMON_FAIL);
        GGlobal.control.notify(Enum_MsgType.COMMON_WINFAIL_CLOSE);
    };
    ViewCommonFail.prototype.showWin = function () {
        var self = this;
        var awards = this.award;
        ConfigHelp.cleanGridview(self.grids);
        if (awards == null || awards.length == 0) {
            return;
        }
        this.grids = ConfigHelp.addGridview(awards, self, 150, 300, false, true, 4, 100);
        var len = self.grids.length;
        for (var i = 0; i < len; i++) {
            if (len < 4) {
                self.grids[i].x = 92 + i * 118 + (456 - len * 118) / 2;
            }
            else {
                self.grids[i].x = 92 + (i % 4) * 118;
            }
            self.grids[i].y = 580 + ((i / 4) >> 0) * 145;
        }
    };
    //>>>>end
    ViewCommonFail.URL = "ui://jvxpx9emnn9875";
    return ViewCommonFail;
}(UIModalPanel));
__reflect(ViewCommonFail.prototype, "ViewCommonFail");
