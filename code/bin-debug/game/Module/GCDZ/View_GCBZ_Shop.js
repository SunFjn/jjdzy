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
var View_GCBZ_Shop = (function (_super) {
    __extends(View_GCBZ_Shop, _super);
    function View_GCBZ_Shop() {
        var _this = _super.call(this) || this;
        _this.itemID = 410438;
        _this.childrenCreated();
        return _this;
    }
    View_GCBZ_Shop.createInstance = function () {
        return (fairygui.UIPackage.createObject("GCBZ", "View_GCBZ_Shop"));
    };
    View_GCBZ_Shop.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("GCBZ", "View_GCBZ_Shop").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
        self.list.setVirtual();
        _super.prototype.childrenCreated.call(this);
    };
    View_GCBZ_Shop.prototype.renderHandler = function (index, item) {
        item.onShown(GGlobal.modelgcbz.shopData[index]);
    };
    View_GCBZ_Shop.prototype.updateShow = function () {
        var self = this;
        var itemVo = VoItem.create(self.itemID);
        self.moneyLb.setImgUrl(itemVo.icon);
        self.moneyLb.setCount(Model_Bag.getItemCount(self.itemID));
        self.list.numItems = GGlobal.modelgcbz.shopData.length;
    };
    View_GCBZ_Shop.prototype.onShown = function () {
        var self = this;
        var model = GGlobal.modelgcbz;
        GGlobal.control.listen(UIConst.GCBZ_SHOP, self.updateShow, self);
        IconUtil.setImg(self.bg, Enum_Path.BACK_URL + "7831_shop.jpg");
        model.CG_AttackCity_openShopUI_12065();
    };
    View_GCBZ_Shop.prototype.onHide = function () {
        var self = this;
        GGlobal.control.remove(UIConst.GCBZ_SHOP, self.updateShow, self);
        IconUtil.setImg(self.bg, null);
        self.list.numItems = 0;
    };
    View_GCBZ_Shop.URL = "ui://vgiijkm8r5gee";
    return View_GCBZ_Shop;
}(UIModalPanel));
__reflect(View_GCBZ_Shop.prototype, "View_GCBZ_Shop");
