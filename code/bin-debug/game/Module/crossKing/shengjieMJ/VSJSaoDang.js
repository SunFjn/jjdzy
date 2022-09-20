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
var VSJSaoDang = (function (_super) {
    __extends(VSJSaoDang, _super);
    function VSJSaoDang() {
        var _this = _super.call(this) || this;
        _this.isFirst = true;
        _this.setExtends();
        _this.loadRes("crossKing", "crossKing_atlas0");
        return _this;
    }
    VSJSaoDang.prototype.childrenCreated = function () {
        var self = this;
        GGlobal.createPack("crossKing");
        self.view = fairygui.UIPackage.createObject("crossKing", "VSJMJSaoDang").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    VSJSaoDang.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(ItemSJSD.URL, ItemSJSD);
    };
    VSJSaoDang.prototype.onShown = function () {
        _super.prototype.onShown.call(this);
        var self = this;
        var datas = self._args;
        if (self.isFirst) {
            self.isFirst = false;
            self.list.itemRenderer = function (i, r) { r.setData(self._args[i]); };
            self.list.setVirtual();
            self.list.callbackThisObj = self;
        }
        self.list.numItems = datas.length;
        self.list.scrollToView(self.list.numItems - 1, true);
    };
    VSJSaoDang.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.SJMJ_SD);
    };
    VSJSaoDang.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
    };
    return VSJSaoDang;
}(UIModalPanel));
__reflect(VSJSaoDang.prototype, "VSJSaoDang");
