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
var ViewCrossKingView = (function (_super) {
    __extends(ViewCrossKingView, _super);
    function ViewCrossKingView() {
        var _this = _super.call(this) || this;
        _this.tabArr = [];
        _this._first1 = true;
        _this._first0 = true;
        return _this;
    }
    ViewCrossKingView.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "ViewCrossKingView"));
    };
    ViewCrossKingView.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ViewCrossKingView.prototype.openPanel = function (pData) {
        this.show(pData);
    };
    ViewCrossKingView.prototype.closePanel = function (pData) {
        this.clean();
    };
    ViewCrossKingView.prototype.constructFromXML = function (xml) {
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
    ViewCrossKingView.prototype.tabHandle = function (event) {
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
    ViewCrossKingView.prototype.show = function (sel) {
        var s = this;
        sel = sel == 4 ? 1 : 0;
        s.c1.selectedIndex = sel;
        s.tabArr[sel].selected = true;
        s.selectPage();
        s.checkKing();
        s.checkWars();
        s.viewKing.addListen();
        s.viewWars.addListen();
        s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.selectP, s);
        GGlobal.control.listen(Enum_MsgType.CROSSKING_OPEN_UI, s.selectPage, s);
        GGlobal.reddot.listen(ReddotEvent.CHECK_CROSS_KING, s.checkKing, s);
        GGlobal.reddot.listen(ReddotEvent.CHECK_CROSS_WARS, s.checkWars, s);
    };
    ViewCrossKingView.prototype.clean = function () {
        var s = this;
        s.viewKing.removeListen();
        s.viewWars.removeListen();
        s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.selectP, s);
        GGlobal.control.remove(Enum_MsgType.CROSSKING_OPEN_UI, s.selectPage, s);
        GGlobal.reddot.remove(ReddotEvent.CHECK_CROSS_KING, s.checkKing, s);
        GGlobal.reddot.remove(ReddotEvent.CHECK_CROSS_WARS, s.checkWars, s);
        s.tabArr[s.c1.selectedIndex].selected = false;
        this._first0 = true;
        this._first1 = true;
    };
    ViewCrossKingView.prototype.selectP = function () {
        Model_CrossWars.battleTurn = 0;
        this.selectPage();
    };
    ViewCrossKingView.prototype.selectPage = function () {
        if (this.c1.selectedIndex == 0) {
            this.viewKing.update();
            if (this._first0) {
                GGlobal.modelCrossKing.CG_OPENUI();
                this._first0 = false;
            }
        }
        else if (this.c1.selectedIndex == 1) {
            this.viewWars.update();
            if (this._first1) {
                GGlobal.modelCrossWars.CG_OPEN_WINERS();
                Model_CrossWars.hasData = true;
                this._first1 = false;
            }
        }
    };
    ViewCrossKingView.prototype.checkKing = function () {
        this.bt0.checkNotice = GGlobal.reddot.checkCondition(UIConst.CROSS_KING, 0);
    };
    ViewCrossKingView.prototype.checkWars = function () {
        this.bt1.checkNotice = GGlobal.reddot.checkCondition(UIConst.CROSS_WARS, 0);
    };
    //>>>>end
    ViewCrossKingView.URL = "ui://me1skowlhfct4g";
    return ViewCrossKingView;
}(fairygui.GComponent));
__reflect(ViewCrossKingView.prototype, "ViewCrossKingView", ["IPanel"]);
