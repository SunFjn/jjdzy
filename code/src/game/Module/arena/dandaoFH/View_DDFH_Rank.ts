class View_DDFH_Rank extends UIModalPanel {
	public frame: fairygui.GComponent;
	public rankLb: fairygui.GRichTextField;
	public titleLb: fairygui.GRichTextField;
	public levelImg: fairygui.GLoader;
	public list: fairygui.GList;
	public tab0: TabButton;
	public tab1: TabButton;
	public static URL: string = "ui://me1skowlr4ogf";

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(DDFH_RankItem.URL, DDFH_RankItem);
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("Arena", "View_DDFH_Rank").asCom;
		a.contentPane = a.view;
		a.rankLb = <fairygui.GRichTextField><any>(a.view.getChild("rankLb"));
		a.titleLb = <fairygui.GRichTextField><any>(a.view.getChild("titleLb"));
		a.tab0 = <TabButton><any>(a.view.getChild("tab0"));
		a.tab1 = <TabButton><any>(a.view.getChild("tab1"));
		a.list = <fairygui.GList><any>(a.view.getChild("list"));
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandler;
		a.levelImg = <fairygui.GLoader><any>(a.view.getChild("levelImg"));
		super.childrenCreated();
		a.tab0.addClickListener(a.tabHandler, a);
		a.tab1.addClickListener(a.tabHandler, a);
		a.tab0.selected = true;
		Model_DDFH.getRankData();
	}

	private tabHandler(event: egret.TouchEvent): void {
		let a = this;
		let tab: TabButton = event.target as TabButton;
		if (tab.id == a.tab0.id) {
			a.tab1.selected = false;
			a.updateShow();
		} else {
			a.tab0.selected = false;
			if (Model_DDFH.crossRankData.length <= 0) {
				GGlobal.modelddfh.CG_DANDAOFH_RANKDATA(2);
			} else {
				a.updateShow();
			}
		}
	}

	//排名B:段位L:玩家idU:玩家名字I:积分
	private renderHandler(index: number, obj: fairygui.GObject): void {
		let item: DDFH_RankItem = obj as DDFH_RankItem;
		if (index < this.dataArr.length) {
			item.show(this.dataArr[index], this.isCross);
		} else {
			item.show([index + 1, 0, 0, "虚位以待", 0], this.isCross);
		}
	}

	private isCross = false;
	private dataArr = [];
	public updateShow(): void {
		let a = this;
		a.dataArr = [];
		if (a.tab0.selected) {
			if (Model_DDFH.myRank > 10 || Model_DDFH.myRank == 0) {
				a.rankLb.text = "我的排名：10+";
			} else {
				a.rankLb.text = "我的排名：" + Model_DDFH.myRank;
			}
			a.isCross = false;
			a.dataArr = Model_DDFH.rankData;
			a.list.numItems = 10;
		} else {
			a.isCross = true;
			a.dataArr = Model_DDFH.crossRankData;
			if (Model_DDFH.myCrossRank > 30 || Model_DDFH.myCrossRank == 0) {
				a.rankLb.text = "我的排名：30+";
			} else {
				a.rankLb.text = "我的排名：" + Model_DDFH.myCrossRank;
			}
			a.list.numItems = 30;
		}
		a.levelImg.url = CommonManager.getUrl("Arena", "grade_" + (Model_DDFH.level - 1));

	}

	protected onShown(): void {
		let a = this;
		a.tab0.selected = true;
		a.tab1.selected = false;
		GGlobal.control.listen(Enum_MsgType.DANDAO_FUHUI_RANK, a.updateShow, a);
		GGlobal.modelddfh.CG_DANDAOFH_RANKDATA(1);
		a.updateShow();
	}

	protected onHide(): void {
		let a = this;
		GGlobal.layerMgr.close(UIConst.DANDAO_FUHUI_RANK);
		GGlobal.control.remove(Enum_MsgType.DANDAO_FUHUI_RANK, a.updateShow, a);
		Model_DDFH.crossRankData = [];
		Model_DDFH.rankData = [];
	}
}