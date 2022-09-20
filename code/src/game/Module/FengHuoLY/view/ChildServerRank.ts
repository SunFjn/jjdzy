/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildServerRank extends fairygui.GComponent {

	public n15: fairygui.GImage;
	public n14: fairygui.GLoader;
	public imgHead: fairygui.GLoader;
	public imgHeadGrid: fairygui.GLoader;
	public lbScore: fairygui.GTextField;
	public n6: ViewGrid;
	public n7: ViewGrid;
	public n8: ViewGrid;
	public n10: fairygui.GImage;
	public lbMvp: fairygui.GTextField;
	public n11: fairygui.GImage;
	public n1: fairygui.GTextField;
	public n18: fairygui.GList;

	public static URL: string = "ui://edvdots4kzd9i";

	public static createInstance(): ChildServerRank {
		return <ChildServerRank><any>(fairygui.UIPackage.createObject("FengHuoLY", "ChildServerRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let sf = this;
		CommonManager.parseChildren(sf, sf);
		// this.n15 = <fairygui.GImage><any>(this.getChild("n15"));
		// this.n14 = <fairygui.GImage><any>(this.getChild("n14"));
		// this.imgHead = <fairygui.GLoader><any>(this.getChild("imgHead"));
		// this.imgHeadGrid = <fairygui.GLoader><any>(this.getChild("imgHeadGrid"));
		// this.lbScore = <fairygui.GTextField><any>(this.getChild("lbScore"));
		// this.n6 = <ViewGrid><any>(this.getChild("n6"));
		// this.n7 = <ViewGrid><any>(this.getChild("n7"));
		// this.n8 = <ViewGrid><any>(this.getChild("n8"));
		// this.n10 = <fairygui.GImage><any>(this.getChild("n10"));
		// this.lbMvp = <fairygui.GTextField><any>(this.getChild("lbMvp"));
		// this.n11 = <fairygui.GImage><any>(this.getChild("n11"));
		// this.n1 = <fairygui.GTextField><any>(this.getChild("n1"));
		// this.n18 = <fairygui.GList><any>(this.getChild("n18"));
		sf.grids = [sf.n6, sf.n7, sf.n8];

		this.n18.callbackThisObj = this;
		this.n18.itemRenderer = this.itemRender;

		let mvpcfg = ConfigHelp.makeItemListArr(JSON.parse(ConfigHelp.getSystemDesc(3903)));
		for (let i = 0; i < 3; i++) {
			sf.grids[i].vo = mvpcfg[i];
			sf.grids[i].showEff(true);
			sf.grids[i].tipEnabled = true;
		}
	}

	private itemRender(idx, obj) {
		let item: FHServerRankItem = obj as FHServerRankItem;
		if (this._data[idx]) {
			item.setdata(this._data[idx], idx);
		} else {
			item.setdata(null, idx);
		}
	}

	private _data;
	public grids: ViewGrid[];
	private listUpdate() {
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		this._data = m.rank_server;

		this.n18.numItems = 3;
		if (m.mvpHead) {
			ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(m.mvpHeadGrid), sf.imgHeadGrid);
			ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(m.mvpHead), sf.imgHead);
		}

		sf.lbMvp.text = m.currentMVP == "" ? "虚位以待" : m.currentMVP;
		sf.lbScore.text = "MVP玩家积分：" + m.currentMVPScore;
	}

	public show() {
		let sf = this;
		sf.listUpdate();
		GGlobal.modelFengHuoLY.CG_SERVERRANK_3555();
		GGlobal.control.listen(Enum_MsgType.FHLY_SERVER_UPDATE, sf.listUpdate, sf);
		for (let i = 0; i < 3; i++) {
			sf.grids[i].showEff(true);
		}
		IconUtil.setImg(sf.n14, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/bg.png");
	}

	public hide() {
		let sf = this;
		GGlobal.control.remove(Enum_MsgType.FHLY_SERVER_UPDATE, sf.listUpdate, sf);
		this.n18.numItems = 0;
		for (let i = 0; i < 3; i++) {
			sf.grids[i].showEff(false);
		}
		IconUtil.setImg(sf.n14, null);
	}
}