class View_ActPreview extends fairygui.GComponent {

	public iconImg: fairygui.GLoader;
	public timeLb: fairygui.GRichTextField;
	public iconGroup: fairygui.GGroup;
	public n11: fairygui.GImage;

	public static URL: string = "ui://7gxkx46wjy0t3c";

	private static _instance: View_ActPreview;
	public static get instance(): View_ActPreview {
		if (!View_ActPreview._instance) View_ActPreview._instance = <View_ActPreview><any>(fairygui.UIPackage.createObject("MainUI", "View_ActPreview"));
		return View_ActPreview._instance;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		a.iconImg = <fairygui.GLoader><any>(a.getChild("iconImg"));
		a.timeLb = <fairygui.GRichTextField><any>(a.getChild("timeLb"));
		a.iconGroup = <fairygui.GGroup><any>(a.getChild("iconGroup"));
		a.n11 = <fairygui.GImage><any>(a.getChild("n11"));
		//a.iconGroup.visible = false; 
		a.showEff(false);
		GGlobal.modelGlobalMsg.listen(Model_GlobalMsg.MSG_GLOBAL_SERVER_TIME_UPDATE, a.show, a);
		//a.show(); 
		a.iconImg.addClickListener(a.OnIcon, this);
	}

	private OnIcon() {
		let self = this;
		GGlobal.modelGuanQia.setAuto(false);
		if (self.iconImg.data == UIConst.ACTIVITYHALL) {
			let cfg = Config.hddt_200[self.sysID];
			if (cfg) GGlobal.layerMgr.open(self.iconImg.data, cfg.fenlei - 1);
		} else {
			GGlobal.layerMgr.open(self.iconImg.data);
		}
	}

	private sysID = 0;
	private surTime = 0;
	public show() {
		let a = this;
		if (Model_GlobalMsg.actPreviewId <= 0) {
			//a.hide1(); 
			return;
		}
		if (Timer.instance.has(a.update, this)) {
			Timer.instance.remove(a.update, this);
		}
		let cfg = Config.hdyg_229[Model_GlobalMsg.actPreviewId];
		let arr = JSON.parse(cfg.sysid);
		a.state = 0;
		a.iconGroup.visible = true;
		IconUtil.setImg(a.iconImg, Enum_Path.MAINUI_URL + arr[0] + ".png");
		a.sysID = parseInt(arr[0]);
		a.iconImg.data = cfg.open;
		a.showEff(Model_GlobalMsg.actPreviewTime >= 0 && Model_GlobalMsg.actPreviewId == 1);
		let serverTime = Math.ceil(Model_GlobalMsg.getServerTime() / 1000);
		if (Model_GlobalMsg.actPreviewTime <= 0) {
			a.state = -1;
		} else if (serverTime >= Model_GlobalMsg.actPreviewTime) {
			a.state = 0;
		} else if (serverTime < Model_GlobalMsg.actPreviewTime - cfg.time) {
			a.state = 2;
		} else {
			a.state = 1;
		}
		a.updateUIState();
	}

	private state = 0;//0不显示 2结束 1进行中 -1显示下一轮的活动
	private updateUIState() {
		let a = this;
		let serverTime = Math.ceil(Model_GlobalMsg.getServerTime() / 1000);
		let cfg = Config.hdyg_229[Model_GlobalMsg.actPreviewId];
		switch (a.state) {
			case 0:
				a.hide1();
				break;
			case -1:
				a.timeLb.text = "活动预览"
				ViewMainUIRightTipContainer.getInstance().addCompnent(this);
				break;
			case 1:
				if (a.iconImg.data == UIConst.DANDAO_FUHUI) {
					GGlobal.reddot.setCondition(UIConst.DANDAO_FUHUI, 0, true);
				}
				a.surTime = Model_GlobalMsg.actPreviewTime - serverTime;
				if (!Timer.instance.has(a.update, this)) {
					Timer.instance.listen(a.update, this, 1000);
				}
				this.width = 102;
				ViewMainUIRightTipContainer.getInstance().addCompnent(this);
				break;
			case 2:
				a.surTime = Model_GlobalMsg.actPreviewTime - cfg.time - serverTime;
				if (!Timer.instance.has(a.update, this)) {
					Timer.instance.listen(a.update, this, 1000);
				}
				ViewMainUIRightTipContainer.getInstance().addCompnent(this);
				break;
		}
	}

	private iconEff: Part;
	public showEff(value: boolean) {
		let s = this;
		if (value) {
			if (!s.iconEff) {
				s.iconEff = EffectMgr.addEff("uieff/10021", s.displayListContainer, s.iconImg.x + s.iconImg.width / 2, s.iconImg.y + s.iconImg.height / 2, 1000, -1, true);
			}
		} else {
			if (s.iconEff) {
				EffectMgr.instance.removeEff(s.iconEff);
				s.iconEff = null;
			}
		}
	}

	public update(): void {
		let a = this;
		a.surTime--;
		switch (a.state) {
			case -1: a.timeLb.text = "活动预览"; break;
			case 1://活动进行中
				a.timeLb.text = DateUtil.getHMSBySecond2(a.surTime) + "后结束";
				if (a.surTime < 0) {
					Timer.instance.remove(a.update, this);
					a.hide1();
				} else {
					a.showEff(true);
				}
				break;
			case 2://活动未开始
				a.timeLb.text = DateUtil.getHMSBySecond2(a.surTime) + "后开启";
				if (a.surTime < 0) {
					let serverTime = Math.ceil(Model_GlobalMsg.getServerTime() / 1000);
					a.surTime = Model_GlobalMsg.actPreviewTime - serverTime;
					a.state = 1;
					a.timeLb.text = DateUtil.getHMSBySecond2(a.surTime) + "后结束";
					a.showEff(true);
					if (a.iconImg.data == UIConst.DANDAO_FUHUI) {
						GGlobal.reddot.setCondition(UIConst.DANDAO_FUHUI, 0, true);
					}
				} else {
					a.showEff(false);
				}
				break;
		}
	}

	public hide1() {
		let a = this;
		a.iconGroup.visible = false;
		a.showEff(false);
		ViewMainUIRightTipContainer.getInstance().removeCompnent(a);
		IconUtil.setImg(a.iconImg, null);
	}


}