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
var ViewCrossKingPanel = (function (_super) {
    __extends(ViewCrossKingPanel, _super);
    function ViewCrossKingPanel() {
        var _this = _super.call(this) || this;
        _this._first = true;
        _this._uidList = [UIConst.CROSS_TEAM, UIConst.SJMJ1, UIConst.CROSS_MINERAL, UIConst.CROSS_SHILIAN];
        _this.setSkin("crossKing", "crossKing_atlas0", "ViewCrossKingPanel");
        return _this;
    }
    ViewCrossKingPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "ViewCrossKingPanel"));
    };
    ViewCrossKingPanel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory;
        f.setPackageItemExtension(TeamDataItem.URL, TeamDataItem);
        f.setPackageItemExtension(ChildCrossTeam.URL, ChildCrossTeam);
        f.setPackageItemExtension(TeamFuBenItem.URL, TeamFuBenItem);
        f.setPackageItemExtension(TeamRoleItem.URL, TeamRoleItem);
        f.setPackageItemExtension(CrossTeamRankInfo.URL, CrossTeamRankInfo);
        f.setPackageItemExtension(ChildSJMJ.URL, ChildSJMJ);
        f.setPackageItemExtension(ItemSJMJ.URL, ItemSJMJ);
        f.setPackageItemExtension(ChildCrossMineral.URL, ChildCrossMineral);
        f.setPackageItemExtension(MineralItem.URL, MineralItem);
        f.setPackageItemExtension(LootMineralItem.URL, LootMineralItem);
        f.setPackageItemExtension(MineralTeamItem.URL, MineralTeamItem);
        f.setPackageItemExtension(ChildCrossShiLian.URL, ChildCrossShiLian);
        f.setPackageItemExtension(ShiLianChooseItem.URL, ShiLianChooseItem);
        f.setPackageItemExtension(ShiLianBuffChooseItem.URL, ShiLianBuffChooseItem);
    };
    ViewCrossKingPanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var self = this;
        self._tabContronller = new TabController();
        self._tabContronller.initView(self, self.c1);
        self._tabContronller.setPanelClassMap([
            ChildCrossTeam,
            ChildSJMJ,
            ChildCrossMineral,
            ChildCrossShiLian,
        ]);
        self._tabContronller.tabChange = self.onTabChange;
        self._tabContronller.tabChangeCaller = self;
    };
    ViewCrossKingPanel.prototype.onTabChange = function (pTabIndex, pVo) {
        var arr = this._uidList;
        if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
            return false;
        }
        if (arr[pTabIndex] == UIConst.CROSS_SHILIAN) {
            var ms = Model_GlobalMsg.getServerTime();
            var nowDate = new Date(ms);
            var h = nowDate.getHours();
            var nowMin = nowDate.getMinutes();
            var nowSec = nowDate.getSeconds();
            if (h <= 0 && nowMin * 60 + nowSec <= 300) {
                ViewCommonWarn.text("跨服试炼重置中");
                return false;
            }
            this.tab3.checkNotice = false;
            var date = new Date(Model_GlobalMsg.getServerTime());
            var key = UIConst.CROSS_SHILIAN + "#" + date.getDay() + date.getMonth() + date.getFullYear();
            if (!LocalStorageUtil.getItem(key)) {
                GGlobal.reddot.notify(ReddotEvent.CHECK_CROSS_SJMJ);
                LocalStorageUtil.setItem(key, "1");
                GGlobal.reddot.setCondition(UIConst.CROSS_SHILIAN, 0, false);
            }
        }
        return true;
    };
    ViewCrossKingPanel.prototype.onShown = function () {
        var self = this;
        self._tabContronller.registerEvent(true);
        var t_selectIndex = 0;
        if (self._args)
            t_selectIndex = self._args;
        self._tabContronller.selectedIndex = -1;
        self._tabContronller.selectedIndex = t_selectIndex;
        self.addListen();
        self.checkSJMJ();
        self.checkMineral();
        var act = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_DOUBLE);
        var boo = (act != null);
        self.imgDoub0.visible = boo;
        self.imgDoub1.visible = boo;
    };
    ViewCrossKingPanel.prototype.onHide = function () {
        this.removeListen();
        GGlobal.layerMgr.close(UIConst.CROSS_TEAM);
    };
    ViewCrossKingPanel.prototype.addListen = function () {
        var r = GGlobal.reddot;
        r.listen(ReddotEvent.CHECK_CROSS_SJMJ, this.checkSJMJ, this);
        r.listen(UIConst.CROSS_MINERAL, this.checkMineral, this);
    };
    ViewCrossKingPanel.prototype.removeListen = function () {
        var self = this;
        var r = GGlobal.reddot;
        self._tabContronller.registerEvent(false);
        self._tabContronller.close();
        r.remove(ReddotEvent.CHECK_CROSS_SJMJ, self.checkSJMJ, self);
        r.remove(UIConst.CROSS_MINERAL, self.checkMineral, self);
        self._first = true;
    };
    ViewCrossKingPanel.prototype.checkSJMJ = function () {
        var self = this;
        self.tab1.checkNotice = GGlobal.reddot.checkCondition(UIConst.SJMJ1);
        self.tab3.checkNotice = GGlobal.reddot.checkCondition(UIConst.CROSS_SHILIAN, 0);
    };
    /** 检查矿藏按钮红点 */
    ViewCrossKingPanel.prototype.checkMineral = function () {
        var r = GGlobal.reddot;
        this.tab2.checkNotice = r.checkCondition(UIConst.CROSS_MINERAL, 0) || r.checkCondition(UIConst.CROSS_MINERAL, 1) || r.checkCondition(UIConst.CROSS_MINERAL, 2);
    };
    ViewCrossKingPanel.URL = "ui://yqpfuleft2ds0";
    return ViewCrossKingPanel;
}(UIPanelBase));
__reflect(ViewCrossKingPanel.prototype, "ViewCrossKingPanel");
