class ViewMainTownTop extends BaseSceneUI {
	public constructor() {
		super();
	}

	protected initUI(): void {
		super.initUI();
		let a = this;
		a.LayoutType = fairygui.GroupLayoutType.Horizontal;
		a.btnContainer.setXY(20, 0);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, ViewMainTopUI1.instance.height+ GGlobal.layerMgr.uiAlign);
	}

	public static _instance: ViewMainTownTop;
	public static get instance(): ViewMainTownTop {
		if (!ViewMainTownTop._instance) 
			ViewMainTownTop._instance = new ViewMainTownTop();
		return ViewMainTownTop._instance;
	}
}