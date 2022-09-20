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
 * 轮回副本面板
 * @author: lujiahao
 * @date: 2020-02-28 22:46:49
 */
var ChildLhfb = (function (_super) {
    __extends(ChildLhfb, _super);
    function ChildLhfb() {
        var _this = _super.call(this) || this;
        /** 当前轮回id */
        _this._curLunhuiId = 0;
        /** 单个icon的宽度+列距，用于计算滚动步进 */
        _this.ICON_W = 193 + 0;
        _this._flagDontSendCmd = false;
        return _this;
    }
    ChildLhfb.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "ChildLhfb"));
    };
    ChildLhfb.checkOpen = function () {
        var t_myLunhuiId = Model_player.voMine.reincarnationLevel;
        if (t_myLunhuiId < 1) {
            ViewCommonWarn.text("需要达到一世轮回");
            return false;
        }
        return true;
    };
    ChildLhfb.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        var t_model = GGlobal.modelLhfb;
        t_model.setup();
        t.listCopy1.itemRenderer = t.onCopyItemRender;
        t.listCopy1.callbackThisObj = t;
        t.listCopy1.setVirtual();
        t.listCopy1.scrollPane.scrollStep = t.ICON_W;
        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();
        t.listTeam.itemRenderer = t.onTeamItemRender;
        t.listTeam.callbackThisObj = t;
        t._cdc = new CDController();
        t._cdc.register(t.btnInvite, 10, "等待(ss)", false);
    };
    ChildLhfb.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildLhfb.prototype.dispose = function () {
        var t = this;
        t._cdc.destry();
        _super.prototype.dispose.call(this);
    };
    ChildLhfb.prototype.openPanel = function (pData) {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        t.registerEvent(true);
        t_model.cmdSendEnter();
        t_model.CG_RebornFB_openUi_11861();
        t.refreshData();
        t.refreshTeamData();
        var t_selectedIndex = 0;
        var t_curId = t_model.getCurLunhuiId();
        if (t_curId > 0)
            t_selectedIndex = t_curId - 1;
        if (t_model.isInTeam) {
            t._flagDontSendCmd = true;
        }
        t.copyCtrl.selectedIndex = -1;
        t.copyCtrl.selectedIndex = t_selectedIndex;
        t.listCopy1.scrollToView(t_selectedIndex);
        t.listCopy1.ensureSizeCorrect();
        t.listCopy1.ensureSizeCorrect();
        t.showLeftRightBtn();
        IconUtil.setImg(t.bgLoader, Enum_Path.BACK_URL + "lhfb_bg.jpg");
    };
    ChildLhfb.prototype.closePanel = function (pData) {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        t.registerEvent(false);
        t.listCopy1.numItems = 0;
        t.listTeam.numItems = 0;
        t._curLunhuiId = 0;
        t._curLevelVo = null;
        t.refreshSelectedCopyInfo();
        if (!t_model.isInBattle) {
            t_model.cmdSendExit();
        }
        IconUtil.setImg(t.bgLoader, null);
    };
    //=========================================== API ==========================================
    //===================================== private method =====================================
    ChildLhfb.prototype.onCopyItemRender = function (pIndex, pItem) {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        var t_list = t_model.copyVoList;
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    };
    ChildLhfb.prototype.onItemRender = function (pIndex, pItem) {
        var t = this;
        if (t._curLevelVo) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t._curLevelVo.rewardList[pIndex];
        }
    };
    ChildLhfb.prototype.onTeamItemRender = function (pIndex, pItem) {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        var t_list = t_model.teamVo.memberList;
        if (t_list) {
            pItem.setData(t_list[pIndex]);
        }
    };
    ChildLhfb.prototype.refreshData = function () {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        t.listCopy1.numItems = t_model.copyVoList.length;
        t.copyCtrl.clearPages();
        for (var _i = 0, _a = t_model.copyVoList; _i < _a.length; _i++) {
            var v = _a[_i];
            t.copyCtrl.addPage();
        }
    };
    /** 刷新显示当前选中的副本信息 */
    ChildLhfb.prototype.refreshSelectedCopyInfo = function () {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        if (t._curLunhuiId) {
            t.refreshStarReward();
            var t_copyVo = t_model.getCopyVoByLunhuiId(t._curLunhuiId);
            if (t_copyVo) {
                var t_remainChallenge = t_copyVo.remainCount;
                var t_color = Color.GREENSTR;
                if (t_remainChallenge <= 0) {
                    t_color = Color.REDSTR;
                }
                t.tfChallengeCount.text = "\u5F53\u524D\u526F\u672C\u5269\u4F59\u6311\u6218\u6B21\u6570\uFF1A" + HtmlUtil.font(t_remainChallenge + "/" + t_model.maxChallenge, t_color);
                t.refreshHelp();
            }
            t.refreshConsume();
            t.refreshCopyTitle();
        }
        else {
            t.itemList.numItems = 0;
        }
    };
    ChildLhfb.prototype.refreshHelp = function () {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        var t_remainHelp = t_model.remainHelp;
        t.resHelp.visible = false;
        var t_color = Color.GREENSTR;
        if (t_remainHelp <= 0) {
            // t.resHelp.visible = true;
            // t.resHelp.setItemId(t_model.helpConsume.id);
            // t.resHelp.setType(1);
            // let t_bagCount = FastAPI.getItemCount(t_model.helpConsume.id);
            // let t_need = t_model.helpConsume.count;
            // if (t_bagCount >= t_need) {
            // }
            // else {
            //     t_color = Color.REDSTR;
            // }
            // t.tfHelpCount.text = FastAPI.getItemName(t_model.helpConsume.id, true) + "：";
            // t.resHelp.setLb(t_bagCount, t_need);
            t_color = Color.REDSTR;
        }
        else {
        }
        t.tfHelpCount.text = "\u5269\u4F59\u534F\u52A9\u6B21\u6570\uFF1A" + HtmlUtil.font(t_remainHelp + "/" + t_model.maxHelp, t_color);
    };
    ChildLhfb.prototype.refreshConsume = function () {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        if (t._curLunhuiId) {
            var t_needId = t_model.starUpNeedItem.id;
            var t_bagCount = FastAPI.getItemCount(t_needId);
            var t_needCount = t_model.starUpNeedItem.count;
            t.resCom.setItemId(t_needId);
            var t_color = Color.GREENSTR;
            if (t_needCount > t_bagCount)
                t_color = Color.REDSTR;
            t.resCom.setCount(HtmlUtil.font(t_needCount + "", t_color));
        }
    };
    ChildLhfb.prototype.refreshTeamData = function () {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        var t_voList = t_model.teamVo.memberList;
        t.listTeam.numItems = t_voList.length;
        if (t_model.isInTeam) {
            if (t_model.areYouLeader) {
                t.teamCtrl.selectedIndex = 1;
            }
            else {
                t.teamCtrl.selectedIndex = 2;
            }
        }
        else {
            t.teamCtrl.selectedIndex = 0;
        }
        t.refreshCopyTitle();
        t.refreshStarReward();
    };
    ChildLhfb.prototype.refreshCopyTitle = function () {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        var t_lunhuiId = t._curLunhuiId;
        if (t_model.isInTeam) {
            t_lunhuiId = t_model.teamVo.lunhuiId;
        }
        var t_copy = t_model.getCopyVoByLunhuiId(t_lunhuiId);
        if (t_copy)
            t.titleCopy.title = t_copy.name;
        else
            t.titleCopy.title = "队伍信息";
    };
    /** 刷新副本奖励 */
    ChildLhfb.prototype.refreshStarReward = function () {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        var t_copyVo = t_model.getCopyVoByLunhuiId(t._curLunhuiId);
        if (t_copyVo) {
            var t_star = 1;
            if (t_model.isInTeam) {
                t_star = t_model.teamVo.star;
            }
            else {
                t_star = t_copyVo.star;
            }
            t.starCom.ctrl.selectedIndex = t_star;
            var t_color = Color.getColorStr(t_star);
            t.starCom.tfStar.text = HtmlUtil.font(ConfigHelp.NumberToChinese(t_star) + "\u661F\u5956\u52B1", t_color);
            var t_levelVo = t_model.getLevelVoByLunhuiIdAndStar(t_copyVo.lunhuiId, t_star);
            if (t_levelVo) {
                t._curLevelVo = t_levelVo;
                t.itemList.numItems = t_levelVo.rewardList.length;
            }
        }
    };
    ChildLhfb.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.LHFB_UPDATE, t.onUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.LHFB_TEAM_DATA_UPDATE, t.onTeamDataUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.LHFB_CUR_ID_CHANGE, t.onCurIdChange, t);
        GGlobal.control.register(pFlag, Enum_MsgType.MSG_BAG_ITME_UPDATE, t.onBagUpdate, t);
        GGlobal.control.register(pFlag, Enum_MsgType.LHFB_TEAM_ID_CHANGE, t.onTeamIdChange, t);
        EventUtil.register(pFlag, t.copyCtrl, fairygui.StateChangeEvent.CHANGED, t.onCopyCtrlChange, t);
        EventUtil.register(pFlag, t.btnLeft, egret.TouchEvent.TOUCH_TAP, t.onArrowClick, t);
        EventUtil.register(pFlag, t.btnRight, egret.TouchEvent.TOUCH_TAP, t.onArrowClick, t);
        EventUtil.register(pFlag, t.listCopy1.scrollPane, fairygui.ScrollPane.SCROLL, t.onScrollUpdate, t);
        EventUtil.register(pFlag, t.listCopy1.scrollPane, fairygui.ScrollPane.SCROLL_END, t.onScrollUpdate, t);
        EventUtil.register(pFlag, t.btnRefresh, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnInvite, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnCreate, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnExit, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnStart, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnChat, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    };
    //======================================== handler =========================================
    ChildLhfb.prototype.onBagUpdate = function () {
        var t = this;
        t.refreshConsume();
        t.refreshStarReward();
        // t.refreshHelp();
    };
    ChildLhfb.prototype.onTeamIdChange = function () {
        var t = this;
        t._cdc.stopCD(false);
    };
    ChildLhfb.prototype.onUpdate = function () {
        var t = this;
        t.refreshSelectedCopyInfo();
        t.listCopy1.refreshVirtualList();
    };
    ChildLhfb.prototype.onTeamDataUpdate = function () {
        var t = this;
        t.refreshTeamData();
    };
    ChildLhfb.prototype.onCurIdChange = function (pData) {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        var t_curId = t_model.getCurLunhuiId();
        if (t_curId <= 0)
            return;
        var t_selectedIndex = t_curId - 1;
        if (t_selectedIndex != t.copyCtrl.selectedIndex)
            t._flagDontSendCmd = true;
        t.copyCtrl.selectedIndex = t_selectedIndex;
        if (pData.isScroll) {
            t.listCopy1.scrollToView(t_selectedIndex);
            t.listCopy1.ensureSizeCorrect();
            t.listCopy1.ensureSizeCorrect();
            t.showLeftRightBtn();
        }
    };
    ChildLhfb.prototype.onCopyCtrlChange = function (e) {
        var t = this;
        var t_selectedIndex = t.copyCtrl.selectedIndex;
        if (t_selectedIndex < 0)
            return;
        var t_model = GGlobal.modelLhfb;
        var t_oldIndex = t._curLunhuiId - 1;
        t_oldIndex = t_oldIndex < 0 ? 0 : t_oldIndex;
        var t_list = t_model.copyVoList;
        if (t_list) {
            var t_copyVo = t_list[t_selectedIndex];
            if (t_copyVo.canEnter(true)) {
                var t_targetId = t_list[t_selectedIndex].lunhuiId;
                t._curLunhuiId = t_targetId;
                t.refreshSelectedCopyInfo();
                if (t._flagDontSendCmd) {
                }
                else {
                    if (t_model.isInTeam) {
                        t_model.cmdSendExitTeam(false);
                        t_model.CG_RebornFB_createTeam_11863(t_targetId);
                    }
                    else {
                        t_model.CG_RebornFB_createTeam_11863(t_targetId);
                    }
                }
            }
            else {
                egret.callLater(function () {
                    t.copyCtrl.setSelectedIndex(t_oldIndex);
                }, t);
            }
        }
        t._flagDontSendCmd = false;
    };
    ChildLhfb.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelLhfb;
        switch (e.currentTarget) {
            case t.btnRefresh:
                t_model.CG_RebornFB_refreshStar_11877();
                break;
            case t.btnInvite:
                t._cdc.startCD(10);
                t_model.CG_RebornFB_invitation_11869();
                break;
            case t.btnCreate:
                t_model.CG_RebornFB_createTeam_11863(t._curLunhuiId);
                break;
            case t.btnExit:
                t_model.cmdSendExitTeam(false);
                break;
            case t.btnStart:
                t_model.CG_RebornFB_battle_11881();
                break;
            case t.btnChat:
                if (Model_GlobalMsg.kaifuDay > 7)
                    GGlobal.layerMgr.open(UIConst.CHAT);
                else
                    GGlobal.layerMgr.open(UIConst.CHAT, 1);
                break;
        }
    };
    ChildLhfb.prototype.onArrowClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnLeft:
                t.listCopy1.scrollPane.scrollLeft(~~(t.listCopy1.width / t.ICON_W), true);
                break;
            case t.btnRight:
                t.listCopy1.scrollPane.scrollRight(~~(t.listCopy1.width / t.ICON_W), true);
                break;
        }
    };
    ChildLhfb.prototype.onScrollUpdate = function (e) {
        var t = this;
        t.showLeftRightBtn();
    };
    /** 箭头按需显示 */
    ChildLhfb.prototype.showLeftRightBtn = function () {
        var t = this;
        var t_posx = t.listCopy1.scrollPane.posX;
        var t_contentW = t.listCopy1.scrollPane.contentWidth;
        var t_viewW = t.listCopy1.scrollPane.viewWidth;
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
    //>>>>end
    ChildLhfb.URL = "ui://3o8q23uuymt71n";
    return ChildLhfb;
}(fairygui.GComponent));
__reflect(ChildLhfb.prototype, "ChildLhfb", ["IPanel"]);
