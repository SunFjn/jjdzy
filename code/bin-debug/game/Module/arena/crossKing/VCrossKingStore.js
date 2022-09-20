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
var VCrossKingStore = (function (_super) {
    __extends(VCrossKingStore, _super);
    function VCrossKingStore() {
        return _super.call(this) || this;
    }
    VCrossKingStore.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "VCrossKingStore"));
    };
    VCrossKingStore.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.grid = (this.getChild("grid"));
        this.buyBt = (this.getChild("buyBt"));
        this.typeImg0 = (this.getChild("typeImg0"));
        this.buyImg = (this.getChild("buyImg"));
        this.nameLb = (this.getChild("nameLb"));
        this.dataLb = (this.getChild("dataLb"));
        this.promptLb = (this.getChild("promptLb"));
        this.buyBt.addClickListener(this.onBuyItem, this);
    };
    Object.defineProperty(VCrossKingStore.prototype, "vo", {
        set: function (v) {
            this._vo = v;
            var cfg = Config.lsxxstore_232[v.id];
            var storeArr = ConfigHelp.SplitStr(cfg.store);
            var item = ConfigHelp.makeItem(storeArr[0]);
            this.grid.tipEnabled = true;
            this.grid.isShowEff = true;
            this.grid.vo = item;
            this.nameLb.text = item.name;
            this.nameLb.color = Color.getColorInt(item.quality);
            var priceArr = ConfigHelp.SplitStr(cfg.price);
            this._curr = Vo_Currency.create(priceArr[0][0]);
            this._curr.count = priceArr[0][2];
            this.dataLb.text = "价格：      " + priceArr[0][2];
            this.typeImg0.url = CommonManager.getMoneyUrl(Number(priceArr[0][0]));
            if (this._vo.status == 0) {
                this.buyBt.visible = this.buyBt.touchable = false;
                this.promptLb.text = cfg.tips;
                this.buyImg.visible = false;
            }
            else if (this._vo.status == 1) {
                this.buyBt.visible = this.buyBt.touchable = true;
                this.promptLb.text = "";
                this.buyImg.visible = false;
            }
            else if (this._vo.status == 2) {
                this.buyBt.visible = this.buyBt.touchable = false;
                this.promptLb.text = "";
                this.buyImg.visible = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    VCrossKingStore.prototype.onBuyItem = function () {
        if (this._vo.status == 0) {
            ViewCommonWarn.text("条件不足");
            return;
        }
        if (Model_player.getCurrencyCount(this._curr.gType) < this._curr.count) {
            ViewCommonWarn.text(this._curr.name + "不足");
            return;
        }
        GGlobal.modelCrossKing.CG_BUY_ITEM(this._vo.id);
    };
    VCrossKingStore.URL = "ui://me1skowlhfct43";
    return VCrossKingStore;
}(fairygui.GComponent));
__reflect(VCrossKingStore.prototype, "VCrossKingStore");
