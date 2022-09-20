class ChildMoneyTreeProgress extends fairygui.GComponent {

	public n10: Button1;
	public lbTime: fairygui.GRichTextField;
	public lbMoney: fairygui.GRichTextField;

	public static URL: string = "ui://y0plc878wy1s1s";

	public static createInstance(): ChildMoneyTreeProgress {
		return <ChildMoneyTreeProgress><any>(fairygui.UIPackage.createObject("home", "ChildMoneyTreeProgress"));
	}

	public constructor() {
		super();
	}


	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	update(opt) {
		let self = this;
		let model = GGlobal.homemodel;
		let id = model.getBuildCfgIDByType(HomeModel.GOD_HOUSE);
		if (id) {
			let t = JSON.parse(Config.fddc_019[model.home_type].zengjia)[0][2];
			let a = Config.fdjk_019[id];
			self.lbTime.text = ConfigHelp.numToStr(model.god_awards) + "/" + ConfigHelp.numToStr(a.cishu / 600 * t);
			self.lbMoney.text = t * 6 + "/时";
		}
	}

	public role: ArpgRole;
	public onAdd() {
		let self = this;
		self.setXY(-100, -150);
		self.n10.text = GGlobal.homemodel.isSelfHome?"领取":"窃取";
		self.role.headGroup.addChild(self.displayObject);
	}
	public onRemove() {
		let a = this;
		a.role.headGroup.removeChild(a.displayObject);
		Pool.recover("ChildMoneyTreeProgress", a);
	}

	public static create(role): ChildMoneyTreeProgress {
		let temp: ChildMoneyTreeProgress = Pool.getItemByCreateFun("ChildMoneyTreeProgress", ChildMoneyTreeProgress.createInstance) as ChildMoneyTreeProgress;
		temp.role = role;
		return temp;
	}
	public autoRemove = true;
}