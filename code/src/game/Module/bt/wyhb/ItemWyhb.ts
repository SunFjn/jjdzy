class ItemWyhb extends fairygui.GComponent {
	public c1: fairygui.Controller;
	public c2: fairygui.Controller;
	public btnlq: Button2;
	public lbLev: fairygui.GRichTextField;
	public lbYb: fairygui.GRichTextField;
	public lbcz: fairygui.GRichTextField;
	public static URL: string = "ui://27qy37vtk7mb8";

	public static createInstance(): ItemWyhb {
		return <ItemWyhb>(fairygui.UIPackage.createObject("wyhb", "ItemWyhb"));
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	private idx;
	private condition;
	public setdata(idx) {
		const self = this;
		self.idx = idx;
		let model = GGlobal.modelBT;
		let indexType = ViewWYHB.selectIndex
		let data;
		if (indexType == 0) {
			self.c2.setSelectedIndex(0);
			data = model.wyhb_lib_lvl;
		} else {
			data = model.wyhb_lib_yb;
			self.c2.setSelectedIndex(1);
		}
		let lib: Iwyhb_780 = data[idx];
		let condition = lib.limit;
		self.condition = condition;
		self.idx = lib.id;
		if (indexType == 0) {
			self.lbLev.text = condition + "级";
			self.btnlq.checkNotice = condition <= Model_player.voMine.level;
		} else {
			self.lbcz.text = "累充" + condition + "元";
			self.btnlq.checkNotice = condition <= ModelBT.realRechargeValue;
		}
		if (model.wyhb_data_yb.indexOf(lib.id) != -1 || model.wyhb_data_lvl.indexOf(lib.id) != -1) {
			self.c1.setSelectedIndex(1);
		} else {
			self.c1.setSelectedIndex(0);
		}

		self.lbYb.text = lib.show + "元";;
		self.btnlq.addClickListener(self.lqHd, self);
	}

	public clean() {
		const self = this;
		self.btnlq.removeClickListener(self.lqHd, self);
	}

	private lqHd() {
		const self = this;
		let indexType = ViewWYHB.selectIndex
		if (indexType == 0) {
			if (Model_player.voMine.level < self.condition) {
				ViewCommonWarn.text("等级不足");
				return;
			}
		} else {
			if (ModelBT.realRechargeValue < self.condition) {
				ViewCommonWarn.text("条件未达成");
				return;
			}
		}
		GGlobal.modelBT.CG_get_20013(self.idx);
	}
}