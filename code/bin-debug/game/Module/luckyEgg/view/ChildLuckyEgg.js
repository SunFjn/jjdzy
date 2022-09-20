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
 * 幸运扭蛋面板
 * @author: lujiahao
 * @date: 2020-01-07 18:06:26
 */
var ChildLuckyEgg = (function (_super) {
    __extends(ChildLuckyEgg, _super);
    function ChildLuckyEgg() {
        var _this = _super.call(this) || this;
        _this._tempItemPool = [];
        _this._mcItemList = [];
        _this._totalCount = 0;
        _this._mcCompleteCount = 0;
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    ChildLuckyEgg.setExtends = function () {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(LuckyPoolRewardItem.URL, LuckyPoolRewardItem);
        // f(ViewPoolPreviewLucky.URL, ViewPoolPreviewLucky);
        f(LuckyPoolPreviewItem.URL, LuckyPoolPreviewItem);
        // f(ChildLuckyEgg.URL, ChildLuckyEgg);
        f(LuckyEggPoolItem.URL, LuckyEggPoolItem);
        f(LuckyEggItem.URL, LuckyEggItem);
        // f(ViewPoolRewardLucky.URL, ViewPoolRewardLucky);
    };
    ChildLuckyEgg.createInstance = function () {
        return (fairygui.UIPackage.createObject("luckyEgg", "ChildLuckyEgg"));
    };
    ChildLuckyEgg.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t._poolItemList = [t.poolItem0, t.poolItem1, t.poolItem2];
        for (var i = 0; i < t._poolItemList.length; i++) {
            t._poolItemList[i].setData(i + 1);
        }
        t._eggItemList = [];
        for (var i = 0; i < 9; i++) {
            var t_item = t.getChild("eggItem" + i);
            t._eggItemList.push(t_item);
        }
        t.resComPut.setItemId(Enum_Attr.yuanBao);
        t.resCom1.setItemId(Enum_Attr.yuanBao);
    };
    ChildLuckyEgg.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildLuckyEgg.prototype.openPanel = function (pData) {
        var t = this;
        t.registerEvent(true);
        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_LUCKY_EGG);
        this.tfDate.text = "";
        this._curActVo = pData;
        t.refreshData();
    };
    ChildLuckyEgg.prototype.closePanel = function (pData) {
        var t = this;
        t.registerEvent(false);
        t.playPutInMc(false);
        Timer.instance.remove(t.onDateUpdate, t);
    };
    //=========================================== API ==========================================
    //===================================== private method =====================================
    ChildLuckyEgg.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelLuckyEgg;
        t.btnCheck.selected = !t_model.isPlayMc;
        for (var i = 0; i < t._eggItemList.length; i++) {
            var t_item = t._eggItemList[i];
            var t_eggVo = t_model.eggItemList[i];
            t_item.setData(t_eggVo);
        }
        if (t_model.remainLottery <= 0)
            t.btnLottery.grayed = true;
        else
            t.btnLottery.grayed = false;
        t.refreshConsume();
        if (!Timer.instance.has(this.onDateUpdate, this))
            Timer.instance.listen(this.onDateUpdate, this);
    };
    ChildLuckyEgg.prototype.refreshConsume = function () {
        var t = this;
        var t_model = GGlobal.modelLuckyEgg;
        if (t_model.freePool > 0) {
            t.tfDes.text = "";
            t.tfFree.visible = true;
            t.resComPut.visible = false;
        }
        else {
            t.tfDes.text = "\u518D\u62BD\u53D6<font color='#00ff00'>" + t_model.remain2Free + "\u6B21</font>\u626D\u86CB\uFF0C\u53EF\u514D\u8D39\u6CE8\u5165\u5956\u52B1";
            t.tfFree.visible = false;
            t.resComPut.visible = true;
        }
        {
            var t_curCount = FastAPI.getItemCount(t_model.consumePutIn.id);
            var t_need = t_model.consumePutIn.count;
            var t_color = Color.GREENSTR;
            if (t_curCount < t_need)
                t_color = Color.REDSTR;
            t.resComPut.setCount(HtmlUtil.font(t_need + "", t_color));
        }
        {
            var t_need = t_model.getConsumeCount();
            var t_curCount = FastAPI.getItemCount(Enum_Attr.yuanBao);
            var t_color = Color.GREENSTR;
            if (t_curCount < t_need)
                t_color = Color.REDSTR;
            t.resCom1.setCount(HtmlUtil.font(t_need + "", t_color));
        }
    };
    ChildLuckyEgg.prototype.playPutInMc = function (pFlag) {
        var t = this;
        var t_model = GGlobal.modelLuckyEgg;
        if (pFlag) {
            if (t_model.isPlayingMc)
                return;
            t_model.isPlayingMc = true;
            for (var _i = 0, _a = t._eggItemList; _i < _a.length; _i++) {
                var v = _a[_i];
                v.visible = false;
            }
            for (var _b = 0, _c = t._poolItemList; _b < _c.length; _b++) {
                var v = _c[_b];
                v.effectShake.play();
            }
            var t_index = t.getChildIndex(t.poolItem0);
            var t_list = t_model.eggItemList;
            t._totalCount = t_list.length;
            t._mcCompleteCount = 0;
            var _loop_1 = function (i) {
                var t_vo = t_list[i];
                var t_tempItem = t.getTempItem();
                t.addChildAt(t_tempItem, t_index);
                t_tempItem.typeCtrl.selectedIndex = t_vo.poolType - 1;
                t._mcItemList.push(t_tempItem);
                egret.Tween.removeTweens(t_tempItem);
                var tw = egret.Tween.get(t_tempItem);
                switch (t_vo.poolType) {
                    case 1:
                        t_tempItem.setXY(t.tempItem00.x, t.tempItem00.y);
                        tw.wait(100 * i)
                            .to({ x: t.tempItem10.x, y: t.tempItem10.y }, 200)
                            .to({ x: t.tempItem11.x, y: t.tempItem11.y }, 300)
                            .to({ x: t.tempItem20.x, y: t.tempItem20.y }, 200)
                            .call(function () {
                            t.recyleTempItem(t_tempItem);
                            t.onItemMcEnd(i);
                        });
                        break;
                    case 2:
                        t_tempItem.setXY(t.tempItem01.x, t.tempItem01.y);
                        tw.wait(100 * i)
                            .to({ x: t.tempItem11.x, y: t.tempItem11.y }, 200)
                            .to({ x: t.tempItem20.x, y: t.tempItem20.y }, 200)
                            .call(function () {
                            t.recyleTempItem(t_tempItem);
                            t.onItemMcEnd(i);
                        });
                        break;
                    case 3:
                        t_tempItem.setXY(t.tempItem02.x, t.tempItem02.y);
                        tw.wait(100 * i)
                            .to({ x: t.tempItem12.x, y: t.tempItem12.y }, 200)
                            .to({ x: t.tempItem11.x, y: t.tempItem11.y }, 300)
                            .to({ x: t.tempItem20.x, y: t.tempItem20.y }, 200)
                            .call(function () {
                            t.recyleTempItem(t_tempItem);
                            t.onItemMcEnd(i);
                        });
                        break;
                }
            };
            for (var i = 0; i < t_list.length; i++) {
                _loop_1(i);
            }
        }
        else {
            t_model.isPlayingMc = false;
            for (var i = t._mcItemList.length - 1; i >= 0; i--) {
                var t_item = t._mcItemList[i];
                t.recyleTempItem(t_item);
                t._mcItemList.splice(i, 1);
            }
            t._totalCount = 0;
            t._mcCompleteCount = 0;
        }
    };
    ChildLuckyEgg.prototype.onItemMcEnd = function (pIndex) {
        var t = this;
        var t_model = GGlobal.modelLuckyEgg;
        t._mcCompleteCount++;
        t._eggItemList[pIndex].setData(t_model.eggItemList[pIndex]);
        if (t._mcCompleteCount >= t._totalCount) {
            t._totalCount = 0;
            t._mcCompleteCount = 0;
            t.playPutInMc(false);
            t.refreshData();
        }
    };
    ChildLuckyEgg.prototype.getTempItem = function () {
        var t = this;
        var t_item = t._tempItemPool.pop();
        if (!t_item) {
            t_item = LuckyEggItem.createInstance();
            t_item.setSize(t.tempItem00.width, t.tempItem00.height);
        }
        return t_item;
    };
    ChildLuckyEgg.prototype.recyleTempItem = function (pItem) {
        var t = this;
        egret.Tween.removeTweens(pItem);
        pItem.setXY(0, 0);
        pItem.removeFromParent();
        t._tempItemPool.push(pItem);
    };
    /** 刷新时间 */
    ChildLuckyEgg.prototype.onDateUpdate = function () {
        var t_dateStr = "";
        if (this._curActVo) {
            var t_end = this._curActVo.end; //s
            var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0; //s
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
    ChildLuckyEgg.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.LUCKY_EGG_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.LUCKY_EGG_POOL_UPDATE, t.onPoolUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.LUCKY_EGG_LOTTERY, t.onLottery, t);
        EventUtil.register(pFlag, t.btnPool, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnCheck, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnHelp, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnPutIn, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnLottery, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.linkLb, egret.TouchEvent.TOUCH_TAP, t.openGaiLV, t);
    };
    ChildLuckyEgg.prototype.openGaiLV = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.GAILV, 7);
    };
    //======================================== handler =========================================
    ChildLuckyEgg.prototype.onUpdate = function () {
        var t = this;
        t.refreshData();
    };
    ChildLuckyEgg.prototype.onPoolUpdate = function () {
        var t = this;
        var t_model = GGlobal.modelLuckyEgg;
        //注入奖励成功 播放注入动画
        if (t_model.isPlayMc) {
            t.refreshConsume(); //先刷新消耗显示
            t.playPutInMc(true);
        }
        else {
            t.refreshData();
        }
    };
    ChildLuckyEgg.prototype.onLottery = function () {
        var t = this;
        var t_model = GGlobal.modelLuckyEgg;
        var t_resultList = t_model.lotteryResultList;
        if (t_model.remainLottery <= 0) {
            var t_need = 0;
            if (t_model.freePool <= 0) {
                t_need = t_model.consumePutIn.count;
            }
            View_Reward_Show5.show(UIConst.ACTCOM_LUCKY_EGG, "注入奖励", Handler.create(t, function () {
                GGlobal.modelLuckyEgg.CG_LuckyTwist_chooseItem_11003();
            }), t_resultList, Enum_Attr.yuanBao, t_need, function () {
                return "\u62BD\u5956\u673A\u4F1A\u5DF2\u5168\u90E8\u7528\u5B8C\uFF0C\u8BF7\u91CD\u65B0\u6CE8\u5165\u5956\u52B1";
            }, t);
        }
        else {
            View_Reward_Show5.show(UIConst.ACTCOM_LUCKY_EGG, "继续抽奖", Handler.create(t, function () {
                GGlobal.modelLuckyEgg.CG_LuckyTwist_draw_11001();
            }), t_resultList, Enum_Attr.yuanBao, t_model.getConsumeCount(), function () {
                var t_color = Color.GREENSTR;
                if (t_model.remainLottery < 1)
                    t_color = Color.REDSTR;
                var t_countStr = HtmlUtil.font(t_model.remainLottery + "", t_color);
                return "\u672C\u6B21\u6CE8\u5165\u5956\u52B1\u8FD8\u53EF\u62BD\u5956" + t_countStr + "\u6B21";
            }, t);
        }
    };
    ChildLuckyEgg.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelLuckyEgg;
        switch (e.currentTarget) {
            case t.btnPool:
                GGlobal.layerMgr.open(UIConst.ACTCOM_LUCKY_EGG_REWARD);
                break;
            case t.btnCheck:
                t_model.isPlayMc = !t.btnCheck.selected;
                break;
            case t.btnHelp:
                GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.ACTCOM_LUCKY_EGG);
                break;
            case t.btnPutIn:
                t_model.CG_LuckyTwist_chooseItem_11003();
                // t.playPutInMc(true);
                break;
            case t.btnLottery:
                t_model.CG_LuckyTwist_draw_11001();
                break;
        }
    };
    //>>>>end
    ChildLuckyEgg.URL = "ui://wx4kos8uosj30";
    /** 设置包名（静态属性） */
    ChildLuckyEgg.pkg = "luckyEgg";
    return ChildLuckyEgg;
}(fairygui.GComponent));
__reflect(ChildLuckyEgg.prototype, "ChildLuckyEgg", ["IPanel"]);
