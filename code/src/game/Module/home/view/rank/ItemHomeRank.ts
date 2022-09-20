/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ItemHomeRank extends fairygui.GComponent {

	public n3: ViewHead;
	public n0: fairygui.GImage;
	public imgRank: fairygui.GLoader;
	public lbRank: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lbHomeType: fairygui.GRichTextField;
	public lbAwards: fairygui.GRichTextField;
	public btnEnter: fairygui.GButton;
	public imgTip: fairygui.GImage;
	public n11: fairygui.GGroup;
	public lbHome: fairygui.GRichTextField;
	public lbInHome: fairygui.GRichTextField;
	public static URL: string = "ui://y0plc878sbl7e";

	public static createInstance(): ItemHomeRank {
		return <ItemHomeRank><any>(fairygui.UIPackage.createObject("home", "ItemHomeRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);
	}

	setdata(idx) {
		let data = GGlobal.homemodel.homeRank_data[idx];
		const self = this;
		self.n3.setdata(data.head, data.level, null, null, false, data.headGrid);
		self.lbName.text = data.name;
		self._idx = data.id;

		let CFG = Config.fddc_019[data.homeType];
		let lib = Config.fdrank_019;
		for (let i in lib) {
			if (lib[i].pm1 <= data.rank && lib[i].pm2 >= data.rank) {
				self.lbAwards.text = "奖励：" + ConfigHelp.makeItemRewardText(lib[i].award) + "/天";
				break;
			}
		}
		self.imgTip.visible = data.event == 1 && GGlobal.homemodel.helpTime > 0;
		self.lbHomeType.text = CFG.name + "(等级：" + data.homeLv + ")";
		self.lbHomeType.color = [1, Color.BLURINT, 0xFF00FF, Color.YELLOWINT, Color.REDINT][data.homeType];
		self.lbRank.text = data.rank + "";
		self.imgRank.visible = data.rank < 4;
		self.lbRank.visible = data.rank > 3;
		self.btnEnter.visible = self.imgTip.visible = data.id != Model_player.voMine.id;
		self.imgRank.url = CommonManager.getCommonUrl("rank_" + data.rank);
		self.btnEnter.addClickListener(self.enterHD, self);

		var st = 3;
		if (GGlobal.homemodel.home_masterID == data.id && !GGlobal.homemodel.isSelfHome) {
			st = 2;
		}
		if (Model_player.voMine.id == data.id) {
			st = 1;
		}

		self.lbHome.visible = st == 1;
		self.lbInHome.visible = st == 2;
		self.n11.visible = st == 3;
	}

	clean() {
		this.btnEnter.removeClickListener(this.enterHD, this);
	}

	private _idx = 0;
	private enterHD() {
		GGlobal.homemodel.CG_House_gotoRoom_11119(this._idx);
	}
}