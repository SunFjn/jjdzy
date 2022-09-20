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
 * 限定武将界面
 * @author: lujiahao
 * @date: 2019-09-12 11:11:00
 */
var ChildXianding = (function (_super) {
    __extends(ChildXianding, _super);
    function ChildXianding() {
        var _this = _super.call(this) || this;
        _this._boxItemPool = [];
        _this._boxItemList = [];
        _this._showTaskList = [];
        return _this;
    }
    /** 绑定ui的方法（静态方法） */
    ChildXianding.setExtends = function () {
        //子类ui组件的绑定放在这里，此类就不用绑定了，在上层已经自动实现
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(XiandingRewardItem.URL, XiandingRewardItem);
        f(XiandingItem.URL, XiandingItem);
    };
    ChildXianding.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComXianding", "ChildXianding"));
    };
    ChildXianding.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildXianding.prototype.openPanel = function (pData) {
        this.registerEvent(true);
        this._curActVo = pData;
        GGlobal.modelActivity.CG_OPENACT(UIConst.ACTCOM_XIANDING);
        var t_seletedIndex = 0;
        this.tabCtrl.selectedIndex = -1;
        this.tabCtrl.selectedIndex = t_seletedIndex;
        IconUtil.setImg1(Enum_Path.PIC_URL + "xiandingBanner.jpg", this.imageBanner);
    };
    ChildXianding.prototype.closePanel = function (pData) {
        this.registerEvent(false);
        Timer.instance.remove(this.onDateUpdate, this);
        IconUtil.setImg1(null, this.imageBanner);
        this.list.numItems = 0;
    };
    ChildXianding.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.list.itemRenderer = t.onTaskItemRender;
        t.list.callbackThisObj = t;
        t.list.setVirtual();
    };
    //=========================================== API ==========================================
    //===================================== private method =====================================
    ChildXianding.prototype.onTaskItemRender = function (pIndex, pItem) {
        pItem.setData(this._showTaskList[pIndex]);
    };
    ChildXianding.prototype.refreshData = function (pGroupType) {
        var t_taskVoList = GGlobal.modelXianding.getTaskVoListByGroupType(pGroupType).concat();
        var t_showList = [];
        this._showTaskList.length = 0;
        for (var _i = 0, t_taskVoList_1 = t_taskVoList; _i < t_taskVoList_1.length; _i++) {
            var v = t_taskVoList_1[_i];
            if (v.isOpen) {
                t_showList.push(v);
            }
        }
        t_showList.sort(this.onSort);
        this._showTaskList = t_showList;
        this.list.numItems = t_showList.length;
        this.pb.max = GGlobal.modelXianding.maxScore;
        this.pb.value = GGlobal.modelXianding.curScore;
        this.refreshBoxItemList();
        if (!Timer.instance.has(this.onDateUpdate, this))
            Timer.instance.listen(this.onDateUpdate, this);
    };
    ChildXianding.prototype.reddotCheck = function () {
        for (var i = 0; i < this.tabCtrl.pageCount; i++) {
            var t_groupType = this.getGroupTypeByTabIndex(i);
            var t_value = GGlobal.reddot.checkCondition(UIConst.ACTCOM_XIANDING, t_groupType);
            var t_btnTab = this["tab" + i];
            if (t_btnTab) {
                t_btnTab.noticeImg.visible = t_value;
            }
        }
    };
    /** 刷新宝箱列表 */
    ChildXianding.prototype.refreshBoxItemList = function () {
        if (this._curActVo) {
            this.clearAllBoxItemList();
            var t_boxVoList = GGlobal.modelXianding.getRewardVoListByQs(this._curActVo.qs);
            var t_lastRight = 0;
            var t_half = this.rewardItemTemp.width / 2;
            for (var _i = 0, t_boxVoList_1 = t_boxVoList; _i < t_boxVoList_1.length; _i++) {
                var v = t_boxVoList_1[_i];
                var t_boxItem = this.getBoxItemFromPool();
                t_boxItem.setData(v);
                this.addChild(t_boxItem);
                var t_maxValue = GGlobal.modelXianding.maxScore;
                t_boxItem.y = this.rewardItemTemp.y;
                t_boxItem.x = this.pb.x + (v.cfg.hy / t_maxValue) * this.pb.width - t_half;
                if (t_boxItem.x - t_half < t_lastRight) {
                    t_boxItem.x = t_lastRight + t_half + 3;
                }
                t_lastRight = t_boxItem.x + t_half;
                this._boxItemList.push(t_boxItem);
            }
        }
        else {
            this.clearAllBoxItemList();
        }
    };
    ChildXianding.prototype.clearAllBoxItemList = function () {
        for (var i = this._boxItemList.length - 1; i >= 0; i--) {
            this.recycleBoxItem(this._boxItemList[i]);
            this._boxItemList.splice(i, 1);
        }
    };
    ChildXianding.prototype.onSort = function (pA, pB) {
        if (pA.sortValue > pB.sortValue)
            return -1;
        else if (pA.sortValue < pB.sortValue)
            return 1;
        else {
            return pA.id - pB.id;
        }
    };
    ChildXianding.prototype.getBoxItemFromPool = function () {
        var t_vo = this._boxItemPool.pop();
        if (!t_vo) {
            t_vo = XiandingRewardItem.createInstance();
        }
        return t_vo;
    };
    ChildXianding.prototype.recycleBoxItem = function (pItem) {
        if (!pItem)
            return;
        pItem.recycle();
        pItem.removeFromParent();
        this._boxItemPool.push(pItem);
    };
    ChildXianding.prototype.getGroupTypeByTabIndex = function (pTabIndex) {
        return pTabIndex + 1;
    };
    /** 刷新时间 */
    ChildXianding.prototype.onDateUpdate = function () {
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
    ChildXianding.prototype.registerEvent = function (pFlag) {
        GGlobal.control.register(pFlag, Enum_MsgType.XIANDING_UPDATE, this.onUpdate, this);
        GGlobal.control.register(pFlag, Enum_MsgType.XIANDING_REWARD_UPDATE, this.onRewardUpdate, this);
        EventUtil.register(pFlag, this.tabCtrl, fairygui.StateChangeEvent.CHANGED, this.onTabChange, this);
    };
    //======================================== handler =========================================
    ChildXianding.prototype.onTabChange = function (e) {
        var t_groupType = this.getGroupTypeByTabIndex(e.currentTarget.selectedIndex);
        this.refreshData(t_groupType);
        this.list.scrollToView(0); //切换标签则重新定位第一项
        this.reddotCheck();
    };
    ChildXianding.prototype.onUpdate = function () {
        var t_groupType = this.getGroupTypeByTabIndex(this.tabCtrl.selectedIndex);
        this.refreshData(t_groupType);
        this.reddotCheck();
    };
    ChildXianding.prototype.onRewardUpdate = function () {
        this.refreshBoxItemList();
        this.reddotCheck();
    };
    //>>>>end
    ChildXianding.URL = "ui://s98a5pruoz6c0";
    /** 设置包名（静态属性） */
    ChildXianding.pkg = "actComXianding";
    return ChildXianding;
}(fairygui.GComponent));
__reflect(ChildXianding.prototype, "ChildXianding", ["IPanel"]);
