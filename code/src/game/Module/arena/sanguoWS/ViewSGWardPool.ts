/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewSGWardPool extends UIModalPanel {


	public frame: fairygui.GComponent;
	public i0: WardItem;
	public i1: WardItem;
	public i2: WardItem;
	public i3: WardItem;

	public static URL: string = "ui://me1skowl608aw";

	public static createInstance(): ViewSGWardPool {
		return <ViewSGWardPool><any>(fairygui.UIPackage.createObject("Arena", "ViewSGWardPool"));
	}

	public constructor() {
		super();
		this.loadRes();
		this.isShowOpenAnimation = false;
	}


	private cards: WardItem[];
	protected childrenCreated(): void {
		GGlobal.createPack("Arena");
		let a = this;
		a.view = fairygui.UIPackage.createObject("Arena", "ViewSGWardPool").asCom;
		let b = a.contentPane = a.view;

		a.frame = <fairygui.GComponent><any>(b.getChild("frame"));
		a.i0 = <WardItem><any>(b.getChild("i0"));
		a.i0.setIndex(1);
		a.i1 = <WardItem><any>(b.getChild("i1"));
		a.i1.setIndex(2);
		a.i2 = <WardItem><any>(b.getChild("i2"));
		a.i2.setIndex(3);
		a.i3 = <WardItem><any>(b.getChild("i3"));
		a.i3.setIndex(4);
		a.cards = [a.i0, a.i1, a.i2, a.i3];
		a.frame = <fairygui.GComponent><any>(b.getChild("frame"));
		super.childrenCreated();
	}

	private update() {
		let a = this;
		for (let i = 0; i < a.cards.length; i++) {
			a.cards[i].update();
		}
	}

	protected onShown() {
		let a = this;
		GGlobal.modelsgws.CG_POOL_1835();
		GGlobal.control.listen(Enum_MsgType.SGWS_POOL, a.update, a);
	}

	protected onHide() {
		let a = this;
		GGlobal.control.remove(Enum_MsgType.SGWS_POOL, a.update, a);
		GGlobal.layerMgr.close(UIConst.SGWS_POOL);
	}
}