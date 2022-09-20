class ViewCountryDonate extends UIModalPanel {

	public labTitle: fairygui.GTextField;
	public labCoinGet1: fairygui.GRichTextField;
	public labCoinGet2: fairygui.GRichTextField;
	public btnCoin: Button0;
	public labCoinCost: fairygui.GRichTextField;
	public labGoldGet1: fairygui.GRichTextField;
	public labGoldGet2: fairygui.GRichTextField;
	public btnGold: fairygui.GButton;
	public labGoldCost: fairygui.GRichTextField;
	public labSW: fairygui.GRichTextField;
	public btnRecharge: fairygui.GRichTextField;
	public labCoinCount1: fairygui.GRichTextField;
	public labCoinCount2: fairygui.GRichTextField;
	public labGoldCount1: fairygui.GRichTextField;
	public labGoldCount2: fairygui.GRichTextField;

	public static URL: string = "ui://uwzc58njlyou2";

	public static createInstance(): ViewCountryDonate {
		return <ViewCountryDonate><any>(fairygui.UIPackage.createObject("country", "ViewCountryDonate"));
	}

	public constructor() {
		super();
		this.loadRes("country", "country_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("country");
		this.view = fairygui.UIPackage.createObject("country", "ViewCountryDonate").asCom;
		this.contentPane = this.view;

		this.labTitle = <fairygui.GTextField><any>(this.view.getChild("labTitle"));
		this.labCoinGet1 = <fairygui.GRichTextField><any>(this.view.getChild("labCoinGet1"));
		this.labCoinGet2 = <fairygui.GRichTextField><any>(this.view.getChild("labCoinGet2"));
		this.btnCoin = <Button0><any>(this.view.getChild("btnCoin"));
		this.labCoinCost = <fairygui.GRichTextField><any>(this.view.getChild("labCoinCost"));
		this.labGoldGet1 = <fairygui.GRichTextField><any>(this.view.getChild("labGoldGet1"));
		this.labGoldGet2 = <fairygui.GRichTextField><any>(this.view.getChild("labGoldGet2"));
		this.btnGold = <fairygui.GButton><any>(this.view.getChild("btnGold"));
		this.labGoldCost = <fairygui.GRichTextField><any>(this.view.getChild("labGoldCost"));
		this.labSW = <fairygui.GRichTextField><any>(this.view.getChild("labSW"));
		this.btnRecharge = <fairygui.GRichTextField><any>(this.view.getChild("btnRecharge"));
		this.labCoinCount1 = <fairygui.GRichTextField><any>(this.view.getChild("labCoinCount1"));
		this.labCoinCount2 = <fairygui.GRichTextField><any>(this.view.getChild("labCoinCount2"));
		this.labGoldCount1 = <fairygui.GRichTextField><any>(this.view.getChild("labGoldCount1"));
		this.labGoldCount2 = <fairygui.GRichTextField><any>(this.view.getChild("labGoldCount2"));
		super.childrenCreated();
	}

	protected onShown(): void {
		this.addListen();
		this.updateView();
		GGlobal.modelCountry.CG_COUNTRY_DONATION()
	}

	protected onHide(): void {
		this.removeListen();
	}

	private addListen(): void {
		this.btnGold.addClickListener(this.onGold, this);
		this.btnCoin.addClickListener(this.onCoin, this);
		this.btnRecharge.addClickListener(this.onRecharge, this);
		GGlobal.control.listen(Enum_MsgType.COUNTRY_DONATE_UPDATE, this.updateView, this)
	}

	private removeListen(): void {
		this.btnGold.removeClickListener(this.onGold, this);
		this.btnCoin.removeClickListener(this.onCoin, this);
		this.btnRecharge.removeClickListener(this.onRecharge, this);
		GGlobal.control.remove(Enum_MsgType.COUNTRY_DONATE_UPDATE, this.updateView, this);
		GGlobal.layerMgr.close(UIConst.COUNTRY_DONATE);
	}

	private _goldCost: number;
	private _coinCost: number;
	private updateView(): void {
		var coinCfg = Config.juanxian_712[1];
		var coinAward = ConfigHelp.SplitStr(coinCfg.AWARD);
		this.labCoinGet1.text = Vo_attr.getAttrName(coinAward[0][0]) + "";
		this.labCoinCount1.text = "+" + coinAward[0][2];
		this.labCoinGet2.text = Vo_attr.getAttrName(coinAward[1][0]) + "";
		this.labCoinCount2.text = "+" + coinAward[1][2];
		var coinUse = ConfigHelp.SplitStr(coinCfg.USE)
		this._coinCost = Number(coinUse[0][2]);
		this.labCoinCost.text = "" + this._coinCost;
		this.labCoinCost.color = this._coinCost > Model_player.voMine.tongbi ? Color.REDINT : Color.GREENINT
		var color = Model_Country.donateNumCoin > 0 ? Color.GREENSTR : Color.REDSTR
		this.btnCoin.text = "捐献[color=" + color + "](" + Model_Country.donateNumCoin + "/" + coinCfg.NUM + ")[/color]"

		var goldCfg = Config.juanxian_712[2];
		var goldAward = ConfigHelp.SplitStr(goldCfg.AWARD);
		this.labGoldGet1.text = Vo_attr.getAttrName(goldAward[0][0]) + "";
		this.labGoldCount1.text = "+" + goldAward[0][2];
		this.labGoldGet2.text = Vo_attr.getAttrName(goldAward[1][0]) + "";
		this.labGoldCount2.text = "+" + goldAward[1][2];
		var goldUse = ConfigHelp.SplitStr(goldCfg.USE)
		this._goldCost = Number(goldUse[0][2]);
		this.labGoldCost.text = "" + this._goldCost;
		this.labGoldCost.color = this._goldCost > Model_player.voMine.yuanbao ? Color.REDINT : Color.GREENINT
		var color = Model_Country.donateNumGold > 0 ? Color.GREENSTR : Color.REDSTR
		this.btnGold.text = "捐献[color=" + color + "](" + Model_Country.donateNumGold + "/" + goldCfg.NUM + ")[/color]"
		this.labSW.text = "" + Model_player.voMine.prestige;

		this.btnCoin.checkNotice = Model_Country.checkDonate();
	}

	private onGold(e: egret.TouchEvent): void {
		if (Model_Country.donateNumGold <= 0) {
			ViewCommonWarn.text("捐献次数不足");
			return;
		}
		if (this._goldCost > Model_player.voMine.yuanbao) {
			ModelChongZhi.guideToRecharge();
			return;
		}
		GGlobal.modelCountry.CG_DONATION(2)
	}

	private onCoin(e: egret.TouchEvent): void {
		if (Model_Country.donateNumCoin <= 0) {
			ViewCommonWarn.text("捐献次数不足");
			return;
		}
		if (this._coinCost > Model_player.voMine.tongbi) {
			ViewCommonWarn.text("铜钱不足");
			return;
		}
		GGlobal.modelCountry.CG_DONATION(1)
	}

	private onRecharge(): void {
		GGlobal.layerMgr.open(UIConst.SHOP, Config.stroe_218[2].px);
		this.closeEventHandler(null);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
	}
}