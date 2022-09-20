class WuShengTab extends fairygui.GButton {

	public stateImg: fairygui.GLoader;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://a8l39nm98hxb2";

	public static createInstance(): WuShengTab {
		return <WuShengTab><any>(fairygui.UIPackage.createObject("wushengList", "WuShengTab"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public vo;
	public show(vo) {
		let self = this;
		self.vo = vo;
		IconUtil.setImg(self._iconObject.asLoader, Enum_Path.MAINUI_URL + UIConst.WUSHENGLIST + "0" + vo.id + ".png");
		self.stateImg.visible = true;
		if (Model_GlobalMsg.kaifuDay > vo.id) {
			self.stateImg.url = "ui://a8l39nm98hxb4";//已结束
			self.checkNotice(GGlobal.reddot.checkCondition(UIConst.WUSHENGLIST, vo.id - 1));
		} else if (Model_GlobalMsg.kaifuDay == vo.id) {
			self.stateImg.url = "ui://a8l39nm98hxb5";//进行中
			self.checkNotice(GGlobal.reddot.checkCondition(UIConst.WUSHENGLIST, vo.id - 1));
		} else {
			self.stateImg.visible = false;
			self.checkNotice(false);
		}
	}

	public checkNotice(value: boolean) {
		this.noticeImg.visible = value;
	}

	public clean() {
		let self = this;
		IconUtil.setImg(self._iconObject.asLoader, null);
	}
}