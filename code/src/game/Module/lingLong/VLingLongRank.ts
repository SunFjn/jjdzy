class VLingLongRank extends fairygui.GComponent {

	public labName: fairygui.GTextField;
	public labRank: fairygui.GTextField;
	public labPoint: fairygui.GTextField;
	public btnReward: fairygui.GButton;
	public list: fairygui.GList;
	public imgNo: fairygui.GImage;

	public static URL: string = "ui://1xperbsykaqa4";

	public static createInstance(): VLingLongRank {
		return <VLingLongRank><any>(fairygui.UIPackage.createObject("lingLong", "VLingLongRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.labName = <fairygui.GTextField><any>(this.getChild("labName"));
		this.labRank = <fairygui.GTextField><any>(this.getChild("labRank"));
		this.labPoint = <fairygui.GTextField><any>(this.getChild("labPoint"));
		this.btnReward = <fairygui.GButton><any>(this.getChild("btnReward"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.imgNo = <fairygui.GImage><any>(this.getChild("imgNo"));

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
		this.btnReward.addClickListener(this.onReward, this);
	}

	private _vo: any
	private _listData1: Array<any>;
	private _listData2: Array<any>;
	public setVo(v: Vo_LingLong, index:number, isLast:boolean = false) {
		this._vo = v;
		let rankCfg
		let rankId = isLast ? Model_LingLong.rankLastId : Model_LingLong.rankId
		if (v) {
			this.labName.text = v.name;
			this.labPoint.text = "积分：" + v.point;
			rankCfg = Config.llgrank_239[v.rankId]
			this.imgNo.visible = false;
		} else {
			this.labName.text = "";
			this.labPoint.text = "";
			rankCfg = Model_LingLong.getLLgCfg(rankId, index + 1)
			this.imgNo.visible = true;
		}

		if (rankCfg && rankCfg.rewardArr1 == null) {
			rankCfg.rewardArr1 = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(rankCfg.reward1));
		}
		if (rankCfg && rankCfg.rewardArr2 == null) {
			rankCfg.rewardArr2 = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(rankCfg.reward2));
		}
		this._listData2 = rankCfg ? rankCfg.rewardArr2 : [];
		this._listData1 = rankCfg ? rankCfg.rewardArr1 : [];
		this.list.numItems = this._listData1.length;
		this.labRank.text = "第" + (index + 1) + "名"
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.tipEnabled = true;
		v.isShowEff = true;
		v.vo = this._listData1[index];
	}

	private onReward(): void {
		GGlobal.layerMgr.open(UIConst.LING_LONG_REWARD, { award: this._listData2, type: 2 });
	}
	public clean(): void {
		super.clean()
		this.list.numItems = 0;
	}
}