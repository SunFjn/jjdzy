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
var ViewBagPanel = (function (_super) {
    __extends(ViewBagPanel, _super);
    function ViewBagPanel() {
        var _this = _super.call(this) || this;
        /** 存储标签传入的数据 */
        _this._panelDataMap = [];
        _this.setSkin("bag", "bag_atlas0", "ViewBagPanel");
        return _this;
    }
    ViewBagPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("bag", "ViewBagPanel"));
    };
    ViewBagPanel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(ViewBagOpenGrid.URL, ViewBagOpenGrid);
        fairygui.UIObjectFactory.setPackageItemExtension(ChildBagEquip.URL, ChildBagEquip);
        fairygui.UIObjectFactory.setPackageItemExtension(ChildBagItem.URL, ChildBagItem);
    };
    ViewBagPanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this._tabContronller = new TabController();
        this._tabContronller.initView(this, this.c1);
        this._tabContronller.setPanelClassMap([
            ChildBagItem,
            ChildBagEquip,
            ChildBagItem,
        ]);
        this._panelDataMap =
            [
                0,
                null,
                1,
            ];
        this._tabContronller.tabChange = this.onTabChange;
        this._tabContronller.tabChangeCaller = this;
        this.frame.getChild("icon").asLoader.url = "ui://v4sxjak5t570e";
    };
    ViewBagPanel.prototype.onTabChange = function (pTabIndex, pVo) {
        pVo.data = this._panelDataMap[pTabIndex];
        return true;
    };
    ViewBagPanel.prototype.onShown = function () {
        this.addListen();
        this.selectPage();
        this._tabContronller.selectedIndex = -1;
        this._tabContronller.selectedIndex = 0;
    };
    ViewBagPanel.prototype.onHide = function () {
        this.removeListen();
        this._tabContronller.close();
    };
    ViewBagPanel.prototype.addListen = function () {
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, this.selectPage, this);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, this.selectPage, this);
        GGlobal.control.listen(Enum_MsgType.MSG_BAG_SIZE_UPDATE, this.selectPage, this);
        this.tab3.addClickListener(this.onOpenHC, this);
        this._tabContronller.registerEvent(true);
    };
    ViewBagPanel.prototype.removeListen = function () {
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, this.selectPage, this);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, this.selectPage, this);
        GGlobal.control.remove(Enum_MsgType.MSG_BAG_SIZE_UPDATE, this.selectPage, this);
        this.tab3.removeClickListener(this.onOpenHC, this);
        GGlobal.layerMgr.close(UIConst.BAG);
        this._tabContronller.registerEvent(false);
    };
    ViewBagPanel.prototype.selectPage = function () {
        var t_curIndex = this._tabContronller.selectedIndex;
        this._tabContronller.forceUpdate(t_curIndex);
        this.tab0.checkNotice = Model_Bag.checkItemBagNotice();
        this.tab1.checkNotice = Model_Bag.checkEquipNotice();
        this.tab3.checkNotice = Model_RongLian.checkHeCheng();
    };
    ViewBagPanel.prototype.onOpenHC = function () {
        this.tab3.selected = false;
        GGlobal.layerMgr.open(UIConst.RONGLIAN_HC);
    };
    ViewBagPanel.prototype.dispose = function () {
        if (this._tabContronller)
            this._tabContronller.destroy();
        _super.prototype.dispose.call(this);
    };
    //>>>>end
    ViewBagPanel.URL = "ui://v4sxjak57jrg0";
    return ViewBagPanel;
}(UIPanelBase));
__reflect(ViewBagPanel.prototype, "ViewBagPanel");
