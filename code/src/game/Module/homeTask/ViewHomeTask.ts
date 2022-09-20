class ViewHomeTask extends UIPanelBase {

	public c1: fairygui.Controller;
	public tab0: TabButton;
	public tab1: TabButton;
	public it0: ChildHomeTask;
	public it1: ChildHomeTarget;

	public static URL: string = "ui://oy62ymetd8t60";

	public static createInstance(): ViewHomeTask {
		return <ViewHomeTask><any>(fairygui.UIPackage.createObject("homeTask", "ViewHomeTask"));
	}

	public constructor() {
		super();
		this.setSkin("homeTask", "homeTask_atlas0", "ViewHomeTask");
	}

	protected setExtends() {
		let fac = fairygui.UIObjectFactory;
		fac.setPackageItemExtension(ChildHomeTarget.URL, ChildHomeTarget);
		fac.setPackageItemExtension(ChildHomeTask.URL, ChildHomeTask);
		fac.setPackageItemExtension(ItemHomeTarget.URL, ItemHomeTarget);
		fac.setPackageItemExtension(ItemHomeTask.URL, ItemHomeTask);
		fac.setPackageItemExtension(ItemHomeTaskBao.URL, ItemHomeTaskBao);
	}
	protected initView(): void {
		super.initView();
	}

	protected onShown(): void {
		let s = this;
		let m = GGlobal.model_HomeTask
		s.registerEvent(true);
		s.c1.selectedIndex = 0
		s.selChange()
	}
	protected onHide(): void {
		let self = this;
		self.registerEvent(false);
		self.it0.hide();
		self.it1.hide();
	}

	/**
     * 注册事件的统一入口，最好能集中在这里写
     * @param pFlag 
     */
	private registerEvent(pFlag: boolean): void {
		let self = this;
		GGlobal.reddot.register(pFlag, UIConst.HOME_TASK, self.setNotice, self);
		// GGlobal.model_HomeTask.register(pFlag, Model_HomeTask.OPEN_GOAL, self.upView, self);
		// GGlobal.model_HomeTask.register(pFlag, Model_HomeTask.OPEN_TASK, self.upView, self);
		EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.selChange, self);
	}

	private setNotice() {
		let s = this;
		let red = GGlobal.reddot
		s.tab0.checkNotice = red.checkCondition(UIConst.HOME_TASK, 1);
		s.tab1.checkNotice = red.checkCondition(UIConst.HOME_TASK, 2);
	}

	private selChange() {
		let s = this;
		let m = GGlobal.model_HomeTask
		if (s.c1.selectedIndex == 0) {
			s.it0.show()
			s.it1.hide()
		} else {
			s.it1.show()
			s.it0.hide()
		}
	}
}