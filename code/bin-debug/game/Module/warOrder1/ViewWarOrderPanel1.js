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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewWarOrderPanel1 = (function (_super) {
    __extends(ViewWarOrderPanel1, _super);
    function ViewWarOrderPanel1() {
        var _this = _super.call(this) || this;
        _this._voListMap = [];
        _this._consumeIdMap = [412020, 412021];
        _this._initCmd = false;
        _this.setSkin("warOrder1", "warOrder1_atlas0", "ViewWarOrderPanel1");
        var m = GGlobal.modelWarOrder;
        m.setup();
        return _this;
    }
    ViewWarOrderPanel1.createInstance = function () {
        return (fairygui.UIPackage.createObject("warOrder1", "ViewWarOrderPanel1"));
    };
    ViewWarOrderPanel1.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(WarOrderRewItem1.URL, WarOrderRewItem1);
        f(WarOrderTaskItem1.URL, WarOrderTaskItem1);
        f(WarOrderRewItem2.URL, WarOrderRewItem2);
        f(ChildWarOrderRew.URL, ChildWarOrderRew);
    };
    ViewWarOrderPanel1.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var t = this;
        t._listMap = [t.itemRew, t.list1, t.list1];
        t.list1.itemRenderer = t.onTaskItemRender;
        t.list1.callbackThisObj = t;
        t.list1.setVirtual();
    };
    ViewWarOrderPanel1.prototype.onShown = function () {
        var t = this;
        var m = GGlobal.modelWarOrder;
        var pData = t._args;
        var cfgXT = Config.xitong_001[pData];
        var actArr;
        if (cfgXT.or == 1) {
            actArr = GGlobal.modelActivity.getGroup(pData);
        }
        else {
            actArr = ModelEightLock.getActivity(pData);
        }
        if (!actArr) {
            return;
        }
        t._curActVo = actArr[0];
        m.setActVo(t._curActVo);
        if (cfgXT.or == 1) {
            GGlobal.modelActivity.CG_OPENACT(pData);
        }
        else {
            GGlobal.modelEightLock.CG4571(pData);
        }
        t.onSendMsg();
        t.registerEvent(true);
        t.refreshDataList(0);
        t.refreshLevelInfo();
        t.tfDate.text = "";
        if (t._curActVo) {
            if (!Timer.instance.has(t.onDateUpdate, t))
                Timer.instance.listen(t.onDateUpdate, t, 1000);
        }
        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = 0;
        // let cfg: Ihuodong_009 = Config.huodong_009[t._curActVo.index];
        // let imgTil = t.frame.getChild("icon").asLoader;
        // if (cfg) {
        // 	IconUtil.setImg(imgTil, Enum_Path.ACTCOM_URL + cfg.dicon + "_title.png");
        // } else {
        // 	IconUtil.setImg(imgTil, Enum_Path.ACTCOM_URL + t._curActVo.id + "_title.png");
        // }
    };
    ViewWarOrderPanel1.prototype.onHide = function () {
        var t = this;
        t.registerEvent(false);
        Timer.instance.remove(t.onDateUpdate, t);
        for (var i = 0; i < t._listMap.length; i++) {
            t._listMap[i].numItems = 0;
        }
        t.itemRew.closePanel();
    };
    //=========================================== API ==========================================
    /** ???????????? */
    ViewWarOrderPanel1.prototype.onDateUpdate = function () {
        var t_dateStr = "";
        if (this._curActVo) {
            var t_end = this._curActVo.end; //s
            var servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0; //s
            var t_remainS = t_end - servTime;
            if (t_remainS > 0) {
                if (t_remainS < 24 * 60 * 60) {
                    //??????24??????
                    // t_dateStr = DateUtil.formatUsedTime(t_remainS, "?????????????????????hh??????uu???ss???");
                    t_dateStr = "?????????????????????" + HtmlUtil.font(DateUtil.formatUsedTime(t_remainS, "hh??????uu???ss???"), Color.GREENSTR);
                }
                else {
                    // t_dateStr = DateUtil.formatUsedTime(t_remainS, "?????????????????????dd???hh??????");
                    t_dateStr = "?????????????????????" + HtmlUtil.font(DateUtil.formatUsedTime(t_remainS, "dd???hh??????"), Color.GREENSTR);
                }
            }
            else {
                t_dateStr = HtmlUtil.font("??????????????????", Color.REDSTR);
            }
        }
        this.tfDate.text = t_dateStr;
    };
    //===================================== private method =====================================
    ViewWarOrderPanel1.prototype.onRewardItemRender = function (pIndex, pItem) {
        var t_list = this._voListMap[0];
        if (t_list) {
            pItem.setData(t_list[pIndex], this._curActVo);
        }
    };
    ViewWarOrderPanel1.prototype.onTaskItemRender = function (pIndex, pItem) {
        var t = this;
        var idx = t.tabCtrl.selectedIndex == 1 ? 1 : 2;
        var t_list = t._voListMap[idx];
        if (t_list) {
            pItem.setData(t_list[pIndex], t._curActVo, idx);
        }
    };
    ViewWarOrderPanel1.prototype.refreshLevelInfo = function () {
        var t = this;
        var m = GGlobal.modelWarOrder;
        var voWarO = m.getWarOrder(t._curActVo.id);
        var t_levelId = voWarO.levelId;
        var t_curExp = voWarO.curExp;
        var t_vo = m.getRewardVoById(t_levelId, t._curActVo);
        if (t_vo) {
            if (t_vo.cfg.exp == 0) {
                t.pb.visible = false;
                t.pb.max = t_vo.cfg.exp;
                t.pb.value = t_vo.cfg.exp;
                t.pb._titleObject.text = "?????????";
            }
            else {
                t.pb.visible = true;
                t.pb.max = t_vo.cfg.exp;
                t.pb.value = t_curExp;
            }
        }
        else {
        }
        this.tfLevel.text = t_levelId + "";
        var t_upgradeFlag = voWarO.upgradeFlag;
        this.updateFlagCtrl.selectedIndex = t_upgradeFlag;
    };
    ViewWarOrderPanel1.prototype.refreshDataList = function (pTabIndex) {
        var t = this;
        var m = GGlobal.modelWarOrder;
        switch (pTabIndex) {
            case 0:
                {
                    var t_sourceList = m.getRewardVoList(t._curActVo);
                    var t_showList = t_sourceList.concat();
                    this._voListMap[pTabIndex] = t_showList;
                }
                break;
            case 1:
                {
                    var t_map = m.getTypeDayListMap(t._curActVo);
                    var t_showList = [];
                    for (var k in t_map) {
                        var t_voList = t_map[k];
                        var t_showVo = t_voList[t_voList.length - 1];
                        for (var i = t_voList.length - 1; i >= 0; i--) {
                            var t_vo = t_voList[i];
                            if (t_vo.state == Model_WarOrderAct.SATTE_DONE)
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
                    var t_map = m.getTypeWeekListMap(t._curActVo);
                    var t_showList = [];
                    for (var k in t_map) {
                        var t_voList = t_map[k];
                        var t_showVo = t_voList[t_voList.length - 1];
                        for (var i = t_voList.length - 1; i >= 0; i--) {
                            var t_vo = t_voList[i];
                            if (t_vo.state == Model_WarOrderAct.SATTE_DONE)
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
        }
        if (pTabIndex == 0) {
            this._listMap[pTabIndex].updata(this._voListMap[pTabIndex], this._curActVo);
        }
        else {
            this._listMap[pTabIndex].numItems = this._voListMap[pTabIndex].length;
        }
        this._listMap[pTabIndex].numItems = this._voListMap[pTabIndex].length;
    };
    ViewWarOrderPanel1.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.WarOrder_REWARD_UPDATE, t.onRewardUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.WarOrder_TASK_UPDATE, t.onTaskUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.WARORDERL_OPENUI, t.refreshUI, t);
        //????????????
        // GGlobal.control.register(pFlag, Enum_MsgType.DUANZAO_DATA_UPDATE, t.onSendMsg, t);//????????????
        // GGlobal.control.register(pFlag, Enum_MsgType.YUANBAO_UPDATE, t.onSendMsg, t);//????????????
        // GGlobal.control.register(pFlag, Enum_MsgType.ARMY_INFO_UPDATE, t.onSendMsg, t);//????????????
        // GGlobal.control.register(pFlag, UIConst.PERSONAL_BOSS, t.onSendMsg, t);//??????boss
        // GGlobal.control.register(pFlag, UIConst.QM_BOSS, t.onSendMsg, t);//??????boss
        // GGlobal.control.register(pFlag, UIConst.ARENA, t.onSendMsg, t);//?????????
        // GGlobal.control.register(pFlag, UIConst.GOODS_ESCORT, t.onSendMsg, t);//????????????
        // GGlobal.control.register(pFlag, Enum_MsgType.FUBEN_CAILIAO_OPENUI, t.onSendMsg, t);//????????????
        // GGlobal.control.register(pFlag, Model_CrossSJMiJing.msg_datas_sjmj, t.onSendMsg, t);//????????????
        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabCtrlChangeHandler, t);
        EventUtil.register(pFlag, t.btnUpgrade, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGetAll, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnBuyLv, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        //????????????
        if (t._curActVo) {
            ReddotMgr.registerEvent(pFlag, t._curActVo.groupId + "_1", t.tab0.noticeImg);
            ReddotMgr.registerEvent(pFlag, t._curActVo.groupId + "_2", t.tab1.noticeImg);
            ReddotMgr.registerEvent(pFlag, t._curActVo.groupId + "_3", t.tab2.noticeImg);
            ReddotMgr.registerEvent(pFlag, t._curActVo.groupId + "_1", t.btnGetAll.noticeImg);
        }
    };
    //======================================== handler =========================================
    ViewWarOrderPanel1.prototype.onSendMsg = function () {
        var t = this;
        var m = GGlobal.modelWarOrder;
        m.CG12253(t._curActVo.groupId);
        m.CG12257(t._curActVo.groupId);
    };
    // private onReddotUp() {
    //     let t_value1 = false//GGlobal.reddot.checkCondition(UIConst.ACTCOM_SGZL, 1);
    //     this.btnGetAll.noticeImg.visible = t_value1;
    //     this.tab0.noticeImg.visible = t_value1;
    //     let t_value2 = false//GGlobal.reddot.checkCondition(UIConst.ACTCOM_SGZL, 2);
    //     this.tab1.noticeImg.visible = t_value2;
    // }
    ViewWarOrderPanel1.prototype.onRewardUpdate = function () {
        this.refreshDataList(0);
        this.refreshLevelInfo();
        if (!this._initCmd) {
            this.onTabCtrlChangeHandler(null);
            this._initCmd = true;
        }
    };
    ViewWarOrderPanel1.prototype.onTaskUpdate = function () {
        this.refreshDataList(this.tabCtrl.selectedIndex);
        this.refreshLevelInfo();
    };
    ViewWarOrderPanel1.prototype.refreshUI = function () {
        this.refreshDataList(this.tabCtrl.selectedIndex);
        this.refreshLevelInfo();
    };
    ViewWarOrderPanel1.prototype.onTabCtrlChangeHandler = function (e) {
        var t = this;
        var m = GGlobal.modelWarOrder;
        var t_tabIndex = t.tabCtrl.selectedIndex;
        if (t_tabIndex < 0)
            return;
        var t_listCom = t._listMap[t_tabIndex];
        if (t_tabIndex == 0) {
            t.refreshDataList(0);
        }
        else if (t_tabIndex == 1) {
            t.refreshDataList(1);
        }
        else if (t_tabIndex == 2) {
            t.refreshDataList(2);
        }
        ReddotMgr.ins().unregister(t.btnGetAll.noticeImg);
        ReddotMgr.ins().register(t._curActVo.groupId + "_" + (t_tabIndex + 1), t.btnGetAll.noticeImg);
    };
    ViewWarOrderPanel1.prototype.onBtnClick = function (e) {
        switch (e.currentTarget) {
            case this.btnUpgrade:
                GGlobal.layerMgr.open(UIConst.WAR_ORDER_UPGRADE1, this._curActVo);
                break;
            case this.btnGetAll:
                if (this.tabCtrl.selectedIndex == 0) {
                    GGlobal.modelWarOrder.CG12251(0, 0, 1, this._curActVo.groupId);
                }
                else if (this.tabCtrl.selectedIndex == 1) {
                    GGlobal.modelWarOrder.CG12259(0, 0, 1, this._curActVo.groupId);
                }
                else {
                    GGlobal.modelWarOrder.CG12255(0, 0, 1, this._curActVo.groupId);
                }
                break;
            case this.btnBuyLv:
                GGlobal.layerMgr.open(UIConst.WAR_ORDER_BUYCT1, this._curActVo);
                break;
        }
    };
    //>>>>end
    ViewWarOrderPanel1.URL = "ui://89er3bo3e7lc0";
    return ViewWarOrderPanel1;
}(UIPanelBase));
__reflect(ViewWarOrderPanel1.prototype, "ViewWarOrderPanel1");
