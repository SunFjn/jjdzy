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
 * 轮回系统
 */
var View_LunHui_Panel = (function (_super) {
    __extends(View_LunHui_Panel, _super);
    function View_LunHui_Panel() {
        var _this = _super.call(this) || this;
        _this._uidList = [UIConst.LUNHUI, UIConst.TIANMING, UIConst.SIXWAY];
        _this._targetId = 0;
        _this.setSkin("lunhui", "lunhui_atlas0", "View_LunHui_Panel");
        return _this;
    }
    View_LunHui_Panel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(LunHuiGrid.URL, LunHuiGrid);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_LunHui.URL, Child_LunHui);
        fairygui.UIObjectFactory.setPackageItemExtension(GridTianMing.URL, GridTianMing);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_TianMing.URL, Child_TianMing);
        fairygui.UIObjectFactory.setPackageItemExtension(Child_SixWay.URL, Child_SixWay);
        fairygui.UIObjectFactory.setPackageItemExtension(SixWayItem.URL, SixWayItem);
        fairygui.UIObjectFactory.setPackageItemExtension(SixWayYinJiItem.URL, SixWayYinJiItem);
        fairygui.UIObjectFactory.setPackageItemExtension(VSixWayGrid.URL, VSixWayGrid);
        fairygui.UIObjectFactory.setPackageItemExtension(SixWayBagItem.URL, SixWayBagItem);
        fairygui.UIObjectFactory.setPackageItemExtension(VSixWayGridFenJie.URL, VSixWayGridFenJie);
        fairygui.UIObjectFactory.setPackageItemExtension(SixWayCheckItem.URL, SixWayCheckItem);
    };
    View_LunHui_Panel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    View_LunHui_Panel.prototype.initView = function () {
        var a = this;
        _super.prototype.initView.call(this);
        // this.tabArr = [this.tab0, this.tab1];
        // this.uiArr = [UIConst.LUNHUI, UIConst.TIANMING];
        a.tabArr = [a["tab0"], a["tab1"], a["tab2"]];
        a._tabContronller = new TabController();
        a._tabContronller.initView(a, a.c1);
        a._tabContronller.setPanelClassMap([
            Child_LunHui,
            Child_TianMing,
            Child_SixWay,
        ]);
        a._tabContronller.tabChange = a.onTabChange;
        a._tabContronller.tabChangeCaller = a;
    };
    View_LunHui_Panel.prototype.onTabChange = function (pTabIndex, pVo) {
        var self = this;
        var arr = self._uidList;
        var t_id = arr[pTabIndex];
        if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
            return false;
        }
        switch (pTabIndex) {
            case 0:
                pVo.data = self._targetId;
                self._targetId = 0;
                break;
        }
        return true;
    };
    /**
     * 更新按钮红点状态
     */
    View_LunHui_Panel.prototype.checkBtnRedDot = function () {
        var s = this;
        var rdt = GGlobal.reddot;
        s.tab0.checkNotice = Model_LunHui.checkLunHuiNotice();
        s.tab1.checkNotice = rdt.checkCondition(UIConst.TIANMING, 0);
        s.tab2.checkNotice = Model_LunHui.checkSWNotice();
    };
    View_LunHui_Panel.prototype.onShown = function () {
        var s = this;
        // let index = 0;
        // if (s._args) {
        // 	index = s._args
        // }
        // s.tabArr[index].selected = true;
        // this.tabChange(index);
        // for (let i = 0; i < this.tabArr.length; i++) {
        // 	this.tabArr[i].addClickListener(this.onTab, this);
        // }
        s._tabContronller.registerEvent(true);
        var t_selectIndex = 0;
        if (s._args) {
            var t_arg = ~~s._args;
            if (t_arg < 10) {
                t_selectIndex = t_arg;
            }
            else {
                t_selectIndex = 0;
                s._targetId = t_arg;
            }
        }
        s._tabContronller.selectedIndex = -1;
        s._tabContronller.selectedIndex = t_selectIndex;
        GGlobal.reddot.listen(ReddotEvent.CHECK_LUNHUI, s.checkBtnRedDot, s);
        GGlobal.reddot.listen(UIConst.TIANMING, s.checkBtnRedDot, s);
        GGlobal.modelPlayer.listen(Model_player.MSG_HERO_LEVEL, s.checkBtnRedDot, s);
        this.checkBtnRedDot();
        GGlobal.reddot.listen(UIConst.SIXWAY, s.checkBtnRedDot, s);
    };
    View_LunHui_Panel.prototype.onHide = function () {
        var s = this;
        GGlobal.reddot.remove(ReddotEvent.CHECK_LUNHUI, s.checkBtnRedDot, s);
        GGlobal.reddot.remove(UIConst.TIANMING, s.checkBtnRedDot, s);
        GGlobal.modelPlayer.remove(Model_player.MSG_HERO_LEVEL, s.checkBtnRedDot, s);
        GGlobal.reddot.remove(UIConst.SIXWAY, s.checkBtnRedDot, s);
        // if (s._v) {
        // 	s._v.onHide()
        // }
        // if (s.c1.selectedIndex >= 0)
        // 	s.tabArr[s.c1.selectedIndex].selected = false;
        s._tabContronller.registerEvent(false);
        s._tabContronller.close();
    };
    View_LunHui_Panel.prototype.onTab = function (e) {
        var s = this;
        var tag = e.currentTarget;
        var index;
        if (tag.id == this.tab0.id) {
            index = 0;
        }
        else if (tag.id == this.tab1.id) {
            index = 1;
        }
        var pre = this.c1.selectedIndex;
        if (index == pre) {
            return;
        }
        if (!ModuleManager.isOpen(this.uiArr[index], true)) {
            tag.selected = false;
            return;
        }
        this.tabArr[pre].selected = false;
        this.tabChange(index);
    };
    View_LunHui_Panel.prototype.tabChange = function (c) {
        var s = this;
        s.c1.selectedIndex = c;
        if (s._v) {
            s._v.onHide();
        }
        if (s.c1.selectedIndex == 0) {
            s._v = s.v0;
        }
        else {
            s._v = s.v1;
        }
        s._v.onShown();
    };
    View_LunHui_Panel.prototype.dispose = function () {
        var t = this;
        if (t._tabContronller)
            t._tabContronller.destroy();
        _super.prototype.dispose.call(this);
    };
    View_LunHui_Panel.URL = "ui://ehelf5bhn5o70";
    return View_LunHui_Panel;
}(UIPanelBase));
__reflect(View_LunHui_Panel.prototype, "View_LunHui_Panel");
