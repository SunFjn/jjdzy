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
 * 成就面板
 * @author: lujiahao
 * @date: 2019-11-07 17:01:14
 */
var ChildAchievement = (function (_super) {
    __extends(ChildAchievement, _super);
    function ChildAchievement() {
        var _this = _super.call(this) || this;
        _this._typeList = [];
        /** 单个icon的宽度+列距，用于计算滚动步进 */
        _this.ICON_H = 129 + 5;
        _this._showList = [];
        return _this;
    }
    ChildAchievement.createInstance = function () {
        return (fairygui.UIPackage.createObject("rebirth", "ChildAchievement"));
    };
    ChildAchievement.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.list.itemRenderer = t.onListRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
        t.tabList.itemRenderer = t.onTabRender;
        t.tabList.callbackThisObj = t;
        t.tabList.scrollPane.scrollStep = t.ICON_H;
        var t_model = GGlobal.modelAchievement;
        var t_typeList = t_model.getTaskTypeList();
        t.tabCtrl.clearPages();
        for (var i = 0; i < t_typeList.length; i++) {
            t.tabCtrl.addPage();
            t._typeList.push(t_typeList[i]);
        }
    };
    ChildAchievement.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildAchievement.prototype.openPanel = function (pData) {
        var t = this;
        var t_model = GGlobal.modelAchievement;
        t.registerEvent(true);
        t_model.CG_Achievement_openUI_10321();
        t_model.CG_Achievement_openGoalUI_10325();
        t.refreshTypeBtns();
        t.refreshLevelInfo();
        var t_selectedIndex = 0;
        t.tabCtrl.selectedIndex = -1;
        t.tabCtrl.selectedIndex = t_selectedIndex;
    };
    ChildAchievement.prototype.closePanel = function (pData) {
        var t = this;
        t.list.numItems = 0;
        t.registerEvent(false);
    };
    //===================================== private method =====================================
    ChildAchievement.prototype.onTabRender = function (pIndex, pItem) {
        var t = this;
        var t_type = t.getTypeByTabIndex(pIndex);
        pItem.setData(t_type);
    };
    ChildAchievement.prototype.onListRender = function (pIndex, pItem) {
        var t = this;
        if (t._showList) {
            pItem.setData(t._showList[pIndex]);
        }
    };
    ChildAchievement.prototype.refreshTypeBtns = function () {
        var t = this;
        t.tabList.numItems = t._typeList.length;
        t.tabList.ensureBoundsCorrect();
        t.tabList.ensureSizeCorrect();
        t.showArrowBtns();
    };
    ChildAchievement.prototype.refreshLevelInfo = function () {
        var t = this;
        var t_model = GGlobal.modelAchievement;
        t.tfLevel.text = "";
        var t_curVo = t_model.curMasterVo;
        var t_nextVo = t_model.nextMasterVo;
        var t_max = 0;
        var t_value = 0;
        var t_isMax = false;
        if (!t_curVo) {
            //未激活
            t.tfLevel.text = "成就大师0阶";
            t_max = t_nextVo.cfg.cjd;
            t_value = t_model.score;
        }
        else {
            //已激活
            t.tfLevel.text = "\u6210\u5C31\u5927\u5E08" + t_curVo.id + "\u9636";
            if (t_nextVo) {
                //未满级
                t_max = t_nextVo.cfg.cjd;
                t_value = t_model.score;
            }
            else {
                //已满级
                t_max = 1;
                t_value = 1;
                t_isMax = true;
            }
        }
        t.pb.max = t_max;
        t.pb.value = t_value;
        if (!t_isMax) {
            // if (t_value >= t_max) {
            //     t.pb._titleObject.text = "可升阶";
            // }
        }
        else {
            t.pb._titleObject.text = "已满阶";
        }
    };
    ChildAchievement.prototype.refreshDataByTabIndex = function (pTabIndex) {
        if (pTabIndex < 0)
            return;
        var t = this;
        var t_model = GGlobal.modelAchievement;
        var t_type = t.getTypeByTabIndex(pTabIndex);
        var t_chainList = t_model.getTaskChainListByType(t_type);
        t._showList.length = 0;
        for (var _i = 0, t_chainList_1 = t_chainList; _i < t_chainList_1.length; _i++) {
            var vList = t_chainList_1[_i];
            var t_showVo = vList[vList.length - 1];
            for (var _a = 0, vList_1 = vList; _a < vList_1.length; _a++) {
                var v1 = vList_1[_a];
                if (v1.state != EnumAchievement.SATTE_DONE) {
                    t_showVo = v1;
                    break;
                }
            }
            if (t_showVo.isOpened)
                t._showList.push(t_showVo);
        }
        t._showList.sort(function (pA, pB) {
            if (pA.sortValue > pB.sortValue)
                return -1;
            else if (pA.sortValue < pB.sortValue)
                return 1;
            else
                return pA.id - pB.id;
        });
        t.list.numItems = t._showList.length;
    };
    ChildAchievement.prototype.getTypeByTabIndex = function (pTabIndex) {
        return this._typeList[pTabIndex];
    };
    ChildAchievement.prototype.showArrowBtns = function () {
        var t = this;
        var t_posy = t.tabList.scrollPane.posY;
        var t_contentH = t.tabList.scrollPane.contentHeight;
        var t_viewH = t.tabList.scrollPane.viewHeight;
        if (t_contentH > t_viewH) {
            if (t_posy == 0)
                t.btnUp.visible = false;
            else
                t.btnUp.visible = true;
            if (t_posy + t_viewH == t_contentH)
                t.btnDown.visible = false;
            else
                t.btnDown.visible = true;
        }
        else {
            t.btnUp.visible = false;
            t.btnDown.visible = false;
        }
    };
    ChildAchievement.prototype.registerEvent = function (pFlag) {
        var t = this;
        GGlobal.control.register(pFlag, Enum_MsgType.ACHIEVEMENT_UPDATE, t.onUpdate, t);
        EventUtil.register(pFlag, t.tabCtrl, fairygui.StateChangeEvent.CHANGED, t.onTabCtrlChangeHandler, t);
        EventUtil.register(pFlag, t.tabList.scrollPane, fairygui.ScrollPane.SCROLL, t.onScrollUpdate, t);
        EventUtil.register(pFlag, t.tabList.scrollPane, fairygui.ScrollPane.SCROLL_END, t.onScrollUpdate, t);
        EventUtil.register(pFlag, t.btnMaster, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnReward, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGetAll, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnUp, egret.TouchEvent.TOUCH_TAP, t.onArrowClick, t);
        EventUtil.register(pFlag, t.btnDown, egret.TouchEvent.TOUCH_TAP, t.onArrowClick, t);
        if (pFlag) {
            ReddotMgr.ins().register(ReddotEnum.VALUE_ACHIEVEMENT_TASK, t.btnGetAll.noticeImg);
            ReddotMgr.ins().register(ReddotEnum.VALUE_ACHIEVEMENT_LEVEL, t.btnMaster.noticeImg);
            ReddotMgr.ins().register(ReddotEnum.VALUE_ACHIEVEMENT_REWARD, t.btnReward.noticeImg);
        }
        else {
            ReddotMgr.ins().unregister(t.btnGetAll.noticeImg);
            ReddotMgr.ins().unregister(t.btnMaster.noticeImg);
            ReddotMgr.ins().unregister(t.btnReward.noticeImg);
        }
    };
    //======================================== handler =========================================
    ChildAchievement.prototype.onUpdate = function () {
        var t = this;
        t.refreshTypeBtns();
        t.refreshLevelInfo();
        t.refreshDataByTabIndex(t.tabCtrl.selectedIndex);
    };
    ChildAchievement.prototype.onTabCtrlChangeHandler = function (e) {
        var t = this;
        if (!(e.currentTarget instanceof fairygui.Controller))
            return;
        var t_selectedIndex = e.currentTarget.selectedIndex;
        if (t_selectedIndex < 0)
            return;
        t.refreshDataByTabIndex(t_selectedIndex);
        t.list.scrollToView(0);
    };
    ChildAchievement.prototype.onScrollUpdate = function (e) {
        var t = this;
        t.showArrowBtns();
    };
    ChildAchievement.prototype.onArrowClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnUp:
                t.tabList.scrollPane.scrollUp(~~(t.tabList.width / t.ICON_H), true);
                break;
            case t.btnDown:
                t.tabList.scrollPane.scrollDown(~~(t.tabList.width / t.ICON_H), true);
                break;
        }
    };
    ChildAchievement.prototype.onBtnClick = function (e) {
        var t = this;
        switch (e.currentTarget) {
            case t.btnMaster:
                GGlobal.layerMgr.open(UIConst.ACHIEVEMENT_MASTER);
                break;
            case t.btnReward:
                GGlobal.layerMgr.open(UIConst.ACHIEVEMENT_REWARD);
                break;
            case t.btnGetAll:
                GGlobal.modelAchievement.CG_Achievement_getReward_10323(1, 0);
                break;
        }
    };
    //>>>>end
    ChildAchievement.URL = "ui://dllc71i9pke61u";
    return ChildAchievement;
}(fairygui.GComponent));
__reflect(ChildAchievement.prototype, "ChildAchievement", ["IPanel"]);
