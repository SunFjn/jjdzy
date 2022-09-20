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
var ViewDanDaoView = (function (_super) {
    __extends(ViewDanDaoView, _super);
    function ViewDanDaoView() {
        var _this = _super.call(this) || this;
        _this.tabArr = [];
        return _this;
    }
    ViewDanDaoView.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewDanDaoView"));
    };
    ViewDanDaoView.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ViewDanDaoView.prototype.openPanel = function (pData) {
        this.show(pData);
    };
    ViewDanDaoView.prototype.closePanel = function (pData) {
        this.clean();
    };
    ViewDanDaoView.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        for (var i = 0; i < 2; i++) {
            var tab = s["bt" + i];
            tab.data = i;
            tab.selected = false;
            tab.addClickListener(s.tabHandle, s);
            s.tabArr.push(tab);
        }
    };
    ViewDanDaoView.prototype.tabHandle = function (event) {
        var a = this;
        var index = event.target.data;
        if (a.c1.selectedIndex == index)
            return;
        var arr = [UIConst.CROSS_KING, UIConst.CROSS_WARS];
        if (!ModuleManager.isOpen(arr[index], true)) {
            a.tabArr[index].selected = false;
            return;
        }
        a.tabArr[a.c1.selectedIndex].selected = false;
        a.tabArr[index].selected = true;
        a.c1.selectedIndex = index;
    };
    ViewDanDaoView.prototype.show = function (sel) {
        var s = this;
        sel = sel == 2 ? 1 : 0;
        s.c1.selectedIndex = sel;
        s.tabArr[sel].selected = true;
        s.selectPage();
        s.checkTab();
        s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.selectPage, s);
        var red = GGlobal.reddot;
        red.listen(UIConst.DANDAO_FUHUI, s.checkTab, s);
        red.listen(UIConst.SANGUO_WUSHUANG, s.checkTab, s);
    };
    ViewDanDaoView.prototype.clean = function () {
        var s = this;
        s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.selectPage, s);
        var red = GGlobal.reddot;
        red.remove(UIConst.DANDAO_FUHUI, s.checkTab, s);
        red.remove(UIConst.SANGUO_WUSHUANG, s.checkTab, s);
        s.tabArr[s.c1.selectedIndex].selected = false;
        if (s.tempPanel) {
            s.tempPanel.clean();
            s.tempPanel = null;
        }
    };
    ViewDanDaoView.prototype.selectPage = function () {
        var a = this;
        if (a.tempPanel) {
            a.tempPanel.clean();
            a.tempPanel = null;
        }
        switch (a.c1.selectedIndex) {
            case 0:
                a.item1.show();
                a.tempPanel = a.item1;
                break;
            case 1:
                a.item2.show();
                a.tempPanel = a.item2;
                break;
        }
    };
    ViewDanDaoView.prototype.checkTab = function () {
        var red = GGlobal.reddot;
        this.bt0.checkNotice = red.checkCondition(UIConst.DANDAO_FUHUI);
        this.bt1.checkNotice = red.checkCondition(UIConst.SANGUO_WUSHUANG);
    };
    //>>>>end
    ViewDanDaoView.URL = "ui://me1skowlgmu55v";
    return ViewDanDaoView;
}(fairygui.GComponent));
__reflect(ViewDanDaoView.prototype, "ViewDanDaoView", ["IPanel"]);
