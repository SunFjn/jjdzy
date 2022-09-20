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
 * 三国战令界面
 * @author: lujiahao
 * @date: 2019-09-20 14:41:47
 */
var ChildSGZL = (function (_super) {
    __extends(ChildSGZL, _super);
    function ChildSGZL() {
        var _this = _super.call(this) || this;
        _this._voListMap = [];
        _this._actId = 0;
        _this._consumeIdMap = [412020, 412021];
        _this._initCmd = false;
        return _this;
    }
    ChildSGZL.createInstance = function () {
        return (fairygui.UIPackage.createObject("actHolyBeast", "ChildSGZL"));
    };
    Object.defineProperty(ChildSGZL, "instance", {
        get: function () {
            if (ChildSGZL._instance == null) {
                ChildSGZL._instance = ChildSGZL.createInstance();
            }
            return ChildSGZL._instance;
        },
        enumerable: true,
        configurable: true
    });
    ChildSGZL.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this._listMap = [this.list0, this.list1, this.list2];
        this.list0.itemRenderer = this.onRewardItemRender;
        this.list0.callbackThisObj = this;
        this.list0.setVirtual();
        this.list1.itemRenderer = this.onTaskItemRender;
        this.list1.callbackThisObj = this;
        this.list1.setVirtual();
        this.list2.itemRenderer = this.onShopItemRender;
        this.list2.callbackThisObj = this;
        this.list2.setVirtual();
        this.resCom0.setType(1);
        this.resCom1.setType(1);
        var t_con0 = VoItem.create(this._consumeIdMap[0]);
        var t_con1 = VoItem.create(this._consumeIdMap[1]);
        this.resCom0.setImgUrl(t_con0.icon);
        this.resCom1.setImgUrl(t_con1.icon);
    };
    //=========================================== API ==========================================
    ChildSGZL.prototype.show = function (pParent, pId) {
        var t = this;
        pParent.addChild(t);
        t.registerEvent(true);
        t._actId = pId;
        GGlobal.modelEightLock.CG4571(pId);
        GGlobal.modelSGZL.cmdSendRequestTaskList();
        GGlobal.modelSGZL.cmdSendRequestShop();
        t.refreshDataList(0);
        t.refreshDataList(1);
        t.refreshDataList(2);
        t.refreshLevelInfo();
        t._curActVo = ModelEightLock.getActVo(pId);
        if (t._curActVo) {
            if (!Timer.instance.has(this.onDateUpdate, this))
                Timer.instance.listen(this.onDateUpdate, this);
        }
        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = 0;
    };
    ChildSGZL.prototype.disposePanel = function () {
        Timer.instance.remove(this.onDateUpdate, this);
        this.registerEvent(false);
        this.removeFromParent();
        for (var i = 0; i < this._listMap.length; i++) {
            this._listMap[i].numItems = 0;
        }
    };
    ChildSGZL.prototype.dispose = function () {
        ChildSGZL._instance = null;
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    ChildSGZL.prototype.onRewardItemRender = function (pIndex, pItem) {
        var t_list = this._voListMap[0];
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    };
    ChildSGZL.prototype.onTaskItemRender = function (pIndex, pItem) {
        var t_list = this._voListMap[1];
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    };
    ChildSGZL.prototype.onShopItemRender = function (pIndex, pItem) {
        var t_list = this._voListMap[2];
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    };
    ChildSGZL.prototype.refreshLevelInfo = function () {
        this.stateCtrl.selectedIndex = GGlobal.modelSGZL.upgradeFlag;
        var t_levelId = GGlobal.modelSGZL.levelId;
        var t_curExp = GGlobal.modelSGZL.curExp;
        var t_vo = GGlobal.modelSGZL.getRewardVoById(t_levelId);
        if (t_vo) {
            if (t_vo.cfg.shengji == 0) {
                this.pb.visible = false;
                this.tfMax.visible = true;
            }
            else {
                this.pb.visible = true;
                this.tfMax.visible = false;
                this.pb.max = t_vo.cfg.shengji;
                this.pb.value = t_curExp;
            }
        }
        else {
        }
        this.tfLevel.text = t_levelId + "";
        var t_upgradeFlag = GGlobal.modelSGZL.upgradeFlag;
        this.updateFlagCtrl.selectedIndex = t_upgradeFlag;
    };
    ChildSGZL.prototype.refreshDataList = function (pTabIndex) {
        switch (pTabIndex) {
            case 0:
                {
                    var t_sourceList = GGlobal.modelSGZL.getRewardVoList();
                    var t_showList = t_sourceList.concat();
                    // t_showList.sort((pA, pB) => {
                    //     if (pA.sortValue > pB.sortValue)
                    //         return -1;
                    //     else if (pA.sortValue < pB.sortValue)
                    //         return 1;
                    //     else
                    //         return pA.id - pB.id;
                    // });
                    this._voListMap[pTabIndex] = t_showList;
                }
                break;
            case 1:
                {
                    var t_map = GGlobal.modelSGZL.getTypeVoListMap();
                    var t_showList = [];
                    for (var k in t_map) {
                        var t_voList = t_map[k];
                        var t_showVo = t_voList[t_voList.length - 1];
                        for (var i = t_voList.length - 1; i >= 0; i--) {
                            var t_vo = t_voList[i];
                            if (t_vo.state == Enum_SGZL.SATTE_DONE)
                                continue;
                            t_showVo = t_vo;
                        }
                        t_showList.push(t_showVo);
                    }
                    t_showList.sort(function (pA, pB) {
                        if (pA.sortValue > pB.sortValue)
                            return -1;
                        else if (pA.sortValue < pB.sortValue)
                            return 1;
                        else
                            return pA.taskId - pB.taskId;
                    });
                    this._voListMap[pTabIndex] = t_showList;
                }
                break;
            case 2:
                {
                    var t_sourceList = GGlobal.modelSGZL.getShopVoList();
                    var t_showList = t_sourceList.concat();
                    this._voListMap[pTabIndex] = t_showList;
                }
                break;
        }
        this._listMap[pTabIndex].numItems = this._voListMap[pTabIndex].length;
    };
    ChildSGZL.prototype.refreshShopConCount = function () {
        var t_count0 = Model_Bag.getItemCount(this._consumeIdMap[0]);
        var t_count1 = Model_Bag.getItemCount(this._consumeIdMap[1]);
        this.resCom0.setCount(t_count0);
        this.resCom1.setCount(t_count1);
    };
    /** 刷新时间 */
    ChildSGZL.prototype.onDateUpdate = function () {
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
    ChildSGZL.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.SGZL_REWARD_UPDATE, t.onRewardUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.SGZL_SHOP_UPDATE, t.onShopUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.SGZL_TASK_UPDATE, t.onTaskUpdate, t);
        GGlobal.control.register(pFlag, UIConst.ACTHB_SGZL, this.onReddotUp, this);
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, this.onBagUpdate, this);
        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabCtrlChangeHandler, t);
        EventUtil.register(pFlag, t.btnUpgrade, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGetAll, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ChildSGZL.prototype.onBagUpdate = function () {
        this.refreshShopConCount();
    };
    ChildSGZL.prototype.onReddotUp = function () {
        var t_value1 = GGlobal.reddot.checkCondition(UIConst.ACTHB_SGZL, 1);
        this.btnGetAll.noticeImg.visible = t_value1;
        this.tab0.noticeImg.visible = t_value1;
        var t_value2 = GGlobal.reddot.checkCondition(UIConst.ACTHB_SGZL, 2);
        this.tab1.noticeImg.visible = t_value2;
    };
    ChildSGZL.prototype.onRewardUpdate = function () {
        this.refreshDataList(0);
        this.refreshLevelInfo();
        if (!this._initCmd) {
            this.onTabCtrlChangeHandler(null);
            this._initCmd = true;
        }
    };
    ChildSGZL.prototype.onTaskUpdate = function () {
        this.refreshDataList(1);
    };
    ChildSGZL.prototype.onShopUpdate = function () {
        this.refreshDataList(2);
    };
    ChildSGZL.prototype.onTabCtrlChangeHandler = function (e) {
        var t_tabIndex = this.tabCtrl.selectedIndex;
        if (t_tabIndex < 0)
            return;
        var t_listCom = this._listMap[t_tabIndex];
        if (t_tabIndex == 0) {
            //奖励页的聚焦有特殊逻辑
            var t_voList = GGlobal.modelSGZL.getRewardVoList();
            var t_targetIndex = 0;
            var t_hasCanGet = false;
            for (var i = 0; i < t_voList.length; i++) {
                var t_vo = t_voList[i];
                if (t_vo.state0 == Enum_SGZL.STATE_CAN_GET || t_vo.state1 == Enum_SGZL.STATE_CAN_GET) {
                    t_targetIndex = i;
                    t_hasCanGet = true;
                    break;
                }
            }
            if (t_hasCanGet) {
                t_listCom.scrollToView(t_targetIndex);
            }
            else {
                var t_levelIndex = GGlobal.modelSGZL.levelId - 2;
                t_levelIndex = t_levelIndex < 0 ? 0 : t_levelIndex;
                t_listCom.scrollToView(t_levelIndex);
            }
        }
        else {
            t_listCom.scrollToView(0);
        }
        switch (t_tabIndex) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                this.refreshShopConCount();
                break;
        }
    };
    ChildSGZL.prototype.onBtnClick = function (e) {
        switch (e.currentTarget) {
            case this.btnUpgrade:
                GGlobal.layerMgr.open(UIConst.ACTHB_SGZL_UPGRADE);
                break;
            case this.btnGetAll:
                GGlobal.modelSGZL.cmdSendGetReward(1);
                break;
        }
    };
    //>>>>end
    ChildSGZL.URL = "ui://d5y9ngt6jt4v1j";
    return ChildSGZL;
}(fairygui.GComponent));
__reflect(ChildSGZL.prototype, "ChildSGZL", ["IActHolyBeast"]);
