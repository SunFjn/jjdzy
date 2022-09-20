/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class TimeLimitPanel extends UIModalPanel {

	public backbg: fairygui.GImage;
	public btn: fairygui.GButton;
	public lbTime: fairygui.GRichTextField;

	public static URL: string = "ui://47jfyc6eqcylz";

	public static createInstance(): TimeLimitPanel {
		return <TimeLimitPanel><any>(fairygui.UIPackage.createObject("Boss", "TimeLimitPanel"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let s = this;
		s.isClosePanel = false;
		s.view = fairygui.UIPackage.createObject("Boss", "TimeLimitPanel").asCom;
		s.contentPane = s.view;

		this.backbg = <fairygui.GImage><any>(s.view.getChild("backbg"));
		this.btn = <fairygui.GButton><any>(s.view.getChild("btn"));
		this.lbTime = <fairygui.GRichTextField><any>(s.view.getChild("lbTime"));
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
		if (t == SceneCtrl.LVBU)
			GGlobal.modelBoss.CG_LBRELIFE_1515(0);
		if (t == SceneCtrl.MENGHUO)
			GGlobal.modelBoss.CG_MHRELIFE_1705(0);
	}

	private timeUpdate() {
		var m = GGlobal.modelBoss;
		var now = Model_GlobalMsg.getServerTime();
		var t = ((m.lifeTime - now) / 1000) >> 0;
		this.lbTime.text = t + "秒";
		if (t <= 0) {
			let vomine = Model_player.voMine;
			let role: SceneCharRole = vomine.sceneChar;
			if (!role ||role.curhp <= 0) {
				var t = GGlobal.sceneType;
				if (t == SceneCtrl.LVBU)
					GGlobal.modelBoss.CG_LBRELIFE_1515(1);
				if (t == SceneCtrl.MENGHUO)
					GGlobal.modelBoss.CG_MHRELIFE_1705(1);
			}
			this.doHideAnimation();
		}
	}

	protected onShown() {
		Timer.instance.listen(this.timeUpdate, this, 1000);
		this.btn.addClickListener(this.onRelife, this);
		MainUIController.setSkillEnable(false);
	}

	protected onHide() {
		Timer.instance.remove(this.timeUpdate, this);
		this.btn.removeClickListener(this.onRelife, this);
		MainUIController.setSkillEnable(true);
		GGlobal.layerMgr.close(UIConst.RELIFEPANEL);
	}

}