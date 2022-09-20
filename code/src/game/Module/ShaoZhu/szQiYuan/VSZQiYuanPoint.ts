class VSZQiYuanPoint extends fairygui.GComponent {

	public lbPoint:fairygui.GRichTextField;
	public btnPoint:ViewGrid;
	public noticeImg:fairygui.GImage;
	public lbCt:fairygui.GRichTextField;
	public imgGet:fairygui.GImage;

	public static URL:string = "ui://p83wyb2bsr6c17";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbPoint = <fairygui.GRichTextField><any>(this.getChild("lbPoint"));
		this.btnPoint = <ViewGrid><any>(this.getChild("btnPoint"));
		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
		this.lbCt = <fairygui.GRichTextField><any>(this.getChild("lbCt"));
		this.imgGet = <fairygui.GImage><any>(this.getChild("imgGet"));
	}

	private _vo: { id: number, ct: number }
	public setVo(v: { id: number, ct: number }, base = 0) {
		this._vo = v;
		if(v == null){
			this.btnPoint.vo = null;
			this.noticeImg.visible = false;
			this.imgGet.visible = false;
			this.lbPoint.text = ""
			this.lbCt.text = "";
			return;
		}
		let model = GGlobal.modelSZQiYuan
		let pointCfg = Config.sonpoint_267[v.id]
		let need = base + pointCfg.point
		this.lbPoint.text = "积分:" + pointCfg.point
		this.lbCt.text = "";
		if(v.ct > 0){//可领取
			this.noticeImg.visible = true;
			this.imgGet.visible = false;
			if(v.ct > 1){
				this.lbCt.text = "" + v.ct;
			}
		}
		else if (pointCfg == null || model.myPoint < need) {//不能领取
			this.noticeImg.visible = false;
			this.imgGet.visible = false;
		} 
		else if (v.ct == -1) {//已领取
			this.noticeImg.visible = false;
			this.imgGet.visible = true;
		}
		else{
			this.noticeImg.visible = false;
			this.imgGet.visible = false;
		}
		var rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(pointCfg.reward))
		this.btnPoint.isShowEff = true;
		this.btnPoint.tipEnabled = false;
		this.btnPoint.vo = rewardArr[0];
	}

	public clean(){
			this.btnPoint.vo = null;
	}

	public get vo(): { id: number, ct: number } {
		return this._vo;
	}
}
