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
var GCBZ_ShopItem = (function (_super) {
    __extends(GCBZ_ShopItem, _super);
    function GCBZ_ShopItem() {
        return _super.call(this) || this;
    }
    GCBZ_ShopItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("GCBZ", "GCBZ_ShopItem"));
    };
    GCBZ_ShopItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.dataLb.leading = 25;
    };
    GCBZ_ShopItem.prototype.onShown = function (value) {
        var self = this;
        var cfg = value.cfg;
        self.vo = cfg;
        var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.item));
        var costArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.money));
        var count = Model_Bag.getItemCount(costArr[0].id);
        self.grid.isShowEff = self.grid.tipEnabled = true;
        self.grid.vo = rewardArr[0];
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + costArr[0].icon + ".png", self.typeImg);
        var color = count >= costArr[0].count ? 2 : 6;
        self.dataLb.text = "限购：" + (cfg.xg - value.buyNum) + "/" + cfg.xg + "\n单价：     " +
            HtmlUtil.fontNoSize(ConfigHelp.numToStr(costArr[0].count), Color.getColorStr(color));
        self.buyBt.visible = value.buyNum < cfg.xg;
        self.buyImg.visible = value.buyNum >= cfg.xg;
        self.nameLb.text = rewardArr[0].name;
        self.nameLb.color = rewardArr[0].qColor;
        self.buyBt.addClickListener(self.onBuy, self);
    };
    GCBZ_ShopItem.prototype.onBuy = function () {
        var self = this;
        var costArr = ConfigHelp.makeItemListArr(JSON.parse(self.vo.money));
        var count = Model_Bag.getItemCount(costArr[0].id);
        if (count >= costArr[0].count) {
            GGlobal.modelgcbz.CG_AttackCity_buyItem_12067(self.vo.id);
        }
        else {
            View_CaiLiao_GetPanel.show(costArr[0]);
        }
    };
    GCBZ_ShopItem.prototype.clean = function () {
        var self = this;
        self.buyBt.removeClickListener(self.onBuy, self);
        self.grid.clean();
    };
    GCBZ_ShopItem.URL = "ui://vgiijkm8r5gej";
    return GCBZ_ShopItem;
}(fairygui.GComponent));
__reflect(GCBZ_ShopItem.prototype, "GCBZ_ShopItem");
