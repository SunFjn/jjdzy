class VActHolyBRank extends fairygui.GComponent {

	public labName: fairygui.GRichTextField;
	public labRank: fairygui.GRichTextField;
	public labPoint: fairygui.GRichTextField;
	public list: fairygui.GList;
	public btnReward: fairygui.GButton;
	public imgNo: fairygui.GImage;

	public static URL:string = "ui://4aepcdbwwg9y53";

	public static createInstance(): VActHolyBRank {
		return <VActHolyBRank><any>(fairygui.UIPackage.createObject("shouhunJX", "VActHolyBRank"));
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
		this.btnReward.addClickListener(this.onReward, this);

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
		this.btnReward.addClickListener(this.onReward, this);
	}

	private _listData
	private _vo:Issshxbrank_268
	public setVo(v: Issshxbrank_268, index) {
		this._vo = v;
		let ply = GGlobal.modelSHXunbao.xbRankArr[index]
		this.labRank.text = "第" + (index + 1) + "名"
		this.labName.text = ply ? ply.pName : ""
		this.labPoint.text = ply ? "圈数：" + ply.quan : ""
		this.imgNo.visible = ply ? false : true;

		this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(v.reward))
		this.list.numItems = this._listData.length;
	}

	private onReward() {
		GGlobal.layerMgr.open(UIConst.ACT_HOLYB_XBREWARD,this._vo);
	}

	public clean():void{
		super.clean()
		this.list.numItems = 0;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.tipEnabled = true;
		v.isShowEff = true;
		v.vo = this._listData[index];
	}
}