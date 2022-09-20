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
var View_ZSSF_Shop = (function (_super) {
    __extends(View_ZSSF_Shop, _super);
    function View_ZSSF_Shop() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_ZSSF_Shop.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "View_ZSSF_Shop"));
    };
    View_ZSSF_Shop.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("syzlb", "View_ZSSF_Shop").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        _super.prototype.childrenCreated.call(this);
    };
    View_ZSSF_Shop.prototype.renderHandler = function (index, item) {
        item.onShown(GGlobal.modelzssf.shopArr[index]);
    };
    View_ZSSF_Shop.prototype.updateShow = function () {
        var self = this;
        self.moneyLb.setImgUrl(20);
        self.moneyLb.setCount(GGlobal.modelzssf.rongyu);
        self.list.numItems = GGlobal.modelzssf.shopArr.length;
    };
    View_ZSSF_Shop.prototype.onShown = function () {
        var self = this;
        var model = GGlobal.modelzssf;
        GGlobal.control.listen(UIConst.ZSSF_SHOP, self.updateShow, self);
        IconUtil.setImg(self.bg, Enum_Path.BACK_URL + "zssf2.jpg");
        model.CG_GuardArea_openShopUI_10917();
    };
    View_ZSSF_Shop.prototype.onHide = function () {
        var self = this;
        GGlobal.control.remove(UIConst.ZSSF_SHOP, self.updateShow, self);
        IconUtil.setImg(self.bg, null);
        self.list.numItems = 0;
    };
    View_ZSSF_Shop.URL = "ui://3o8q23uucenr1h";
    return View_ZSSF_Shop;
}(UIModalPanel));
__reflect(View_ZSSF_Shop.prototype, "View_ZSSF_Shop");
