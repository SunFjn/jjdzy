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
var ViewSYZLB = (function (_super) {
    __extends(ViewSYZLB, _super);
    function ViewSYZLB() {
        var _this = _super.call(this) || this;
        _this._uidList = [UIConst.ZSSF, UIConst.SYZLB, UIConst.LHFB, UIConst.DENG_FENG_SEA];
        _this.setSkin("syzlb", "syzlb_atlas0", "ViewSYZLB");
        return _this;
    }
    ViewSYZLB.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "ViewSYZLB"));
    };
    ViewSYZLB.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ItemSYZLBTeam.URL, ItemSYZLBTeam);
        f(ItemSYZLBJoin.URL, ItemSYZLBJoin);
        f(Child_SYZLB.URL, Child_SYZLB);
        f(ItemSYZLBTeamInfo.URL, ItemSYZLBTeamInfo);
        f(Child_ZSSF.URL, Child_ZSSF);
        f(ZSSFCityItem.URL, ZSSFCityItem);
        f(ZSSFGeneralGoItem.URL, ZSSFGeneralGoItem);
        f(ZSSFBattleReportItem.URL, ZSSFBattleReportItem);
        f(ZSSF_ShopItem.URL, ZSSF_ShopItem);
        f(LhfbTeamItem.URL, LhfbTeamItem);
        f(ChildLhfb.URL, ChildLhfb);
        f(LhfbCopyItem.URL, LhfbCopyItem);
        f(LhfbStarCom.URL, LhfbStarCom);
        f(ViewDengFeng.URL, ViewDengFeng);
        f(Child_DFZJ_Final.URL, Child_DFZJ_Final);
        f(Child_DFZJ_SeaSel.URL, Child_DFZJ_SeaSel);
        f(VDengFengBet.URL, VDengFengBet);
        f(VDengFengPly.URL, VDengFengPly);
        f(VDengFengPoint.URL, VDengFengPoint);
        f(VDengFengRank.URL, VDengFengRank);
    };
    ViewSYZLB.prototype.initView = function () {
        var self = this;
        _super.prototype.initView.call(this);
        self._tabContronller = new TabController();
        self._tabContronller.initView(self, self.c1);
        self._tabContronller.setPanelClassMap([
            Child_ZSSF,
            Child_SYZLB,
            ChildLhfb,
            ViewDengFeng,
        ]);
        self._tabContronller.tabChange = self.onTabChange;
        self._tabContronller.tabChangeCaller = self;
    };
    ViewSYZLB.prototype.onTabChange = function (pTabIndex, pVo) {
        var self = this;
        var arr = self._uidList;
        if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
            return false;
        }
        return true;
    };
    ViewSYZLB.prototype.updateNotice = function () {
        var self = this;
        self.tab0.checkNotice = GGlobal.reddot.checkCondition(UIConst.ZSSF, 0) || GGlobal.reddot.checkCondition(UIConst.ZSSF, 1);
        self.tab3.checkNotice = GGlobal.reddot.checkCondition(UIConst.DENG_FENG_SEA, 0) || GGlobal.reddot.checkCondition(UIConst.DENG_FENG_FINAL, 0);
    };
    ViewSYZLB.prototype.onShown = function () {
        var self = this;
        self._tabContronller.registerEvent(true);
        var t_selectIndex = 0;
        if (self._args)
            t_selectIndex = self._args;
        self._tabContronller.selectedIndex = -1;
        self._tabContronller.selectedIndex = t_selectIndex;
        self.updateNotice();
        GGlobal.reddot.listen(UIConst.ZSSF, self.updateNotice, self);
        GGlobal.reddot.listen(UIConst.DENG_FENG_SEA, self.updateNotice, self);
        GGlobal.reddot.listen(UIConst.DENG_FENG_FINAL, self.updateNotice, self);
        ReddotMgr.ins().register(UIConst.LHFB + "|" + 0, self.tab2.noticeImg);
    };
    ViewSYZLB.prototype.onHide = function () {
        var self = this;
        self._tabContronller.registerEvent(false);
        self._tabContronller.close();
        GGlobal.reddot.remove(UIConst.ZSSF, self.updateNotice, self);
        GGlobal.reddot.remove(UIConst.DENG_FENG_SEA, self.updateNotice, self);
        GGlobal.reddot.remove(UIConst.DENG_FENG_FINAL, self.updateNotice, self);
        ReddotMgr.ins().unregister(self.tab2.noticeImg);
    };
    //>>>>end
    ViewSYZLB.URL = "ui://3o8q23uuhiz70";
    return ViewSYZLB;
}(UIPanelBase));
__reflect(ViewSYZLB.prototype, "ViewSYZLB");
