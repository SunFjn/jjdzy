/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewMeiRiChongZhi extends UIPanelBase {

	public frame: frame3;
	public bg2: fairygui.GLoader;
	public imgYLQ: fairygui.GImage;
	public n7: fairygui.GImage;
	public btn: Button1;
	public bar: fairygui.GProgressBar;
	public g0: MRBox;
	public g1: MRBox;
	public g2: MRBox;
	public n21: fairygui.GList;
	public n19: fairygui.GList;
	public boxArr: MRBox[] = [];
	public static URL: string = "ui://zzz8io3rrh401";

	public static createInstance(): ViewMeiRiChongZhi {
		return <ViewMeiRiChongZhi><any>(fairygui.UIPackage.createObject("shouchong", "ViewMeiRiChongZhi"));
	}

	public constructor() {
		super();
		this.setSkin("shouchong", "shouchong_atlas0", "ViewMeiRiChongZhi");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(MRBox.URL, MRBox);
	}
	protected initView(): void {
		super.initView();
		let s = this;
		s.g0.ids = 1;
		s.g1.ids = 2;
		s.g2.ids = 3;
		s.boxArr = [s.g0, s.g1, s.g2];
		s.bar.max = 6;
		s.n21.callbackThisObj = s;
		s.n21.itemRenderer = s.listRender;
		s.n19.callbackThisObj = s;
		s.n19.itemRenderer = s.listRenderTop;
	}

	private awards0 = [];
	private listRenderTop(idx, obj) {
		let item: ViewGridRender = obj as ViewGridRender;
		item.vo = this.awards0[idx];
		item.tipEnabled = true;
		item.grid.showEff(true);
	}

	private awards = [];
	private listRender(idx, obj) {
		let item: ViewGridRender = obj as ViewGridRender;
		item.vo = this.awards[idx];
		item.tipEnabled = true;
		item.grid.showEff(true);
	}

	private lqHandler() {
		if (this.st == 1) {
			GGlobal.modelRecharge.CG_MRSC_1935();
		} else {
			GGlobal.layerMgr.close2(UIConst.MEIRISHOUCHONG);
			ViewChongZhi.tryToOpenCZ();
		}
	}

	private update() {
		let m = GGlobal.modelRecharge;
		let s = this;
		let st = s.st = m.mrscState;
		s.btn.checkNotice = st == 1;
		s.btn.text = st == 1 ? "领取" : "充点小钱";
		s.btn.visible = st != 2;
		s.imgYLQ.visible = st == 2;

		for (var i = 0; i < 3; i++) {
			let b = this.boxArr[i];
			b.setSt(m.mrscBox[i][0]);
		}
		this.bar.value = m.day;
	}

	private st: number = 0;
	private grids: any[] = [];
	protected onShown() {
		let s = this;
		let a = Config.meirishouchong_715[1].AWARD;
		a = JSON.parse(a);
		let tempAward= ConfigHelp.makeItemListArr(a);
		this.awards = tempAward.slice(0,2);
		this.awards0 = tempAward.slice(2,tempAward.length);
		s.n19.numItems = this.awards0.length;
		s.n21.numItems = this.awards.length;
		s.btn.addClickListener(s.lqHandler, s);
   
		// ImageLoader.instance.loader(Enum_Path.PIC_URL+"shouchong.jpg", s.bg2);
		IconUtil.setImg(s.bg2, Enum_Path.PIC_URL + "shouchong.jpg");
		GGlobal.control.listen(Enum_MsgType.MEIRISHOUCHONGUP, s.update, s);
		GGlobal.modelRecharge.CG_MRSC_1931();
	}

	protected onHide() {
		let s = this;
		IconUtil.setImg(s.bg2, null);
		this.n19.numItems = 0;
		this.n21.numItems = 0;
		GGlobal.layerMgr.close2(UIConst.MEIRISHOUCHONG);
		GGlobal.control.remove(Enum_MsgType.MEIRISHOUCHONGUP, s.update, s);
		this.btn.removeClickListener(s.lqHandler, s);
	}
}