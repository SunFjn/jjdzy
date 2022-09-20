class VZhuanPanReward extends fairygui.GComponent {

	public lbRank:fairygui.GRichTextField;
	public list:fairygui.GList;
	public lbName:fairygui.GRichTextField;
	public imgNo:fairygui.GImage;
	public lbCt:fairygui.GRichTextField;

	public static URL:string = "ui://kdt501v2ioin13";

	public static createInstance():VZhuanPanReward {
		return <VZhuanPanReward><any>(fairygui.UIPackage.createObject("sanGuoQingDian","VZhuanPanReward"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbRank = <fairygui.GRichTextField><any>(this.getChild("lbRank"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.lbName = <fairygui.GRichTextField><any>(this.getChild("lbName"));
		this.imgNo = <fairygui.GImage><any>(this.getChild("imgNo"));
		this.lbCt = <fairygui.GRichTextField><any>(this.getChild("lbCt"));

		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandler;
	}

	public setVo(v:{rk: number, na: string, ct: number}, index){
		this.lbRank.text = "" + (index + 1);
		if(v){
			this.lbName.text = v.na;
			this.lbCt.text = "转盘次数：" + v.ct;
			this.imgNo.visible = false;
		}else{
			this.lbName.text = "";
			this.lbCt.text = "";
			this.imgNo.visible = true;
		}

		let cfg = ModelSGQD.getRankCfg(ModelSGQD.zpQs, index + 1)
		if(cfg){
			this._arr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward));
		}else{
			this._arr = [];
		}
		
		this.list.numItems = this._arr.length;
		
	}
	private _arr;

	private renderHandler(index: number, obj: fairygui.GObject) {
		let grid = obj as ViewGrid;
		let v = this._arr[index];
		grid.vo = v;
		grid.tipEnabled = true;
		grid.showEff(true);
	}

	public clean(){
		this.list.numItems = 0;
	}
	
}