class VCrossKingReport extends fairygui.GComponent {

	public lbLog: fairygui.GTextField;
	public imgUp: fairygui.GImage;
	public imgDown: fairygui.GImage;

	public static URL:string = "ui://me1skowlhfct3w";

	public static createInstance(): VCrossKingReport {
		return <VCrossKingReport><any>(fairygui.UIPackage.createObject("crossKing", "VCrossKingReport"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbLog = <fairygui.GTextField><any>(this.getChild("lbLog"));
		this.imgUp = <fairygui.GImage><any>(this.getChild("imgUp"));
		this.imgDown = <fairygui.GImage><any>(this.getChild("imgDown"));
	}

	public set vo(v: Vo_CrossKingRep) {
		var log = ""
		if (v.batRes == 0) {
			this.lbLog.color = Color.GREENINT
			log += "战胜了"
		} else {
			this.lbLog.color = Color.REDINT
			log += "不敌"
		}
		log += "<font color='#10acf5'>" + v.name + "</font>"
		if (v.rank == 1) {
			log += "，排名上升 "
		} else if (v.rank == 2) {
			log += "，排名下降 "
		}
		this.imgUp.visible = false
		this.imgDown.visible = false
		if (v.isUp == 1) {
			this.imgUp.visible = true
		} else if (v.isUp == 2) {
			this.imgDown.visible = true
		}
		this.lbLog.text = log
	}
}