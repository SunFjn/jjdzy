class View_Chat_BlackList extends UIModalPanel {

	public list: fairygui.GList;
	public lb: fairygui.GRichTextField;

	public static URL: string = "ui://fx4pr5qe81i016";

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(Chat_BlackListItem.URL, Chat_BlackListItem);
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("chat", "View_Chat_BlackList").asCom;
		this.contentPane = this.view;
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandler;
		this.lb = <fairygui.GRichTextField><any>(this.view.getChild("lb"));
		super.childrenCreated();
	}

	private renderHandler(index: number, obj: fairygui.GObject) {
		let item = obj as Chat_BlackListItem;
		item.show(Model_Chat.blackList[index]);
	}

	private updateShow() {
		this.list.numItems = Model_Chat.blackList.length;
		this.lb.text = "黑名单上限：" + this.list.numItems + "/" + Config.xtcs_004[2503].num;
	}

	protected onShown(): void {
		GGlobal.modelchat.CG_CHAT_OPEN_BLACKLIST();
		this.updateShow();
		if (Model_Chat.blackList.length > 0) {
			this.list.scrollToView(0);
		}
		GGlobal.control.listen(Enum_MsgType.CHAT_BLACKLIST, this.updateShow, this);
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.CHAT_BLACKLIST);
		GGlobal.control.remove(Enum_MsgType.CHAT_BLACKLIST, this.updateShow, this);
	}
}