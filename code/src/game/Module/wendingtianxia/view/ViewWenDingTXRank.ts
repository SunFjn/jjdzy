/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewWenDingTXRank extends UIModalPanel {
	public c1: fairygui.Controller;
	public frame: fairygui.GLabel;
	public n1: ChildWDTXRank;
	public n6: ChildLayerRank;
	public n5: ChildLianZhanPanel;
	public n7: ChildWDTXScoreRank;
	public n8: TabButton;
	public n2: TabButton;
	public n3: TabButton;
	public n4: TabButton;

	public static URL: string = "ui://gxs8kn67fl2h4";

	public static createInstance(): ViewWenDingTXRank {
		return <ViewWenDingTXRank><any>(fairygui.UIPackage.createObject("wendingTX", "ViewWenDingTXRank"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("wendingTX");
		let s = this;
		s.view = fairygui.UIPackage.createObject("wendingTX", "ViewWenDingTXRank").asCom;
		s.contentPane = s.view;

		s.c1 = s.view.getController("c1");
		s.n1 = <ChildWDTXRank><any>(s.view.getChild("n1"));
		s.n2 = <TabButton><any>(s.view.getChild("n2"));
		s.n3 = <TabButton><any>(s.view.getChild("n3"));
		s.n4 = <TabButton><any>(s.view.getChild("n4"));
		s.n5 = <ChildLianZhanPanel><any>(s.view.getChild("n5"));
		s.n6 = <ChildLayerRank><any>(s.view.getChild("n6"));
		s.n7 = <ChildWDTXScoreRank><any>(s.view.getChild("n7"));
		s.n8 = <TabButton><any>(s.view.getChild("n8"));
		s._tabArr = [s.n2, s.n3, s.n4,s.n7];
		super.childrenCreated();
	}


	private _temp;
	private onPage() {
		if (this._temp) {
			this._temp.close();
			this._temp = null;
		}
		var idx = this.c1.selectedIndex;
		switch (idx) {
			case 0: this._temp = this.n1; break;
			case 1: this._temp = this.n5;  break;
			case 2: this._temp = this.n6; break;
			case 3: this._temp = this.n7;  break;
		}
		this._temp.open();
	}

	private checkNotice() {
		this.n4.checkNotice = GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 1);
		this.n3.checkNotice = GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 2);
		this.n8.checkNotice = GGlobal.reddot.checkCondition(UIConst.WENDINGTX, 3);
	}

	private _last;
	private _tabArr = [];
	protected onShown(): void {
		let s = this;
		s._tabArr[s.c1.selectedIndex].selected = false;
		s.c1.selectedIndex = 0;
		s._tabArr[s.c1.selectedIndex].selected = true;
		this.n1.open();
		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.onPage, s);
		s.checkNotice();
		GGlobal.reddot.listen(UIConst.WENDINGTX, s.checkNotice, s);
	}

	protected onHide(): void {
		let s = this;
		s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.onPage, s);
		GGlobal.reddot.remove(UIConst.WENDINGTX, s.checkNotice, s);
		GGlobal.layerMgr.close(UIConst.WENDINGTX_RANK);
	}
}
