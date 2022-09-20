class View_SGZS_Rank extends UIModalPanel {

	public list: fairygui.GList;
	public rankLb: fairygui.GRichTextField;

	public static URL: string = "ui://me1skowlp24e9";

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(SGZS_RankItem.URL, SGZS_RankItem);
		this.childrenCreated()
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("Arena", "View_SGZS_Rank").asCom;
		this.contentPane = this.view;
		this.rankLb = <fairygui.GRichTextField><any>(this.view.getChild("rankLb"));
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandle;
		this.list.setVirtual();
		super.childrenCreated();
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		let item: SGZS_RankItem = obj as SGZS_RankItem;
		item.vo = Config.warreward_222[14 - index];
	}

	protected onShown(): void {
		this.list.numItems = 14;
		this.rankLb.text = "我的排名：" + Model_SGZS.myRank;
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.SANGUO_ZHANSHEN_REWARD);
		this.list.numItems = 0;
	}
}