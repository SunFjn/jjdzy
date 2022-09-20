/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewMainUIRight extends BaseSceneUI {

	public constructor() {
		super();
	}

	protected initUI(): void {
		super.initUI();

		this.btnContainer.setXY(4, 8);
		this.LayoutType = fairygui.GroupLayoutType.Vertical;
		this.updateShareIc();
		this.regMsg();
	}

	public static _instance: ViewMainUIRight;
	public static get instance(): ViewMainUIRight {
		if (!ViewMainUIRight._instance) ViewMainUIRight._instance = new ViewMainUIRight();
		return ViewMainUIRight._instance;
	}
	public addMenuIcon(sid, isNotice?: boolean) {
		switch (sid) {
			case UIConst.SHARE:
				if (GGlobal.modelGlobalMsg.share_st == 1){
					super.addMenuIcon(sid, isNotice);
				}
				break;
		}
	}
	public removeMenuIcon(sid) {
		switch (sid) {
			case UIConst.SHARE:
				super.removeMenuIcon(sid);
				break;
		}
		super.removeMenuIcon(sid);
	}
	private regMsg() {
		GGlobal.modelShare.listen(ModelShare.msg_datas, this.updateShareIc, this);
		GGlobal.control.listen(Enum_MsgType.SCENE_TASK, this.updateShareIc, this);
	}
	public removeMsg() {
		GGlobal.modelShare.remove(ModelShare.msg_datas, this.updateShareIc, this);
		GGlobal.control.remove(Enum_MsgType.SCENE_TASK, this.updateShareIc, this);
	}
	private updateShareIc() {
		var state = GGlobal.modelShare.statesDic[1];
		if (state == 2 && (Model_player.taskId > 14)) {
			this.removeMenuIcon(UIConst.SHARE);
		} else {
			if (ModuleManager.isOpen(UIConst.SHARE)) {
				this.addMenuIcon(UIConst.SHARE);
			}
		}
	}
	public resetPosition(): void {
		this.setXY(fairygui.GRoot.inst.width - 100 + GGlobal.layerMgr.offx, 250 + ViewMainTopUI1.instance.height + GGlobal.layerMgr.uiAlign + ViewMainTopUI2.instance.height * 2);
	}
}