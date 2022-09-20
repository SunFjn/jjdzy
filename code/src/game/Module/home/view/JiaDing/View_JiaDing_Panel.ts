class View_JiaDing_Panel extends UIPanelBase {

	public c1: fairygui.Controller;
	public frame: fairygui.GLabel;
	public tab0: TabButton;
	public tab1: TabButton;

	public static URL: string = "ui://ypo8uejwctaj0";
	public constructor() {
		super();
		this.setSkin("JiaDing", "JiaDing_atlas0", "View_JiaDing_Panel");
	}

	protected setExtends() {
		var f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(Child_JiaDing_UpJie.URL, Child_JiaDing_UpJie);
		f(Child_JiaDing_JinSheng.URL, Child_JiaDing_JinSheng);
		f(JiaDingJinShengRoleItem.URL, JiaDingJinShengRoleItem);
		f(JiaDingSkill.URL, JiaDingSkill);
	}

	private _tabContronller: TabController;
	protected initView(): void {
		let self = this;
		self._tabContronller = new TabController();
		self._tabContronller.initView(self, self.c1);
		self._tabContronller.setPanelClassMap(
			[
				Child_JiaDing_UpJie,
				Child_JiaDing_JinSheng,
			]
		);

		self._tabContronller.tabChange = self.onTabChange;
		self._tabContronller.tabChangeCaller = self;
	}

	private onTabChange(pTabIndex: number, pVo: TabBtnVo): boolean {
		return true;
	}

	protected onShown(): void {
		let self = this;
		self._tabContronller.registerEvent(true);
		self.registerEvent(true)
		self.setNotice();
		let t_selectIndex = 0;
		if (self._args)
			t_selectIndex = self._args;
		self._tabContronller.selectedIndex = -1;
		self._tabContronller.selectedIndex = t_selectIndex;
	}

	protected onHide(): void {
		let self = this;
		self.registerEvent(false)
		self._tabContronller.registerEvent(false);
		self._tabContronller.close();
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		GGlobal.reddot.register(pFlag, UIConst.HOME_JIADING, self.setNotice, self);
	}

	private setNotice() {
		let s = this;
		s.tab0.checkNotice = GGlobal.reddot.checkCondition(UIConst.HOME_JIADING, 1);
		s.tab1.checkNotice = GGlobal.reddot.checkCondition(UIConst.HOME_JIADING, 2);
	}
}