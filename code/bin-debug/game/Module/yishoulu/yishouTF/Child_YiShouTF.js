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
var Child_YiShouTF = (function (_super) {
    __extends(Child_YiShouTF, _super);
    function Child_YiShouTF() {
        var _this = _super.call(this) || this;
        _this._uidList = [];
        _this._args = 0;
        return _this;
    }
    Child_YiShouTF.createInstance = function () {
        return (fairygui.UIPackage.createObject("YiShouLu", "Child_YiShouTF"));
    };
    Child_YiShouTF.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    Child_YiShouTF.prototype.initView = function (pParent) {
        var self = this;
        self.tabArr = [self["tab0"], self["tab1"], self["tab2"]];
        self._uidList = [UIConst.YISHOULU_TF, UIConst.YISHOULU_TFCOLOR, UIConst.XIULIAN_TF];
        self._tabContronller = new TabController();
        self._tabContronller.initView(self, self.c1);
        self._tabContronller.setPanelClassMap([
            Item_YiShouTF_UpLv,
            Item_YiShouTF_UpLv,
            Item_XiuLianTF,
        ]);
        self._tabContronller.tabChange = self.onTabChange;
        self._tabContronller.tabChangeCaller = self;
    };
    Child_YiShouTF.prototype.onTabChange = function (pTabIndex, pVo) {
        var arr = this._uidList;
        if (!ModuleManager.isOpen(arr[pTabIndex], true)) {
            return false;
        }
        pVo.data = pTabIndex;
        return true;
    };
    Child_YiShouTF.prototype.checkNotcie = function () {
        var self = this;
        var red = GGlobal.reddot;
        self.tabArr[0].checkNotice = red.checkCondition(UIConst.YISHOULU_TF, 0);
        self.tabArr[1].checkNotice = red.checkCondition(UIConst.YISHOULU_TF, 1);
        self.tabArr[2].checkNotice = red.checkCondition(UIConst.XIULIAN_TF, 0);
    };
    Child_YiShouTF.prototype.openPanel = function (pData) {
        var self = this;
        self._args = pData;
        self._tabContronller.registerEvent(true);
        var t_selectIndex = 0;
        if (self._args) {
            t_selectIndex = self._args % 10;
        }
        self._tabContronller.selectedIndex = -1;
        self._tabContronller.selectedIndex = t_selectIndex;
        if (!Model_YiShouLu.hasTFData) {
            GGlobal.modelYiShouLu.CG_OPENYISHOW_TF();
        }
        self.checkNotcie();
        var r = GGlobal.reddot;
        r.listen(UIConst.YISHOULU_TF, self.checkNotcie, self);
    };
    Child_YiShouTF.prototype.closePanel = function (pData) {
        var self = this;
        self._tabContronller.registerEvent(false);
        self._tabContronller.close();
        var r = GGlobal.reddot;
        r.remove(UIConst.YISHOULU_TF, self.checkNotcie, self);
    };
    Child_YiShouTF.URL = "ui://7y83phvnpz9ks";
    return Child_YiShouTF;
}(fairygui.GComponent));
__reflect(Child_YiShouTF.prototype, "Child_YiShouTF", ["IPanel"]);
