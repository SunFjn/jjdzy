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
/** self is an automatically generated class by FairyGUI. Please do not modify it. **/
var ChildGodWuJiangView = (function (_super) {
    __extends(ChildGodWuJiangView, _super);
    function ChildGodWuJiangView() {
        var _this = _super.call(this) || this;
        _this.onTabChange = function (pTabIndex, pVo) {
            return true;
        };
        _this.openPanel = function (sel) {
            var self = _this;
            ViewWuJiangPanel._selPage = 2;
            self._tabContronller.registerEvent(true);
            self.checkNotice();
            self._tabContronller.selectedIndex = -1;
            self._tabContronller.selectedIndex = sel;
            GGlobal.reddot.listen(UIConst.GOD_WUJIANG, self.checkNotice, self);
        };
        _this.closePanel = function () {
            var self = _this;
            self._tabContronller.registerEvent(false);
            self._tabContronller.close();
            GGlobal.reddot.remove(UIConst.GOD_WUJIANG, self.checkNotice, self);
        };
        return _this;
    }
    ChildGodWuJiangView.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "ChildGodWuJiangView"));
    };
    ChildGodWuJiangView.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self._tabContronller = new TabController();
        self._tabContronller.initView(self, self.c1);
        self._tabContronller.setPanelClassMap([
            ChildGodWuJiang,
            ChildGodWuJiangXiuLian
        ]);
        self._tabContronller.tabChange = self.onTabChange;
        self._tabContronller.tabChangeCaller = self;
    };
    ChildGodWuJiangView.prototype.checkNotice = function () {
        this._tabContronller.getTabBtnByIndex(0).checkNotice = GGlobal.reddot.checkCondition(UIConst.GOD_WUJIANG, 0) || GGlobal.reddot.checkCondition(UIConst.GOD_WUJIANG, 2) || GGlobal.reddot.checkCondition(UIConst.JUEXING, 7);
        this._tabContronller.getTabBtnByIndex(1).checkNotice = GGlobal.reddot.checkCondition(UIConst.GOD_WUJIANG, 1);
    };
    ChildGodWuJiangView.prototype.dispose = function () {
        this.closePanel();
        if (this._tabContronller)
            this._tabContronller.destroy();
        _super.prototype.dispose.call(this);
    };
    ChildGodWuJiangView.URL = "ui://zyx92gzwnlyo4m";
    return ChildGodWuJiangView;
}(fairygui.GComponent));
__reflect(ChildGodWuJiangView.prototype, "ChildGodWuJiangView");
