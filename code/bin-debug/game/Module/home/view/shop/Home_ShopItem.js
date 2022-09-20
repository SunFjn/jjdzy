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
var Home_ShopItem = (function (_super) {
    __extends(Home_ShopItem, _super);
    function Home_ShopItem() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        return _this;
    }
    Home_ShopItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("JiaDing", "Home_ShopItem"));
    };
    Home_ShopItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.dataLb.leading = 25;
    };
    Home_ShopItem.prototype.onShown = function (value, index) {
        var self = this;
        var cfg = value.cfg;
        self.index = index;
        self.vo = cfg;
        var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.dj));
        var costArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.yj));
        self.grid.isShowEff = self.grid.tipEnabled = true;
        self.grid.vo = rewardArr[0];
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + costArr[0].icon + ".png", self.typeImg);
        var color = Model_player.voMine.homeMoney >= costArr[0].count ? 2 : 6;
        self.dataLb.text = "限购：" + (cfg.xiangou - value.buyNum) + "/" + cfg.xiangou + "\n单价：     " +
            HtmlUtil.fontNoSize(ConfigHelp.getYiWanText(costArr[0].count), Color.getColorStr(color));
        self.buyBt.visible = value.buyNum < cfg.xiangou;
        self.buyImg.visible = value.buyNum >= cfg.xiangou;
        self.nameLb.text = rewardArr[0].name;
        self.nameLb.color = rewardArr[0].qColor;
        self.buyBt.addClickListener(self.onBuy, self);
    };
    Home_ShopItem.prototype.onBuy = function () {
        var self = this;
        var costArr = ConfigHelp.makeItemListArr(JSON.parse(self.vo.yj));
        if (Model_player.voMine.homeMoney >= costArr[0].count) {
            GGlobal.homemodel.CG_SHOP_BUY_11405(self.index);
        }
        else {
            ViewCommonWarn.text("府邸币不足");
        }
    };
    Home_ShopItem.prototype.clean = function () {
        var self = this;
        self.buyBt.removeClickListener(self.onBuy, self);
        self.grid.clean();
    };
    Home_ShopItem.URL = "ui://ypo8uejwi2ij5";
    return Home_ShopItem;
}(fairygui.GComponent));
__reflect(Home_ShopItem.prototype, "Home_ShopItem");
