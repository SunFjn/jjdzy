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
 * @date: 2019-11-14 20:59:00
 */
var ChildSGZL2 = (function (_super) {
    __extends(ChildSGZL2, _super);
    function ChildSGZL2() {
        var _this = _super.call(this) || this;
        _this._voListMap = [];
        _this._consumeIdMap = [412020, 412021];
        _this._initCmd = false;
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    ChildSGZL2.setExtends = function () {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        // f(ChildSGZL2.URL, ChildSGZL2);
        f(SGZL2Btn.URL, SGZL2Btn);
        f(SGZL2TaskItem.URL, SGZL2TaskItem);
        f(SGZL2ShopItem.URL, SGZL2ShopItem);
        f(SGZL2RewardItem.URL, SGZL2RewardItem);
    };
    ChildSGZL2.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComSgzl2", "ChildSGZL2"));
    };
    ChildSGZL2.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t._listMap = [t.list0, t.list1, t.list2];
        t.list0.itemRenderer = t.onRewardItemRender;
        t.list0.callbackThisObj = t;
        t.list0.setVirtual();
        t.list1.itemRenderer = t.onTaskItemRender;
        t.list1.callbackThisObj = t;
        t.list1.setVirtual();
        t.list2.itemRenderer = t.onShopItemRender;
        t.list2.callbackThisObj = t;
        t.list2.setVirtual();
        t.resCom0.setType(1);
        t.resCom1.setType(1);
        var t_con0 = VoItem.create(t._consumeIdMap[0]);
        var t_con1 = VoItem.create(t._consumeIdMap[1]);
        t.resCom0.setImgUrl(t_con0.icon);
        t.resCom1.setImgUrl(t_con1.icon);
    };
    ChildSGZL2.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildSGZL2.prototype.openPanel = function (pData) {
        var t = this;
        t.registerEvent(true);
        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_SGZL2);
        GGlobal.modelSGZL2.cmdSendRequestTaskList();
        GGlobal.modelSGZL2.cmdSendRequestShop();
        t.refreshDataList(0);
        t.refreshDataList(1);
        t.refreshDataList(2);
        t.refreshLevelInfo();
        t.tfDate.text = "";
        t._curActVo = pData;
        if (t._curActVo) {
            if (!Timer.instance.has(this.onDateUpdate, this))
                Timer.instance.listen(this.onDateUpdate, this);
        }
        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = 0;
        t.refreshData();
    };
    ChildSGZL2.prototype.closePanel = function (pData) {
        var t = this;
        t.registerEvent(false);
        Timer.instance.remove(t.onDateUpdate, t);
        for (var i = 0; i < t._listMap.length; i++) {
            t._listMap[i].numItems = 0;
        }
    };
    ChildSGZL2.prototype.dispose = function () {
        var t = this;
        _super.prototype.dispose.call(this);
    };
    //=========================================== API ==========================================
    ChildSGZL2.prototype.refreshData = function () {
        var t = this;
    };
    /** 刷新时间 */
    ChildSGZL2.prototype.onDateUpdate = function () {
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
    //===================================== private method =====================================
    ChildSGZL2.prototype.onRewardItemRender = function (pIndex, pItem) {
        var t_list = this._voListMap[0];
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    };
    ChildSGZL2.prototype.onTaskItemRender = function (pIndex, pItem) {
        var t_list = this._voListMap[1];
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    };
    ChildSGZL2.prototype.onShopItemRender = function (pIndex, pItem) {
        var t_list = this._voListMap[2];
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    };
    ChildSGZL2.prototype.refreshLevelInfo = function () {
        this.stateCtrl.selectedIndex = GGlobal.modelSGZL2.upgradeFlag;
        var t_levelId = GGlobal.modelSGZL2.levelId;
        var t_curExp = GGlobal.modelSGZL2.curExp;
        var t_vo = GGlobal.modelSGZL2.getRewardVoById(t_levelId);
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
        var t_upgradeFlag = GGlobal.modelSGZL2.upgradeFlag;
        this.updateFlagCtrl.selectedIndex = t_upgradeFlag;
    };
    ChildSGZL2.prototype.refreshDataList = function (pTabIndex) {
        switch (pTabIndex) {
            case 0:
                {
                    var t_sourceList = GGlobal.modelSGZL2.getRewardVoList();
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
                    var t_map = GGlobal.modelSGZL2.getTypeVoListMap();
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
                    var t_sourceList = GGlobal.modelSGZL2.getShopVoList();
                    var t_showList = t_sourceList.concat();
                    this._voListMap[pTabIndex] = t_showList;
                }
                break;
        }
        this._listMap[pTabIndex].numItems = this._voListMap[pTabIndex].length;
    };
    ChildSGZL2.prototype.refreshShopConCount = function () {
        var t_count0 = Model_Bag.getItemCount(this._consumeIdMap[0]);
        var t_count1 = Model_Bag.getItemCount(this._consumeIdMap[1]);
        this.resCom0.setCount(t_count0);
        this.resCom1.setCount(t_count1);
    };
    ChildSGZL2.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.SGZL2_REWARD_UPDATE, t.onRewardUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.SGZL2_SHOP_UPDATE, t.onShopUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.SGZL2_TASK_UPDATE, t.onTaskUpdate, t);
        GGlobal.control.register(pFlag, UIConst.ACTCOM_SGZL2, t.onReddotUp, t);
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);
        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabCtrlChangeHandler, t);
        EventUtil.register(pFlag, t.btnUpgrade, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGetAll, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ChildSGZL2.prototype.onBagUpdate = function () {
        this.refreshShopConCount();
    };
    ChildSGZL2.prototype.onReddotUp = function () {
        var t_value1 = GGlobal.reddot.checkCondition(UIConst.ACTCOM_SGZL2, 1);
        this.btnGetAll.noticeImg.visible = t_value1;
        this.tab0.noticeImg.visible = t_value1;
        var t_value2 = GGlobal.reddot.checkCondition(UIConst.ACTCOM_SGZL2, 2);
        this.tab1.noticeImg.visible = t_value2;
    };
    ChildSGZL2.prototype.onRewardUpdate = function () {
        this.refreshDataList(0);
        this.refreshLevelInfo();
        if (!this._initCmd) {
            this.onTabCtrlChangeHandler(null);
            this._initCmd = true;
        }
    };
    ChildSGZL2.prototype.onTaskUpdate = function () {
        this.refreshDataList(1);
    };
    ChildSGZL2.prototype.onShopUpdate = function () {
        this.refreshDataList(2);
    };
    ChildSGZL2.prototype.onTabCtrlChangeHandler = function (e) {
        var t_tabIndex = this.tabCtrl.selectedIndex;
        if (t_tabIndex < 0)
            return;
        var t_listCom = this._listMap[t_tabIndex];
        if (t_tabIndex == 0) {
            //奖励页的聚焦有特殊逻辑
            var t_voList = GGlobal.modelSGZL2.getRewardVoList();
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
                var t_levelIndex = GGlobal.modelSGZL2.levelId - 2;
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
    ChildSGZL2.prototype.onBtnClick = function (e) {
        switch (e.currentTarget) {
            case this.btnUpgrade:
                GGlobal.layerMgr.open(UIConst.ACTCOM_SGZL2_UPGRADE, 1000 + this._curActVo.qs);
                break;
            case this.btnGetAll:
                GGlobal.modelSGZL2.cmdSendGetReward(1);
                break;
        }
    };
    //>>>>end
    ChildSGZL2.URL = "ui://ggwi8wepqhoc0";
    /** 设置包名（静态属性） */
    ChildSGZL2.pkg = "actComSgzl2";
    return ChildSGZL2;
}(fairygui.GComponent));
__reflect(ChildSGZL2.prototype, "ChildSGZL2", ["IPanel"]);
