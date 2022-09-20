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
var View_Home_Shop = (function (_super) {
    __extends(View_Home_Shop, _super);
    function View_Home_Shop() {
        var _this = _super.call(this) || this;
        _this.setSkin("JiaDing", "JiaDing_atlas0", "View_Home_Shop");
        return _this;
    }
    View_Home_Shop.createInstance = function () {
        return (fairygui.UIPackage.createObject("JiaDing", "View_Home_Shop"));
    };
    View_Home_Shop.prototype.setExtends = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(Home_ShopItem.URL, Home_ShopItem);
    };
    View_Home_Shop.prototype.initView = function () {
        var self = this;
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
    };
    View_Home_Shop.prototype.renderHandler = function (index, item) {
        item.onShown(GGlobal.homemodel.shopData[index], index);
    };
    View_Home_Shop.prototype.updateShow = function () {
        var self = this;
        self.moneyLb.setImgUrl(22);
        self.moneyLb.setCount(Model_player.voMine.homeMoney);
        self.list.numItems = GGlobal.homemodel.shopData.length;
        var costItem = ConfigHelp.makeItemListArr(JSON.parse(Config.xtcs_004[7117].other))[0];
        self.resCostLb.setImgUrl(costItem.icon);
        self.resCostLb.setCount(costItem.count);
    };
    View_Home_Shop.prototype.onShown = function () {
        var self = this;
        var model = GGlobal.homemodel;
        GGlobal.control.listen(UIConst.HOME_SHOP, self.updateShow, self);
        self.resBt.addClickListener(self.onReset, self);
        IconUtil.setImg(self.bg, Enum_Path.BACK_URL + "home_shop.jpg");
        GGlobal.homemodel.CG_OPEN_SHOP_11401();
    };
    View_Home_Shop.prototype.onHide = function () {
        var self = this;
        GGlobal.control.remove(UIConst.HOME_SHOP, self.updateShow, self);
        self.resBt.removeClickListener(self.onReset, self);
        IconUtil.setImg(self.bg, null);
        self.list.numItems = 0;
    };
    View_Home_Shop.prototype.onReset = function () {
        var self = this;
        if (ConfigHelp.checkEnough(Config.xtcs_004[7117].other, true)) {
            GGlobal.homemodel.CG_SHOP_RESET_11403();
        }
    };
    View_Home_Shop.URL = "ui://ypo8uejwi2ij3";
    return View_Home_Shop;
}(UIPanelBase));
__reflect(View_Home_Shop.prototype, "View_Home_Shop");
