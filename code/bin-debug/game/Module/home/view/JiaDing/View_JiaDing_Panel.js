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
var View_JiaDing_Panel = (function (_super) {
    __extends(View_JiaDing_Panel, _super);
    function View_JiaDing_Panel() {
        var _this = _super.call(this) || this;
        _this.setSkin("JiaDing", "JiaDing_atlas0", "View_JiaDing_Panel");
        return _this;
    }
    View_JiaDing_Panel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(Child_JiaDing_UpJie.URL, Child_JiaDing_UpJie);
        f(Child_JiaDing_JinSheng.URL, Child_JiaDing_JinSheng);
        f(JiaDingJinShengRoleItem.URL, JiaDingJinShengRoleItem);
        f(JiaDingSkill.URL, JiaDingSkill);
    };
    View_JiaDing_Panel.prototype.initView = function () {
        var self = this;
        self._tabContronller = new TabController();
        self._tabContronller.initView(self, self.c1);
        self._tabContronller.setPanelClassMap([
            Child_JiaDing_UpJie,
            Child_JiaDing_JinSheng,
        ]);
        self._tabContronller.tabChange = self.onTabChange;
        self._tabContronller.tabChangeCaller = self;
    };
    View_JiaDing_Panel.prototype.onTabChange = function (pTabIndex, pVo) {
        return true;
    };
    View_JiaDing_Panel.prototype.onShown = function () {
        var self = this;
        self._tabContronller.registerEvent(true);
        self.registerEvent(true);
        self.setNotice();
        var t_selectIndex = 0;
        if (self._args)
            t_selectIndex = self._args;
        self._tabContronller.selectedIndex = -1;
        self._tabContronller.selectedIndex = t_selectIndex;
    };
    View_JiaDing_Panel.prototype.onHide = function () {
        var self = this;
        self.registerEvent(false);
        self._tabContronller.registerEvent(false);
        self._tabContronller.close();
    };
    View_JiaDing_Panel.prototype.registerEvent = function (pFlag) {
        var self = this;
        GGlobal.reddot.register(pFlag, UIConst.HOME_JIADING, self.setNotice, self);
    };
    View_JiaDing_Panel.prototype.setNotice = function () {
        var s = this;
        s.tab0.checkNotice = GGlobal.reddot.checkCondition(UIConst.HOME_JIADING, 1);
        s.tab1.checkNotice = GGlobal.reddot.checkCondition(UIConst.HOME_JIADING, 2);
    };
    View_JiaDing_Panel.URL = "ui://ypo8uejwctaj0";
    return View_JiaDing_Panel;
}(UIPanelBase));
__reflect(View_JiaDing_Panel.prototype, "View_JiaDing_Panel");
