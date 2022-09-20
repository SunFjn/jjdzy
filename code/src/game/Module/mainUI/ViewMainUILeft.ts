/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewMainUILeft extends BaseSceneUI {

	public constructor() {
		super();
	}

	private bg1;
	protected initUI(): void {
		let s = this;
		s.bg1 = new fairygui.GLoader();
		s.bg1.setSize(88, 357);
		s.bg1.fill = fairygui.LoaderFillType.ScaleFree;
		s.bg1.url = "ui://7gxkx46ww6ro5n";
		s.bg1.setXY(0, 6);
		s.bg1.visible = false;
		s.addChild(s.bg1);
		super.initUI();
		s.btnContainer.setXY(5, 6);
		s.LayoutType = fairygui.GroupLayoutType.Vertical;
		GGlobal.control.listen(Enum_MsgType.ENTER_SCENE, s.aglin, s);
	}

	public static _instance: ViewMainUILeft;
	public static get instance(): ViewMainUILeft {
		if (!ViewMainUILeft._instance) ViewMainUILeft._instance = new ViewMainUILeft();
		return ViewMainUILeft._instance;
	}
	public addMenuIcon(sid, isNotice?: boolean) {
		super.addMenuIcon(sid);
		switch (sid) {
			case UIConst.SHOUCHONG:
				GGlobal.modelRecharge.listen(Model_Recharge.msg_info, this.updateNot, this);
				break;
		}
	}
	public removeMenuIcon(sid) {
		super.removeMenuIcon(sid);
		switch (sid) {
			case UIConst.SHOUCHONG:
				GGlobal.modelRecharge.remove(Model_Recharge.msg_info, this.updateNot, this);
				break;
		}
	}
	private updateNot() {
		const icon = GGlobal.mainUICtr.getIcon(UIConst.SHOUCHONG);
		// const keys = Object.keys(GGlobal.modelRecharge.scInfos);
		let scInfos = GGlobal.modelRecharge.scInfos
		const state1 = scInfos["1"];
		const state2 = scInfos["2"];
		const state3 = scInfos["3"];
		const state4 = scInfos["4"];
		let red1 = (state1 == 2 || state2 == 2 || state3 == 2)
		if (icon) {
			if (red1 && state4 == 2) {
				GGlobal.mainUICtr.removeIcon(UIConst.SHOUCHONG);
			} else {
				const bool = state1 == 1 || state2 == 1 || state3 == 1 || state4 == 1;
				icon.checkNotice = bool;
				let cfg = Config.xitong_001[UIConst.SHOUCHONG];
				if(red1){
					icon.setIcon(cfg.icon + "_2");
				}else{
					icon.setIcon(cfg.icon + "_1");
				}
			}
		}
	}
	public resetPosition(): void {
		let contentH = fairygui.GRoot.inst.height - 512 - ViewMainTopUI1.instance.height - GGlobal.layerMgr.uiAlign - this._yy;
		this.setXY(-GGlobal.layerMgr.offx, ViewMainTopUI1.instance.height + GGlobal.layerMgr.uiAlign + contentH / 2 + 120);
	}

	public aglin() {
		let s = this;
		super.aglin();
		s.bg1.visible = true;
		s.bg1.setSize(88, s._yy);
		s.resetPosition();
	}
}