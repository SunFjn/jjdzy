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
var View_Reward_Show5 = (function (_super) {
    __extends(View_Reward_Show5, _super);
    function View_Reward_Show5() {
        var _this = _super.call(this) || this;
        _this.rewardArr = [];
        _this.times = 10;
        _this.loadRes("bossTiShi", "bossTiShi_atlas0");
        return _this;
    }
    View_Reward_Show5.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("bossTiShi");
        self.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show5").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.isShowOpenAnimation = false;
        _super.prototype.childrenCreated.call(this);
    };
    View_Reward_Show5.prototype.updateMoney = function () {
        var t = this;
        t.continuebt.text = t.btnStr;
        if (t.getTipsFunc) {
            t.tfDes.text = t.getTipsFunc.apply(t.getTipsCaller, []);
        }
        else {
            t.tfDes.text = "";
        }
        if (t.consumeNeed <= 0) {
            //免费
            t.groupMoney.visible = false;
            t.tfDes2.visible = true;
            t.tfDes2.text = "免费";
            if (t.source == UIConst.ACTCOM_GGL) {
                var t_model = GGlobal.modelGGL;
                t.tfDes2.text = "\u4ECA\u65E5\u514D\u8D39\u6B21\u6570\uFF1A<font color='#00ff00'>" + t_model.freeCount + "/" + t_model.maxFree + "</font>";
            }
        }
        else {
            t.groupMoney.visible = true;
            t.tfDes2.visible = false;
            var t_color = Color.GREENSTR;
            if (!FastAPI.checkItemEnough(t.consumeId, t.consumeNeed))
                t_color = Color.REDSTR;
            t.lab.text = HtmlUtil.font(t.consumeNeed + "", t_color);
            var t_cfg = Config.daoju_204[t.consumeId];
            if (t_cfg) {
                IconUtil.setImg(t.img, Enum_Path.ICON70_URL + t_cfg.icon + ".png");
            }
            else {
                IconUtil.setImg(t.img, null);
            }
        }
    };
    View_Reward_Show5.prototype.onOpen = function (arg) {
        var t = this;
        t.rewardArr = arg.award;
        t.btnStr = arg.btnStr;
        t.getTipsFunc = arg.getTipsFunc;
        t.getTipsCaller = arg.getTipsCaller;
        t.callBackHandler = arg.callBack;
        t.consumeId = arg.consumeId;
        t.consumeNeed = arg.consumeNeed;
        t.sureCallback = arg.sureCallback;
        t.source = arg.source;
        _super.prototype.onOpen.call(this, arg);
    };
    View_Reward_Show5.prototype.onShown = function () {
        var t = this;
        t.registerEvent(true);
        t.list.numItems = t.rewardArr.length;
        t.times = 11;
        Timer.instance.listen(t.timeHandler, t, 1000);
        t.updateMoney();
    };
    View_Reward_Show5.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        if (t.list) {
            t.list.numItems = 0;
        }
        // View_Reward_Show2.isGuide = true;
        Timer.instance.remove(t.timeHandler, t);
        GGlobal.layerMgr.close(UIConst.REWARD_SHOW5);
        if (t.sureCallback) {
            t.sureCallback.run();
            t.sureCallback = null;
        }
        IconUtil.setImg(t.img, null);
    };
    View_Reward_Show5.prototype.OnSure = function () {
        var t = this;
        if (t.sureCallback) {
            t.sureCallback.run();
            t.sureCallback = null;
        }
        this.doHideAnimation();
    };
    View_Reward_Show5.prototype.oneceMore = function () {
        var self = this;
        self.doHideAnimation();
        if (self.callBackHandler) {
            self.callBackHandler.run();
            self.callBackHandler = null;
        }
    };
    View_Reward_Show5.prototype.renderHandler = function (index, obj) {
        var grid = obj;
        var data = this.rewardArr[index];
        grid.vo = data;
    };
    View_Reward_Show5.prototype.timeHandler = function () {
        this.times--;
        this.surebt.text = "确定(" + this.times + ")";
        if (this.times <= 0) {
            this.OnSure();
        }
    };
    View_Reward_Show5.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.surebt, egret.TouchEvent.TOUCH_TAP, t.OnSure, t);
        EventUtil.register(pFlag, t.continuebt, egret.TouchEvent.TOUCH_TAP, t.oneceMore, t);
        EventUtil.register(pFlag, t.img, egret.TouchEvent.TOUCH_TAP, t.onIconClick, t);
    };
    View_Reward_Show5.prototype.onIconClick = function (e) {
        var t = this;
        FastAPI.showItemTips(t.consumeId);
    };
    View_Reward_Show5.prototype.guide_sureBt = function (step) {
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
     * @param pConsumeId 消耗物品id
     * @param pConsumeNeed 消耗物品所需数量
     * @param pGetTipsFunc 获取继续描述文本的函数
     * @param pGetTipsCaller 调用获取描述文本函数的调用者
     */
    View_Reward_Show5.show = function (source, pBtnStr, callBack, awards, pConsumeId, pConsumeNeed, pGetTipsFunc, pGetTipsCaller, pSureCallback) {
        if (pGetTipsFunc === void 0) { pGetTipsFunc = null; }
        if (pGetTipsCaller === void 0) { pGetTipsCaller = null; }
        if (pSureCallback === void 0) { pSureCallback = null; }
        GGlobal.layerMgr.open(UIConst.REWARD_SHOW5, {
            "source": source,
            "btnStr": pBtnStr,
            "callBack": callBack,
            "award": awards,
            "consumeId": pConsumeId,
            "consumeNeed": pConsumeNeed,
            "getTipsFunc": pGetTipsFunc,
            "getTipsCaller": pGetTipsCaller,
            "sureCallback": pSureCallback
        });
    };
    //>>>>end
    View_Reward_Show5.URL = "ui://3me6ra11qid37";
    View_Reward_Show5.isGuide = false;
    return View_Reward_Show5;
}(UIModalPanel));
__reflect(View_Reward_Show5.prototype, "View_Reward_Show5");
