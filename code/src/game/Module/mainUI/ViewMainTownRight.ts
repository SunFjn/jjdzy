class ViewMainTownRight extends BaseSceneUI {
	public constructor() {
		super();
	}

	private bg1;
	protected initUI(): void {
		this.bg1 = new fairygui.GLoader();
		this.bg1.setSize(88, 357);
		this.bg1.fill = fairygui.LoaderFillType.ScaleFree;
		this.bg1.url = "ui://7gxkx46ww6ro5n";
		this.bg1.setXY(0, 6);
		this.bg1.visible = false;
		this.addChild(this.bg1);
		super.initUI();
		this.btnContainer.setXY(5, 6);
		this.LayoutType = fairygui.GroupLayoutType.Vertical;
	}

	public resetPosition(): void {
		this.setXY(fairygui.GRoot.inst.width - 100 + GGlobal.layerMgr.offx,fairygui.GRoot.inst.height-320);
	}

	public static _instance: ViewMainTownRight;
	public static get instance(): ViewMainTownRight {
		if (!ViewMainTownRight._instance) ViewMainTownRight._instance = new ViewMainTownRight();
		return ViewMainTownRight._instance;
	}
}