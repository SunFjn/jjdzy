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
var SanGuoZS_ShopItem = (function (_super) {
    __extends(SanGuoZS_ShopItem, _super);
    function SanGuoZS_ShopItem() {
        return _super.call(this) || this;
    }
    SanGuoZS_ShopItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "SanGuoZS_ShopItem"));
    };
    SanGuoZS_ShopItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.grid = (s.getChild("grid"));
        s.grid.isShowEff = true;
        s.buyBt = (s.getChild("buyBt"));
        s.typeImg0 = (s.getChild("typeImg0"));
        s.buyImg = (s.getChild("buyImg"));
        s.nameLb = (s.getChild("nameLb"));
        s.dataLb = (s.getChild("dataLb"));
        s.promptLb = (s.getChild("promptLb"));
        s.buyBt.addClickListener(s.buyHandler, s);
    };
    SanGuoZS_ShopItem.prototype.buyHandler = function () {
        var moneyArr = JSON.parse(this.vo.price);
        if (Model_player.voMine.yuanbao >= moneyArr[0][2]) {
            GGlobal.modelsgzs.CG_SANGUO_ZHANSHEN_BUY_BZ(this.vo.id);
        }
        else {
            ModelChongZhi.guideToRecharge();
        }
    };
    SanGuoZS_ShopItem.prototype.setVo = function (cfg) {
        var s = this;
        s.vo = cfg;
        var itemArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.store));
        var moneyArr = JSON.parse(cfg.price);
        s.grid.vo = itemArr[0];
        s.grid.tipEnabled = true;
        s.nameLb.text = itemArr[0].name;
        s.nameLb.color = itemArr[0].qColor;
        s.dataLb.text = "价格：      " + moneyArr[0][2];
        IconUtil.setImg(s.typeImg0, Enum_Path.ICON70_URL + moneyArr[0][0] + ".png");
        s.buyImg.visible = false;
        s.buyBt.visible = false;
        s.promptLb.visible = false;
        if (Model_SGZS.buyShopArr.indexOf(cfg.id) != -1) {
            s.buyImg.visible = true;
        }
        else {
            if (Model_SGZS.lastRank <= cfg.time) {
                s.buyBt.visible = true;
                s.buyBt.checkNotice = Model_player.voMine.yuanbao >= moneyArr[0][2];
            }
            else {
                s.promptLb.text = cfg.tips;
                s.promptLb.visible = true;
            }
        }
    };
    SanGuoZS_ShopItem.prototype.clean = function () {
        this.grid.clean();
    };
    SanGuoZS_ShopItem.URL = "ui://me1skowlm40k3l";
    return SanGuoZS_ShopItem;
}(fairygui.GComponent));
__reflect(SanGuoZS_ShopItem.prototype, "SanGuoZS_ShopItem");
