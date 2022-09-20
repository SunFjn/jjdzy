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
var View_Welfare_Panel = (function (_super) {
    __extends(View_Welfare_Panel, _super);
    function View_Welfare_Panel() {
        var _this = _super.call(this) || this;
        _this.setSkin("Welfare", "Welfare_atlas0", "View_Welfare_Panel");
        return _this;
    }
    View_Welfare_Panel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(Child_Sign.URL, Child_Sign);
        f(SignGrid.URL, SignGrid);
        f(Child_ActCode.URL, Child_ActCode);
        f(Child_UpdateNotice.URL, Child_UpdateNotice);
        f(NoticeItem.URL, NoticeItem);
        f(RewardBack.URL, RewardBack);
        f(RewardBackItem.URL, RewardBackItem);
        f(NoticeItem1.URL, NoticeItem1);
    };
    View_Welfare_Panel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        var a = this;
        a.list.callbackThisObj = a;
        a.list.itemRenderer = a.renderHandle;
        Model_Welfare.showIconHandle();
    };
    View_Welfare_Panel.prototype.renderHandle = function (index, tab) {
        var a = this;
        tab.setActivityIcon(a.iconArr[index].id);
        tab.data = a.iconArr[index].id;
        tab.checkNotice = GGlobal.reddot.checkCondition(a.iconArr[index].id);
        if (!a.curTab && index == 0) {
            tab.selected = true;
            a.curTab = tab;
        }
    };
    View_Welfare_Panel.prototype.listHandle = function (evt) {
        var a = this;
        var tab = evt.itemObject;
        if (a.curTab && tab.data == a.curTab.data)
            return;
        a.curTab = tab;
        a.updateChildShow();
    };
    View_Welfare_Panel.prototype.updateShow = function () {
        var a = this;
        a.iconArr = [];
        Model_Welfare.iconArr.forEach(function (element) {
            if (ModuleManager.isOpen(element.id)) {
                a.iconArr.push(element);
            }
        });
        a.list.numItems = a.iconArr.length;
        a.updateChildShow();
    };
    View_Welfare_Panel.prototype.updateChildShow = function () {
        var a = this;
        if (a.tabView) {
            a.tabView.clean();
            a.removeChild(a.tabView);
        }
        switch (a.curTab.data) {
            case UIConst.WELFARE_SIGN:
                a.tabView = Child_Sign.createInstance();
                a.tabView.setXY(9, 293);
                break;
            case UIConst.WELFARE_ACTCODE:
                a.tabView = Child_ActCode.createInstance();
                a.tabView.setXY(0, 292);
                break;
            case UIConst.WELFARE_NOTICE:
                a.tabView = Child_UpdateNotice.createInstance();
                a.tabView.setXY(0, 293);
                break;
            case UIConst.REWARD_BACK:
                a.tabView = RewardBack.createInstance();
                a.tabView.setXY(0, 293);
                break;
        }
        a.addChild(a.tabView);
        a.tabView.show();
    };
    View_Welfare_Panel.prototype.checkTabNotice = function () {
        var a = this;
        a.iconArr = [];
        Model_Welfare.iconArr.forEach(function (element) {
            if (ModuleManager.isOpen(element.id)) {
                a.iconArr.push(element);
            }
        });
        a.list.numItems = a.iconArr.length;
    };
    View_Welfare_Panel.prototype.onShown = function () {
        var a = this;
        a.updateShow();
        a.list.addEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
        GGlobal.reddot.listen(UIConst.WELFARE, a.checkTabNotice, a);
        if (this._args) {
            var idx = Number(this._args);
            var tab = a.list._children[idx];
            if (a.curTab)
                a.curTab.selected = false;
            if (tab) {
                tab.selected = true;
                a.curTab = tab;
                a.updateChildShow();
            }
        }
    };
    View_Welfare_Panel.prototype.onHide = function () {
        var a = this;
        if (a.tabView) {
            a.tabView.clean();
            a.removeChild(a.tabView);
        }
        GGlobal.layerMgr.close(UIConst.WELFARE);
        a.list.removeEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
        GGlobal.reddot.remove(UIConst.WELFARE, a.checkTabNotice, a);
    };
    View_Welfare_Panel.URL = "ui://ye1luhg3r6x48";
    return View_Welfare_Panel;
}(UIPanelBase));
__reflect(View_Welfare_Panel.prototype, "View_Welfare_Panel");
