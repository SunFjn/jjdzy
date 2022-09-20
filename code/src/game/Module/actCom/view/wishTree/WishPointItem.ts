class WishPointItem extends fairygui.GComponent{
	public lbPoint:fairygui.GRichTextField;
	public btnPoint:ViewGrid;
	public noticeImg:fairygui.GImage;
	public lbCt:fairygui.GRichTextField;
	public imgGet:fairygui.GImage;

	public static URL:string = "ui://zyevj37nlwy25";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	private _vo:WishTreeVO;
	public cfg:Ixysmbb_328;
	public status:number = 0;
	public setVo(v:Ixysmbb_328) {
		// this._vo = v;
		this.cfg = v;
		if(v == null){
			this.btnPoint.vo = null;
			this.noticeImg.visible = false;
			this.imgGet.visible = false;
			this.lbPoint.text = ""
			this.lbCt.text = "";
			return;
		}
		let model = GGlobal.modelWishTree;
		// let pointCfg:Ixysmbb_328 = Config.xysmbb_328[v.id];
		let need = v.cs;
		this.lbPoint.text = v.cs + "次";
		this.lbCt.text = "";
		this.status = model.targetMap[v.id];
		this.btnPoint.tipEnabled = true;
		if(this.status > 0){//可领取
			this.noticeImg.visible = true;
			this.imgGet.visible = false;
			this.lbCt.text = "" + this.status;
			this.btnPoint.tipEnabled = false;
		}
		else if (v == null || model.wish < need) {//不能领取
			this.noticeImg.visible = false;
			this.imgGet.visible = false;
		} 
		else if (this.status == -1) {//已领取
			this.noticeImg.visible = false;
			this.imgGet.visible = true;
		}
		else{
			this.noticeImg.visible = false;
			this.imgGet.visible = false;
		}
		var rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(v.reward))
		this.btnPoint.isShowEff = true;
		this.btnPoint.vo = rewardArr[0];
	}

	// public get vo(): WishTreeVO {
	// 	return this._vo;
	// }

	public clean(){
		
	}
}