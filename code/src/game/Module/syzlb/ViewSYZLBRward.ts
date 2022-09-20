class ViewSYZLBRward extends UIModalPanel {

	public listRew: fairygui.GList;
	public lb: fairygui.GRichTextField;

	public static URL: string = "ui://3o8q23uuqqnwc";

	public static createInstance(): ViewSYZLBRward {
		return <ViewSYZLBRward><any>(fairygui.UIPackage.createObject("syzlb", "ViewSYZLBRward"));
	}


	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("syzlb", "ViewSYZLBRward").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		s.listRew.callbackThisObj = s;
		s.listRew.itemRenderer = s.renderRew
		s.isShowOpenAnimation = false;
		s.isShowMask = false;
		super.childrenCreated();
	}
	private _rewArr: IGridImpl[];
	protected onShown(): void {
		let s = this;
		s.update();
	}

	protected onHide(): void {
		let s = this;
		s.listRew.numItems = 0;
	}

	public resetPosition(): void {
		super.resetPosition();
		this.setXY((fairygui.GRoot.inst.width - this.width) / 2, 100);
	}

	private rewArr: any[];
	private update() {
		let s = this;
		let m = GGlobal.model_Syzlb
		s.lb.text = "第" + m.batId % 1000 + "战"
		let cfg = Config.syzlb_762[m.batId]
		s.rewArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.tgjl))
		s.listRew.numItems = s.rewArr.length;
	}

	private renderRew(index, obj: ViewGrid) {
		obj.tipEnabled = true;
		obj.isShowEff = true;
		obj.vo = this.rewArr[index]
	}
}