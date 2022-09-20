class View_Share_Panel extends UIModalPanel {
	public drawBt: fairygui.GButton;
	public checkBt: fairygui.GButton;
	public closeButton: fairygui.GButton;
	public itemImg: fairygui.GLoader;
	public n1: fairygui.GLoader;
	private gridArr: ViewGrid[] = [];
	public txtHasGot: fairygui.GTextField;
	public static URL: string = "ui://kummtenyayd22";

	public constructor() {
		super();
		this.loadRes("Share");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("Share");
		const sf = this;
		sf.view = fairygui.UIPackage.createObject("Share", "View_Share_Panel").asCom;
		sf.contentPane = sf.view;
		for (let i = 0; i < 5; i++) {
			let grid: ViewGrid = <ViewGrid><any>(sf.view.getChild("grid" + i));
			sf.gridArr.push(grid);
		}
		sf.drawBt = <fairygui.GButton><any>(sf.view.getChild("drawBt"));
		sf.n1 = <fairygui.GLoader><any>(sf.view.getChild("n1"));
		sf.itemImg = <fairygui.GLoader><any>(sf.view.getChild("itemImg"));
		sf.checkBt = <fairygui.GButton><any>(sf.view.getChild("checkBt"));
		sf.closeButton = <fairygui.GButton><any>(sf.view.getChild("closeButton"));
		sf.txtHasGot = <any>(sf.view.getChild("txtHasGot"));
		sf.drawBt.addClickListener(sf.shareHandler, sf);
		sf.txtHasGot.visible = false;
		super.childrenCreated();
		sf.initAwards();
	}
	private initAwards() {
		const sf = this;
		var rewards = ConfigHelp.makeItemListArr(JSON.parse(Config.fenxiang_013[1].reward));
		for (let i = 0; i < 5; i++) {
			let grid: ViewGrid = sf.gridArr[i];
			grid.isShowEff = true;
			grid.vo = rewards[i];
			grid.tipEnabled = true;
			grid.showEff(true);
		}
	}

	private shareHandler() {
		const sf = this;
		if (GGlobal.sdk) {
			GGlobal.sdk.ShareApp();
			GGlobal.control.listenonce(Enum_MsgType.GAMEACTIVE, sf.gameReact, sf);
		} else {
			GGlobal.modelShare.CG2701(1);//写死了先
			sf.closeEventHandler(null);
		}
	}
	private gameReact() {
		const sf = this;
		GGlobal.modelShare.CG2701(1);//写死了先
		sf.closeEventHandler(null);
	}
	protected onShown() {
		super.onShown();
		const sf = this;
		var state = GGlobal.modelShare.statesDic[1];
		if (state == 2) {
			sf.txtHasGot.visible = true;
		} else {
			sf.txtHasGot.visible = false;
		}
		IconUtil.setImg(sf.n1, Enum_Path.BACK_URL + "share.png");
		IconUtil.setImg(sf.itemImg, Enum_Path.PIC_URL + "640101.png");
	}
	protected onHide(): void {
		const sf = this;
		GGlobal.layerMgr.close(UIConst.SHARE);
		ConfigHelp.cleanGridEff(sf.gridArr);
		IconUtil.setImg(sf.n1, null);
		IconUtil.setImg(sf.itemImg, null);
	}
}