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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ItemVipGift = (function (_super) {
    __extends(ItemVipGift, _super);
    function ItemVipGift() {
        var _this = _super.call(this) || this;
        _this.grids = [];
        return _this;
    }
    ItemVipGift.createInstance = function () {
        return (fairygui.UIPackage.createObject("vip", "ItemVipGift"));
    };
    ItemVipGift.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n1 = (this.getChild("n1"));
        this.n2 = (this.getChild("n2"));
        this.n3 = (this.getChild("n3"));
        this.n4 = (this.getChild("n4"));
        this.n5 = (this.getChild("n5"));
        this.n6 = (this.getChild("n6"));
        this.n7 = (this.getChild("n7"));
        this.n8 = (this.getChild("n8"));
        this.n9 = (this.getChild("n9"));
        this.n11 = (this.getChild("n11"));
        this.n12 = (this.getChild("n12"));
        this.n13 = (this.getChild("n13"));
        this.n15 = (this.getChild("n15"));
        this.n14 = (this.getChild("n14"));
        this.n16 = (this.getChild("n16"));
        this.disLb = (this.getChild("disLb"));
        this.grids = [this.n4, this.n5, this.n6, this.n7, this.n8];
    };
    ItemVipGift.prototype.buyHD = function () {
        ViewAlert.show(ConfigHelp.reTxt("是否花费<font color='#ffc334'>{0}元宝</font>购买？", this._price), Handler.create(this, this.goBuy), ViewAlert.OKANDCANCEL);
    };
    ItemVipGift.prototype.goBuy = function () {
        var vom = Model_player.voMine;
        if (vom.yuanbao < this._price) {
            ModelChongZhi.guideToRecharge();
        }
        else {
            GGlobal.modelvip.CG_VIPGIFT_2065(this._vipLv);
        }
    };
    ItemVipGift.prototype.clean = function () {
        for (var i = 0; i < 4; i++) {
            this.grids[i].tipEnabled = false;
            this.grids[i].showEff(false);
        }
        this.n9.removeClickListener(this.buyHD, this);
    };
    ItemVipGift.prototype.setdata = function (vipLv) {
        this.n9.addClickListener(this.buyHD, this);
        this._vipLv = vipLv + 1;
        var cfg = Config.VIP_710[this._vipLv];
        this._price = cfg.lbjg;
        var awards = JSON.parse(cfg.viplb);
        var vos = ConfigHelp.makeItemListArr(awards);
        for (var i = 0; i < 5; i++) {
            var viewg = this.grids[i];
            if (i < awards.length) {
                viewg.vo = vos[i];
                viewg.tipEnabled = true;
                viewg.showEff(true);
                viewg.visible = true;
            }
            else {
                viewg.visible = false;
                viewg.tipEnabled = false;
                viewg.showEff(false);
            }
        }
        var m = GGlobal.modelvip;
        var mylv = m.vip;
        var canBuy = mylv >= vipLv;
        var hasBuy = m.vipGiftData.indexOf(vipLv + 1) != -1;
        this.disLb.text = cfg.zk + "折";
        this.n9.checkNotice = canBuy;
        this.n9.visible = !hasBuy && canBuy;
        this.n12.visible = !canBuy;
        this.n15.visible = hasBuy;
        this.n16.visible = canBuy && !hasBuy;
        this.n12.text = ConfigHelp.reTxt("VIP{0}可购买", vipLv);
        this.n3.text = ConfigHelp.reTxt("VIP{0}礼包", vipLv);
        this.n14.text = this._price + "";
    };
    ItemVipGift.URL = "ui://w4xdcvn7fbywe";
    return ItemVipGift;
}(fairygui.GComponent));
__reflect(ItemVipGift.prototype, "ItemVipGift");
