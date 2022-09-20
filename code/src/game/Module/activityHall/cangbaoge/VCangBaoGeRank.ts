class VCangBaoGeRank extends fairygui.GComponent {

	public labName:fairygui.GRichTextField;
	public labRank:fairygui.GRichTextField;
	public labPoint:fairygui.GRichTextField;
	public list:fairygui.GList;
	public btnReward:fairygui.GButton;
	public imgNo:fairygui.GImage;


	public static URL:string = "ui://1tr9e6d8z8fv18";

	public static createInstance():VCangBaoGeRank {
		return <VCangBaoGeRank><any>(fairygui.UIPackage.createObject("cangbaoge","VCangBaoGeRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.labName = <fairygui.GRichTextField><any>(this.getChild("labName"));
		this.labRank = <fairygui.GRichTextField><any>(this.getChild("labRank"));
		this.labPoint = <fairygui.GRichTextField><any>(this.getChild("labPoint"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.btnReward = <fairygui.GButton><any>(this.getChild("btnReward"));
		this.imgNo = <fairygui.GImage><any>(this.getChild("imgNo"));

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
		this.btnReward.addClickListener(this.onReward, this);
	}

	private _vo: { rank: number, pName: string, ct: number }
	private _listData1: Array<any>;
	private _listData2: Array<any>;
	public setVo(v: { rank: number, pName: string, ct: number }, index, isLast:boolean = false) {
		this._vo = v;
		let rankCfg
		if (v) {
			this.labName.text = v.pName;
			this.labPoint.text = "抽奖次数：" + v.ct;
			this.imgNo.visible = false;
		} else {
			this.labName.text = "";
			this.labPoint.text = "";
			this.imgNo.visible = true;
		}
		let cbgRankQs = isLast ? GGlobal.modelActivityHall.cbgRankLastQs : GGlobal.modelActivityHall.cbgRankQs
		if(Model_ActivityHall.cbgIsKuaF()){
			rankCfg = Model_ActivityHall.getCbgCfg2(cbgRankQs, index + 1)
		}else{
			rankCfg = Model_ActivityHall.getCbgCfg1(cbgRankQs, index + 1)
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
		GGlobal.layerMgr.open(UIConst.CANGBAOGE_REW, { award: this._listData2, type: 2 });
	}
	public clean():void{
		super.clean()
		this.list.numItems = 0;
	}
}