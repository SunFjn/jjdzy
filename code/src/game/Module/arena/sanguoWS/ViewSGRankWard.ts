/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewSGRankWard extends UIModalPanel {

	public frame: fairygui.GComponent;
	public lst: fairygui.GList;

	public static URL: string = "ui://me1skowl608au";

	public static createInstance(): ViewSGRankWard {
		return <ViewSGRankWard><any>(fairygui.UIPackage.createObject("Arena", "ViewSGRankWard"));
	}

	public constructor() {
		super();
		this.loadRes();
		this.isShowOpenAnimation = false;
	}

	protected childrenCreated(): void {
		GGlobal.createPack("Arena");
		let a = this;
		a.view = fairygui.UIPackage.createObject("Arena", "ViewSGRankWard").asCom;
		let b = a.contentPane = a.view;

		a.frame = <fairygui.GComponent><any>(b.getChild("frame"));
		a.lst = <fairygui.GList><any>(b.getChild("lst"));
		a.lst.itemRenderer = a.itemRender;
		a.lst.callbackThisObj = a;
		super.childrenCreated();
	}

	private itemRender(i, o) {
		let it: SGRankIt = o as SGRankIt;
		it.setIndex(i, this.maxL);
	}

	private maxL: number = 0;
	protected onShown() {
		let s = this;
		if (s.maxL == 0) {
			let lb = Config.double_230;
			for (let i in lb) {
				s.maxL++;
			}
		}
		s.lst.numItems = s.maxL;
	}

	protected onHide() {
		this.lst.numItems = 0;
		GGlobal.layerMgr.close(UIConst.SGWS_RANK);
	}
}