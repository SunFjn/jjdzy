class CaoCaoTimeLimitPanel extends UIModalPanel {

	public btn: fairygui.GButton;
	public lbTime: fairygui.GRichTextField;

	public static URL: string = "ui://n6fub9ddeq412";

	public static createInstance(): CaoCaoTimeLimitPanel {
		return <CaoCaoTimeLimitPanel><any>(fairygui.UIPackage.createObject("CaoCaoLaiXi", "CaoCaoTimeLimitPanel"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let self = this;
		self.isClosePanel = false;
		self.view = fairygui.UIPackage.createObject("CaoCaoLaiXi", "CaoCaoTimeLimitPanel").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	private onRelife() {
		ViewAlert.show("是否消耗<font color='#ffc334'>" + Config.xtcs_004[1013].num + "元宝</font>立即复活", Handler.create(this, this.directRelif));
	}

	private directRelif() {
		var m = Model_player.voMine;
		if (m.yuanbao < Config.xtcs_004[1013].num) {
			ModelChongZhi.guideToRecharge();
			return;
		}
		var t = GGlobal.sceneType;
		if (t == SceneCtrl.CAOCAOLAIXI)
			GGlobal.modelCaoCao.CG_CaoCaoCome_buyLive_8523(0);
	}

	private timeUpdate() {
		let self = this;
		var m = GGlobal.modelCaoCao;
		var now = Model_GlobalMsg.getServerTime();
		var t = ((m.lifeTime - now) / 1000) >> 0;
		self.lbTime.text = t + "秒";
		if (t <= 0) {
			let vomine = Model_player.voMine;
			let role: SceneCharRole = vomine.sceneChar;
			if (!role || role.curhp <= 0) {
				var t = GGlobal.sceneType;
				if (t == SceneCtrl.CAOCAOLAIXI)
					GGlobal.modelCaoCao.CG_CaoCaoCome_buyLive_8523(1);
			}
			self.doHideAnimation();
		}
	}

	protected onShown() {
		let self = this;
		Timer.instance.listen(self.timeUpdate, self, 1000);
		self.btn.addClickListener(self.onRelife, self);
		MainUIController.setSkillEnable(false);
	}

	protected onHide() {
		let self = this;
		Timer.instance.remove(self.timeUpdate, self);
		self.btn.removeClickListener(self.onRelife, self);
		MainUIController.setSkillEnable(true);
		GGlobal.layerMgr.close(UIConst.CAOCAO_LAIXI_RELIFEPANEL);
	}
}