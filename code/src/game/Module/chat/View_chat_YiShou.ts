class View_chat_YiShou extends UIModalPanel{
	public ownerLb: fairygui.GLabel;
	public nameLb: fairygui.GLabel;
	public powerLb: fairygui.GLabel;
	public suitLb: fairygui.GLabel;
	public backIcon: fairygui.GLoader;
	public ysIcon: fairygui.GLoader;

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("chat", "View_chat_YiShou").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		super.childrenCreated();
	}

	/**614001 ID _1 星级_1 等阶_37500 战力*/
	private updateShow() {
		let self = this;
		let vo: Vo_Chat = this._args;
		let arr = vo.content.split("_");
		self.ownerLb.text = "拥有者：" + vo.name;
		let cfg:Iysl_752 = Config.ysl_752[arr[1]];
		IconUtil.setImg(self.ysIcon, Enum_Path.PIC_URL + cfg.tupian1 + ".png");
		let lvCfg:Iyssj_752 = Config.yssj_752[arr[2]];
		let lv:number = lvCfg.lv % 10;
		let costArr = JSON.parse(cfg.jihuo);
		let itemVo:VoItem = VoItem.create(costArr[0][1]);
		self.nameLb.text = HtmlUtil.fontNoSize("异兽·" + cfg.mingzi + "(" + arr[5] + "阶" + lv + "级)", Color.getColorStr(itemVo.quality));
		self.powerLb.text = "战力：" + arr[3];
		let suitCfg:Iystz_752 = Config.ystz_752[arr[4]];
		self.suitLb.visible = false;
		if(suitCfg)
		{
			self.suitLb.visible = true;
			self.suitLb.text = suitCfg.miaoshu;
		}
	}

	protected onShown(): void {
		let self = this;
		IconUtil.setImg(self.backIcon, Enum_Path.BACK_URL + "chatBg.png");
		self.updateShow();
	}

	protected onHide(): void {
		let self = this;
		IconUtil.setImg(self.backIcon, null);
		IconUtil.setImg(self.ysIcon, null);
		GGlobal.layerMgr.close(UIConst.CHAT_BAOWU);
	}
}