class VLingLongPoint extends fairygui.GComponent {

	public lbPoint: fairygui.GRichTextField;
	public btnPoint: ViewGrid;
	public noticeImg: fairygui.GImage;
	public lbCt: fairygui.GRichTextField;
	public imgGet: fairygui.GImage;

	public static URL: string = "ui://1xperbsypk53l";

	public static createInstance(): VLingLongPoint {
		return <VLingLongPoint><any>(fairygui.UIPackage.createObject("lingLong", "VLingLongPoint"));
	}

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

	private _vo: Vo_LingLong
	public setVo(v: Vo_LingLong, base = 0) {
		this._vo = v;
		let pointCfg = Config.llgpoint_239[v.point]
		let need = base + pointCfg.point
		this.lbPoint.text = "积分:" + pointCfg.point
		this.lbCt.text = "";
		if (v.status > 0) {//可领取
			this.noticeImg.visible = true;
			this.imgGet.visible = false;
			if (v.status > 1) {
				this.lbCt.text = "" + v.status;
			}
		}
		else if (pointCfg == null || Model_LingLong.myPoint < need) {//不能领取
			this.noticeImg.visible = false;
			this.imgGet.visible = false;
		}
		else if (v.status == -1) {//已领取
			this.noticeImg.visible = false;
			this.imgGet.visible = true;

		}
		else {
			this.noticeImg.visible = false;
			this.imgGet.visible = false;
		}
		var rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(pointCfg.reward))
		this.btnPoint.isShowEff = true;
		this.btnPoint.tipEnabled = false;
		this.btnPoint.vo = rewardArr[0];
	}

	public get vo(): Vo_LingLong {
		return this._vo;
	}

	public clean() {
		this.btnPoint.vo = null;
	}
}
