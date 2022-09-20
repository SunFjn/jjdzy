/** self is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildGodWuJiangView extends fairygui.GComponent {

	public c1: fairygui.Controller;
	public container: fairygui.GComponent;
	public tab000: TabButton;
	public tab001: TabButton;

	public static URL: string = "ui://zyx92gzwnlyo4m";

	public static createInstance(): ChildGodWuJiangView {
		return <ChildGodWuJiangView><any>(fairygui.UIPackage.createObject("wuJiang", "ChildGodWuJiangView"));
	}

	public constructor() {
		super();
	}

	private _tabContronller: TabController;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self._tabContronller = new TabController();
		self._tabContronller.initView(self, self.c1);
		self._tabContronller.setPanelClassMap(
			[
				ChildGodWuJiang,
				ChildGodWuJiangXiuLian
			]
		);
		self._tabContronller.tabChange = self.onTabChange;
		self._tabContronller.tabChangeCaller = self;
	}

	onTabChange = (pTabIndex: number, pVo: TabBtnVo) => {
		return true;
	}

	checkNotice(){
		this._tabContronller.getTabBtnByIndex(0).checkNotice = GGlobal.reddot.checkCondition(UIConst.GOD_WUJIANG,0)|| GGlobal.reddot.checkCondition(UIConst.GOD_WUJIANG,2)||GGlobal.reddot.checkCondition(UIConst.JUEXING,7);
		this._tabContronller.getTabBtnByIndex(1).checkNotice = GGlobal.reddot.checkCondition(UIConst.GOD_WUJIANG,1);
	}

	openPanel = (sel) => {
		let self = this;
		ViewWuJiangPanel._selPage = 2;
		self._tabContronller.registerEvent(true);
		self.checkNotice();

		self._tabContronller.selectedIndex = -1;
		self._tabContronller.selectedIndex = sel;
		GGlobal.reddot.listen(UIConst.GOD_WUJIANG, self.checkNotice, self);
	}

	closePanel = () => {
		let self = this;
		self._tabContronller.registerEvent(false);
		self._tabContronller.close();

		GGlobal.reddot.remove(UIConst.GOD_WUJIANG, self.checkNotice, self);
	}

	dispose() {
		this.closePanel();
		if (this._tabContronller)
			this._tabContronller.destroy();
		super.dispose();
	}
}