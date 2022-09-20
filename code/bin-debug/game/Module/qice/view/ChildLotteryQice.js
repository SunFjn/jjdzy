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
 * 出谋划策面板
 * @author: lujiahao
 * @date: 2019-10-24 18:28:45
 */
var ChildLotteryQice = (function (_super) {
    __extends(ChildLotteryQice, _super);
    function ChildLotteryQice() {
        var _this = _super.call(this) || this;
        _this._boxItemPool = [];
        _this._boxItemList = [];
        _this._clickFlag = false;
        return _this;
    }
    ChildLotteryQice.createInstance = function () {
        return (fairygui.UIPackage.createObject("qice", "ChildLotteryQice"));
    };
    ChildLotteryQice.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.itemList.setVirtualAndLoop();
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.pb._titleObject.visible = false;
    };
    ChildLotteryQice.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildLotteryQice.prototype.openPanel = function (pData) {
        var t = this;
        t.registerEvent(true);
        GGlobal.modelQice.CG_QiCeDraw_openUI_9751();
        t.refreshData();
        IconUtil.setImg(t.loaderBg, Enum_Path.BACK_URL + "qice_lottery_bg.jpg");
    };
    ChildLotteryQice.prototype.closePanel = function (pData) {
        var t = this;
        t.itemList.numItems = 0;
        t.registerEvent(false);
        t.showMovie(false);
        Timer.instance.remove(t.onScroll, t);
        IconUtil.setImg(t.loaderBg, null);
    };
    //===================================== private method =====================================
    ChildLotteryQice.prototype.onItemRender = function (pIndex, pItem) {
        var t_list = this._rewardVoList;
        if (t_list) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    };
    ChildLotteryQice.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelQice;
        t._rewardVoList = t_model.cfgLottery.rewardList;
        t.itemList.numItems = t._rewardVoList.length;
        if (!Timer.instance.has(t.onScroll, t))
            Timer.instance.listen(t.onScroll, t, 100);
        t.btnCheck.selected = !t_model.isPlayMc;
        t.pb.max = t_model.maxLotteryCount;
        t.pb.value = t_model.lotteryCount;
        t.tfTimes.text = "\u8C0B\u5212\u6B21\u6570\n" + t_model.lotteryCount + "/" + t_model.maxLotteryCount;
        var t_interval = 10;
        var t_curTimes = t_model.lotteryCount % t_interval;
        var t_remainTimes = t_interval - t_curTimes;
        var t_str = "";
        if (t_remainTimes == 1) {
            t_str = "<font color='#00ff00'>下次</font>谋划必出高级奖励";
        }
        else {
            t_str = "\u518D\u8C0B\u5212<font color='#00ff00'>" + t_remainTimes + "\u6B21</font>\u5FC5\u51FA\u9AD8\u7EA7\u5956\u52B1";
        }
        t.tfPreView.text = t_str;
        t.refreshBoxItemList();
        t.showConsume();
    };
    ChildLotteryQice.prototype.showConsume = function () {
        var t = this;
        var t_model = GGlobal.modelQice;
        var t_c1Id = 0;
        var t_need1 = 0;
        if (t_model.cfgLottery.checkItemEnough(1)) {
            t_c1Id = t_model.cfgLottery.consumeItem1.id;
            t_need1 = t_model.cfgLottery.consumeItem1.count;
            t.btnOne.noticeImg.visible = true;
        }
        else {
            t_c1Id = t_model.cfgLottery.consume1.id;
            t_need1 = t_model.cfgLottery.consume1.count;
            t.btnOne.noticeImg.visible = false;
        }
        {
            t.resCom0.setItemId(t_c1Id);
            var t_curCount = FastAPI.getItemCount(t_c1Id);
            var t_color = Color.GREENSTR;
            if (t_curCount < t_need1) {
                t_color = Color.REDSTR;
            }
            if (FastAPI.isMoney(t_c1Id)) {
                t.resCom0.setCount(HtmlUtil.font(t_need1 + "", t_color));
            }
            else {
                t.resCom0.setCount(HtmlUtil.font(t_curCount + "/" + t_need1, t_color));
            }
        }
        var t_c2Id = 0;
        var t_need2 = 0;
        if (t_model.cfgLottery.checkItemEnough(2)) {
            t_c2Id = t_model.cfgLottery.consumeItem10.id;
            t_need2 = t_model.cfgLottery.consumeItem10.count;
            t.btnTen.noticeImg.visible = true;
        }
        else {
            t_c2Id = t_model.cfgLottery.consume10.id;
            t_need2 = t_model.cfgLottery.consume10.count;
            t.btnTen.noticeImg.visible = false;
        }
        {
            t.resCom1.setItemId(t_c2Id);
            var t_curCount = FastAPI.getItemCount(t_c2Id);
            var t_color = Color.GREENSTR;
            if (t_curCount < t_need2) {
                t_color = Color.REDSTR;
            }
            if (FastAPI.isMoney(t_c2Id)) {
                t.resCom1.setCount(HtmlUtil.font(t_need2 + "", t_color));
            }
            else {
                t.resCom1.setCount(HtmlUtil.font(t_curCount + "/" + t_need2, t_color));
            }
        }
    };
    ChildLotteryQice.prototype.showMovie = function (pFlag) {
        var t = this;
        var t_model = GGlobal.modelQice;
        if (pFlag) {
            if (t_model.isPlayingMc)
                return;
            if (!t._mc) {
                t._mc = EffectMgr.addEff("uieff/10057", t.displayListContainer, t.width / 2 + 15, t.height / 2 - 123, 1000, 1000, false);
                t._mc.refThis = t;
                t._mc.refKey = "_mc";
            }
            Timer.instance.callLater(t.runAfterMc, 1000, t);
            t_model.isPlayingMc = true;
            t.imagePen.visible = false;
        }
        else {
            if (Timer.instance.has(t.runAfterMc, t))
                Timer.instance.remove(t.runAfterMc, t);
            if (t._mc) {
                EffectMgr.instance.removeEff(t._mc);
            }
            t_model.isPlayingMc = false;
            t.imagePen.visible = true;
        }
    };
    ChildLotteryQice.prototype.runAfterMc = function () {
        var t = this;
        t.showRewardPanel();
        t.showMovie(false);
    };
    /** 刷新宝箱列表 */
    ChildLotteryQice.prototype.refreshBoxItemList = function () {
        var t = this;
        var t_model = GGlobal.modelQice;
        t.clearAllBoxItemList();
        var t_boxVoList = t_model.getTargetVoList();
        var t_lastRight = 0;
        var t_half = t.tempItem.width / 2;
        for (var _i = 0, t_boxVoList_1 = t_boxVoList; _i < t_boxVoList_1.length; _i++) {
            var v = t_boxVoList_1[_i];
            var t_boxItem = t.getBoxItemFromPool();
            t_boxItem.setData(v);
            t.addChild(t_boxItem);
            var t_maxValue = GGlobal.modelQice.maxLotteryCount;
            t_boxItem.y = t.tempItem.y;
            t_boxItem.x = t.pb.x + (v.cfg.pt / t_maxValue) * t.pb.width;
            if (t_boxItem.x - t_half < t_lastRight) {
                t_boxItem.x = t_lastRight + t_half + 3;
            }
            t_lastRight = t_boxItem.x + t_half;
            t._boxItemList.push(t_boxItem);
        }
    };
    ChildLotteryQice.prototype.clearAllBoxItemList = function () {
        var t = this;
        for (var i = t._boxItemList.length - 1; i >= 0; i--) {
            t.recycleBoxItem(t._boxItemList[i]);
            t._boxItemList.splice(i, 1);
        }
    };
    ChildLotteryQice.prototype.getBoxItemFromPool = function () {
        var t = this;
        var t_vo = t._boxItemPool.pop();
        if (!t_vo) {
            t_vo = QiceRewardItem.createInstance();
        }
        return t_vo;
    };
    ChildLotteryQice.prototype.recycleBoxItem = function (pItem) {
        var t = this;
        if (!pItem)
            return;
        pItem.recycle();
        pItem.removeFromParent();
        t._boxItemPool.push(pItem);
    };
    ChildLotteryQice.prototype.showRewardPanel = function () {
        var t = this;
        var t_model = GGlobal.modelQice;
        var t_resultList = t_model.lotteryResultList;
        var t_type = 0;
        var t_need1 = 0;
        var t_need2 = 0;
        var t_showId = 0;
        if (t_resultList.length == 1) {
            //再来一次
            t_type = 1;
        }
        else {
            //再来10次
            t_type = 2;
        }
        if (t_model.cfgLottery.checkItemEnough(t_type)) {
            //道具足够
            if (t_type == 1) {
                t_showId = t_model.cfgLottery.consumeItem1.id;
            }
            else {
                t_showId = t_model.cfgLottery.consumeItem10.id;
            }
            t_need1 = t_model.cfgLottery.consumeItem1.count;
            t_need2 = t_model.cfgLottery.consume10.count;
        }
        else {
            //道具不够，使用元宝
            if (t_type == 1) {
                t_showId = t_model.cfgLottery.consume1.id;
            }
            else {
                t_showId = t_model.cfgLottery.consume10.id;
            }
            t_need1 = t_model.cfgLottery.consume1.count;
            t_need2 = t_model.cfgLottery.consume10.count;
        }
        View_Reward_Show2.show(0, t_resultList.length, Handler.create(t, function () {
            if (t_resultList.length > 1)
                GGlobal.modelQice.CG_QiCeDraw_draw_9753(2);
            else
                GGlobal.modelQice.CG_QiCeDraw_draw_9753(1);
        }), t_resultList, t_need1, t_need2, t_showId);
        //显示大奖
        var t_bigItemList = [];
        for (var _i = 0, t_resultList_1 = t_resultList; _i < t_resultList_1.length; _i++) {
            var v = t_resultList_1[_i];
            if (v && v.quality > 5) {
                t_bigItemList.push(v);
            }
        }
        if (t_bigItemList.length > 0) {
            ViewCommonPrompt.textItemList(t_bigItemList);
        }
        t.refreshData();
    };
    ChildLotteryQice.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_LOTTERY_UPDATE, t.onLotteryUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_LOTTERY_SUCCESS, t.onLotterySuccess, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QICE_TARGET_UPDATE, t.onTargetUpdate, t);
        EventUtil.register(pFlag, t.itemList, egret.TouchEvent.TOUCH_BEGIN, t.onScrollClickBegin, t);
        EventUtil.register(pFlag, t.itemList, egret.TouchEvent.TOUCH_END, t.onScrollClickEnd, t);
        EventUtil.register(pFlag, t.btnOne, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnTen, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnCheck, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ChildLotteryQice.prototype.onScrollClickBegin = function () {
        var t = this;
        t._clickFlag = true;
    };
    ChildLotteryQice.prototype.onScrollClickEnd = function () {
        var t = this;
        t._clickFlag = false;
    };
    ChildLotteryQice.prototype.onScroll = function () {
        var t = this;
        if (t._clickFlag)
            return;
        var t_pos = t.itemList.scrollPane.posX + 5;
        t.itemList.scrollPane.setPosX(t_pos, true);
    };
    ChildLotteryQice.prototype.onBagUpdate = function () {
        var t = this;
        t.showConsume();
    };
    ChildLotteryQice.prototype.onTargetUpdate = function () {
        var t = this;
        t.refreshData();
    };
    ChildLotteryQice.prototype.onLotterySuccess = function () {
        var t = this;
        var t_model = GGlobal.modelQice;
        if (t_model.isPlayMc) {
            //TODO 播放动画
            t.showMovie(true);
        }
        else {
            //不用播放动画
            t.showRewardPanel();
        }
    };
    ChildLotteryQice.prototype.onLotteryUpdate = function () {
        var t = this;
        t.refreshData();
    };
    ChildLotteryQice.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnOne://单抽
                GGlobal.modelQice.CG_QiCeDraw_draw_9753(1);
                break;
            case t.btnTen://抽10次
                GGlobal.modelQice.CG_QiCeDraw_draw_9753(2);
                break;
            case t.btnCheck:
                GGlobal.modelQice.isPlayMc = !t.btnCheck.selected;
                break;
        }
    };
    //>>>>end
    ChildLotteryQice.URL = "ui://cokk050neckr13";
    return ChildLotteryQice;
}(fairygui.GComponent));
__reflect(ChildLotteryQice.prototype, "ChildLotteryQice", ["IPanel"]);
