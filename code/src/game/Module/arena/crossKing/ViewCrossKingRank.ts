class ViewCrossKingRank extends UIModalPanel {

	public c1: fairygui.Controller;
	public frame: fairygui.GComponent;
	public lbTitle: fairygui.GTextField;
	public tab0: fairygui.GButton;
	public tab1: fairygui.GButton;
	public tab2: fairygui.GButton;
	public tab3: fairygui.GButton;
	public lbRank: fairygui.GTextField;
	public lbName: fairygui.GTextField;
	public list: fairygui.GList;
	public lbMyGrade: fairygui.GTextField;
	public lbTips: fairygui.GTextField;
	public lbMyRank: fairygui.GTextField;

	public static URL: string = "ui://yqpfulefj9wfc";

	public static createInstance(): ViewCrossKingRank {
		return <ViewCrossKingRank><any>(fairygui.UIPackage.createObject("Arena", "ViewCrossKingRank"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("Arena");
		this.view = fairygui.UIPackage.createObject("Arena", "ViewCrossKingRank").asCom;
		this.contentPane = this.view;

		this.c1 = this.view.getController("c1");
		this.frame = <fairygui.GComponent><any>(this.view.getChild("frame"));
		this.lbTitle = <fairygui.GTextField><any>(this.view.getChild("lbTitle"));
		this.tab0 = <fairygui.GButton><any>(this.view.getChild("tab0"));
		this.tab1 = <fairygui.GButton><any>(this.view.getChild("tab1"));
		this.tab2 = <fairygui.GButton><any>(this.view.getChild("tab2"));
		this.tab3 = <fairygui.GButton><any>(this.view.getChild("tab3"));
		this.lbRank = <fairygui.GTextField><any>(this.view.getChild("lbRank"));
		this.lbName = <fairygui.GTextField><any>(this.view.getChild("lbName"));
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.lbMyGrade = <fairygui.GTextField><any>(this.view.getChild("lbMyGrade"));
		this.lbTips = <fairygui.GTextField><any>(this.view.getChild("lbTips"));
		this.lbMyRank = <fairygui.GTextField><any>(this.view.getChild("lbMyRank"));
		super.childrenCreated();

		this.list.itemRenderer = this.renderListItem;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
	}
	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
	}
	protected onShown(): void {
		this.addListen();
		this.update();
		this.selectPage();
	}

	protected onHide(): void {
		this.removeListen();
		this.c1.selectedIndex = 0;
	}

	private addListen(): void {
		this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
		GGlobal.control.listen(Enum_MsgType.CROSSKING_RANK_ARR, this.update, this)
	}

	private removeListen(): void {
		this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
		GGlobal.control.remove(Enum_MsgType.CROSSKING_RANK_ARR, this.update, this)
		GGlobal.layerMgr.close(UIConst.CROSS_KING_RANK);
		this.list.numItems = 0;
	}

	private update(): void {
		this.list.numItems = Model_CrossKing.rankPlyArr.length;
		this.list.scrollToView(0);
		var cfgGrade = Config.lsxx_232[Model_CrossKing.myGrade]
		if (cfgGrade) {
			this.lbMyGrade.text = "我的段位：<font color='" + Color.getColorStr(cfgGrade.color) + "'>" + cfgGrade.name + "</font>"
		} else {
			this.lbMyGrade.text = "我的段位："
		}
		this.lbMyRank.text = "我的排名：<font color='#ffc334'>" + Model_CrossKing.myRank + "</font>"
	}

	private selectPage(): void {
		GGlobal.modelCrossKing.CG_OPEN_RANKS(13 - this.c1.selectedIndex);
	}

	private renderListItem(index: number, obj: fairygui.GObject): void {
		var item: VCrossKingRank = obj as VCrossKingRank;
		item.vo = Model_CrossKing.rankPlyArr[index];
	}
}