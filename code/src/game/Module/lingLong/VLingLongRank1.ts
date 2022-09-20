class VLingLongRank1 extends fairygui.GComponent {

	public labName:fairygui.GRichTextField;
	public labRank:fairygui.GRichTextField;
	public labPoint:fairygui.GRichTextField;
	public list:fairygui.GList;
	public imgSelf:fairygui.GImage;

	public static URL:string = "ui://1xperbsydhj5n";

	public static createInstance():VLingLongRank1 {
		return <VLingLongRank1><any>(fairygui.UIPackage.createObject("lingLong","VLingLongRank1"));
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
		this.imgSelf = <fairygui.GImage><any>(this.getChild("imgSelf"));

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
	}

	private _vo: any
	private _listData1: Array<any>;
	// private _listData2: Array<any>;
	public setVo(v: Vo_LingLong, index, isLast = false) {
		this._vo = v;
		let rankCfg = null;
		this.imgSelf.visible = false;
		let rankId = isLast ? Model_LingLong.rankLast1Id : Model_LingLong.cfgId
		if (v) {
			this.labName.text = v.rankId ? "S" + v.rankId : "";
			this.labPoint.text = "积分：" + v.point;
			
			if(v.status == 1){
				this.imgSelf.visible = true;//是自己
			}
		} else {
			this.labName.text = "暂无";
			this.labPoint.text = "";
			this.labRank.text = ""
		}
		this.labRank.text = "第" + (index + 1) + "名"

		rankCfg = Model_LingLong.getLLGRank1(rankId, index + 1);
		if (rankCfg && rankCfg.rewardArr1 == null) {
			rankCfg.rewardArr1 = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(rankCfg.reward1));
		}
		this._listData1 = rankCfg ? rankCfg.rewardArr1 : [];
		this.list.numItems = this._listData1.length;
		
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.tipEnabled = true;
		v.isShowEff = true;
		v.vo = this._listData1[index];
	}

	public clean():void{
		super.clean()
		this.list.numItems = 0;
	}
}