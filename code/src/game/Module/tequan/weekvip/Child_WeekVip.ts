/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class Child_WeekVip extends fairygui.GComponent {

	public n16: fairygui.GImage;
	public n11: fairygui.GImage;
	public n17: fairygui.GImage;
	public n12: fairygui.GLoader;
	public n1: ViewGrid;
	public n2: ViewGrid;
	public n3: ViewGrid;
	public n5: Button1;
	public lbTime: fairygui.GRichTextField;
	public n13: Button1;

	public static URL: string = "ui://k82cjspuhcde21";

	private static _ins;
	public static createInstance(): ChildCard {
		if (!this._ins) this._ins = <Child_WeekVip><any>(fairygui.UIPackage.createObject("tequan", "Child_WeekVip"));
		return this._ins;
	}


	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.n1 = <ViewGrid><any>(this.getChild("n1"));
		this.n2 = <ViewGrid><any>(this.getChild("n2"));
		this.n3 = <ViewGrid><any>(this.getChild("n3"));
		this.n5 = <Button1><any>(this.getChild("n5"));
		this.n13 = <Button1><any>(this.getChild("n13"));
		this.n16 = <fairygui.GImage><any>(this.getChild("n16"));
		this.n11 = <fairygui.GImage><any>(this.getChild("n11"));
		this.n17 = <fairygui.GImage><any>(this.getChild("n17"));
		this.n12 = <fairygui.GLoader><any>(this.getChild("n12"));
		this.lbTime = <fairygui.GRichTextField><any>(this.getChild("lbTime"));
		this._grids = [this.n1, this.n2, this.n3];
	}

	private onClick() {
		if (Model_Welfare.weekVip_remainTime > 0) {
			GGlobal.modelwelfare.CG_WEEK_VIP_LQ();
		} else {
			GGlobal.modelchongzhi.CG_CHONGZHI_135(51);
		}
	}

	private renewHD() {
		let cfg1 = Config.shop_011[51];
		let tips = "续费成功可立即获得<font color='#15f234'>" + cfg1.num + "元宝</font>\n" + cfg1.name + "有效期延长7天";
		GGlobal.modelchongzhi.CG_CHONGZHI_135(51, tips);
	}

	private setNotice() {
		this.n5.checkNotice = GGlobal.reddot.checkCondition(UIConst.WEEK_VIP);
	}

	private updateX() {
		if (Model_Welfare.weekVip_remainTime > Model_GlobalMsg.getServerTime()) {
			let t = Model_Welfare.weekVip_remainTime - Model_GlobalMsg.getServerTime();
			this.lbTime.text = "" + TimeUitl.getRemainingTime(t, 0);
		}
	}

	private updateUI() {
		this.n11.visible = Model_Welfare.weekVip_remainTime > 0 && Model_Welfare.weekVip_Awards == 2;
		let price = Config.shop_011[51].rmb / 100;
		this.n5.text = Model_Welfare.weekVip_remainTime > 0 ? "领取" : price + "元";
		this.n13.visible = Model_Welfare.weekVip_remainTime > 0;
		this.n5.visible = !this.n11.visible;
		this.n5.checkNotice =  Model_Welfare.weekVip_remainTime > 0;
		this.lbTime.text = Model_Welfare.weekVip_remainTime > 0?"":"尚未激活";
	}

	private _grids: ViewGrid[];
	public open(): void {
		let a = this;
		let cfg = Config.weekcard_267[1];
		let vos = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		for (let i = 0; i < a._grids.length; i++) {
			let grid = a._grids[i];
			grid.tipEnabled = true;
			grid.vo = vos[i];
			grid.showEff(true);
		}

		a.updateUI();

		GGlobal.modelwelfare.CG_OPEN_WEEKVIP();
		a.n5.addClickListener(a.onClick, a);
		a.n13.addClickListener(a.renewHD, a);
		GGlobal.reddot.listen(UIConst.WEEK_VIP, a.setNotice, a);
		GGlobal.control.listen(Enum_MsgType.WELFARE_WEEKVIP_LQ, a.updateUI, a);
		Timer.instance.listen(this.updateX, this, 1000);
		IconUtil.setImg(this.n12, Enum_Path.PIC_URL + "card4.png");
		GGlobal.control.listen(Enum_MsgType.WELFARE_WEEKVIP_OPEN, a.updateUI, a);
	}

	public close() {
		let a = this;
		IconUtil.setImg(this.n12, null);
		Timer.instance.remove(this.updateX, this);
		GGlobal.reddot.remove(UIConst.WEEK_VIP, a.setNotice, a);
		a.n5.removeClickListener(a.onClick, a);
		a.n13.removeClickListener(a.renewHD, a);
		if (a._grids) {
			for (let i = 0; i < a._grids.length; i++) {
				let grid = a._grids[i];
				grid.tipEnabled = false;
				grid.showEff(false);
			}
		}
		GGlobal.control.remove(Enum_MsgType.WELFARE_WEEKVIP_LQ, a.updateUI, a);
		GGlobal.control.remove(Enum_MsgType.WELFARE_WEEKVIP_OPEN, a.updateUI, a);
	}
}