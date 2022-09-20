class ViewFenghuoRank extends UIModalPanel {

	public c1: fairygui.Controller;
	public frame: fairygui.GLabel;
	public n2: TabButton;
	public n3: TabButton;
	public n4: TabButton;
	public n7: ChildFHPlayerRank;
	public n9: ChildServerRank;
	public n8: ChildScoreRank;

	public static URL: string = "ui://edvdots4kzd9f";

	public static createInstance(): ViewFenghuoRank {
		return <ViewFenghuoRank><any>(fairygui.UIPackage.createObject("FengHuoLY", "ViewFenghuoRank"));
	}

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(ChildFHPlayerRank.URL, ChildFHPlayerRank);
		fairygui.UIObjectFactory.setPackageItemExtension(ChildServerRank.URL, ChildServerRank);
		fairygui.UIObjectFactory.setPackageItemExtension(ChildScoreRank.URL, ChildScoreRank);
		fairygui.UIObjectFactory.setPackageItemExtension(FHServerRankItem.URL, FHServerRankItem);
		fairygui.UIObjectFactory.setPackageItemExtension(FHPlayerRankItem.URL, FHPlayerRankItem);
		fairygui.UIObjectFactory.setPackageItemExtension(FengHuoScoreItem.URL, FengHuoScoreItem);
		this.loadRes("FengHuoLY", "FengHuoLY_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("FengHuoLY");
		let sf = this;
		sf.view = fairygui.UIPackage.createObject("FengHuoLY", "ViewFenghuoRank").asCom;
		sf.contentPane = sf.view;

		sf.c1 = sf.view.getController("c1");
		sf.frame = <fairygui.GLabel><any>(sf.view.getChild("frame"));
		sf.n2 = <TabButton><any>(sf.view.getChild("n2"));
		sf.n3 = <TabButton><any>(sf.view.getChild("n3"));
		sf.n4 = <TabButton><any>(sf.view.getChild("n4"));
		sf.n7 = <ChildFHPlayerRank><any>(sf.view.getChild("n7"));
		sf.n9 = <ChildServerRank><any>(sf.view.getChild("n9"));
		sf.n8 = <ChildScoreRank><any>(sf.view.getChild("n8"));

		sf.tabArr = [sf.n2, sf.n3, sf.n4];
		super.childrenCreated();
	}

	private _page;
	private tabArr;
	public showPage() {
		if (this._page) this._page.hide();
		switch (this.c1.selectedIndex) {
			case 0:
				this._page = this.n7;
				break;
			case 1:
				this._page = this.n9;
				break;
			case 2:
				this._page = this.n8;
				break;
		}
		this._page.show();
	}
	private addRedot(){
		this.n4.checkNotice= GGlobal.reddot.checkCondition(UIConst.FHLY);
	}

	protected onShown() {
		let sf = this;
		sf.c1.selectedIndex = 0;
		sf.tabArr[0].selected = true;
		sf.addRedot();
		sf.showPage();
		GGlobal.modelFengHuoLY.CG_PLAYERRANK_3553();
		GGlobal.reddot.listen(UIConst.FHLY, sf.addRedot, sf);
		sf.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, sf.showPage, sf);
	}

	protected onHide() {
		let sf = this;
		GGlobal.reddot.remove(UIConst.FHLY, sf.addRedot, sf);
		sf.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, sf.showPage, sf);
		if (this._page) this._page.hide();
		GGlobal.layerMgr.close(UIConst.FHLY_RANK);
	}
}