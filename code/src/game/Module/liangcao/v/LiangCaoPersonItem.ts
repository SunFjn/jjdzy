/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class LiangCaoPersonItem extends fairygui.GComponent {

	public n0: fairygui.GImage;
	public list: fairygui.GList;
	public n2: fairygui.GLoader;
	public lbRank: fairygui.GRichTextField;
	public n3: fairygui.GImage;
	public n4: fairygui.GImage;
	public lbName: fairygui.GRichTextField;
	public lbScore: fairygui.GRichTextField;
	public groupDta: fairygui.GGroup;
	public imgNull: fairygui.GImage;

	public static URL: string = "ui://mbcu0qc0hd20a";

	public static createInstance(): LiangCaoPersonItem {
		return <LiangCaoPersonItem><any>(fairygui.UIPackage.createObject("liangcao", "LiangCaoPersonItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.imgNull.visible = false;
	}

	render = (idx, obj) => {
		let item: ViewGrid = obj as ViewGrid;
		item.tipEnabled = true;
		item.isShowEff = true;
		item.vo = this.awards[idx];
	}

	clean() {
		this.list.numItems = 0;
	}

	awards;
	setdata = (idx) => {
		let self = this;
		let data = GGlobal.modelLiangCao.rankdata_person;

		if (idx > 2) {
			self.n2.visible = false;
			self.lbRank.text = idx + 1 + "";
		} else {
			self.n2.visible = true;
			self.n2.url = CommonManager.getCommonUrl("rank_" + (idx + 1));
			self.lbRank.text = "";
		}

		if (data[idx]) {
			let item = data[idx];
			self.imgNull.visible = false;
			self.groupDta.visible = true;
			self.lbName.text = item.name;
			self.lbScore.text = "总积分："+item.score;
		} else {
			self.imgNull.visible = true;
			self.groupDta.visible = false;
		}

		let cfg = ModelLiangCao.getPersonalCFG(idx);
		ConfigHelp.createViewGridList(self.list, cfg.reward, self);
	}
}