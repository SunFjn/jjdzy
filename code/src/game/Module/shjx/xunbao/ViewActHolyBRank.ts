class ViewActHolyBRank extends UIModalPanel {

	public list: fairygui.GList;
	public lbMy: fairygui.GRichTextField;
	public lbTip: fairygui.GRichTextField;
	public lbQuan: fairygui.GRichTextField;
	public c1: fairygui.Controller;
	public tab0: fairygui.GButton;
	public tab1: fairygui.GButton;

	public static URL: string = "ui://d5y9ngt6phvva";

	public static createInstance(): ViewActHolyBRank {
		return <ViewActHolyBRank><any>(fairygui.UIPackage.createObject("shouhunJX", "ViewActHolyBRank"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("shouhunJX");
		this.view = fairygui.UIPackage.createObject("shouhunJX", "ViewActHolyBRank").asCom;
		this.contentPane = this.view;

		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.lbMy = <fairygui.GRichTextField><any>(this.view.getChild("lbMy"));
		this.lbQuan = <fairygui.GRichTextField><any>(this.view.getChild("lbQuan"));
		this.lbTip = <fairygui.GRichTextField><any>(this.view.getChild("lbTip"));
		this.c1 = this.view.getController("c1");
		this.tab0 = <fairygui.GButton><any>(this.view.getChild("tab0"));
		this.tab1 = <fairygui.GButton><any>(this.view.getChild("tab1"));

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
		this.list.numItems = 0;
		this.lbTip.text = ConfigHelp.getSystemNum(5607) + "圈后方可上榜";
		super.childrenCreated();
	}

	protected onShown(): void {
		if (Model_GlobalMsg.kaifuDay < 15) {
			this.tab0.visible = false;
			this.tab1.visible = false;
		} else {
			this.tab0.visible = true;
			this.tab1.visible = true;
		}
		this.c1.selectedIndex = 0;
		this.addListen();
		this.selectPage();
	}

	protected onHide(): void {
		this.removeListen();
		this.list.numItems = 0;
	}

	private addListen(): void {
		this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
		GGlobal.control.listen(Enum_MsgType.ACT_HOLYB_XUNBAO_RANK, this.update, this)
	}

	private removeListen(): void {
		this.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, this.selectPage, this);
		GGlobal.control.remove(Enum_MsgType.ACT_HOLYB_XUNBAO_RANK, this.update, this)
		GGlobal.layerMgr.close(UIConst.ACT_HOLYB_XBRANK);
	}

	private _listData;
	private update() {
		let model = GGlobal.modelSHXunbao
		let myRank = model.xbRankMy > 0 ? model.xbRankMy : "未上榜"
		this.lbMy.text = "我的排名：" + myRank
		this.lbQuan.text = "我的圈数：" + model.xbQuanMy
		this._listData = Model_SHXunBao.xbRankCfgArr()
		this.list.numItems = this._listData.length;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: VActHolyBRank = obj as VActHolyBRank
		v.setVo(this._listData[index], index);
	}

	private selectPage(): void {
		let i = this.c1.selectedIndex;
		if (i == 0) {
			GGlobal.modelSHXunbao.CG_XUNBAO_RANK(1)
		} else {
			GGlobal.modelSHXunbao.CG_XUNBAO_RANK(2)
		}
	}
}