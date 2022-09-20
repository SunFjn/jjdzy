class VCrossKingReward extends fairygui.GComponent {

	public lbGrade:fairygui.GTextField;
	public list: fairygui.GList;
	public imgGrade: fairygui.GLoader;

	public static URL:string = "ui://me1skowlhfct3u";

	public static createInstance():VCrossKingReward {
		return <VCrossKingReward><any>(fairygui.UIPackage.createObject("crossKing","VCrossKingReward"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbGrade = <fairygui.GTextField><any>(this.getChild("lbGrade"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.imgGrade = <fairygui.GLoader><any>(this.getChild("imgGrade"));

		this.list.itemRenderer = this.renderListItem;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
	}

	private _vo: any
	private _type;
	public set upVo(v){
		this._vo = v;
		this._type = 1;
		this.lbGrade.text = "" + v.name
		this.lbGrade.color = Color.getColorInt(v.color)
		if (v.rewardArr == null) {
			v["reward1Arr"] = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(v.reward1))
		}
		this.list.numItems = v["reward1Arr"].length;

		this.imgGrade.url = fairygui.UIPackage.getItemURL("Arena", "g" + Math.ceil(v.dan / 3));
	}

	public set gradeVo(v){
		this._vo = v;
		this._type = 2;
		this.lbGrade.text = "" + v.name
		this.lbGrade.color = Color.getColorInt(v.color)
		if (v.rewardArr == null) {
			v["reward2Arr"] = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(v.reward2))
		}
		this.list.numItems = v["reward2Arr"].length;

		this.imgGrade.url = fairygui.UIPackage.getItemURL("Arena", "g" + Math.ceil(v.dan / 3));
	}

	private renderListItem(index: number, obj: fairygui.GObject): void {
		var item: ViewGrid = obj as ViewGrid;
		item.tipEnabled = true;
		item.isShowEff = true;
		if(this._type == 1){
			item.vo = this._vo["reward1Arr"][index];
		}else{
			item.vo = this._vo["reward2Arr"][index];
		}
	}

	public clean(){
		this.list.numItems = 0;
	}
}