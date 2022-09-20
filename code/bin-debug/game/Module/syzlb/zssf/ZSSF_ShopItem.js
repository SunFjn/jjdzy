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
var ZSSF_ShopItem = (function (_super) {
    __extends(ZSSF_ShopItem, _super);
    function ZSSF_ShopItem() {
        return _super.call(this) || this;
    }
    ZSSF_ShopItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "ZSSF_ShopItem"));
    };
    ZSSF_ShopItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.dataLb.leading = 25;
    };
    ZSSF_ShopItem.prototype.onShown = function (cfg) {
        var self = this;
        var model = GGlobal.modelzssf;
        self.vo = cfg;
        var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        var costArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.consume));
        self.grid.isShowEff = self.grid.tipEnabled = true;
        self.grid.vo = rewardArr[0];
        ImageLoader.instance.loader(Enum_Path.ICON70_URL + costArr[0].icon + ".png", self.typeImg);
        var color = model.rongyu >= costArr[0].count ? 2 : 6;
        self.dataLb.text = "限购：" + (cfg.time - model.shopData[cfg.id]) + "/" + cfg.time + "\n单价：     " +
            HtmlUtil.fontNoSize(ConfigHelp.numToStr(costArr[0].count), Color.getColorStr(color));
        self.buyBt.visible = model.shopData[cfg.id] < cfg.time;
        self.buyImg.visible = model.shopData[cfg.id] >= cfg.time;
        self.nameLb.text = rewardArr[0].name;
        self.nameLb.color = rewardArr[0].qColor;
        self.buyBt.addClickListener(self.onBuy, self);
    };
    ZSSF_ShopItem.prototype.onBuy = function () {
        var self = this;
        var model = GGlobal.modelzssf;
        var costArr = ConfigHelp.makeItemListArr(JSON.parse(self.vo.consume));
        if (model.rongyu >= costArr[0].count) {
            GGlobal.modelzssf.CG_GuardArea_buyItem_10919(self.vo.id);
        }
        else {
            ViewCommonWarn.text("荣誉不足");
        }
    };
    ZSSF_ShopItem.prototype.clean = function () {
        var self = this;
        self.buyBt.removeClickListener(self.onBuy, self);
        self.grid.clean();
    };
    ZSSF_ShopItem.URL = "ui://3o8q23uucenr1j";
    return ZSSF_ShopItem;
}(fairygui.GComponent));
__reflect(ZSSF_ShopItem.prototype, "ZSSF_ShopItem");
