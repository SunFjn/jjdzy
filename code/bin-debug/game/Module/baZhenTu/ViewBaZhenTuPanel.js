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
var ViewBaZhenTuPanel = (function (_super) {
    __extends(ViewBaZhenTuPanel, _super);
    function ViewBaZhenTuPanel() {
        var _this = _super.call(this) || this;
        _this.uiArr = [UIConst.BAZHENTU, UIConst.BAZHENTU_FENJIE, UIConst.BAZHENTU_JIANDING, UIConst.BAZHENTU_GOD];
        _this._preIndex = 0;
        _this.setSkin("baZhenTu", "baZhenTu_atlas0", "ViewBaZhenTuPanel");
        return _this;
    }
    ViewBaZhenTuPanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("baZhenTu", "ViewBaZhenTuPanel"));
    };
    ViewBaZhenTuPanel.prototype.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(ChildBaZhenTu.URL, ChildBaZhenTu);
        f(ChildBaZhenTuFenJ.URL, ChildBaZhenTuFenJ);
        f(ChildBaZhenTuZP.URL, ChildBaZhenTuZP);
        f(VBaZTGrid.URL, VBaZTGrid);
        f(VBaZTGridFenJ.URL, VBaZTGridFenJ);
        f(VBaZTItem.URL, VBaZTItem);
        f(VBaZTBag.URL, VBaZTBag);
        f(VBaZTChip.URL, VBaZTChip);
        f(ChildZhenYan.URL, ChildZhenYan);
        f(VZhenYanBtn.URL, VZhenYanBtn);
        f(VZhenYanBtnBig.URL, VZhenYanBtnBig);
        f(VZhenYanLv.URL, VZhenYanLv);
        f(ChildBaZhenTuGod.URL, ChildBaZhenTuGod);
        f(VBaZTGridGod.URL, VBaZTGridGod);
    };
    ViewBaZhenTuPanel.prototype.initView = function () {
        _super.prototype.initView.call(this);
        GGlobal.modelBaZhenTu.CGOPENUI4401();
    };
    ViewBaZhenTuPanel.prototype.onShown = function () {
        var t = this;
        t.addListen();
        t.c2.selectedIndex = -1;
        t.c1.selectedIndex = -1;
        if (t._args && t._args instanceof Array) {
            t.c2.selectedIndex = ~~(t._args[0]);
            t.c1.selectedIndex = ~~(t._args[1]);
        }
        else {
            t.c1.selectedIndex = 0;
            t.c2.selectedIndex = 0;
        }
        t.checkNot();
        GGlobal.modelBaZhenTu.CGDaShi_UI4417();
    };
    ViewBaZhenTuPanel.prototype.onHide = function () {
        this.removeListen();
        GGlobal.layerMgr.close(UIConst.BAZHENTU);
    };
    ViewBaZhenTuPanel.prototype.addListen = function () {
        this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
        this.c2.addEventListener(fairygui.StateChangeEvent.CHANGED, this.selectTab, this);
        GGlobal.reddot.listen(ReddotEvent.CHECK_BAZHENTU, this.checkNot, this);
        GGlobal.reddot.listen(UIConst.ZHENYAN, this.checkNot, this);
    };
    ViewBaZhenTuPanel.prototype.removeListen = function () {
        this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
        this.c2.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectTab, this);
        GGlobal.reddot.remove(ReddotEvent.CHECK_BAZHENTU, this.checkNot, this);
        GGlobal.reddot.remove(UIConst.ZHENYAN, this.checkNot, this);
        if (this._p) {
            this._p.close();
        }
    };
    ViewBaZhenTuPanel.prototype.setSelectIndex = function (index) {
        this.c1.selectedIndex = index;
        this.selectPage();
    };
    ViewBaZhenTuPanel.prototype.selectTab = function () {
        if (this.c2.selectedIndex < 0)
            return;
        if (this.c2.selectedIndex == 0) {
            this.selectPage();
        }
        else {
            //未开启
            if (!ModuleManager.isOpen(UIConst.ZHENYAN, true)) {
                this.c2.selectedIndex = 0;
                return;
            }
            if (this._p) {
                this._p.close();
            }
            this._p = this.viewZY;
            this._p.open();
        }
    };
    ViewBaZhenTuPanel.prototype.selectPage = function () {
        var s = this;
        var idx = s.c1.selectedIndex;
        if (idx < 0)
            return;
        if (s.c2.selectedIndex != 0)
            return;
        if (!ModuleManager.isOpen(s.uiArr[idx], true)) {
            s.c1.selectedIndex = s._preIndex;
            return;
        }
        s._preIndex = s.c1.selectedIndex;
        if (s._p) {
            s._p.close();
        }
        if (idx == 0) {
            s._p = s.p1;
        }
        else if (idx == 1) {
            s._p = s.p2;
        }
        else if (idx == 2) {
            s._p = s.p3;
        }
        else if (idx == 3) {
            s._p = s.p4;
        }
        s._p.open();
    };
    ViewBaZhenTuPanel.prototype.checkNot = function () {
        var r = GGlobal.reddot;
        var s = this;
        s.tab0.checkNotice = r.checkCondition(UIConst.BAZHENTU, 0);
        s.tab1.checkNotice = r.checkCondition(UIConst.BAZHENTU, 1);
        s.tab2.checkNotice = r.checkCondition(UIConst.BAZHENTU, 2);
        s.tab3.checkNotice = r.checkCondition(UIConst.BAZHENTU, 3);
        s.btn0.checkNotice = r.checkCondition(UIConst.BAZHENTU, 0) || r.checkCondition(UIConst.BAZHENTU, 1) || r.checkCondition(UIConst.BAZHENTU, 2) || r.checkCondition(UIConst.BAZHENTU, 3);
        s.btn1.checkNotice = r.checkCondition(UIConst.ZHENYAN, 0);
    };
    ViewBaZhenTuPanel.URL = "ui://xrzn9ppaf8nk0";
    return ViewBaZhenTuPanel;
}(UIPanelBase));
__reflect(ViewBaZhenTuPanel.prototype, "ViewBaZhenTuPanel");
