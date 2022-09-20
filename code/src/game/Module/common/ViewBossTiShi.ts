class ViewBossTiShi extends UIModalPanel {

	public lbTitle: fairygui.GTextField;
	public headIcon: ViewHead;
	public btn: Button1;

	public constructor() {
		super();
		this.loadRes("bossTiShi", "bossTiShi_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("bossTiShi");
		this.view = fairygui.UIPackage.createObject("bossTiShi", "ViewBossTiShi").asCom;
		this.contentPane = this.view;
		this.headIcon = <ViewHead><any>(this.view.getChild("headIcon"));
		this.lbTitle = <fairygui.GTextField><any>(this.view.getChild("lbTitle"));
		this.btn = <Button1><any>(this.view.getChild("btn"));
		this.isShowMask = false;
		this.closeButton = this.view.getChild("closeButton");
		super.childrenCreated();
		this.resetPosition();
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
	}

	private _ui: number
	private _cfg: Ibossts_200
	private _index: number;

	public onShown() {
		this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		GGlobal.control.listen(Enum_MsgType.SCENE_CHANGE, this.onSceneChange, this);
		GGlobal.control.listen(Enum_MsgType.SCENE_TASK, this.onSceneChange, this);
		Timer.instance.listen(this.upTime, this, 1000);
		this.updateShow();
	}

	private updateShow() {
		this._timer = 0
		this._ui = this._args.ui;
		this._index = this._args.index;
		this._cfg = this._args.cfg;
		this.lbTitle.text = this._cfg.name
		let n = Config.NPC_200[this._cfg.boss];
		this.headIcon.setdata(RoleUtil.getHeadImg(n.head + ""), -1, "", 0, true);
		this.onSceneChange();
	}

	protected onHide() {
		if (this.btn) {
			this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}
		GGlobal.control.remove(Enum_MsgType.SCENE_CHANGE, this.onSceneChange, this);
		GGlobal.control.remove(Enum_MsgType.SCENE_TASK, this.onSceneChange, this);
		Timer.instance.remove(this.upTime, this);
		GGlobal.layerMgr.close(UIConst.BOSS_TISHI);
		ViewBossTiShi.yxj = 0;
	}

	private onSceneChange(): void {
		if (GGlobal.sceneType == SceneCtrl.GUANQIA) {
			var taskId = ConfigHelp.getSystemNum(2805)
			if (Model_player.taskId > taskId) {
				this.visible = true;
				return;
			}
		}
		this.visible = false;

	}

	public static yxj: number = 0;
	public static show(ui: number, index = 0) {
		if (ui == UIConst.QMBOSS) {
			let itemCount = Model_Bag.getItemCount(410015);
			if (GGlobal.modelBoss.qmCount <= 0 && itemCount == 0) return;//没次数
			if (index < 3) return;
		} else if (ui == UIConst.MHBOSS) {
			if (Model_GlobalMsg.kaifuDay <= 1) return;//开服第一天不开
		}
		if (GGlobal.sceneType != SceneCtrl.GUANQIA) {
			return;
		}
		if (!ModuleManager.isOpen(ui)) {
			return;
		}
		//排序优先显示
		let cfg = ViewBossTiShi.getCfg(ui, index);
		if (!cfg) {
			return;
		}
		//提示消失
		if (GGlobal.layerMgr.isOpenView(UIConst.BOSS_TISHI)) {
			let v = GGlobal.layerMgr.getView(UIConst.BOSS_TISHI) as ViewBossTiShi;
			if (v._args.cfg.yxj < cfg.yxj) {
				//数值大的优先
				v._args = { ui: ui, cfg: cfg, index: index };
				ViewBossTiShi.yxj = cfg.yxj;
				v.updateShow();
			}
		} else {
			ViewBossTiShi.yxj = cfg.yxj;
			GGlobal.layerMgr.open(UIConst.BOSS_TISHI, { ui: ui, cfg: cfg, index: index });
		}
	}

	public static hide(ui: number, fu = 0) {
		let cfg = ViewBossTiShi.getCfg(ui, fu);
		//提示消失
		if (GGlobal.layerMgr.isOpenView(UIConst.BOSS_TISHI)) {
			let ui = GGlobal.layerMgr.getView(UIConst.BOSS_TISHI) as ViewBossTiShi;
			if (ui._args.cfg.id == cfg.id) {
				GGlobal.layerMgr.close2(UIConst.BOSS_TISHI);
			}
		}
	}

	private onClick() {
		GGlobal.layerMgr.open(this._ui)
		this.closeEventHandler(null);
	}

	private static _cfg;
	public static getCfg(ui, fb): Ibossts_200 {
		if (ViewBossTiShi._cfg == null) {
			ViewBossTiShi._cfg = {};
			for (let keys in Config.bossts_200) {
				let cfg = Config.bossts_200[keys];
				if (ViewBossTiShi._cfg[cfg.sysid] == null) {
					ViewBossTiShi._cfg[cfg.sysid] = {};
				}
				ViewBossTiShi._cfg[cfg.sysid][cfg.fb] = cfg;
			}
		}
		return ViewBossTiShi._cfg[ui] ? ViewBossTiShi._cfg[ui][fb] : null
	}

	private _timer: number;
	private upTime() {
		this._timer++;
		if (this._timer > 10) {
			GGlobal.layerMgr.close2(UIConst.BOSS_TISHI)
		}
	}
}