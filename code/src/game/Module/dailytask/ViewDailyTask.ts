class ViewDailyTask extends UIPanelBase {
	public frame: fairygui.GLabel;
	public n0: ChildDailyTask;
	public n6: ChildActPreView;
	public c1: fairygui.Controller;
	public static URL: string = "ui://b3p8szvvg5te1n";
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public static createInstance(): ViewDailyTask {
		return <ViewDailyTask><any>(fairygui.UIPackage.createObject("dailytask", "ViewDailyTask"));
	}

	public constructor() {
		super();
		this.setSkin("dailytask", "dailytask_atlas0", "ViewDailyTask");
	}

	protected setExtends() {
		let func = fairygui.UIObjectFactory.setPackageItemExtension;
		func(ChildDailyTask.URL, ChildDailyTask);
		func(DailyItem.URL, DailyItem);
		func(DailyBaoXiang.URL, DailyBaoXiang);
		func(ChildActPreView.URL, ChildActPreView);
		func(ItemActPreView.URL, ItemActPreView);
		func(ChildTuiSongMsg.URL, ChildTuiSongMsg);
		func(TuSongMsgItem.URL, TuSongMsgItem);
	}

	protected initView(): void {
		super.initView();
		this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.onChange, this);
	}
	private onChange() {
		switch (this.c1.selectedIndex) {
			case 0:
				this.frame.icon = "ui://b3p8szvvkzof1o";
				this.n6.onHide();
				this.n0.open();
				break;
			case 1:
				this.n6.onOpen();
				this.n0.hide();
				this.frame.icon = "ui://b3p8szvvnxbw2m";
				break;
		}
	}

	// protected constructFromXML(xml: any): void {
	// 	super.constructFromXML(xml);

	// 	this.frame = <fairygui.GLabel><any>(this.getChild("frame"));
	// 	this.n0 = <ChildDailyTask><any>(this.getChild("n0"));
	// }

	protected onShown(): void {
		let sf = this;
		const index = this._args;
		if (index) {
			this.c1.setSelectedIndex(index);
		} else {
			this.c1.setSelectedIndex(0);
		}
		GGlobal.modelactPreView.listen(ModelActPreView.msg_datas, sf.updateNot, sf);
		GGlobal.modelactPreView.listen(ModelActPreView.msg_tsmsg_red, sf.updateNot, sf);
		GGlobal.reddot.listen(UIConst.DAILYTASK, sf.checkDailyTaskNotice, sf);
		this.updateNot();
		this.onChange();
		if (ChildTuiSongMsg.isOpenPf()) {
			this.tab2.visible = true;
		} else {
			this.tab2.visible = false;
		}
	}
	private updateNot() {
		this.tab1.checkNotice = GGlobal.modelactPreView.getNotice();
		this.tab2.checkNotice = GGlobal.modelactPreView.getTSMsgNotice();
	}

	private checkDailyTaskNotice() {
		this.tab0.checkNotice = GGlobal.reddot.checkCondition(UIConst.DAILYTASK);
	}

	protected onHide(): void {
		let sf = this;
		sf.n6.onHide();
		sf.n0.hide();
		GGlobal.layerMgr.close(UIConst.DAILYTASK);
		GGlobal.modelactPreView.remove(ModelActPreView.msg_datas, sf.updateNot, sf);
		GGlobal.modelactPreView.remove(ModelActPreView.msg_tsmsg_red, sf.updateNot, sf);
		GGlobal.reddot.remove(UIConst.DAILYTASK, sf.checkDailyTaskNotice, sf);
	}

}