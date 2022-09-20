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
/**
 * @author: lujiahao
 * @date: 2019-11-23 16:02:40
 */
var View_Reward_Show4 = (function (_super) {
    __extends(View_Reward_Show4, _super);
    function View_Reward_Show4() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        _this.times = 10;
        _this.loadRes("bossTiShi", "bossTiShi_atlas0");
        return _this;
    }
    View_Reward_Show4.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("bossTiShi");
        self.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show4").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.surebt.addClickListener(self.OnSure, self);
        self.continuebt.addClickListener(self.oneceMore, self);
        self.isShowOpenAnimation = false;
        _super.prototype.childrenCreated.call(this);
    };
    View_Reward_Show4.prototype.updateMoney = function () {
        var t = this;
        t.continuebt.text = t.btnStr;
        if (t.getTipsFunc) {
            t.lab.text = t.getTipsFunc.apply(t.getTipsCaller, []);
        }
        else {
            t.lab.text = "";
        }
    };
    View_Reward_Show4.prototype.onOpen = function (arg) {
        var t = this;
        t.rewardArr = arg.award;
        t.btnStr = arg.btnStr;
        t.getTipsFunc = arg.getTipsFunc;
        t.getTipsCaller = arg.getTipsCaller;
        t.callBackHandler = arg.callBack;
        t.source = arg.source;
        _super.prototype.onOpen.call(this, arg);
    };
    View_Reward_Show4.prototype.onShown = function () {
        this.list.numItems = this.rewardArr.length;
        this.times = 11;
        Timer.instance.listen(this.timeHandler, this, 1000);
        this.updateMoney();
    };
    View_Reward_Show4.prototype.onHide = function () {
        if (this.list) {
            this.list.numItems = 0;
        }
        View_Reward_Show2.isGuide = true;
        Timer.instance.remove(this.timeHandler, this);
        GGlobal.layerMgr.close(UIConst.REWARD_SHOW4);
    };
    View_Reward_Show4.prototype.OnSure = function () {
        this.doHideAnimation();
    };
    View_Reward_Show4.prototype.oneceMore = function () {
        var self = this;
        self.doHideAnimation();
        if (self.callBackHandler) {
            self.callBackHandler.run();
            self.callBackHandler = null;
        }
    };
    View_Reward_Show4.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        var data = this.rewardArr[index];
        grid.vo = data;
    };
    View_Reward_Show4.prototype.timeHandler = function () {
        this.times--;
        this.surebt.text = "确定(" + this.times + ")";
        if (this.times <= 0) {
            this.doHideAnimation();
        }
    };
    View_Reward_Show4.prototype.guide_sureBt = function (step) {
        var self = this;
        GuideStepManager.instance.showGuide(self.surebt, self.surebt.width / 2, self.surebt.height / 2);
        GuideStepManager.instance.showGuide1(step.source.index, self.surebt, self.surebt.width / 2, self.surebt.height, 90, -106, 35);
    };
    /**
     *
     * @param source 系统id
     * @param pBtnStr 继续按钮文本
     * @param callBack 继续回调
     * @param awards 奖励列表
     * @param pGetTipsFunc 获取继续描述文本的函数
     * @param pGetTipsCaller 调用获取描述文本函数的调用者
     */
    View_Reward_Show4.show = function (source, pBtnStr, callBack, awards, pGetTipsFunc, pGetTipsCaller) {
        if (pGetTipsFunc === void 0) { pGetTipsFunc = null; }
        if (pGetTipsCaller === void 0) { pGetTipsCaller = null; }
        GGlobal.layerMgr.open(UIConst.REWARD_SHOW4, { "source": source, "btnStr": pBtnStr, "callBack": callBack, "award": awards, "getTipsFunc": pGetTipsFunc, "getTipsCaller": pGetTipsCaller });
    };
    //>>>>end
    View_Reward_Show4.URL = "ui://3me6ra11ot2y6";
    View_Reward_Show4.isGuide = false;
    return View_Reward_Show4;
}(UIModalPanel));
__reflect(View_Reward_Show4.prototype, "View_Reward_Show4");
