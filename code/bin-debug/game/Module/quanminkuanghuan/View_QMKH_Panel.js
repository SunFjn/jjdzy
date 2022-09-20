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
var View_QMKH_Panel = (function (_super) {
    __extends(View_QMKH_Panel, _super);
    function View_QMKH_Panel() {
        var _this = _super.call(this) || this;
        _this.iconArr = [];
        _this.setSkin("QMKH", "QMKH_atlas0", "View_QMKH_Panel");
        return _this;
    }
    View_QMKH_Panel.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(Child_QMKH.URL, Child_QMKH);
        fairygui.UIObjectFactory.setPackageItemExtension(QMKHItem.URL, QMKHItem);
    };
    View_QMKH_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var a = this;
        a.tabList.callbackThisObj = a;
        a.tabList.itemRenderer = a.renderHandle;
        a.tabList.addEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
    };
    View_QMKH_Panel.prototype.renderHandle = function (index, tab) {
        var a = this;
        tab.data = a.iconArr[index].id;
        tab.setActivityIcon(a.iconArr[index].id);
        tab.checkNotice = GGlobal.reddot.checkCondition(parseInt(a.iconArr[index].id));
        if (!a.curTab && index == 0) {
            tab.selected = true;
            a.curTab = tab;
        }
        var red = GGlobal.reddot;
    };
    View_QMKH_Panel.prototype.listHandle = function (evt) {
        var a = this;
        var tab = evt.itemObject;
        if (this.curTab && tab.data == this.curTab.data)
            return;
        tab.selected = true;
        a.curTab = tab;
        a.changePageHD();
    };
    View_QMKH_Panel.prototype.changePageHD = function () {
        var s = this;
        if (s._curView) {
            s._curView.close();
            s.removeChild(s._curView);
        }
        var idx = s.curTab.data;
        switch (idx) {
            case UIConst.QUANMIN_KUANGHUAN_BOSS:
                if (GGlobal.modelqmkh.bossArr.length <= 0) {
                    GGlobal.modelqmkh.getBossArr();
                }
                s._curView = Child_QMKH.createInstance();
                break;
            case UIConst.QUANMIN_KUANGHUAN_XIAOXIONG:
                if (GGlobal.modelqmkh.xiaoxiongArr.length <= 0) {
                    GGlobal.modelqmkh.getXiaoXiongArr();
                }
                s._curView = Child_QMKH.createInstance();
                break;
            case UIConst.QUANMIN_KUANGHUAN_LVBU:
                if (GGlobal.modelqmkh.lvbuArr.length <= 0) {
                    GGlobal.modelqmkh.getlvbuArr();
                }
                s._curView = Child_QMKH.createInstance();
                break;
            case UIConst.QUANMIN_KUANGHUAN_FUHUI:
                if (GGlobal.modelqmkh.fuhuiArr.length <= 0) {
                    GGlobal.modelqmkh.getfuhuiArr();
                }
                s._curView = Child_QMKH.createInstance();
                break;
        }
        s._curView.panelId = idx;
        s._curView.x = 0;
        s._curView.y = 276;
        s.addChild(s._curView);
        s._curView.open();
    };
    View_QMKH_Panel.prototype.listen = function () {
        var s = this;
        s.tabList.addEventListener(fairygui.ItemEvent.CLICK, s.listHandle, s);
        s.changePageHD();
    };
    View_QMKH_Panel.prototype.remove = function () {
        var s = this;
        if (s._curView) {
            s._curView.close();
            s.removeChild(s._curView);
            s._curView = null;
        }
        if (s.curTab)
            s.curTab.selected = false;
        s.curTab = null;
        s.tabList.removeEventListener(fairygui.ItemEvent.CLICK, s.listHandle, s);
    };
    View_QMKH_Panel.prototype.createTabs = function () {
        // this.iconArr = Model_Activity.activityObj[UIConst.QUANMIN_KUANGHUAN];
        this.iconArr = GGlobal.modelActivity.getGroup(UIConst.QUANMIN_KUANGHUAN);
        if (!this.iconArr)
            return;
        this.tabList.numItems = this.iconArr.length;
    };
    View_QMKH_Panel.prototype.onShown = function () {
        var self = this;
        self.createTabs();
        self.listen();
        GGlobal.reddot.listen(UIConst.QUANMIN_KUANGHUAN, self.createTabs, self);
        GGlobal.control.listen(Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.createTabs, self);
        GGlobal.control.listen(Enum_MsgType.KAIFUDAY_UPDATE, self.createTabs, self);
        GGlobal.control.listen(Enum_MsgType.MSG_GQ_UPDATE, self.createTabs, self);
    };
    View_QMKH_Panel.prototype.onHide = function () {
        var self = this;
        self.remove();
        GGlobal.layerMgr.close(UIConst.QUANMIN_KUANGHUAN);
        GGlobal.reddot.remove(UIConst.QUANMIN_KUANGHUAN, self.createTabs, self);
        GGlobal.control.remove(Enum_MsgType.ACTIVITY_ACTOPENSTATE, self.createTabs, self);
        GGlobal.control.remove(Enum_MsgType.KAIFUDAY_UPDATE, self.createTabs, self);
        GGlobal.control.remove(Enum_MsgType.MSG_GQ_UPDATE, self.createTabs, self);
        self.tabList.numItems = 0;
    };
    View_QMKH_Panel.URL = "ui://vrex0iz4woj20";
    return View_QMKH_Panel;
}(UIPanelBase));
__reflect(View_QMKH_Panel.prototype, "View_QMKH_Panel");
