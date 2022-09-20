/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class LiangCaoServerItem extends fairygui.GComponent {

	public n9: fairygui.GImage;
	public n111: fairygui.GLoader;
	public n11: fairygui.GImage;
	public n12: fairygui.GImage;
	public list: fairygui.GList;
	public groupServer: fairygui.GGroup;
	public lbName: fairygui.GRichTextField;
	public lbNull: fairygui.GRichTextField;
	public lbScore: fairygui.GRichTextField;

	public static URL: string = "ui://mbcu0qc0hd20d";

	public static createInstance(): LiangCaoServerItem {
		return <LiangCaoServerItem><any>(fairygui.UIPackage.createObject("liangcao", "LiangCaoServerItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	clean() {
		this.list.numItems = 0;
	}

	setdata = (idx) => {
		let self = this;
		let model = GGlobal.modelLiangCao;
		let data = model.server_data;
		self.n111.url = CommonManager.getCommonUrl("rank_" + (idx + 1));

		if (data[idx]) {
			let serverdata = data[idx];
			self.lbName.text = serverdata.zoneid;
			self.lbScore.text = "总积分：" + serverdata.score;
			self.groupServer.visible = true;
			self.lbNull.visible = false;

		} else {
			self.lbNull.visible = true;
			self.groupServer.visible = false;
		}

		ConfigHelp.createViewGridList(self.list, Config.ricerank_290[idx+1].reward, self);
	}
}