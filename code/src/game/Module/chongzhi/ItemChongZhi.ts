class ItemChongZhi extends fairygui.GComponent {
	public static URL = "ui://42zxp7qjt2yi12";
	public iconGold: fairygui.GLoader;
	public txtYuan: fairygui.GTextField;
	public iconMul: fairygui.GLoader;
	public grpEW: fairygui.GGroup;
	public grpMul: fairygui.GGroup;
	public txtMul: fairygui.GRichTextField;
	public txtNum: fairygui.GRichTextField;
	public constructFromXML(xml) {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);
		self.addClickListener(self.clickHand, self);
	}
	private lastT: number = 0;
	public cfgId: number = 0;
	private clickHand() {
		let now = egret.getTimer();
		if (now - this.lastT < 1000) {
			return;
		}
		this.lastT = now;
		GGlobal.modelchongzhi.CG_CHONGZHI_135(this.cfgId);
	}

	public setdata(datas: number[], index: number) {
		const self = this;
		self.cfgId = datas["ID"];
		const cfg = Config.chongzhi_716[self.cfgId];
		self.txtYuan.text = cfg.RMB + "元";
		self.iconGold.url = fairygui.UIPackage.getItemURL("chongzhi", "yuanbao" + Math.min(6, (index + 1)));
		var mul:number = GGlobal.modelchongzhi.data[index][1];
		switch (mul) {
			case 200:
				self.grpEW.visible = false;
				self.grpMul.visible = true;
				self.txtMul.text = `${cfg.COIN}X2倍`;
				self.iconMul.url = "ui://42zxp7qjdev71x";
				self.txtNum.text = "";
				break;
			case 300:
				self.iconMul.url = "ui://42zxp7qjr6t618";
				self.grpEW.visible = true;
				self.grpMul.visible = true;
				self.txtMul.text = `${cfg.COIN}X2倍`;
				self.txtNum.text = cfg.COIN + "";
				break;
			case 33:
				self.iconMul.url = "ui://42zxp7qjdev71w";
				self.grpEW.visible = true;
				self.grpMul.visible = true;
				self.txtMul.text = `${cfg.COIN}X2倍`;
				self.txtNum.text = cfg.COIN + "";
				break;
			case 320://998
				self.iconMul.url = "ui://42zxp7qjx43e22";
				self.grpEW.visible = true;
				self.grpMul.visible = true;
				self.txtMul.text = `${cfg.COIN}`;
				self.txtNum.text = (cfg.COIN*0.5) + "";
				break;
			case 350://1998
				self.iconMul.url = "ui://42zxp7qjx43e23";
				self.grpEW.visible = true;
				self.grpMul.visible = true;
				self.txtMul.text = `${cfg.COIN}`;
				self.txtNum.text = (cfg.COIN*0.5) + "";
				break;
			default:
				self.iconMul.url = "";
				self.grpEW.visible = false;
				self.grpMul.visible = false;
				self.txtNum.text = "";
				break;
		}
	}
}