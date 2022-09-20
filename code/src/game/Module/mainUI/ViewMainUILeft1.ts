/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewMainUILeft1 extends BaseSceneUI {

	public constructor() {
		super();
	}

	// private bg1;
	protected initUI(): void {
		let s = this;
		// s.bg1 = new fairygui.GLoader();
		// s.bg1.setSize(88, 357);
		// s.bg1.fill = fairygui.LoaderFillType.ScaleFree;
		// s.bg1.url = "ui://7gxkx46ww6ro5n";
		// s.bg1.setXY(0, 6);
		// s.bg1.visible = false;
		// s.addChild(s.bg1);
		super.initUI();
		s.btnContainer.setXY(5, 6);
		s.LayoutType = fairygui.GroupLayoutType.Vertical;
		GGlobal.control.listen(Enum_MsgType.ENTER_SCENE, s.aglin, s);
	}

	public static _instance: ViewMainUILeft1;
	public static get instance(): ViewMainUILeft1 {
		if (!ViewMainUILeft1._instance) ViewMainUILeft1._instance = new ViewMainUILeft1();
		return ViewMainUILeft1._instance;
	}
	public addMenuIcon(sid, isNotice?: boolean) {
		// super.addMenuIcon(sid);

		let s = this;
		if (s.getIcon(sid) != null) return;
		let tb = Config.tubiao_003[sid];
		let cfg = Config.xitong_001[sid];
		let btn = MainMenuBtn1.createInstance();
		btn.loadComplete = Handler.create(s, s.aglin);
		let arr: Vo_Activity[] = GGlobal.modelActivity.getGroup(sid);
		let cfg1: Ihuodong_009;
		if (arr && arr.length > 0) {
			let vo: Vo_Activity = arr[0];
			// cfg1 = GGlobal.modelActivity.gethuodong_009(vo.qs,vo.id);
			cfg1 = Config.huodong_009[vo.index];
		}
		if (sid == UIConst.SHOUCHONG) {
			if (GGlobal.modelRecharge.isFirstGet()) {
				btn.setIcon(cfg.icon + "_2");
			} else {
				btn.setIcon(cfg.icon + "_1");
			}
		} else if (cfg1 && cfg1.dicon > 0) {
			btn.setIcon(cfg1.dicon);
		} else {
			btn.setIcon(cfg.icon + "");
		}
		btn.panelId = sid;
		btn.sortIndex = tb.loc;
		btn.checkNotice = isNotice;
		btn.showTime()
		if (tb.spe) {
			btn.showEff(true);
		}
		s.icons.push(btn);
	}

	public removeMenuIcon(sid) {
		super.removeMenuIcon(sid);
	}

	public resetPosition(): void {
		let contentH = fairygui.GRoot.inst.height - 512 - ViewMainTopUI1.instance.height - GGlobal.layerMgr.uiAlign - this._yy;
		this.setXY(-GGlobal.layerMgr.offx + 100, ViewMainTopUI1.instance.height + GGlobal.layerMgr.uiAlign + contentH / 2 + 120 + 180);
	}

	public aglin() {
		let s = this;
		super.aglin();
		// s.bg1.visible = true;
		// s.bg1.setSize(88, s._yy);
		s.resetPosition();
	}
}