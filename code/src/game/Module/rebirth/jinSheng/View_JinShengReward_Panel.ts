class View_JinShengReward_Panel extends UIModalPanel {

	public list: fairygui.GList;
	public timeLb: fairygui.GRichTextField;

	public static URL: string = "ui://dllc71i9elpxh";

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(JinShengRewardItem.URL, JinShengRewardItem);
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("rebirth", "View_JinShengReward_Panel").asCom;
		a.contentPane = a.view;

		a.list = <fairygui.GList><any>(a.view.getChild("list"));
		a.list.callbackThisObj = this;
		a.list.itemRenderer = a.renderHandler;
		a.list.setVirtual();
		a.timeLb = <fairygui.GRichTextField><any>(a.view.getChild("timeLb"));
		super.childrenCreated();
	}

	private renderHandler(index: number, obj: fairygui.GObject): void {
		let item: JinShengRewardItem = obj as JinShengRewardItem;
		item.show(this.rewardArr[index], this.surTime > 0);
	}

	private surTime = 0;
	private rewardArr = [];
	public updateShow() {
		Model_JinSheng.jinShengArr.sort(GGlobal.modeljinsheng.sortReward);
		this.rewardArr = [];
		for (let i = 0; i < Model_JinSheng.jinShengArr.length; i++) {
			let cfg = Model_JinSheng.jinShengArr[i];
			if ((Model_GlobalMsg.kaifuDay > 7 && cfg.id >= 9) || cfg.id < 9) {
				this.rewardArr.push(cfg);
			}
		}
		this.list.numItems =this.rewardArr.length;
	}

	private timeHandler() {
		let a = this;
		a.surTime--;
		if (a.surTime <= 0) {
			Timer.instance.remove(a.timeHandler, this);
			a.timeLb.text = "限时奖励领取已结束";
		} else {
			a.timeLb.text = "限时奖励领取" + HtmlUtil.fontNoSize(DateUtil.getMSBySecond4(a.surTime), Color.getColorStr(6)) + "后结束";
		}
	}

	protected onShown(): void {
		let a = this;
		let curTime = Math.floor(Model_GlobalMsg.getServerTime() / 1000);
		let oldTime = Model_GlobalMsg.kaiFuTime;
		var data: Date = new Date(oldTime * 1000);
		let h: number = data.getHours();
		let m: number = data.getMinutes();
		let s: number = data.getSeconds();
		a.surTime = 24 * 60 * 60 * 7 - (curTime - oldTime) - (h * 60 * 60 + m * 60 + s);
		if (a.surTime > 0) {
			Timer.instance.listen(a.timeHandler, this, 1000);
		} else {
			Timer.instance.remove(a.timeHandler, this);
			a.timeLb.text = "限时奖励领取已结束";
		}
		a.updateShow();
		// GGlobal.control.listen(Enum_MsgType.JINSHENG, a.updateShow, this);
	}

	protected onHide(): void {
		let a = this;
		a.list.numItems = 0;
		GGlobal.layerMgr.close(UIConst.JINSHENG_REWARD);
		Timer.instance.remove(a.timeHandler, this);
		// GGlobal.control.remove(Enum_MsgType.JINSHENG, a.updateShow, this);
	}
}