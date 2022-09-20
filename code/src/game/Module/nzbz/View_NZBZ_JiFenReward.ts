class View_NZBZ_JiFenReward extends UIModalPanel {

	public frame: fairygui.GComponent;
	public list: fairygui.GList;

	public static URL: string = "ui://xzyn0qe3i6imh";

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(JiFenRewardItem.URL, JiFenRewardItem);
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("nzbz", "View_NZBZ_JiFenReward").asCom;
		this.contentPane = this.view;
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandler;
		this.list.setVirtual();
		super.childrenCreated();
	}

	private renderHandler(index: number, obj: fairygui.GObject): void {
		let item: JiFenRewardItem = obj as JiFenRewardItem;
		item.vo = Model_NZBZ.jifenArr[index];
	}

	public updateShow(): void {
		this.list.numItems = Model_NZBZ.jifenArr.length;
		this.list.scrollToView(0, false, true);
	}

	protected onShown(): void {
		this.updateShow();
		GGlobal.control.listen(Enum_MsgType.NZBZ_JIFENREWARD_UPDATE, this.updateShow, this);
	}

	protected onHide(): void {
		this.list.numItems = 0;
		GGlobal.layerMgr.close(UIConst.NANZHENG_BEIZHAN_JIFEN);
		GGlobal.control.remove(Enum_MsgType.NZBZ_JIFENREWARD_UPDATE, this.updateShow, this);
	}
}