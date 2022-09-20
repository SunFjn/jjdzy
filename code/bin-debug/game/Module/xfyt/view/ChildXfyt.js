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
 * 消费摇骰面板
 * @author: lujiahao
 * @date: 2019-10-30 17:33:18
 */
var ChildXfyt = (function (_super) {
    __extends(ChildXfyt, _super);
    function ChildXfyt() {
        var _this = _super.call(this) || this;
        _this._stepItemList = [];
        /** 当前所处的pos */
        _this._curPos = 1;
        _this._totolStep = 0;
        _this._passStep = 0;
        _this._isMoving = false;
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    ChildXfyt.setExtends = function () {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        // f(ChildXfyt.URL, ChildXfyt);
        f(XfytStepItem.URL, XfytStepItem);
        f(RollItem.URL, RollItem);
    };
    ChildXfyt.createInstance = function () {
        return (fairygui.UIPackage.createObject("xfyt", "ChildXfyt"));
    };
    ChildXfyt.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        for (var i = 0; i < EnumXfyt.POS_COUNT; i++) {
            t._stepItemList.push(t["item" + i]);
        }
    };
    ChildXfyt.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildXfyt.prototype.openPanel = function (pData) {
        var t = this;
        t.registerEvent(true);
        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_XFYT);
        this.tfDate.text = "";
        this._curActVo = pData;
        t.refreshData();
        IconUtil.setImg(t.loaderBg, Enum_Path.BACK_URL + "xfyt_bg.jpg");
    };
    ChildXfyt.prototype.closePanel = function (pData) {
        var t = this;
        t.playRollMc(false);
        t.showArrowNormalMv(false);
        t._isMoving = false;
        t.registerEvent(false);
        Timer.instance.remove(t.onDateUpdate, t);
        IconUtil.setImg(t.loaderBg, null);
    };
    ChildXfyt.prototype.dispose = function () {
        var t = this;
        _super.prototype.dispose.call(this);
    };
    //=========================================== API ==========================================
    //===================================== private method =====================================
    ChildXfyt.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelXfyt;
        var t_info = t_model.info;
        t.refreshItemData(true);
        var t_item = t.getStepItemByPos(t_info.pos);
        t._curPos = t_info.pos;
        if (t_item) {
            t.arrow.x = t_item.x + t_item.width / 2;
            t.arrow.y = t_item.y;
        }
        t.showArrowNormalMv(true);
        t.btnCheck.selected = !t_model.isPlayMc;
        var t_limit = t_model.rollTimesLimit;
        var t_hasTimes = t_model.hadRollCount;
        if (t_hasTimes >= t_limit) {
            t.tfCount.text = "\u5DF2\u8FBE\u5230\u6447\u9AB0\u6B21\u6570\u4E0A\u9650\uFF0C\u4E0A\u9650\u4E3A" + t_limit + "\u6B21";
            t.btnRoll.grayed = true;
        }
        else {
            t.btnRoll.grayed = false;
            var t_color = Color.GREENSTR;
            if (t_model.remain <= 0)
                t_color = Color.REDSTR;
            var t_countStr = HtmlUtil.font(t_model.remain + "", t_color);
            t.tfCount.text = "\u5269\u4F59\u6447\u9AB0\u6B21\u6570\uFF1A" + t_countStr;
        }
        var t_maxValue = t_model.maxChargeValue;
        t.pb.max = t_maxValue;
        t.pb.value = t_model.curChangeValue;
        t.tfDes.text = "\u6BCF\u6D88\u8D39<font color='#ffff00'>" + t_maxValue + "\u5143\u5B9D</font>\u53EF\u6447\u9AB0\u4E00\u6B21";
        t.playRollMc(false);
        t.btnRoll.noticeImg.visible = GGlobal.reddot.checkCondition(UIConst.ACTCOM_XFYT);
        if (!Timer.instance.has(this.onDateUpdate, this))
            Timer.instance.listen(this.onDateUpdate, this);
    };
    /** 刷新时间 */
    ChildXfyt.prototype.onDateUpdate = function () {
        var t_dateStr = "";
        if (this._curActVo) {
            var t_end = this._curActVo.end; //s
            var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0; //s
            // let t_hh = new Date(t_end*1000);
            // let t_now = new Date(servTime * 1000);
            // console.log("=================================", t_hh);
            // console.log("=================================", t_now);
            var t_remainS = t_end - servTime;
            if (t_remainS > 0) {
                if (t_remainS < 24 * 60 * 60) {
                    //小于24小时
                    t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：hh小时uu分ss秒");
                }
                else {
                    t_dateStr = DateUtil2.formatUsedTime(t_remainS, "活动剩余时间：dd天hh小时");
                }
            }
            else {
                t_dateStr = HtmlUtil.font("活动已经结束", Color.REDSTR);
            }
        }
        this.tfDate.text = t_dateStr;
    };
    ChildXfyt.prototype.refreshItemData = function (pInit) {
        var t = this;
        var t_model = GGlobal.modelXfyt;
        var t_info = t_model.info;
        var t_dataList = t_model.getCurCfgRollList();
        for (var i = 0; i < t_dataList.length; i++) {
            var t_item = t._stepItemList[i];
            if (t_item) {
                t_item.setData(t_dataList[i], pInit);
            }
        }
        if (t_model.totolStep == 0)
            var t_rounds = 1;
        else
            t_rounds = Math.ceil(t_model.totolStep / EnumXfyt.POS_COUNT);
        t.tfRound.text = "\u7B2C" + t_rounds + "\u5708";
    };
    ChildXfyt.prototype.getStepItemByPos = function (pPos) {
        return this._stepItemList[pPos - 1];
    };
    ChildXfyt.prototype.playRollMc = function (pFlag) {
        var t = this;
        var t_model = GGlobal.modelXfyt;
        if (pFlag) {
            if (t._isMoving)
                return;
            t._isMoving = true;
            if (!t._mc) {
                t._mc = EffectMgr.addEff("uieff/10034", t.displayListContainer, t.rollItem.x + t.rollItem.width / 2, t.rollItem.y + t.rollItem.height / 2, 200, 600, true);
                t._mc.refKey = "_mc";
                t._mc.refThis = t;
            }
            Timer.instance.callLater(t.runAfterMc, 650, t);
            t.rollItem.visible = false;
        }
        else {
            if (Timer.instance.has(t.runAfterMc, t))
                Timer.instance.remove(t.runAfterMc, t);
            if (t._mc)
                EffectMgr.instance.removeEff(t._mc);
            t.rollItem.visible = true;
            if (t_model.step > 0)
                t.rollItem.indexCtrl.selectedIndex = t_model.step;
            else
                t.rollItem.indexCtrl.selectedIndex = 6;
        }
    };
    ChildXfyt.prototype.runAfterMc = function () {
        var t = this;
        var t_model = GGlobal.modelXfyt;
        t.playRollMc(false);
        t.moveArrow(t_model.step);
    };
    ChildXfyt.prototype.showArrowNormalMv = function (pFlag) {
        var t = this;
        var t_model = GGlobal.modelXfyt;
        if (pFlag) {
            egret.Tween.removeTweens(t.arrow);
            var t_item = t.getStepItemByPos(t._curPos);
            if (t_item) {
                t.arrow.x = t_item.x + t_item.width / 2;
                t.arrow.y = t_item.y;
            }
            var tw = egret.Tween.get(t.arrow, { loop: true });
            tw.to({ y: t.arrow.y - 20 }, 200).wait(50).to({ y: t.arrow.y }, 200);
        }
        else {
            egret.Tween.removeTweens(t.arrow);
        }
    };
    ChildXfyt.prototype.moveArrow = function (pStep) {
        var t = this;
        if (pStep < 1)
            return;
        t._totolStep = pStep;
        t._passStep = 0;
        t.showArrowNormalMv(false); //停止站立的动画
        t.playStep();
    };
    ChildXfyt.prototype.playStep = function () {
        var t = this;
        if (!t._isMoving)
            return;
        if (t._passStep < t._totolStep) {
            var tw = egret.Tween.get(t.arrow);
            var t_curItem = t.getStepItemByPos(t._curPos);
            var t_nextPos_1 = t.calPos(t._curPos + 1);
            var t_nextItem = t.getStepItemByPos(t_nextPos_1);
            tw.to({ x: t_curItem.x + t_curItem.width / 2 + ((t_nextItem.x + t_nextItem.width / 2) - (t_curItem.x + t_curItem.width / 2)) / 2, y: Math.min(t_curItem.y, t_nextItem.y) - 50 }, 200)
                .to({ x: t_nextItem.x + t_nextItem.width / 2, y: t_nextItem.y }, 200).call(function () {
                t._curPos = t_nextPos_1;
                t._passStep++;
                if (t._curPos != 1) {
                    var t_tempItem = t.getStepItemByPos(t._curPos);
                    t_tempItem.hideItemIcon();
                    AnimationUtil.gridToBag([t_tempItem.imgIcon], [t_tempItem.getData().rewardItem], 500, false);
                }
                else {
                    //走到起点需要重置奖品的显示
                    t.refreshItemData(false);
                }
                egret.callLater(function () {
                    t.playStep();
                }, t);
            }, t);
        }
        else {
            //全部步数走完
            t.showArrowNormalMv(true);
            t._isMoving = false;
            t.refreshData();
        }
    };
    ChildXfyt.prototype.calPos = function (pTarget) {
        var t_result = pTarget % EnumXfyt.POS_COUNT;
        if (t_result == 0)
            return EnumXfyt.POS_COUNT;
        else
            return t_result;
    };
    ChildXfyt.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.XFYT_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.XFYT_ROLL_SUCCESS, t.onRollSuccess, t);
        EventUtil.register(pFlag, t.btnRoll, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnCheck, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ChildXfyt.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnRoll:
                if (t._isMoving)
                    return;
                GGlobal.modelXfyt.CG_RollDice_rolldice_10021();
                break;
            case t.btnCheck:
                GGlobal.modelXfyt.isPlayMc = !t.btnCheck.selected;
                break;
        }
    };
    ChildXfyt.prototype.onUpdate = function () {
        var t = this;
        t.refreshData();
    };
    ChildXfyt.prototype.onRollSuccess = function () {
        var t = this;
        var t_model = GGlobal.modelXfyt;
        if (t_model.isPlayMc) {
            t.playRollMc(true); //播放动画
        }
        else {
            var t_resultList = t_model.resultList;
            View_Reward_Show4.show(UIConst.ACTCOM_XFYT, "再來一次", Handler.create(t, function () {
                GGlobal.modelXfyt.CG_RollDice_rolldice_10021();
            }), t_resultList, function () {
                var t_color = Color.GREENSTR;
                if (t_model.remain <= 0)
                    t_color = Color.REDSTR;
                var t_countStr = HtmlUtil.font(t_model.remain + "", t_color);
                return "\u5269\u4F59\u6447\u9AB0\u6B21\u6570\uFF1A" + t_countStr;
            }, t);
            t.refreshData(); //跳过动画
        }
    };
    //>>>>end
    ChildXfyt.URL = "ui://n5noipr2vpqq0";
    /** 设置包名（静态属性） */
    ChildXfyt.pkg = "xfyt";
    return ChildXfyt;
}(fairygui.GComponent));
__reflect(ChildXfyt.prototype, "ChildXfyt", ["IPanel"]);
