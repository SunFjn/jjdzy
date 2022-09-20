class ViewMainTownLeft extends BaseSceneUI {
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
		this.setXY(-GGlobal.layerMgr.offx, 350);
	}

	public aglin() {
		super.aglin();
		this.bg1.visible = true;
		this.bg1.setSize(88, this._yy);
	}

	public static _instance: ViewMainTownLeft;
	public static get instance(): ViewMainTownLeft {
		if (!ViewMainTownLeft._instance) ViewMainTownLeft._instance = new ViewMainTownLeft();
		return ViewMainTownLeft._instance;
	}
}