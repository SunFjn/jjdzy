/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewTianShuTunShi extends UIModalPanel {
	public grid: ViewGrid
	// public bg: fairygui.GLoader;
	// public imgIcon: fairygui.GLoader;
	public labName: fairygui.GTextField;
	public labHas: fairygui.GTextField;
	public labCount: fairygui.GTextField;
	public lab: fairygui.GTextField;
	public labAttr: fairygui.GTextField;
	public btnEat: Button0;
	public btnOneKey: Button1;

	public static URL: string = "ui://jvxpx9emur2m3da";

	public static createInstance(): ViewTianShuTunShi {
		return <ViewTianShuTunShi><any>(fairygui.UIPackage.createObject("common", "TipEatDan"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("common", "TipEatDan").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	private onClickEat(e: egret.TouchEvent) {
		var c = Model_Bag.getItemCount(this.ids);
		if (c < 1) {
			View_CaiLiao_GetPanel.show(VoItem.create(this.ids));
			return;
		}
		var m = GGlobal.modeltianshu;
		if (m.shuxingdan >= this.maxdrug) ViewCommonWarn.text("已达上限");
		else {
			if (e.currentTarget == this.btnEat) GGlobal.modeltianshu.CG_TUNSHI_979(0);
			else GGlobal.modeltianshu.CG_TUNSHI_979(1);
		}
	}

	private ids: number = 0;
	private maxdrug: number = 0;
	private update() {
		var s = this;
		var m = GGlobal.modeltianshu;
		var lib = Config.drug_200[8];
		s.ids = m.drugID;
		var vo = VoItem.create(s.ids);
		this.labName.text = vo.name;
		this.labName.color = Color.getColorInt(vo.cfg.quality)

		s.grid.tipEnabled = false;
		s.grid.isShowEff = true;
		s.grid.vo = vo
		// ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + vo.quality + ".png", this.bg);
		// ImageLoader.instance.loader(Enum_Path.ICON70_URL + vo.icon + ".png", this.imgIcon);
		s.maxdrug = m.getDrugCount();
		this.labHas.text = "已吞噬：" + m.shuxingdan + "/" + s.maxdrug;
		var c = Model_Bag.getItemCount(s.ids);
		s.btnEat.checkNotice = s.btnOneKey.checkNotice = c > 0 && m.getDrugCount() > m.shuxingdan;
		s.labCount.text = "拥有数量：" + c;

		var att = JSON.parse(lib["attr"]);
		att = s.attsBonus(att, m.shuxingdan);
		s.labAttr.text = ConfigHelp.makeAttrTextArr(att);
		this.lab.text = "天书激活（升星）可增加吞噬上限"
	}

	public attsBonus(arr: any[], s): any[] {
		var temp = [];
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			let key = arr[i][0];
			let val = arr[i][1];
			temp.push([key, val * s]);
		}
		return temp;
	}

	protected onShown() {
		let self = this;
		self.update();
		self.btnOneKey.addClickListener(self.onClickEat, self);
		self.btnEat.addClickListener(self.onClickEat, self);
		GGlobal.control.listen(Enum_MsgType.MSG_TS_DRUG, self.update, self);
	}
	protected onHide() {
		let self = this;
		var m = GGlobal.modeltianshu;
		self.btnOneKey.removeClickListener(self.onClickEat, self);
		self.btnEat.removeClickListener(self.onClickEat, self);
		GGlobal.control.remove(Enum_MsgType.MSG_TS_DRUG, self.update, self);
		GGlobal.layerMgr.close(UIConst.TIANSHUDRAG);
		self.grid.clean()
	}
}