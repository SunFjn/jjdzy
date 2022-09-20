class View_ActivityOpenPrompt_Panel extends UIModalPanel {

	public iconImg: fairygui.GLoader;
	public enterBt: fairygui.GButton;
	public closeBt: fairygui.GButton;

	public static URL: string = "ui://5ed3mplelsg13";

	public constructor() {
		super();
		this.loadRes("TiShi", "TiShi_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("TiShi");
		let self = this;
		self.isShowMask = false;
		self.view = fairygui.UIPackage.createObject("TiShi", "View_ActivityOpenPrompt_Panel").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
		self.enterBt.addClickListener(self.onEnter, self);
		self.closeBt.addClickListener(self.closeEventHandler, self);
	}

	private onEnter() {
		let self = this;
		if (self.cfg.sysid == UIConst.FHLY) {
			let sysid = Config.xtcs_004[6401].num;
			let cfg = Config.hddt_200[UIConst.FHLY];
			if (cfg) GGlobal.layerMgr.open(sysid, cfg.fenlei - 1);
		} else if (self.cfg.sysid == UIConst.WENDINGTX) {
			let sysid = Config.xtcs_004[6402].num;
			let cfg = Config.hddt_200[UIConst.WENDINGTX];
			if (cfg) GGlobal.layerMgr.open(sysid, cfg.fenlei - 1);
		} else if (self.cfg.sysid == UIConst.LIANGCAO) {
			let sysid = Config.xtcs_004[6403].num;
			let cfg = Config.hddt_200[UIConst.LIANGCAO];
			if (cfg) GGlobal.layerMgr.open(sysid, cfg.fenlei - 1);
		} else {
			GGlobal.layerMgr.open(self.cfg.sysid);
		}
		self.doHideAnimation();
	}

	private cfg: Ibossts_200;
	protected onShown(): void {
		let self = this;
		self._timer = 0
		self.cfg = self._args
		IconUtil.setImg(self.iconImg, Enum_Path.MAINUI_URL + self.cfg.sysid + ".png");
		Timer.instance.listen(this.upTime, this, 1000);
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.ACTIVITY_PROMPT);
		IconUtil.setImg(this.iconImg, null);
		View_ActivityOpenPrompt_Panel.yxj = 0;
	}

	public static yxj = 0;
	public static show(cfg: Ibossts_200) {
		if (GGlobal.sceneType != SceneCtrl.GUANQIA) {
			return;
		}
		if (!ModuleManager.isOpen(cfg.sysid)) {
			return;
		}
		if (GGlobal.layerMgr.isOpenView(UIConst.ACTIVITY_PROMPT)) {
			let panel = GGlobal.layerMgr.getView(UIConst.ACTIVITY_PROMPT) as View_ActivityOpenPrompt_Panel;
			if (cfg.yxj > panel.cfg.yxj) {
				View_ActivityOpenPrompt_Panel.yxj = cfg.yxj;
				panel._args = cfg;
				panel.onShown();
			}
		} else {
			View_ActivityOpenPrompt_Panel.yxj = cfg.yxj;
			GGlobal.layerMgr.open(UIConst.ACTIVITY_PROMPT, cfg)
		}
	}

	public static hide() {
		GGlobal.layerMgr.close2(UIConst.ACTIVITY_PROMPT);
	}

	private _timer: number = 0;
	private upTime() {
		this._timer++;
		if (this._timer > 10) {
			GGlobal.layerMgr.close2(UIConst.ACTIVITY_PROMPT)
		}
	}
}