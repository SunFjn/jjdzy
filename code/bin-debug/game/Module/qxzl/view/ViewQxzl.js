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
 * 群雄逐鹿活动界面
 * @author: lujiahao
 * @date: 2019-09-25 17:44:26
 */
var ViewQxzl = (function (_super) {
    __extends(ViewQxzl, _super);
    function ViewQxzl() {
        var _this = _super.call(this) || this;
        _this._cityItemMap = {};
        _this._from = 0;
        _this.awatar = null;
        _this._lastTimerState = 0;
        _this._tempRect = new egret.Rectangle();
        _this._sourcePos = new egret.Point();
        _this._targetPos = new egret.Point();
        /** 速度 px/s */
        _this._speed = 200;
        /** 移动状态 */
        _this._isMoving = false;
        _this.loadRes("qxzl", "qxzl_atlas0");
        return _this;
    }
    ViewQxzl.createInstance = function () {
        return (fairygui.UIPackage.createObject("qxzl", "ViewQxzl"));
    };
    ViewQxzl.checkOpen = function () {
        if (GGlobal.modelQxzl.myCountry == 0) {
            ViewCommonWarn.text("请先加入国家");
            return false;
        }
        GGlobal.modelQxzl.CG_QunXiongZhuLu_enterMap_8951();
        return true;
    };
    ViewQxzl.prototype.childrenCreated = function () {
        GGlobal.createPack("qxzl");
        this.view = fairygui.UIPackage.createObject("qxzl", "ViewQxzl").asCom;
        this.contentPane = this.view;
        CommonManager.parseChildren(this.view, this);
        this.initView();
        _super.prototype.childrenCreated.call(this);
    };
    ViewQxzl.prototype.initView = function () {
        // super.initView();
        var t = this;
        t._cityItemList = [];
        for (var i = 0; i < 16; i++) {
            var t_item = t.map.getChild("item" + i);
            t._cityItemList.push(t_item);
            t_item.itniData();
            t._cityItemMap[t_item.cityId] = t_item;
        }
        ImageLoader.instance.loader("resource/image/qxzl/mapBg.jpg", t.map.loaderBg);
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + "18" + ".png", t.imageIcon);
        ImageLoader.instance.loader(Enum_Path.TITLE_URL + "chenghao_085.png", t.loaderTitle);
    };
    //=========================================== API ==========================================
    ViewQxzl.prototype.onShown = function () {
        var t = this;
        //打开界面后灭了登陆的红点
        if (GGlobal.reddot.checkCondition(UIConst.QXZL, 5))
            GGlobal.reddot.setCondition(UIConst.QXZL, 5, false);
        if (t._args && "from" in t._args) {
            t._from = t._args.from;
        }
        else {
            t._from = 0;
        }
        // if (GGlobal.layerMgr.isOpenView(UIConst.MAINTOWN)) {
        //     GGlobal.layerMgr.close2(UIConst.MAINTOWN);
        // }
        // GGlobal.layerMgr.closeAllPanel();
        if (GGlobal.layerMgr.isOpenView(UIConst.ACTIVITYHALL))
            GGlobal.layerMgr.close2(UIConst.ACTIVITYHALL);
        t.refreshData();
        t.registerEvent(true);
        GGlobal.mainUICtr.setState(MainUIController.QXZL);
        if (!Timer.instance.has(t.onRequestCountryInfo, t))
            // Timer.instance.listen(t.onRequestCountryInfo, t, 5 * 60 * 1000, 0, true);
            Timer.instance.listen(t.onRequestCountryInfo, t, 10 * 1000, 0, true);
        if (!Timer.instance.has(t.onRequestAllInfo, t))
            Timer.instance.listen(t.onRequestAllInfo, t, 10 * 1000, 0);
        t.locateMe(false);
        ReddotMgr.ins().register(UIConst.QXZL + "|" + 1, t.btnTask.noticeImg);
        ReddotMgr.ins().register(UIConst.QXZL + "|" + 2, t.btnReward.noticeImg);
        ReddotMgr.ins().register(UIConst.QXZL + "|" + 3, t.btnAdd.noticeImg);
        ReddotMgr.ins().register(UIConst.QXZL + "|" + 4, t.btnStatus.noticeImg);
        t.onUpdateBuffTime();
    };
    ViewQxzl.prototype.resetPosition = function () {
        //定位返回按钮
        var t = this;
        _super.prototype.resetPosition.call(this);
        var pChat = ViewMainUIBottomUI1.instance.chatBt.localToGlobal();
        var pClose = t.closeButton.localToGlobal();
        var dy = pChat.y + ViewMainUIBottomUI1.instance.chatBt.height + 10 - pClose.y;
        t.closeButton.y += dy;
    };
    ViewQxzl.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        Timer.instance.remove(t.onRequestCountryInfo, t);
        Timer.instance.remove(t.onRecoverTsUpdate, t);
        Timer.instance.remove(t.onRequestAllInfo, t);
        for (var _i = 0, _a = t._cityItemList; _i < _a.length; _i++) {
            var v = _a[_i];
            v.clean();
        }
        t.showModel(false);
        // GGlobal.mainUICtr.setState(MainUIController.GUANQIA);
        ReddotMgr.ins().unregister(t.btnTask.noticeImg);
        ReddotMgr.ins().unregister(t.btnReward.noticeImg);
        ReddotMgr.ins().unregister(t.btnAdd.noticeImg);
        ReddotMgr.ins().unregister(t.btnStatus.noticeImg);
        if (GGlobal.layerMgr.isOpenView(UIConst.MAINTOWN)) {
            // GGlobal.layerMgr.close2(UIConst.MAINTOWN);
            // GGlobal.layerMgr.open(UIConst.MAINTOWN);
            GGlobal.mainUICtr.setState(MainUIController.MAINTOWN);
        }
        else {
            GGlobal.layerMgr.open(UIConst.MAINTOWN);
        }
        Timer.instance.remove(t.onUpdate, t);
    };
    ViewQxzl.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ViewQxzl.prototype.refreshData = function () {
        var t_model = GGlobal.modelQxzl;
        var t = this;
        t.refreshCity();
        t.showEdgeArrow();
        t.tfCountry.text = ConfigHelp.reTxt("所属国家：{0}", FastAPI.getCountryName(t_model.myCountry));
        t.refreshMyScore();
        t.refreshCountry();
        //更新体力相关
        t.refreshStamina();
        t.refreshReddot();
    };
    ViewQxzl.prototype.refreshMyScore = function () {
        var t_model = GGlobal.modelQxzl;
        var t = this;
        t.tfScore.text = ConfigHelp.reTxt("当前积分：{0}", t_model.myScore);
    };
    ViewQxzl.prototype.refreshCity = function () {
        var t = this;
        if (t._isMoving) {
            //如果在移动状态中，则不更新城池信息
            return;
        }
        var t_model = GGlobal.modelQxzl;
        var t_showRole = !t_model.isInCity;
        t.map.role.visible = t_showRole;
        t.showModel(t_showRole);
        for (var _i = 0, _a = t._cityItemList; _i < _a.length; _i++) {
            var v = _a[_i];
            v.refreshData();
            if (t_showRole && v.curVo.isMyPosCity) {
                t.map.role.setXY(v.x + (v.width >> 1), v.y + (v.height >> 1));
            }
        }
    };
    ViewQxzl.prototype.refreshStamina = function () {
        var t = this;
        var t_model = GGlobal.modelQxzl;
        t.tfStamia.text = ConfigHelp.reTxt("{0}/{1}", t_model.curStamina, t_model.maxStamina);
        if (t_model.curStamina >= t_model.maxStamina)
            t.groupRecover.visible = false;
        else
            t.groupRecover.visible = true;
        if (!Timer.instance.has(t.onRecoverTsUpdate, t))
            Timer.instance.listen(t.onRecoverTsUpdate, t);
    };
    ViewQxzl.prototype.onRequestCountryInfo = function () {
        //定时请求刷新国家排名
        GGlobal.modelQxzl.CG_QunXiongZhuLu_openRankUI_8953();
    };
    ViewQxzl.prototype.onRequestAllInfo = function () {
        //定时请求所有信息
        GGlobal.modelQxzl.CG_QunXiongZhuLu_enterMap_8951();
    };
    ViewQxzl.prototype.onRecoverTsUpdate = function () {
        var t = this;
        var t_model = GGlobal.modelQxzl;
        var t_recoverTs = (t_model.lastRecoverTs + t_model.staminaRecoverInterval) * 1000;
        var t_nowTs = Model_GlobalMsg.getServerTime();
        var t_remainSec = (~~((t_recoverTs - t_nowTs) / 1000)) + 1;
        var t_timerState = 0;
        if (t_model.isEnd) {
            t.tfRecoverTips.text = HtmlUtil.font("本期活动已结束", Color.REDSTR);
            t.groupRecover.visible = true;
        }
        else if (t_remainSec < 0 || t_model.curStamina >= t_model.maxStamina) {
            t_timerState = 0;
            t.groupRecover.visible = false;
        }
        else {
            t.tfRecoverTips.text = DateUtil2.formatUsedTime(t_remainSec, ConfigHelp.reTxt("hh:uu:ss后恢复{0}点", t_model.recoverPoint));
            t_timerState = 1;
            t.groupRecover.visible = true;
        }
        if (t_timerState != t._lastTimerState && t_timerState == 0) {
            //倒计时结束重新请求一下时间
            t_model.CG_QunXiongZhuLu_enterMap_8951();
        }
        t._lastTimerState = t_timerState;
    };
    ViewQxzl.prototype.refreshCountry = function () {
        var t = this;
        var t_model = GGlobal.modelQxzl;
        var t_countryList = t_model.getCountryVoList();
        var t_max = 0;
        for (var i = 0; i < t_countryList.length; i++) {
            var t_vo = t_countryList[i];
            var t_countryId = i + 1;
            t["tfCountry" + t_countryId].text = FastAPI.getCountryName(t_countryId, true);
            if (t_vo.score > t_max) {
                t_max = t_vo.score;
                for (var j = 0; j < t_countryList.length; j++) {
                    t["pbScore" + (j + 1)].max = t_max;
                }
            }
            t["pbScore" + t_countryId].max = t_max;
            t["pbScore" + t_countryId].value = t_vo.score;
            t["tfOwnCount" + t_countryId].text = t_vo.count + "";
        }
        t.headItem.setData(t_model.mvpInfo);
    };
    ViewQxzl.prototype.showModel = function (pFlag) {
        var t = this;
        if (pFlag) {
            if (!t.awatar) {
                t.awatar = UIRole.create();
                // t.awatar.setScaleXY(1, 1);
            }
            t.awatar.setBody(Model_player.voMine.body);
            t.awatar.setWeapon(Model_player.voMine.weapon);
            t.awatar.setGodWeapon(Model_player.voMine.godWeapon);
            var horseId = Model_player.voMine.horseId;
            t.awatar.setHorseId(horseId);
            t.awatar.uiparent = t.map.role.displayListContainer;
            t.awatar.view.touchChildren = t.awatar.view.touchEnabled = false;
            t.awatar.setPos(0, 0);
            t.awatar.onAdd();
            t.awatar.setAction(0);
            if (horseId) {
                t.awatar.setScaleXY(0.6, 0.6);
            }
            else {
                t.awatar.setScaleXY(1, 1);
            }
            t._speed = Model_player.voMine.speed;
        }
        else {
            if (t.awatar) {
                t.awatar.onRemove();
                t.awatar = null;
            }
        }
    };
    /** 定位到自己 */
    ViewQxzl.prototype.locateMe = function (pMovie) {
        var t = this;
        var t_curCityId = GGlobal.modelQxzl.curCityId;
        var t_item = t.getCityItemByCityId(t_curCityId);
        if (t_item) {
            var t_vw = t.map.scrollPane.viewWidth;
            var t_vh = t.map.scrollPane.viewHeight;
            t._tempRect.setTo(t_item.x + t_item.width / 2 - t_vw / 2, t_item.y + t_item.height / 2 - t_vh / 2, t_vw, t_vh);
            t.map.scrollPane.scrollToView(t._tempRect, pMovie);
        }
    };
    /** 显示边缘的箭头按钮 */
    ViewQxzl.prototype.showEdgeArrow = function () {
        var t = this;
        //上下
        var t_posy = t.map.scrollPane.posY;
        var t_contenH = t.map.scrollPane.contentHeight;
        var t_viewH = t.map.scrollPane.viewHeight;
        if (t_contenH > t_viewH) {
            if (t_posy == 0)
                t.btnUp.visible = false;
            else
                t.btnUp.visible = true;
            if (t_posy + t_viewH == t_contenH)
                t.btnDown.visible = false;
            else
                t.btnDown.visible = true;
        }
        else {
            t.btnUp.visible = false;
            t.btnDown.visible = false;
        }
        //左右
        var t_posx = t.map.scrollPane.posX;
        var t_contentW = t.map.scrollPane.contentWidth;
        var t_viewW = t.map.scrollPane.viewWidth;
        if (t_contentW > t_viewW) {
            if (t_posx == 0)
                t.btnLeft.visible = false;
            else
                t.btnLeft.visible = true;
            if (t_posx + t_viewW == t_contentW)
                t.btnRight.visible = false;
            else
                t.btnRight.visible = true;
        }
        else {
            t.btnLeft.visible = false;
            t.btnRight.visible = false;
        }
    };
    ViewQxzl.prototype.getCityItemByCityId = function (pCityId) {
        return this._cityItemMap[pCityId];
    };
    ViewQxzl.prototype.refreshReddot = function () {
        // let t = this;
        // let t_reddot = GGlobal.reddot;
        // t.btnTask.noticeImg.visible = t_reddot.checkCondition(UIConst.QXZL, 1);
        // t.btnReward.noticeImg.visible = t_reddot.checkCondition(UIConst.QXZL, 2);
        // t.btnAdd.noticeImg.visible = t_reddot.checkCondition(UIConst.QXZL, 3);
        // t.btnStatus.noticeImg.visible = t_reddot.checkCondition(UIConst.QXZL, 4);
    };
    ViewQxzl.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_INFO_UPDATE, t.onInfoUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_MOVE_SUCCESS, t.onMoveSuccess, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_RANK_COUNTRY_UPDATE, t.onCountryUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_PUSH_STAMINA_UDPATE, t.onPushStamian, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_PUSH_CITY_UPDATE, t.onPushCity, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_PUSH_SCORE_UPDATE, t.onPushScore, t);
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_PUSH_ISINCITY_UPDATE, t.onPushIsInCity, t);
        GGlobal.control.register(pFlag, Enum_MsgType.ONRESIZE, t.resetPosition, t);
        GGlobal.reddot.register(pFlag, UIConst.QXZL, t.onReddotUpdate, t);
        EventUtil.register(pFlag, t.imageIcon, egret.TouchEvent.TOUCH_TAP, t.onIconClick, t);
        EventUtil.register(pFlag, t.btnAdd, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnShop, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnIntroduce, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnRank, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnReward, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnStatus, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnTask, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnRelocate, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnRelocate1, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.closeButton, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t, false, 99);
        EventUtil.register(pFlag, t.btnDqpm, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnUp, egret.TouchEvent.TOUCH_TAP, t.onArrowClick, t);
        EventUtil.register(pFlag, t.btnLeft, egret.TouchEvent.TOUCH_TAP, t.onArrowClick, t);
        EventUtil.register(pFlag, t.btnRight, egret.TouchEvent.TOUCH_TAP, t.onArrowClick, t);
        EventUtil.register(pFlag, t.btnDown, egret.TouchEvent.TOUCH_TAP, t.onArrowClick, t);
        EventUtil.register(pFlag, t.map.scrollPane, fairygui.ScrollPane.SCROLL, this.onScorllUpdateHandler, this);
        GGlobal.control.register(pFlag, Enum_MsgType.QXZL_BUFFTIME_UPDATE, t.onUpdateBuffTime, t);
    };
    //======================================== handler =========================================
    /** 红点更新处理 */
    ViewQxzl.prototype.onReddotUpdate = function () {
        var t = this;
        t.refreshReddot();
    };
    ViewQxzl.prototype.onMoveSuccess = function (pData) {
        var t = this;
        var t_targetItem = t.getCityItemByCityId(pData.target);
        if (t_targetItem) {
            for (var _i = 0, _a = t._cityItemList; _i < _a.length; _i++) {
                var v = _a[_i];
                v.hideBtnGo();
            }
            var t_targetX = t_targetItem.x + t_targetItem.width / 2;
            var t_targetY = t_targetItem.y + t_targetItem.height / 2;
            t._sourcePos.setTo(t.map.role.x, t.map.role.y);
            t._targetPos.setTo(t_targetX, t_targetY);
            var t_distance = egret.Point.distance(t._sourcePos, t._targetPos);
            var t_duration = t_distance / t._speed * 1000;
            if (t_duration > 0) {
                t._isMoving = true;
                egret.Tween.removeTweens(t.map.role);
                var tw = egret.Tween.get(t.map.role);
                if (t.awatar) {
                    t.awatar.setAction(1);
                    if (t._targetPos.x > t._sourcePos.x)
                        t.awatar.setDir(1);
                    else
                        t.awatar.setDir(-1);
                }
                tw.to({ x: t_targetX, y: t_targetY }, t_duration).call(function () {
                    t._isMoving = false;
                    t.refreshData();
                }, t);
            }
        }
    };
    ViewQxzl.prototype.onPushStamian = function () {
        this.refreshStamina();
    };
    ViewQxzl.prototype.onPushCity = function () {
        this.refreshCity();
    };
    ViewQxzl.prototype.onPushScore = function () {
        var t = this;
        t.refreshMyScore();
    };
    ViewQxzl.prototype.onPushIsInCity = function () {
        this.refreshCity();
    };
    ViewQxzl.prototype.onCountryUpdate = function () {
        this.refreshCountry();
    };
    ViewQxzl.prototype.onInfoUpdate = function () {
        this.refreshData();
    };
    /**更新单枪匹马持续分钟
     *
     */
    ViewQxzl.prototype.onUpdateBuffTime = function () {
        var t_model = GGlobal.modelQxzl;
        var t = this;
        if (t_model.isEnd) {
            t.dqpmTime.text = "活动已结束";
            return;
        }
        if (t_model.buffTime <= 0) {
            t.dqpmTime.text = "尚未使用";
        }
        else {
            Timer.instance.listen(t.onUpdate, t, 1000);
        }
    };
    ViewQxzl.prototype.onUpdate = function () {
        var t_model = GGlobal.modelQxzl;
        var t = this;
        if (t_model.buffTime > 0) {
            t_model.buffTime--;
            t.dqpmTime.text = "<font color='#15f234'>" + DateUtil.getMSBySec3(t_model.buffTime) + "后结束</font>";
        }
        else {
            t.dqpmTime.text = "尚未使用";
        }
    };
    ViewQxzl.prototype.onScorllUpdateHandler = function (e) {
        this.showEdgeArrow();
    };
    ViewQxzl.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelQxzl;
        switch (e.currentTarget) {
            case t.btnAdd:
                if (t_model.isEnd) {
                    ViewCommonWarn.text("本期活动已结束");
                    return;
                }
                var t_vipLv = Model_player.voMine.viplv + 1;
                var t_vipBuyLimit = 0;
                if (Config.VIP_710[t_vipLv]) {
                    t_vipBuyLimit = Config.VIP_710[t_vipLv].cs;
                }
                var t_maxBuyLimit = t_model.baseBuyLimit + t_vipBuyLimit;
                var t_remainBuy = t_maxBuyLimit - t_model.buyTimes;
                t_remainBuy = t_remainBuy < 0 ? 0 : t_remainBuy;
                var t_tips = ConfigHelp.reTxt("<font size='18'>今日剩余购买次数：{0}/{1}</font>", t_remainBuy, t_maxBuyLimit)
                    + "\n是否花费<font color='#ffff00'>{0}元宝</font>购买<font color='#00ff00'>{1}点体力</font>"
                    + "\n<font size='18'>提升VIP等级可增加购买次数上限</font>";
                ViewAlert.show(ConfigHelp.reTxt(t_tips, t_model.buyStaNeedConsume.count, t_model.buyStaOnceRecover), Handler.create(t, function () {
                    GGlobal.modelQxzl.CG_QunXiongZhuLu_buySta_8975();
                }));
                break;
            case t.btnShop:
                GGlobal.layerMgr.open(UIConst.QXZL_SHOP);
                break;
            case t.btnIntroduce:
                GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.QXZL);
                break;
            case t.btnRank:
                GGlobal.layerMgr.open(UIConst.QXZL_RANK);
                break;
            case t.btnReward:
                GGlobal.layerMgr.open(UIConst.QXZL_REWARD);
                break;
            case t.btnStatus:
                GGlobal.layerMgr.open(UIConst.QXZL_EVENT);
                break;
            case t.btnTask:
                GGlobal.layerMgr.open(UIConst.QXZL_TASK);
                break;
            case t.btnRelocate:
            case t.btnRelocate1:
                t.locateMe(true);
                break;
            case t.closeButton:
                // if (GGlobal.layerMgr.isOpenView(UIConst.MAINTOWN)) {
                //     GGlobal.layerMgr.close2(UIConst.MAINTOWN);
                //     GGlobal.layerMgr.open(UIConst.MAINTOWN);
                // }
                // else {
                //     GGlobal.layerMgr.open(UIConst.MAINTOWN);
                // }
                this.closeEventHandler(null);
                break;
            case t.btnDqpm:
                if (t_model.isEnd) {
                    ViewCommonWarn.text("本期活动已结束");
                    return;
                }
                if (t_model.buffTime > 0) {
                    ViewCommonWarn.text("单枪匹马已经激活");
                    return;
                }
                GGlobal.layerMgr.open(UIConst.QXZL_DQPM);
                break;
        }
    };
    ViewQxzl.prototype.onArrowClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnUp:
                t.map.scrollPane.scrollUp(10, true);
                break;
            case t.btnLeft:
                t.map.scrollPane.scrollLeft(10, true);
                break;
            case t.btnRight:
                t.map.scrollPane.scrollRight(10, true);
                break;
            case t.btnDown:
                t.map.scrollPane.scrollDown(10, true);
                break;
        }
    };
    ViewQxzl.prototype.onIconClick = function () {
        FastAPI.showItemTips(18);
    };
    //>>>>end
    ViewQxzl.URL = "ui://6d8dzzdgems46";
    return ViewQxzl;
}(UIModalPanel));
__reflect(ViewQxzl.prototype, "ViewQxzl");
