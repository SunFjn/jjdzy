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
var Child_YiShou = (function (_super) {
    __extends(Child_YiShou, _super);
    function Child_YiShou() {
        var _this = _super.call(this) || this;
        _this._uidList = [];
        _this._args = 0;
        return _this;
    }
    Child_YiShou.createInstance = function () {
        return (fairygui.UIPackage.createObject("YiShouLu", "Child_YiShou"));
    };
    Child_YiShou.prototype.initView = function (pParent) {
        var self = this;
        self.tabArr = [self["tab0"], self["tab1"]];
        self._uidList = [UIConst.YISHOULU, UIConst.XIANSHAN_XUNSHOU];
        self._tabContronller = new TabController();
        self._tabContronller.initView(self, self.c1);
        self._tabContronller.setPanelClassMap([
            YiShouLuView,
            Child_XSXS,
        ]);
        self._tabContronller.tabChange = self.onTabChange;
        self._tabContronller.tabChangeCaller = self;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    };
    Child_YiShou.prototype.onTabChange = function (pTabIndex, pVo) {
        var arr = this._uidList;
        if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
            return false;
        }
        pVo.data = this._args;
        return true;
    };
    Child_YiShou.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    Child_YiShou.prototype.checkTabNotice = function () {
        var self = this;
        var red = GGlobal.reddot;
        self.tabArr[0].checkNotice = red.checkCondition(UIConst.YISHOULU, 0);
        self.tabArr[1].checkNotice = red.checkCondition(UIConst.XIANSHAN_XUNSHOU, 0);
    };
    Child_YiShou.prototype.openPanel = function (pData) {
        var self = this;
        self._args = pData;
        self._tabContronller.registerEvent(true);
        var t_selectIndex = 0;
        if (self._args) {
            t_selectIndex = self._args % 10;
        }
        self._tabContronller.selectedIndex = -1;
        self._tabContronller.selectedIndex = t_selectIndex;
        self.checkTabNotice();
        var r = GGlobal.reddot;
        r.listen(UIConst.XIANSHAN_XUNSHOU, self.checkTabNotice, self);
        r.listen(UIConst.YISHOULU, self.checkTabNotice, self);
        GGlobal.control.listen(UIConst.YISHOULU, self.checkTabNotice, self);
    };
    Child_YiShou.prototype.closePanel = function () {
        var self = this;
        self._tabContronller.registerEvent(false);
        self._tabContronller.close();
        var r = GGlobal.reddot;
        r.remove(UIConst.XIANSHAN_XUNSHOU, self.checkTabNotice, self);
        r.remove(UIConst.YISHOULU, self.checkTabNotice, self);
        GGlobal.control.remove(UIConst.YISHOULU, self.checkTabNotice, self);
    };
    Child_YiShou.URL = "ui://7y83phvnpz9kq";
    return Child_YiShou;
}(fairygui.GComponent));
__reflect(Child_YiShou.prototype, "Child_YiShou", ["IPanel"]);
