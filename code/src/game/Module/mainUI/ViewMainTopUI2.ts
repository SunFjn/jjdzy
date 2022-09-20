/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewMainTopUI2 extends BaseSceneUI {

	public constructor() {
		super();
	}

	protected initUI(): void {
		this.setSize(640, 100);
		super.initUI();
		let a = this;
		a.LayoutType = fairygui.GroupLayoutType.Horizontal;
		a.btnContainer.setXY(20, 0);
		GGlobal.control.listen(Enum_MsgType.ENTER_SCENE, a.aglin, a);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, ViewMainTopUI1.instance.height+ GGlobal.layerMgr.uiAlign-20);
	}

	public static _instance: ViewMainTopUI2;
	public static get instance(): ViewMainTopUI2 {
		if (!ViewMainTopUI2._instance) ViewMainTopUI2._instance = new ViewMainTopUI2();
		return ViewMainTopUI2._instance;
	}
}