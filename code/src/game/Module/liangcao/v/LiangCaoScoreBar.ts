/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class LiangCaoScoreBar extends fairygui.GComponent {

	public n0: fairygui.GImage;
	public hp1: fairygui.GLoader;
	public n2: fairygui.GRichTextField;
	public n3: fairygui.GRichTextField;
	public n4: fairygui.GRichTextField;

	public static URL: string = "ui://mbcu0qc0hd202";

	public static createInstance(): LiangCaoScoreBar {
		return <LiangCaoScoreBar><any>(fairygui.UIPackage.createObject("liangcao", "LiangCaoScoreBar"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	//idx 索引  type：1为结算界面 需要显示胜负  2为活动内显示积分
	setdata = (idx, type, score) => {
		let self = this;
		let m = GGlobal.modelLiangCao
		let data = m.server_data;
		let selfZone = "-1";
		let camp = 1;
		if (data[idx]) {
			let item = data[idx];;
			selfZone = item.zoneid;
			camp = item.camp;
			self.n2.text = item.zoneid;
			self.n3.text = item.score + "";
			let wid = 218 * item.score / score;
			wid = item.score == 0 ? 0 : wid;
			self.hp1.width = wid;
		} else {
			self.hp1.width = 0;
			self.n2.text = "轮空";
			self.n3.text = "";
		}
		self.hp1.url =["","ui://mbcu0qc0lipbp","ui://mbcu0qc0lipbo","ui://mbcu0qc0lipbn"][camp];
		self.n4.visible = type != 2 && m.winZone == selfZone;
	}
}