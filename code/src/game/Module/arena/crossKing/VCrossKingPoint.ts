class VCrossKingPoint extends fairygui.GComponent {

	public lbPoint: fairygui.GTextField;
	public list: fairygui.GList;
	public btnGet: Button1;
	public imgHas: fairygui.GImage;

	public static URL:string = "ui://me1skowlhfct3z";

	public static createInstance(): VCrossKingPoint {
		return <VCrossKingPoint><any>(fairygui.UIPackage.createObject("crossKing", "VCrossKingPoint"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbPoint = <fairygui.GTextField><any>(this.getChild("lbPoint"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.btnGet = <Button1><any>(this.getChild("btnGet"));
		this.imgHas = <fairygui.GImage><any>(this.getChild("imgHas"));

		this.list.itemRenderer = this.renderListItem;
		this.list.callbackThisObj = this;
		this.list.setVirtual();

		this.btnGet.addClickListener(this.onGet, this)
	}

	private _vo: any
	private _status:number;
	public set vo(v) {
		this._vo = v;
		if (v.rewardArr == null) {
			v["rewardArr"] = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(v.reward))
		}
		this.list.numItems = v["rewardArr"].length;
		this.lbPoint.text = "" + v.bp
		//0没有领取 1可领取2已领取
		var status = Model_CrossKing.pointRwd[v.id]
		this._status = status
		if(status == 0){
			this.btnGet.visible = this.btnGet.touchable = true;
			this.btnGet.checkNotice = false;
			this.imgHas.visible = false;
		}
		else if(status == 1){
			this.btnGet.visible = this.btnGet.touchable = true;
			this.btnGet.checkNotice = true;
			this.imgHas.visible = false;
		}
		else{
			this.btnGet.visible = this.btnGet.touchable = false;
			this.imgHas.visible = true;
		}
		this.btnGet.enabled = status == 1;
	}

	private renderListItem(index: number, obj: fairygui.GObject): void {
		var item: ViewGrid = obj as ViewGrid;
		item.isShowEff=true;
		item.vo = this._vo["rewardArr"][index];
	}

	private onGet(): void {
		if(this._status == 0){
			ViewCommonWarn.text("积分不足")
			return;
		}
		GGlobal.modelCrossKing.CG_GET_JF_REWARD(this._vo.id);
	}

	public clean(){
		this.list.numItems = 0;
	}

}