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
var ViewCountryDonate = (function (_super) {
    __extends(ViewCountryDonate, _super);
    function ViewCountryDonate() {
        var _this = _super.call(this) || this;
        _this.loadRes("country", "country_atlas0");
        return _this;
    }
    ViewCountryDonate.createInstance = function () {
        return (fairygui.UIPackage.createObject("country", "ViewCountryDonate"));
    };
    ViewCountryDonate.prototype.childrenCreated = function () {
        GGlobal.createPack("country");
        this.view = fairygui.UIPackage.createObject("country", "ViewCountryDonate").asCom;
        this.contentPane = this.view;
        this.labTitle = (this.view.getChild("labTitle"));
        this.labCoinGet1 = (this.view.getChild("labCoinGet1"));
        this.labCoinGet2 = (this.view.getChild("labCoinGet2"));
        this.btnCoin = (this.view.getChild("btnCoin"));
        this.labCoinCost = (this.view.getChild("labCoinCost"));
        this.labGoldGet1 = (this.view.getChild("labGoldGet1"));
        this.labGoldGet2 = (this.view.getChild("labGoldGet2"));
        this.btnGold = (this.view.getChild("btnGold"));
        this.labGoldCost = (this.view.getChild("labGoldCost"));
        this.labSW = (this.view.getChild("labSW"));
        this.btnRecharge = (this.view.getChild("btnRecharge"));
        this.labCoinCount1 = (this.view.getChild("labCoinCount1"));
        this.labCoinCount2 = (this.view.getChild("labCoinCount2"));
        this.labGoldCount1 = (this.view.getChild("labGoldCount1"));
        this.labGoldCount2 = (this.view.getChild("labGoldCount2"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewCountryDonate.prototype.onShown = function () {
        this.addListen();
        this.updateView();
        GGlobal.modelCountry.CG_COUNTRY_DONATION();
    };
    ViewCountryDonate.prototype.onHide = function () {
        this.removeListen();
    };
    ViewCountryDonate.prototype.addListen = function () {
        this.btnGold.addClickListener(this.onGold, this);
        this.btnCoin.addClickListener(this.onCoin, this);
        this.btnRecharge.addClickListener(this.onRecharge, this);
        GGlobal.control.listen(Enum_MsgType.COUNTRY_DONATE_UPDATE, this.updateView, this);
    };
    ViewCountryDonate.prototype.removeListen = function () {
        this.btnGold.removeClickListener(this.onGold, this);
        this.btnCoin.removeClickListener(this.onCoin, this);
        this.btnRecharge.removeClickListener(this.onRecharge, this);
        GGlobal.control.remove(Enum_MsgType.COUNTRY_DONATE_UPDATE, this.updateView, this);
        GGlobal.layerMgr.close(UIConst.COUNTRY_DONATE);
    };
    ViewCountryDonate.prototype.updateView = function () {
        var coinCfg = Config.juanxian_712[1];
        var coinAward = ConfigHelp.SplitStr(coinCfg.AWARD);
        this.labCoinGet1.text = Vo_attr.getAttrName(coinAward[0][0]) + "";
        this.labCoinCount1.text = "+" + coinAward[0][2];
        this.labCoinGet2.text = Vo_attr.getAttrName(coinAward[1][0]) + "";
        this.labCoinCount2.text = "+" + coinAward[1][2];
        var coinUse = ConfigHelp.SplitStr(coinCfg.USE);
        this._coinCost = Number(coinUse[0][2]);
        this.labCoinCost.text = "" + this._coinCost;
        this.labCoinCost.color = this._coinCost > Model_player.voMine.tongbi ? Color.REDINT : Color.GREENINT;
        var color = Model_Country.donateNumCoin > 0 ? Color.GREENSTR : Color.REDSTR;
        this.btnCoin.text = "捐献[color=" + color + "](" + Model_Country.donateNumCoin + "/" + coinCfg.NUM + ")[/color]";
        var goldCfg = Config.juanxian_712[2];
        var goldAward = ConfigHelp.SplitStr(goldCfg.AWARD);
        this.labGoldGet1.text = Vo_attr.getAttrName(goldAward[0][0]) + "";
        this.labGoldCount1.text = "+" + goldAward[0][2];
        this.labGoldGet2.text = Vo_attr.getAttrName(goldAward[1][0]) + "";
        this.labGoldCount2.text = "+" + goldAward[1][2];
        var goldUse = ConfigHelp.SplitStr(goldCfg.USE);
        this._goldCost = Number(goldUse[0][2]);
        this.labGoldCost.text = "" + this._goldCost;
        this.labGoldCost.color = this._goldCost > Model_player.voMine.yuanbao ? Color.REDINT : Color.GREENINT;
        var color = Model_Country.donateNumGold > 0 ? Color.GREENSTR : Color.REDSTR;
        this.btnGold.text = "捐献[color=" + color + "](" + Model_Country.donateNumGold + "/" + goldCfg.NUM + ")[/color]";
        this.labSW.text = "" + Model_player.voMine.prestige;
        this.btnCoin.checkNotice = Model_Country.checkDonate();
    };
    ViewCountryDonate.prototype.onGold = function (e) {
        if (Model_Country.donateNumGold <= 0) {
            ViewCommonWarn.text("捐献次数不足");
            return;
        }
        if (this._goldCost > Model_player.voMine.yuanbao) {
            ModelChongZhi.guideToRecharge();
            return;
        }
        GGlobal.modelCountry.CG_DONATION(2);
    };
    ViewCountryDonate.prototype.onCoin = function (e) {
        if (Model_Country.donateNumCoin <= 0) {
            ViewCommonWarn.text("捐献次数不足");
            return;
        }
        if (this._coinCost > Model_player.voMine.tongbi) {
            ViewCommonWarn.text("铜钱不足");
            return;
        }
        GGlobal.modelCountry.CG_DONATION(1);
    };
    ViewCountryDonate.prototype.onRecharge = function () {
        GGlobal.layerMgr.open(UIConst.SHOP, Config.stroe_218[2].px);
        this.closeEventHandler(null);
    };
    ViewCountryDonate.prototype.resetPosition = function () {
        this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
    };
    ViewCountryDonate.URL = "ui://uwzc58njlyou2";
    return ViewCountryDonate;
}(UIModalPanel));
__reflect(ViewCountryDonate.prototype, "ViewCountryDonate");
