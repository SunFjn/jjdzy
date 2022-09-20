class Child_ShouChong_Reset extends fairygui.GComponent {

	public backImg: fairygui.GLoader;
	public goBt: Button5;
	public timeLb: fairygui.GRichTextField;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://yih9vfegzm7h2";
	public static pkg = "ActComShouChong";
	public static createInstance(): Child_ShouChong_Reset {
		return <Child_ShouChong_Reset><any>(fairygui.UIPackage.createObject("ActComShouChong", "Child_ShouChong_Reset"));
	}

	public constructor() {
		super();
	}
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let self = this;
		CommonManager.parseChildren(self, self);
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	private onGo() {
		let date: Date = new Date(Model_GlobalMsg.getServerTime());
		let key = "SHOUCHONG_RESET_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
		let value = egret.localStorage.getItem(key);
		if (!value) {
			GGlobal.reddot.setCondition(UIConst.SHOUCHONG_RESET, 0, false);
			egret.localStorage.setItem(key, "SHOUCHONG_RESET_Notice");
		}
		ViewChongZhi.tryToOpenCZ();
	}

	private vo: Vo_Activity;
	private update() {
		let self = this;
		self.noticeImg.visible = GGlobal.reddot.checkCondition(UIConst.SHOUCHONG_RESET)
		self.timeLb.text = "剩余时间：" + DateUtil.getMSBySecond4(self.vo.getSurTime());
		Timer.instance.listen(self.timeHandler, self);
	}

	private timeHandler() {
		let self = this;
		if (self.vo.getSurTime() <= 0) {
			Timer.instance.remove(self.timeHandler, self);
		} else {
			self.timeLb.text = "剩余时间：" + DateUtil.getMSBySecond4(self.vo.getSurTime());
		}
	}

	openPanel(vo?: Vo_Activity) {
		let self = this;
		self.vo = vo;
		self.update();
		self.goBt.addClickListener(self.onGo, self);
		IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "shouchongReset.jpg");
	}

	closePanel(vo?: Vo_Activity) {
		let self = this;
		self.goBt.removeClickListener(self.onGo, self);
		Timer.instance.remove(self.timeHandler, self);
		IconUtil.setImg(self.backImg, null);
	}
}