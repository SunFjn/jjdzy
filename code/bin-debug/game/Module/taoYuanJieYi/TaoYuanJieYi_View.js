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
 * 桃园结义主界面
 */
var TaoYuanJieYi_View = (function (_super) {
    __extends(TaoYuanJieYi_View, _super);
    function TaoYuanJieYi_View() {
        var _this = _super.call(this) || this;
        _this._uidList = [UIConst.TAOYUANJIEYI, UIConst.TYJY_YMRW, UIConst.TYJY_YMFB];
        _this._targetId = 0;
        _this.setSkin("taoYuanJieYi", "taoYuanJieYi_atlas0", "TaoYuanJieYi_View");
        return _this;
    }
    TaoYuanJieYi_View.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory;
        f.setPackageItemExtension(TYJY_JoinItem.URL, TYJY_JoinItem);
        f.setPackageItemExtension(TYJY_ApplyItem.URL, TYJY_ApplyItem);
        f.setPackageItemExtension(TYJY_NoJoinItem.URL, TYJY_NoJoinItem);
        f.setPackageItemExtension(TYJY_ChangeItem.URL, TYJY_ChangeItem);
        f.setPackageItemExtension(TYJY_BossItem.URL, TYJY_BossItem);
        f.setPackageItemExtension(TYJY_TaskItem.URL, TYJY_TaskItem);
        f.setPackageItemExtension(TYJY_TaskItem1.URL, TYJY_TaskItem1);
        f.setPackageItemExtension(TYJY_TaskItem2.URL, TYJY_TaskItem2);
        f.setPackageItemExtension(Child_TYJY.URL, Child_TYJY);
        f.setPackageItemExtension(Child_TYTask.URL, Child_TYTask);
        f.setPackageItemExtension(Child_TYBoss.URL, Child_TYBoss);
        f.setPackageItemExtension(TaoYuanBossInfo.URL, TaoYuanBossInfo);
    };
    TaoYuanJieYi_View.prototype.initView = function () {
        var self = this;
        self.tabArr = [self["tab0"], self["tab1"], self["tab2"]];
        self._tabContronller = new TabController();
        self._tabContronller.initView(self, self.c1);
        self._tabContronller.setPanelClassMap([
            Child_TYJY,
            Child_TYTask,
            Child_TYBoss,
        ]);
        self._tabContronller.tabChange = self.onTabChange;
        self._tabContronller.tabChangeCaller = self;
    };
    TaoYuanJieYi_View.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    TaoYuanJieYi_View.prototype.onTabChange = function (pTabIndex, pVo) {
        var self = this;
        var arr = this._uidList;
        var t_id = arr[pTabIndex];
        if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
            return false;
        }
        if (Model_player.voMine.tyjyId <= 0 && (pTabIndex == 1 || pTabIndex == 2)) {
            ViewCommonWarn.text("你还没有加入义盟");
            return;
        }
        switch (pTabIndex) {
            case 0:
                pVo.data = self._targetId;
                self._targetId = 0;
                break;
        }
        return true;
    };
    TaoYuanJieYi_View.prototype.onShown = function () {
        var self = this;
        self._tabContronller.registerEvent(true);
        var t_selectIndex = 0;
        if (self._args) {
            var t_arg = ~~self._args;
            if (t_arg < 10) {
                t_selectIndex = t_arg;
            }
            else {
                t_selectIndex = 0;
                self._targetId = t_arg;
            }
        }
        self._tabContronller.selectedIndex = -1;
        self._tabContronller.selectedIndex = t_selectIndex;
        var r = GGlobal.reddot;
        r.listen(UIConst.TAOYUANJIEYI, self.checkTabNotice, self);
        r.listen(UIConst.TYJY_YMRW, self.checkTabNotice, self);
        r.listen(UIConst.TYJY_YMFB, self.checkTabNotice, self);
        self.checkTabNotice();
    };
    TaoYuanJieYi_View.prototype.onHide = function () {
        var self = this;
        self._tabContronller.registerEvent(false);
        self._tabContronller.close();
        var r = GGlobal.reddot;
        r.remove(UIConst.TAOYUANJIEYI, self.checkTabNotice, self);
        r.remove(UIConst.TYJY_YMRW, self.checkTabNotice, self);
        r.remove(UIConst.TYJY_YMFB, self.checkTabNotice, self);
    };
    TaoYuanJieYi_View.prototype.dispose = function () {
        var t = this;
        if (t._tabContronller)
            t._tabContronller.destroy();
        _super.prototype.dispose.call(this);
    };
    TaoYuanJieYi_View.prototype.checkTabNotice = function () {
        var self = this;
        var red = GGlobal.reddot;
        self.tabArr[0].checkNotice = red.checkCondition(UIConst.TAOYUANJIEYI, 0);
        self.tabArr[1].checkNotice = red.checkCondition(UIConst.TYJY_YMRW, 0);
        self.tabArr[2].checkNotice = red.checkCondition(UIConst.TYJY_YMFB, 0);
    };
    return TaoYuanJieYi_View;
}(UIPanelBase));
__reflect(TaoYuanJieYi_View.prototype, "TaoYuanJieYi_View");
