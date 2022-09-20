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
var Child_QDShop = (function (_super) {
    __extends(Child_QDShop, _super);
    function Child_QDShop() {
        return _super.call(this) || this;
    }
    Child_QDShop.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "Child_QDShop"));
    };
    Child_QDShop.setExtends = function () {
    };
    Child_QDShop.prototype.initView = function (pParent) {
        var self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    };
    Child_QDShop.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandle;
        self.list.setVirtual();
    };
    Child_QDShop.prototype.renderHandle = function (index, item) {
        item.setVo(ModelSGQD.shopArr[index]);
    };
    Child_QDShop.prototype.show = function () {
        this.list.numItems = ModelSGQD.shopArr.length;
    };
    Child_QDShop.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        GGlobal.control.listen(UIConst.SGQD_SHOP, self.show, self);
        if (ModelSGQD.shopArr.length <= 0) {
            GGlobal.modelActivity.CG_OPENACT(UIConst.SGQD_SHOP);
        }
        else {
            self.show();
        }
    };
    Child_QDShop.prototype.closePanel = function () {
        var self = this;
        self.list.numItems = 0;
        GGlobal.control.remove(UIConst.SGQD_SHOP, self.show, self);
    };
    Child_QDShop.pkg = "sanGuoQingDian";
    Child_QDShop.URL = "ui://kdt501v2qrkf1s";
    return Child_QDShop;
}(fairygui.GComponent));
__reflect(Child_QDShop.prototype, "Child_QDShop", ["IPanel"]);
