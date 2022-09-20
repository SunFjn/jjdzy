/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class LiangCaoScoreItem extends fairygui.GComponent {

	public n1: fairygui.GImage;
	public n2: fairygui.GImage;
	public lbDesc: fairygui.GRichTextField;
	public list: fairygui.GList;
	public btnGet: fairygui.GButton;
	public imgYLQ: fairygui.GImage;

	public static URL: string = "ui://mbcu0qc0hd20f";

	public static createInstance(): LiangCaoScoreItem {
		return <LiangCaoScoreItem><any>(fairygui.UIPackage.createObject("liangcao", "LiangCaoScoreItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	clickHD = () => {
		GGlobal.modelLiangCao.CG_BattleGoods_getreward_10125(this.idx);
	}

	clean() {
		this.list.numItems = 0;
		this.btnGet.removeClickListener(this.clickHD, self);
	}

	idx;
	setdata = (idx) => {
		let self = this;
		let model = GGlobal.modelLiangCao;
		let data = model.rankdata_score;
		let scoredata = data[idx];
		let id = scoredata.id;
		self.idx = id;
		let st = scoredata.st;
		self.imgYLQ.visible = st == 2;
		self.btnGet.enabled = st == 1;
		self.btnGet.visible = st != 2;

		let myscore = model.myScore;
		let cfg: Iricemb_290 = Config.ricemb_290[id];

		let color = cfg.point<=myscore?Color.GREENSTR:Color.REDSTR;
		self.lbDesc.text = BroadCastManager.reTxt("积分达到{0}<font color='{1}'>({2}/{3})</font>", cfg.point, color,myscore,cfg.point);
		self.btnGet.addClickListener(self.clickHD, self);
		ConfigHelp.createViewGridList(self.list, cfg.reward, self);
	}
}