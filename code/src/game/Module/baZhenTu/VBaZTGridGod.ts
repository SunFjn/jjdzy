class VBaZTGridGod extends fairygui.GComponent {

	public grid: VBaZTGrid;
	public lbName: fairygui.GRichTextField;
	public imgIt: fairygui.GLoader;
	public lbCt: fairygui.GRichTextField;
	public countLb: fairygui.GRichTextField;
	public btn: fairygui.GButton;

	public static URL: string = "ui://xrzn9ppairzj2c";

	public static createInstance(): VBaZTGridGod {
		return <VBaZTGridGod><any>(fairygui.UIPackage.createObject("baZhenTu", "VBaZTGridGod"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s)
		s.btn.addClickListener(s.onBuy, s)
	}

	private _vo: Ibztsf_261;
	public set vo(v: Ibztsf_261) {
		let s = this;
		s._vo = v;

		let it = ConfigHelp.makeItem(JSON.parse(v.consume)[0]);
		IconUtil.setImg(s.imgIt, Enum_Path.ICON70_URL + it.icon + ".png")
		s.lbCt.text = it.count + "";
		if (v.shangxian > 0) {
			s.countLb.visible = true;
			let exchangeNum = GGlobal.modelBaZhenTu.godFuWenData[v.sf] ? GGlobal.modelBaZhenTu.godFuWenData[v.sf] : 0;
			let color = exchangeNum >= v.shangxian ? 6 : 2;
			s.countLb.text = "剩余：" + HtmlUtil.fontNoSize((v.shangxian - exchangeNum) + "/" + v.shangxian, Color.getColorStr(color));
		} else {
			s.countLb.visible = false;
		}
		let sf = Config.bztzf_261[v.sf];
		s.lbName.text = ConfigHelp.createColorName(sf.name, sf.pz)
		s.grid.isShowEff = true
		s.grid.tipEnable = true;
		let vb: VoBaZhenTu = new VoBaZhenTu();
		vb.id = sf.id;//符文id
		vb.starLv = 1;//符文星级
		vb.level = 0;//符文等级
		vb.initLib()
		s.grid.vo = vb;
	}

	private onBuy() {
		let s = this;
		if (!s._vo) {
			return;
		}
		let exchangeNum = GGlobal.modelBaZhenTu.godFuWenData[s._vo.sf] ? GGlobal.modelBaZhenTu.godFuWenData[s._vo.sf] : 0;
		if (s._vo.shangxian != 0 && exchangeNum >= s._vo.shangxian) {
			ViewCommonWarn.text("当前符文已全部兑完");
			return;
		}
		let it = ConfigHelp.makeItem(JSON.parse(s._vo.consume)[0]);
		let ct = Model_Bag.getItemCount(it.id);
		if (ct < it.count) {
			View_CaiLiao_GetPanel.show(it as VoItem)
			return;
		}
		GGlobal.modelBaZhenTu.CG_BUY_4425(s._vo.id)
	}

	public clean() {
		super.clean();
		let s = this;
		IconUtil.setImg(s.imgIt, "")
		s.grid.clean();
	}
}