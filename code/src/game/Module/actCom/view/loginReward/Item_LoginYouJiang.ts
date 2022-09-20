class Item_LoginYouJiang extends fairygui.GComponent {

	public ylq: fairygui.GImage;
	public btnGet: fairygui.GButton;
	public desc: fairygui.GTextField;
	public day: fairygui.GTextField;
	public noticeImg: fairygui.GImage;
	public girdList: fairygui.GList;

	public static URL: string = "ui://q4uuphepdsdy3";

	public static createInstance(): Item_LoginYouJiang {
		return <Item_LoginYouJiang><any>(fairygui.UIPackage.createObject("LoginReward", "Item_LoginYouJiang"));
	}

	public constructor() {
		super();
	}

	private VODatas: Iwszwdlyj_324;
	private rewardVO: any[];
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.girdList.setVirtual();
		self.girdList.callbackThisObj = self;
		self.girdList.itemRenderer = self.itemRenderer;
	}

	private itemRenderer(index: number, item: ViewGrid) {
		let self = this;
		item.tipEnabled = true;
		item.isShowEff = true;
		item.vo = self.rewardVO[index];
	}

	private onClickBtnGet() {
		let self = this;
		let model = GGlobal.modelLoginGift;
		if (model.rewardData[self.VODatas.id] == 1) {
			model.CG_GETREWARD_9161(self.VODatas.id);
		} else {
			ViewCommonWarn.text("暂不可领取")
		}
	}

	public clean() {
		let self = this;
		self.girdList.numItems = 0;
		self.btnGet.removeClickListener(self.onClickBtnGet, self);
	}

	public setData(cfg: Iwszwdlyj_324) {
		let self = this;
		let model = GGlobal.modelLoginGift;
		self.VODatas = cfg;
		self.btnGet.visible = model.rewardData[cfg.id] == 1;
		self.desc.text = "累计登陆" + cfg.day + "天";
		if (cfg.day <= model.loginDay) {
			self.day.text = "(" + model.loginDay + "/" + cfg.day + ")";
		} else {
			self.day.text = "[color=#ff0000](" + model.loginDay + "/" + cfg.day + ")[/color]";
		}
		self.noticeImg.visible = model.rewardData[cfg.id] == 1;
		self.ylq.visible = model.rewardData[cfg.id] == 2;
		let reward = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		self.rewardVO = reward;
		self.girdList.numItems = self.rewardVO.length;
		self.btnGet.addClickListener(self.onClickBtnGet, self);
	}
}