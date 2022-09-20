class View_WuShengRank_Panel extends UIModalPanel {

	public powerImg: fairygui.GImage;
	public passImg: fairygui.GImage;
	public itemArr: WuShengRankItem[] = [];

	public static URL: string = "ui://a8l39nm9rkjpb";

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(WuShengRankItem.URL, WuShengRankItem);
		this.childrenCreated()
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("wushengList", "View_WuShengRank_Panel").asCom;
		this.contentPane = this.view;
		this.powerImg = <fairygui.GImage><any>(this.view.getChild("powerImg"));
		this.passImg = <fairygui.GImage><any>(this.view.getChild("passImg"));
		for (let i = 0; i < 10; i++) {
			let item = <WuShengRankItem><any>(this.view.getChild("item" + i));
			this.itemArr.push(item);
		}
		super.childrenCreated();
	}

	private updateShow() {
		let cfg = Config.ws_238[this._args];
		this.frame.asLabel.text = cfg.name;
		this.powerImg.visible = this._args != 6;
		this.passImg.visible = this._args == 6;
		for (let i = 0; i < this.itemArr.length; i++) {
			this.itemArr[i].show(Model_WuShengList.rankArr[i], i + 1);
		}
	}

	protected onShown(): void {
		this.updateShow();
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.WUSHENGLIST_RANK);
	}
}