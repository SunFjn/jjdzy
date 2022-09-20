class View_chat_Maid extends UIModalPanel {

	public backIcon: fairygui.GLoader;
	public nameLb: fairygui.GLabel;
	public powerLb: fairygui.GLabel;
	public imgDi: fairygui.GImage;
	public sjIcon: fairygui.GLoader;
	public starLb: fairygui.GRichTextField;
	public ownerLb: fairygui.GLabel;
	public t0: fairygui.Transition;

	public static URL: string = "ui://fx4pr5qewa9j2x";

	public static createInstance(): View_chat_Horse {
		return <View_chat_Horse><any>(fairygui.UIPackage.createObject("chat", "View_chat_Maid"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}
	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("chat", "View_chat_Maid").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		super.childrenCreated();
	}

	//1图鉴2宝物3兵法4异宝5神剑6战甲7天书8武将10神兵
	/**614001 ID _1 星级_1 等阶_37500 战力*/
	private updateShow() {
		let self = this;
		let vo: Vo_Chat = this._args;
		let arr = vo.content.split("_");
		self.ownerLb.text = "拥有者：" + vo.name;
		let cfg = Config.shinv_020[arr[0]];

		self.powerLb.text = "战力：" + arr[3];
		self.starLb.text = arr[1] + "";
		let lvId = Number(arr[2]);
		let nstr = cfg.mingzi + "(" + lvId + "级)"
		self.nameLb.text = HtmlUtil.fontNoSize(nstr, Color.getColorStr(cfg.pinzhi));

		IconUtil.setImg(self.sjIcon, Enum_Path.HOMEMAID_URL + cfg.yuanhua + ".png");
	}

	protected onShown(): void {
		let self = this;
		IconUtil.setImg(self.backIcon, Enum_Path.BACK_URL + "chatBg.png");
		self.updateShow();
	}

	protected onHide(): void {
		let self = this;
		IconUtil.setImg(self.backIcon, null);
		IconUtil.setImg(self.sjIcon, null);
	}
}