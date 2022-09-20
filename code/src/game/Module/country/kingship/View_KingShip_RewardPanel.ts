class View_KingShip_RewardPanel extends UIModalPanel {

	public frame: fairygui.GLabel;
	public myposLb: fairygui.GRichTextField;
	public drawBt: Button1;
	public itemArr: Child_KingShip_RewardItem[] = [];

	public static URL: string = "ui://uwzc58njjd2n2s";

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(Child_KingShip_RewardItem.URL, Child_KingShip_RewardItem);
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("country", "View_KingShip_RewardPanel").asCom;
		self.contentPane = self.view;
		for (let i = 0; i < 5; i++) {
			let item = <Child_KingShip_RewardItem><any>(self.view.getChild("item" + i));
			item.setData(i + 1);
			self.itemArr.push(item);
		}
		self.myposLb = <fairygui.GRichTextField><any>(self.view.getChild("myposLb"));
		self.drawBt = <Button1><any>(self.view.getChild("drawBt"));
		super.childrenCreated();
		self.drawBt.addClickListener(self.drawHandler, self);
	}

	private drawHandler() {
		if (Model_Kingship.status == 2) {
			GGlobal.modelKingship.CG_GET_KINGSHIP_FENGLU();
		} else {
			ViewCommonWarn.text("活动尚未结束");
		}
	}

	public updateShow() {
		let self = this;
		for (let i = 0; i < self.itemArr.length; i++) {
			if (self._args == 0 && i == self.itemArr.length - 1) {
				self.itemArr[i].updateShow(true);
			} else {
				if (i < 3) {
					if (i + 1 == self._args) {
						self.itemArr[i].updateShow(true);
					} else {
						self.itemArr[i].updateShow(false);
					}
				} else {
					self.itemArr[i].updateShow(self._args > 3 && i == 3);
				}
			}
		}
		if (self._args == 0) {
			self.myposLb.text = "我的官职:无";
		} else {
			self.myposLb.text = "我的官职:" + Model_Kingship.countryText[Model_player.voMine.country - 1][self._args - 1 >= 3 ? 3 : self._args - 1];
		}
		self.updateState();
	}

	private updateState() {
		let self = this;
		self.drawBt.enabled = Model_Kingship.isDraw != 1;
		self.drawBt.text = Model_Kingship.isDraw == 1 ? "已领取" : "领取俸禄";
		self.drawBt.checkNotice = Model_Kingship.isDraw != 1 && Model_Kingship.status == 2;
	}

	protected onShown(): void {
		let self = this;
		self.updateShow();
		GGlobal.control.listen(Enum_MsgType.KINGSHIP_UPDATEDATA, self.updateState, self);
	}

	protected onHide(): void {
		let self = this;
		for (let i = 0; i < self.itemArr.length; i++) {
			self.itemArr[i].clean()
		}
		GGlobal.layerMgr.close(UIConst.COUNTRY_KINGSHIP_REWARD);
		GGlobal.control.remove(Enum_MsgType.KINGSHIP_UPDATEDATA, self.updateState, self);
	}
}