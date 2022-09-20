/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ItemVipGift extends fairygui.GComponent {
	public n1: fairygui.GImage;
	public n2: fairygui.GImage;
	public n3: fairygui.GRichTextField;
	public n4: ViewGrid;
	public n5: ViewGrid;
	public n6: ViewGrid;
	public n7: ViewGrid;
	public n8: ViewGrid;
	public n9: Button1;
	public n12: fairygui.GRichTextField;
	public n15: fairygui.GImage;
	public n11: fairygui.GImage;
	public n13: fairygui.GImage;
	public n14: fairygui.GRichTextField;
	public disLb: fairygui.GRichTextField;
	public n16: fairygui.GGroup;

	public static URL: string = "ui://w4xdcvn7fbywe";

	public static createInstance(): ItemVipGift {
		return <ItemVipGift><any>(fairygui.UIPackage.createObject("vip", "ItemVipGift"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n1 = <fairygui.GImage><any>(this.getChild("n1"));
		this.n2 = <fairygui.GImage><any>(this.getChild("n2"));
		this.n3 = <fairygui.GRichTextField><any>(this.getChild("n3"));
		this.n4 = <ViewGrid><any>(this.getChild("n4"));
		this.n5 = <ViewGrid><any>(this.getChild("n5"));
		this.n6 = <ViewGrid><any>(this.getChild("n6"));
		this.n7 = <ViewGrid><any>(this.getChild("n7"));
		this.n8 = <ViewGrid><any>(this.getChild("n8"));
		this.n9 = <Button1><any>(this.getChild("n9"));
		this.n11 = <fairygui.GImage><any>(this.getChild("n11"));
		this.n12 = <fairygui.GRichTextField><any>(this.getChild("n12"));
		this.n13 = <fairygui.GImage><any>(this.getChild("n13"));
		this.n15 = <fairygui.GImage><any>(this.getChild("n15"));
		this.n14 = <fairygui.GRichTextField><any>(this.getChild("n14"));
		this.n16 = <fairygui.GGroup><any>(this.getChild("n16"));
		this.disLb = <fairygui.GRichTextField><any>(this.getChild("disLb"));

		this.grids = [this.n4, this.n5, this.n6, this.n7, this.n8];
	}

	private buyHD() {
		ViewAlert.show(ConfigHelp.reTxt("是否花费<font color='#ffc334'>{0}元宝</font>购买？", this._price), Handler.create(this, this.goBuy), ViewAlert.OKANDCANCEL);
	}

	private goBuy() {
		let vom = Model_player.voMine;
		if (vom.yuanbao < this._price) {
			ModelChongZhi.guideToRecharge();
		} else {
			GGlobal.modelvip.CG_VIPGIFT_2065(this._vipLv);
		}
	}

	public grids: ViewGrid[] = [];
	public clean() {
		for (let i = 0; i < 4; i++) {
			this.grids[i].tipEnabled = false;
			this.grids[i].showEff(false);
		}
		this.n9.removeClickListener(this.buyHD, this);
	}

	private _price;
	private _vipLv;
	public setdata(vipLv) {
		this.n9.addClickListener(this.buyHD, this);
		this._vipLv = vipLv + 1;
		let cfg = Config.VIP_710[this._vipLv];
		this._price = cfg.lbjg;
		let awards = JSON.parse(cfg.viplb);
		let vos = ConfigHelp.makeItemListArr(awards);
		for (let i = 0; i < 5; i++) {
			let viewg = this.grids[i];
			if (i < awards.length) {
				viewg.vo = vos[i];
				viewg.tipEnabled = true;
				viewg.showEff(true);
				viewg.visible = true;
			} else {
				viewg.visible = false;
				viewg.tipEnabled = false;
				viewg.showEff(false);
			}
		}

		let m = GGlobal.modelvip;
		let mylv = m.vip;

		let canBuy = mylv >= vipLv;
		let hasBuy = m.vipGiftData.indexOf(vipLv + 1) != -1;
		this.disLb.text = cfg.zk + "折";
		this.n9.checkNotice = canBuy;
		this.n9.visible = !hasBuy && canBuy;
		this.n12.visible = !canBuy;
		this.n15.visible = hasBuy;
		this.n16.visible = canBuy && !hasBuy;
		this.n12.text = ConfigHelp.reTxt("VIP{0}可购买", vipLv);
		this.n3.text = ConfigHelp.reTxt("VIP{0}礼包", vipLv);
		this.n14.text = this._price + "";
	}
}