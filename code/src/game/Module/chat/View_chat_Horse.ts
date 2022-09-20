class View_chat_Horse extends UIModalPanel {

	//>>>>start
	public frame: fairygui.GLabel;
	public backIcon: fairygui.GLoader;
	public nameLb: fairygui.GLabel;
	public powerLb: fairygui.GLabel;
	public speedLb: fairygui.GLabel;
	public imgDi: fairygui.GImage;
	public sjIcon: fairygui.GLoader;
	public speedLb1: fairygui.GLabel;
	public ownerLb: fairygui.GLabel;
	public starLb: fairygui.GRichTextField;
	public groupStar: fairygui.GGroup;
	//>>>>end

	public static URL: string = "ui://fx4pr5qewa9j2x";

	public static createInstance(): View_chat_Horse {
		return <View_chat_Horse><any>(fairygui.UIPackage.createObject("chat", "View_chat_Horse"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}
	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("chat", "View_chat_Horse").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		super.childrenCreated();
	}

	private awatar: Part;
	//1图鉴2宝物3兵法4异宝5神剑6战甲7天书8武将10神兵
	/**614001 ID _1 星级_1 等阶_37500 战力*/
	private updateShow() {
		let self = this;
		let vo: Vo_Chat = this._args;
		let arr = vo.content.split("_");
		self.ownerLb.text = "拥有者：" + vo.name;
		let cfg = Config.zq_773[arr[1]];
		if (self.awatar) {
			EffectMgr.instance.removeEff(self.awatar);
			self.awatar = null;
		}
		self.awatar = EffectMgr.addEff("body/" + cfg.model + "/ride_st/ani", self.sjIcon.displayObject as fairygui.UIContainer,
			self.sjIcon.width / 2, self.sjIcon.height, 1000, -1, true);

		self.powerLb.text = "战力：" + arr[2];

		if (vo.showtype == 16) { //普通坐骑
			self.groupStar.visible = true;
			self.starLb.text = (Number(arr[3]) % 1000) + "";
			let lvId = Number(arr[4]) % 100000;
			let nstr = "坐骑·" + cfg.name + "(" + Math.floor(lvId / 10) + "阶" + (lvId % 10) + "级" + ")"
			self.nameLb.text = HtmlUtil.fontNoSize(nstr, Color.getColorStr(cfg.quality));
		}
		else { //18 幻化坐骑
			let t_id = ~~arr[3];
			self.groupStar.visible = false;
			let t_jie = ~~(t_id % 1000 / 10);
			let t_ji = t_id % 10;
			let t_str = `幻化坐骑·${cfg.name}(${t_jie}阶${t_ji}级)`;
			self.nameLb.text = HtmlUtil.font(t_str, Color.getColorStr(cfg.quality));
		}

		self.speedLb.visible = false
		self.speedLb1.visible = false
	}

	protected onShown(): void {
		let self = this;
		IconUtil.setImg(self.backIcon, Enum_Path.BACK_URL + "chatBg.png");
		self.updateShow();
	}

	protected onHide(): void {
		let self = this;
		IconUtil.setImg(self.backIcon, null);
		if (self.awatar) {
			EffectMgr.instance.removeEff(self.awatar);
			self.awatar = null;
		}
	}
}