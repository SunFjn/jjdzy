/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewLvBu extends UIPanelBase {

	public frame: fairygui.GComponent;
	public n1: ChildLvBu;
	public n2: fairygui.GImage;

	public static URL: string = "ui://47jfyc6esx3836";

	public static createInstance(): ViewLvBu {
		return <ViewLvBu><any>(fairygui.UIPackage.createObject("Boss", "ViewLvBu"));
	}

	public constructor() {
		super();
		this.isShowOpenAnimation = false;
		this.setSkin("Boss", "Boss_atlas0", "ViewLvBu");
	}
	protected setExtends() {
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(LvBuItem.URL, LvBuItem);
		f(LvBuSceneInfo.URL, LvBuSceneInfo);
		f(ChildLvBu.URL, ChildLvBu);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.frame = <fairygui.GComponent><any>(this.getChild("frame"));
		this.n1 = <ChildLvBu><any>(this.getChild("n1"));
		this.n2 = <fairygui.GImage><any>(this.getChild("n2"));
	}

	protected onShown() {
		let s = this;
		this.n1.open();
	}

	protected onHide() {
		let s = this;
		this.n1.close();
		GGlobal.layerMgr.close(UIConst.LBBOSS);
	}
}