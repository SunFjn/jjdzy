class WishTreeRankItem extends fairygui.GComponent{
	public labName:fairygui.GRichTextField;
	public labRank:fairygui.GRichTextField;
	public labPoint:fairygui.GRichTextField;
	public list:fairygui.GList;
	public btnReward:fairygui.GButton;
	public imgNo:fairygui.GImage;
	public c1: fairygui.Controller;

	public static URL:string = "ui://zyevj37nlwy28";

	public static createInstance():WishTreeRankItem {
		return <WishTreeRankItem><any>(fairygui.UIPackage.createObject("ActCom_WishTree","WishTreeRankItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);

		s.list.itemRenderer = s.renderHandle;
		s.list.callbackThisObj = this;
		s.list.setVirtual();
		s.btnReward.addClickListener(s.onReward, s);
	}

	private _vo: WishTreeVO;
	private _listData1: Array<any>;
	private _listData2: Array<any>;
	public setVo(v: WishTreeVO, index, qs:number) {
		this._vo = v;
		let rankCfg
		if (v) {
			this.c1.selectedIndex = 1;
			this.labName.text = v.name;
			this.labPoint.text = "许愿次数：" + v.wish;
			this.imgNo.visible = false;
		} else {
			this.c1.selectedIndex = 0;
			// this.labName.text = "虚位以待";
			this.labPoint.text = "";
			this.imgNo.visible = true;
		}
		
		rankCfg = Model_WishTree.getxyspmCfg(qs, index + 1)
		if (rankCfg && rankCfg.rewardArr1 == null) {
			rankCfg.rewardArr1 = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(rankCfg.reward1));
		}
		if (rankCfg && rankCfg.rewardArr2 == null) {
			rankCfg.rewardArr2 = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(rankCfg.reward2));
		}
		this._listData2 = rankCfg ? rankCfg.rewardArr2 : [];
		this._listData1 = rankCfg ? rankCfg.rewardArr1 : [];
		this.list.numItems = this._listData1.length;
		this.labRank.text = "第" + (index + 1) + "名";
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.tipEnabled = true;
		v.isShowEff = true;
		v.vo = this._listData1[index];
	}

	private onReward(): void {
		GGlobal.layerMgr.open(UIConst.WISHTREE_REW, { award: this._listData2, type: 2 });
	}
	public clean():void{
		super.clean()
		this.list.numItems = 0;
	}
}