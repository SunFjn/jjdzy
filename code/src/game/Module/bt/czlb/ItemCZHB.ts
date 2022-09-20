class ItemCZHB extends fairygui.GComponent {
	public lbPro: fairygui.GRichTextField;
	public btn: fairygui.GButton;
	public ylq: fairygui.GImage;
	public list: fairygui.GList;
	public lbTips: fairygui.GRichTextField;
	public lbPrice: fairygui.GRichTextField;
	public static URL: string = "ui://2o8uvlozk7mb4";

	public static createInstance(): ItemCZHB {
		return <ItemCZHB>(fairygui.UIPackage.createObject("czlb", "ItemCZHB"));
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	private idx;
	public setdata(idx) {
		const self = this;
		let model = GGlobal.modelBT;
		let indexType = ViewCZHB.selectIndex;
		let lib: Iczlb_781;
		if (indexType == 0) {
			lib = model.czhb_lib_week[idx];
		} else {
			lib = model.czhb_lib_mouth[idx];
		}
		self.idx = lib.czid;
		ConfigHelp.createViewGridList(self.list, lib.reward, self);

		let count = model.czhb_data[lib.id];
		if (count <= 0) {
			self.btn.visible = false;
			self.ylq.visible = true;
			self.noCount = 1;
		} else {
			self.noCount = 0;
			self.btn.visible = true;
			self.ylq.visible = false;
		}

		self.lbPrice.text = ConfigHelp.reTxt("原价：{0}元", lib.price);
		self.lbTips.text = ConfigHelp.reTxt("限购次数：{0}", count);
		self.lbPro.text = lib.name;
		self.btn.text = lib.limit+"元";

		self.btn.addClickListener(self.clickHD, self);
	}
	noCount = 0;
	private clickHD = () => {
		if(!this.noCount){
			GGlobal.modelchongzhi.CG_CHONGZHI_135(this.idx, null, false);
		}else{
			ViewCommonWarn.text("没有次数");
		}
	}

	public clean() {
		const self = this;
		self.list.numItems = 0;
		self.btn.removeClickListener(self.clickHD, self);
	}
}