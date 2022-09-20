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
var View_YiShouLu_Panel = (function (_super) {
    __extends(View_YiShouLu_Panel, _super);
    function View_YiShouLu_Panel() {
        var _this = _super.call(this) || this;
        _this._uidList = [];
        _this.setSkin("YiShouLu", "YiShouLu_atlas0", "View_YiShouLu_Panel");
        return _this;
    }
    View_YiShouLu_Panel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory;
        f.setPackageItemExtension(YiShouLuView.URL, YiShouLuView);
        f.setPackageItemExtension(YiShouLuGrid.URL, YiShouLuGrid);
        f.setPackageItemExtension(Child_XSXS.URL, Child_XSXS);
        f.setPackageItemExtension(XunShouGrid.URL, XunShouGrid);
        f.setPackageItemExtension(XSXS_JiFenGrid.URL, XSXS_JiFenGrid);
        f.setPackageItemExtension(Child_YiShou.URL, Child_YiShou);
        f.setPackageItemExtension(Child_YiShouTF.URL, Child_YiShouTF);
        f.setPackageItemExtension(Item_YiShouTF_UpLv.URL, Item_YiShouTF_UpLv);
        f.setPackageItemExtension(YiShouEquipGrid.URL, YiShouEquipGrid);
        f.setPackageItemExtension(Item_XiuLianTF.URL, Item_XiuLianTF);
    };
    View_YiShouLu_Panel.prototype.initView = function () {
        var self = this;
        self.tabArr = [self["tab0"], self["tab1"]];
        self._uidList = [UIConst.YISHOULU, UIConst.YISHOULU_TF];
        self._tabContronller = new TabController();
        self._tabContronller.initView(self, self.c1);
        self._tabContronller.setPanelClassMap([
            Child_YiShou,
            Child_YiShouTF,
        ]);
        self._tabContronller.tabChange = self.onTabChange;
        self._tabContronller.tabChangeCaller = self;
    };
    View_YiShouLu_Panel.prototype.onTabChange = function (pTabIndex, pVo) {
        var self = this;
        var arr = self._uidList;
        if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
            return false;
        }
        pVo.data = self._args;
        self._args = 0;
        return true;
    };
    View_YiShouLu_Panel.prototype.checkTabNotice = function () {
        var self = this;
        var red = GGlobal.reddot;
        self.tabArr[0].checkNotice = red.checkCondition(UIConst.YISHOULU, 0) || red.checkCondition(UIConst.XIANSHAN_XUNSHOU, 0);
        self.tabArr[1].checkNotice = red.checkCondition(UIConst.YISHOULU_TF, 0) || red.checkCondition(UIConst.YISHOULU_TF, 1) ||
            red.checkCondition(UIConst.XIULIAN_TF, 0);
    };
    View_YiShouLu_Panel.prototype.onShown = function () {
        var self = this;
        self._tabContronller.registerEvent(true);
        self.checkTabNotice();
        var t_selectIndex = 0;
        if (self._args) {
            t_selectIndex = Math.floor(self._args / 10);
        }
        self._tabContronller.selectedIndex = -1;
        self._tabContronller.selectedIndex = t_selectIndex;
        var r = GGlobal.reddot;
        r.listen(UIConst.XIANSHAN_XUNSHOU, self.checkTabNotice, self);
        r.listen(UIConst.YISHOULU, self.checkTabNotice, self);
        r.listen(UIConst.YISHOULU_TF, self.checkTabNotice, self);
        r.listen(UIConst.XIULIAN_TF, self.checkTabNotice, self);
        GGlobal.control.listen(UIConst.YISHOULU, self.checkTabNotice, self);
        if (Model_YiShouLu.dataArr.length <= 0) {
            GGlobal.modelYiShouLu.CG_OPEN_UI();
        }
    };
    View_YiShouLu_Panel.prototype.onHide = function () {
        var self = this;
        self._tabContronller.registerEvent(false);
        self._tabContronller.close();
        var r = GGlobal.reddot;
        r.remove(UIConst.XIANSHAN_XUNSHOU, self.checkTabNotice, self);
        r.remove(UIConst.YISHOULU, self.checkTabNotice, self);
        r.remove(UIConst.YISHOULU_TF, self.checkTabNotice, self);
        r.remove(UIConst.XIULIAN_TF, self.checkTabNotice, self);
        GGlobal.control.remove(UIConst.YISHOULU, self.checkTabNotice, self);
    };
    return View_YiShouLu_Panel;
}(UIPanelBase));
__reflect(View_YiShouLu_Panel.prototype, "View_YiShouLu_Panel");
